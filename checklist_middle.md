# Roadmap to Entry-Middle (5-Day Sprint)

**Objective**: Elevate the PWA to a competitive standard for HeadHunter/Habr/LinkedIn.
**Focus**: Reliability, Type Safety, Performance, Documentation.
**Constraint**: 5 Days remaining.

## Day 1: Reliability & Core UX (The "Solid Foundation")
**Goal**: The app feels robust and handles errors gracefully. No silent failures.

- [ ] **Global Error Handling (Toast)**
    - **Architecture (Overlay Pattern)**:
        - Toast must NOT be inside Page logic. It sits at the top level.
        - In `src/app/init/index.ts`, instantiate `Toast` manually.
        - Append `toast.element` directly to `document.body` (or `#toast-root`).
    - **Implementation**:
        - Create `src/shared/ui/Toast/Toast.ts` (Component).
        - Subscribe to `EventBus` (create a global `ToastEventBus` or use Store's bus).
        - `EventBus.on("toast", ({ msg, type }) => this.show(msg, type))`.
    - **Integration**:
        - In `src/shared/api/http/HTTPTransport.ts`: `catch (err) { EventBus.emit("toast", ...) }`.
        - Handle 401 (Unauthorized) -> Redirect to Auth.
    - *Why*: Demonstrates understanding of DOM layers and decoupled communication.
    
- [ ] **Settings UX Separate/Submit**  
    - Why: Clarity, no auto-save bugs.  
    - How: SettingsPage model split actions: changeInfo, changePsw.  
        - UI: Two forms (info/psw), InputEditor editMode=false → true on edit btn, submit calls service.  
        - Validator filter by type.  
            - Test: Edit/save/validate.

- [ ] **Guest Mode (Zero Friction)**
    - **Implementation**:
        - Modify `src/pages/auth/ui/AuthPage.ts`.
        - Add `Button({ text: "Guest Login", onClick: () => AuthService.login(GUEST_CREDS) })`.
        - Define `GUEST_CREDS` in `src/pages/auth/config/params.ts`.
    - *Why*: Recruiters won't register. Instant access is crucial.

- [ ] **Type Safety Audit**
    - **Action**: Run `tsc --noEmit`.
    - **Fixes**:
        - Resolve `any` in `ChatWebsocket` (event data parsing).
        - strictNullChecks in `Store` (state access).
    - **Docs**: Add JSDoc `/** ... */` to `Store.set()`, `Router.go()`, `Component.setProps()`.
    - *Why*: Demonstrates "Senior" discipline.

## Day 2: Real-time & Polish (The "Wow" Factor)
**Goal**: The chat feels alive and responsive.

- [ ] **WebSocket Resilience (Reconnection)**
    - **File**: `src/entities/chat/lib/ChatWebsocket.ts`
    - **Logic**:
        - Add `private retryCount = 0;`.
        - In `ws.onclose`: `if (!clean) { setTimeout(() => this.openWS(), 1000 * 2 ** retryCount) }`.
        - Reset `retryCount` on `ws.onopen`.
    - *Why*: Network flakes happen. Handling them is pro.

- [ ] **Visual Feedback & State**
    - **Messages**:
        - Add `pending` flag to `ChatMessage` type.
        - In `MessageBubble`, apply `.pending { opacity: 0.5 }`.
    - **Chat List**:
        - Store `activeChatId` in `Store`.
        - In `ChatList` render, add `.active` class if `id === activeChatId`.
    - **Timestamps**:
        - Use `Intl.DateTimeFormat("ru-RU", { hour: '2-digit', minute: '2-digit' })` in `utils.ts`.

- [ ] **Avatar Fallbacks**
    - **Logic**: `src/shared/ui/Avatar`.
    - If `props.src` fails (onError) or is empty -> Render `<div>{initials}</div>`.
    - *Why*: Broken images look amateur.

## Day 3: Performance & Mobile (The "Modern Web")
**Goal**: Fast load times and mobile-ready.

- [ ] **Code Splitting (Lazy Loading)**
    - Implement dynamic imports for `pages/` (e.g., `import('./pages/messenger')`).
    - *Why*: Single Page Apps (SPA) must not load everything at once. Critical for performance.
- [ ] **Mobile Responsiveness**
    - Add `meta viewport`.
    - CSS Media Queries for `< 768px`.
    - Hide sidebar on mobile when chat is open (navigation stack logic).
    - *Why*: 50%+ traffic is mobile.

## Day 4: PWA Capabilities (The "Tech Flex")
**Goal**: Installable app experience.

- [ ] **Manifest & Service Worker**
    - Add `manifest.json` (Icon, Name, Theme Color).
    - Add basic Service Worker for offline fallback (cache shell).
    - *Why*: "PWA" is a keyword on your resume. Prove it.
- [ ] **Lighthouse Audit**
    - Run Lighthouse. Aim for >90 in Accessibility and Best Practices.
    - Fix ARIA labels.

## Day 5: Testing & Documentation (The "Professional")
**Goal**: Prove it works and explain *how*.

- [ ] **Critical Unit Tests**
    - Test `Router.use()`, `Router.go()`.
    - Test `Store.set()`, `Store.on()`.
    - Test `FormValidator` (regex logic).
    - *Why*: Don't test UI, test the *Engine*.
- [ ] **Killer README**
    - **Architecture Section**: Explain the "Mini-Framework" (Component + DI).
    - **Features**: List of what's working.
    - **Setup**: One-command run.
    - **Screenshots/GIFs**: Mandatory.
    - *Why*: This is what gets you the interview.

---
**Review against Architecture**:
- Keep it KISS. No over-engineered generic types if not needed.
- No `any`.
- FSD layers respected.
