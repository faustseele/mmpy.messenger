**Day 5: Tests + i18n/Perf/A11y (8h)**  
- [ ] Vitest critical (Router lazy, Validator regex, Toast, guest).  
- [ ] i18n 5langs (extract auth/chat/settings).  
- [ ] Perf Lighthouse, a11y ARIA mobile.  
Commit: "test i18n perf"

- [ ] create a util-func to quickly format + return css classNames + correct trim() etc
	- [ ] `[css.toast, css.toast_visible, type === "error" ? css.toast_error]` -> classNames-string-w/ spaces;
	- [ ] arr -> string