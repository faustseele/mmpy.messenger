# Guest Mode Improvements — Implementation Plan

## Overview

Three improvements to make the Guest Mode recruiter-friendly:
1. **Lock settings** — prevent data editing in guest mode
2. **Bootstrap guest starter** — reset & seed test data on guest sign-in
3. **Clean up on logout** — wipe all chats/notes when guest logs out

---

## Code Style Notes

- **verbose variables first**: `const isGuest = Store.getState()...` before using in conditions
- **comments**: `/* */` only, no `//` — lowercase text
- **disabled buttons**: `disabled` attr + `opacity: 0.5` + `pointer-events: none` (not `isSilent`)
- **`isDrama: true`** on subheading: confirmed ok for guest warning

---

## 0. Shared Foundation: `isGuestMode` flag in Store

### Problem
There's no way to know at runtime whether the current session is guest-mode.
The router's `isGuest()` in `guards.ts:40` means "not logged in" — different concept entirely.

### Changes

| File | What |
|------|------|
| `src/app/providers/store/model/Store.ts` | Add `isGuestMode: boolean` to `controllers` in `AppState` interface |
| `src/app/providers/store/model/types.ts` | *(no change needed — `AppState` lives in `Store.ts`)* |
| `src/app/providers/store/config/init.ts` | Set `isGuestMode: false` in `initialState.controllers` |
| `src/features/authenticate/model/actions-guest.ts` | `Store.set("controllers.isGuestMode", true)` on successful guest sign-in |
| `src/features/authenticate/model/actions.ts` | `Store.set("controllers.isGuestMode", false)` inside `handleLogout()` on success |

---

## 1. Lock Settings in Guest Mode

### Goal
When `isGuestMode === true`, the settings page inputs are disabled and a cautionary subheading appears: *"This is guest mode, no edits allowed. Create a new account to access this feature."*

### Approach: KISS — `disabled` attribute + subheading text swap

The simplest path: in `SettingsPage.componentDidMount()` / `componentDidRender()`, check `Store.getState().controllers.isGuestMode`. If true:
- Set `disabled` attribute on all `<input>` elements inside the form
- Hide edit-info and edit-password buttons (or make them no-op)
- Change the subheading text to the cautionary message

### Changes

| File | What |
|------|------|
| `src/shared/i18n/locales/en.json` | Add `settings.form.guestModeStub` key: `"Guest mode — no edits allowed. Create an account to unlock."` |
| `src/shared/i18n/locales/{de,ru,jp,th,es,fr}.json` | Add equivalent `settings.form.guestModeStub` in each locale |
| `src/pages/settings/ui/SettingsPage.ts` | In `componentDidMount()` and `componentDidRender()`: if `isGuestMode`, set all inputs to `disabled`, swap subheading to `settings.form.guestModeStub`, hide/disable edit buttons |

**Implementation detail for locking inputs:**
```ts
/* in componentDidMount() / componentDidRender(): */
const isGuest = Store.getState().controllers.isGuestMode;

if (isGuest) {
    const inputs = this.element?.querySelectorAll('input');
    inputs?.forEach(input => input.setAttribute('disabled', 'true'));

    /* swap subheading */
    const subheading = subheading_form.runtime?.instance as Subheading;
    subheading.setProps({
        configs: { i18nKey: "settings.form.guestModeStub", isDrama: true },
    });

    /* disable edit buttons via 'disabled' attr + opacity 0.5 */
    [editInfo, editPassword].forEach(btn => {
        const el = btn.element;
        if (el) {
            el.setAttribute('disabled', 'true');
            el.style.opacity = '0.5';
            el.style.pointerEvents = 'none';
        }
    });
}
```

The `isDrama: true` flag on Subheading visually differentiates the warning.

---

## 2. Bootstrap Guest Starter on Sign-In

### Goal
On guest sign-in, after navigating to messenger:
1. Fire a toast: *"Resetting guest mocks..."*
2. Delete ALL existing chats/notes (`hardResetMessenger`)
3. Create 2 test notes: `messenger.notes.study` ("Study 🎓") + `messenger.notes.dailyPlan` ("Daily Plan 🗓️")
4. Create 2 test convos: with users `liamgarcia` + `emmawilson`

### New function: `hardResetMessenger`

Located in `src/entities/chat/model/actions.ts` (alongside existing chat actions).

```ts
export const hardResetMessenger = async (): Promise<void> => {
    const chats = Store.getState().api.chats.list;
    const isEmpty = !chats || chats.length === 0;
    if (isEmpty) return;

    for (const chat of chats) {
        await ChatService.deleteChat(chat.id);
    }

    ChatService.deselectChat();
    Store.set("api.chats.list", []);
};
```

This iterates all chats and deletes them via the api. The store is cleaned at the end.

### New function: `bootstrapGuestStarter`

Located in `src/features/authenticate/model/actions-guest.ts`.

