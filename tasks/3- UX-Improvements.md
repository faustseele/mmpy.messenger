### **Day 1: Core UX Fixes (Auth/Settings/Toast, ~6h)**  
Focus: Reliability + feedback. TS interfaces first per strict mode.

- [x] Configs vs Attributes in case of `setProps()`. How will the Attributes of root-tag change on setProps(), if these depend on Configs? -> Setting new Configs in setProps() wont set new Attributes; Problem of root-tag & its Attributes.
- [ ] 1. **Toast Implementation (1.5h)**  
- [x] 1.1 Get Error number from HTTPTransport and base Toast on that (handle AuthService err-return)
- [x] 1.2 AuthPage -- errors on sign-in/up
- [ ] 1.3 SettingsPage -- errors on bad edit; succ on good edit
   - Why: User feedback for errors/success (409 login exists, send fail). Mid-dev UX.  
   - How:  
     - shared/ui/Toast/ complete TS impl (position fixed, auto-hide, EventBus emit('toast', {msg, type:error/success})).  
     - App init: Mount Toast global.  
     - Triggers: AuthService login fail (409/401 → emit), MessageField send err, logout success.  
   - Test: Manual dev server.

- [ ] 2. **Surname Regex Fix (0.5h)**  
   - Why: Strict ^[Upper][letters]* rejects "Von Neumann" (space/lower). Sign-up only (edit InputEditor no regex?).  
   - How: utils.ts surname regex → /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё ]*$/ (multi-word, case-insens optional).  
     - Update msg: "Фамилия 2-50 символов, буквы/пробелы."  
   - Test: Sign-up "John Doe".

- [ ] 3. **Guest Login Btn (1h)**  
   - Why: Easy testing without reg. Pre-reg dev account.  
   - How: AuthPage children add Button(configs={text:'Guest', link:false}).  
     - Click: AuthService.login({login:'guest', psw:'guest123'}) → store user, router messenger.  
     - Hardcode creds (dev knows).  
   - Interface: GuestCreds type.

- [ ] 4. **Settings UX Separate/Submit (3h)**  
   - Why: Clarity, no auto-save bugs.  
   - How: SettingsPage model split actions: changeInfo, changePsw.  
     - UI: Two forms (info/psw), InputEditor editMode=false → true on edit btn, submit calls service.  
     - Validator filter by type.  
	   - Test: Edit/save/validate.

Commit: "feat(ux): toast/guest/surname/settings separate"

### **Day 2: Messenger UX Polish (6h)**  
Focus: Visual/consistency real-time.

- [ ] 1. **Avatar/Emoji/Header (1h)**  
   - Why: Clean list/header.  
   - How: MessengerPage chat-list item: avatar? img : emoji (config fallback).  
     - Header: Conditional CSS [no-avatar] emoji.svg.  

- [ ] 2. **Out-msg BG Contrast (0.5h)**  
   - Why: Readability.  
   - How: messageBubble.module.css .outgoing {background: #e3f2fd;} (low contrast blue).  

- [ ] 3. **Send Fail Toast (1h)**  
   - Why: Feedback WS/API err.  
   - How: MessageField actions catch → EventBus toast('Send failed, retry?').  

- [ ] 4. **Selected Outline/Borders Real-time (1.5h)**  
   - Why: Visual state.  
   - How: Store selectedChatId, CSS .chat-item--selected outline, .chat-notes/user border-color store.update.  
     - ChatService WS onchat → re-render list.  

- [ ] 5. **Msg Date Fix (2h)**  
   - Why: Accurate timestamps.  
   - How: utils.ts formatDate fix old (locale/timezone? → Intl.DateTimeFormat ru).  
     - Bubble props dateStr.  

Commit: "feat(messenger-ux): avatars/bg/toast/outline/date"

Next: Confirm plan → toggle Act mode Day 1 Toast interface first.