# Technical Plan: Event Listener Persistence Fix

## Problem Analysis
The `Component` class (`src/shared/lib/Component/model/Component.ts`) incorrectly manages event listener removal. 

1.  **Reactive State:** `this._on` is a reactive Proxy.
2.  **Update Cycle:** When `setProps` updates `_on`, the value changes immediately.
3.  **Removal Failure:** During `_componentDidRender`, the code calls `this.domService.removeListeners(this._on)`. Because `this._on` now contains the *new* listeners (or new references), `removeEventListener` fails to find and remove the *old* listeners that are actually attached to the DOM.
4.  **Result:** Old listeners remain attached, and new listeners are added, causing duplicate or incorrect event handling (e.g., clicking "Submit" triggers both the old "Edit Info" logic and the new "Submit" logic).

## Proposed Solution
Introduce a state variable to track the *actually attached* listeners. This decouples the "target state" (`this._on`) from the "current state" (`this._attachedListeners`).

### 1. New Property
Add `_attachedListeners` to the `Component` class.
```typescript
private _attachedListeners: P["on"] = {} as P["on"];
```

### 2. Lifecycle Updates

#### `_componentDidRender`
Current:
```typescript
this.domService.removeListeners(this._on);
// ... render ...
this.domService.addListeners(this._on);
```

New Logic:
```typescript
// Remove the listeners that are CURRENTLY on the DOM
this.domService.removeListeners(this._attachedListeners);

// ... render ...

// Add the NEW listeners
this.domService.addListeners(this._on);

// Update the state to reflect what is now attached
this._attachedListeners = { ...this._on };
```

#### `_componentDidUnmount`
Current:
```typescript
this.domService.removeListeners(this._on);
```

New Logic:
```typescript
// Remove what is actually attached
this.domService.removeListeners(this._attachedListeners);
```

## Verification
- **Scenario:** `SettingsPage` switches from "Change Info" to "Change Password".
- **Action:** `setProps` updates `submit` event handler.
- **Flow:**
    1. `_on.submit` changes to `newBtn.on.click`.
    2. `_componentDidRender` triggers.
    3. `removeListeners(_attachedListeners)` removes the *old* "Change Info" handler.
    4. New "Change Password" handler is attached.
    5. `_attachedListeners` is updated to match.
- **Outcome:** Only the new "Change Password" handler is active.