This function:
1. Calls `hardResetMessenger()` to wipe everything
2. Creates 2 notes (title = `i18n.t("messenger.notes.study") + ZERO_WIDTH_SPACE`, same for dailyPlan)
3. Creates 2 convos by searching users `liamgarcia` and `emmawilson` via `UserService.findByLogin()`, then `handleCreateChat` + `handleAddUser`
4. Re-fetches chats to update the sidebar

### Execution timing

In `handleGuestSignIn()`, after `handleFetchChats()` and `Router.go(RouteLink.Messenger)` succeed, call `bootstrapGuestStarter()`. This runs *after* navigation, so the messenger page is already rendered and the user sees the toast + sidebar updating in real-time.

```ts
/* in handleGuestSignIn(), inside if(res.ok): */
handleFetchChats();
Router.go(RouteLink.Messenger);
Store.set("controllers.isGuestMode", true);
globalBus.emit(GlobalEvent.Toast, { msg: i18n.t("toasts.auth.guestSuccess"), type: "success" });

/* bootstrap runs after navigation — non-blocking ux */
bootstrapGuestStarter();
```

### Changes

| File | What |
|------|------|
| `src/shared/i18n/locales/en.json` | Add `toasts.auth.guestResetting` key: `"Resetting guest data..."` |
| `src/shared/i18n/locales/{de,ru,jp,th,es,fr}.json` | Add equivalent toast key in each locale |
| `src/entities/chat/model/actions.ts` | Add `hardResetMessenger()` function |
| `src/features/authenticate/model/actions-guest.ts` | Add `bootstrapGuestStarter()`, call it from `handleGuestSignIn()` |

### Mock users for test convos

The users `liamgarcia` and `emmawilson` are already listed in the prompt list at `src/pages/messenger/model/actions.ts:23`. They exist on the backend. The bootstrap will:
1. `UserService.findByLogin("liamgarcia")` → get user object
2. `handleCreateChat(firstName + " " + secondName)` → create chat
3. `handleAddUser(chatId, userId)` → add user to chat
4. Same for `emmawilson`

---

## 3. Clean Up on Logout

### Goal
When the guest logs out, all chats/notes are deleted so no junk accumulates.

### Changes

| File | What |
|------|------|
| `src/features/authenticate/model/actions.ts` | In `handleLogout()`, before `AuthService.logout()`: if `Store.getState().controllers.isGuestMode`, fire-and-forget `hardResetMessenger()` (no `await`) |

```ts
export const handleLogout = async (): Promise<ApiResponse<boolean>> => {
    globalBus.emit(GlobalEvent.Toast, { msg: i18n.t("toasts.auth.loggingOut") });

    /* fire-and-forget cleanup for guest mode */
    const isGuest = Store.getState().controllers.isGuestMode;
    if (isGuest) {
        hardResetMessenger();
    }

    const res = await AuthService.logout();
    /* ... rest unchanged */
};
```

The `hardResetMessenger()` is called without `await` — the deletions happen in the background while the logout proceeds. This is safe because the api calls are independent.

---

## Summary of ALL file changes

| # | File | Nature |
|---|------|--------|
| 1 | `src/app/providers/store/model/Store.ts` | Add `isGuestMode` to `AppState.controllers` |
| 2 | `src/app/providers/store/config/init.ts` | Init `isGuestMode: false` |
| 3 | `src/features/authenticate/model/actions-guest.ts` | Set flag + add `bootstrapGuestStarter()` |
| 4 | `src/features/authenticate/model/actions.ts` | Reset flag on logout + fire-and-forget `hardResetMessenger()` |
| 5 | `src/entities/chat/model/actions.ts` | Add `hardResetMessenger()` |
| 6 | `src/pages/settings/ui/SettingsPage.ts` | Lock inputs + swap subheading in guest mode |
| 7 | `src/shared/i18n/locales/en.json` | Add `settings.form.guestModeStub` + `toasts.auth.guestResetting` |
| 8 | `src/shared/i18n/locales/de.json` | Same i18n keys (German) |
| 9 | `src/shared/i18n/locales/ru.json` | Same i18n keys (Russian) |
| 10 | `src/shared/i18n/locales/jp.json` | Same i18n keys (Japanese) |
| 11 | `src/shared/i18n/locales/th.json` | Same i18n keys (Thai) |
| 12 | `src/shared/i18n/locales/es.json` | Same i18n keys (Spanish) |
| 13 | `src/shared/i18n/locales/fr.json` | Same i18n keys (French) |

**No new files created** — everything fits into existing modules.

---

## Execution Order

1. **Foundation** → Store flag (`isGuestMode`)
2. **Feature 2** → `hardResetMessenger` + `bootstrapGuestStarter` (the heaviest piece)
3. **Feature 3** → Logout cleanup (trivial, reuses `hardResetMessenger`)
4. **Feature 1** → Settings lock (UI-only, depends on store flag)
5. **i18n** → All locale files (can be done in parallel with any step)
6. **Lint + Test** → Run `npm run lint` and `npx vitest run` to verify
