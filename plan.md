# Job Hunt Plan — Junior+ Frontend Developer (Remote, Moscow)

**Profile**: 27, self-educated, RU/EN/DE trilingual, strong in architecture & design, targeting 150-250k RUB remote roles.

**Timeline**: 8 weeks (ASAP). Phases overlap — job applications start in Week 2, not after everything is "ready."

---

## Phase 0: Mindset Rules (read daily for Week 1)

1. **"No degree" is irrelevant if the portfolio speaks.** Half the RU frontend market is self-taught. Never apologize for it — frame it as initiative.
2. **Apply before you feel ready.** Interviews are a skill. Your first 5 interviews are practice runs.
3. **One strong project > three weak ones.** This messenger, polished, with tests and a live link, beats a scattered GitHub.
4. **Trilingual + Figma + architecture talk = rare combo at junior+ level.** Lean into it.

---

## Phase 1: Portfolio Polish (Week 1-2)

### 1.1 — mmpy.messenger upgrades
Priority order (highest impact first):

- [ ] **README rewrite** — use `readme-sample.md` as a template. The current README undersells the project badly. This is the single highest-ROI task.
- [ ] **Test coverage to 50%+** — focus on:
  - Component lifecycle (CDR/CDM)
  - Store (set/get/subscribe)
  - Router (navigation, guards)
  - Validation helpers
  - At least 1 integration test per feature (authenticate, send-message)
- [ ] **Verify Netlify deploy works** — make sure `https://mmpy-messenger.netlify.app/` is live and functional. Test all routes.
- [ ] **Fix any visual bugs** — spend 1 hour clicking through every page. Fix broken layouts, missing translations, console errors.
- [ ] **Add Open Graph meta tags** — so the link looks good when shared in Telegram/LinkedIn.

### 1.2 — GitHub profile
- [ ] **Pin mmpy.messenger** as your top repo.
- [ ] **Profile README** (the special `username/username` repo): 2-3 lines about you, tech stack icons, link to mmpy.messenger, link to Figma portfolio if you have one.
- [ ] **Consistent commit history** — don't worry about past commits, but from now on use conventional commits (`feat:`, `fix:`, `refactor:`).
- [ ] **Remove or archive** any weak/abandoned repos that might drag perception down.

### 1.3 — TDLIB project (parallel, Weeks 2-6)
- [ ] Start building. This becomes your "React/SolidJS project" that complements the vanilla-TS messenger.
- [ ] Pick **React** for this one (maximizes job market reach). Or SolidJS if you want a differentiation angle — but React has 10x more job openings.
- [ ] Aim for a deployable MVP in 3-4 weeks. Doesn't need to be feature-complete, needs to be clean and demonstrable.
- [ ] README from day one. Document architecture decisions as you go.

---

## Phase 2: Resume & Profiles (Week 1-2, parallel with Phase 1)

### 2.1 — Resume (1 page PDF, RU and EN versions)

**Structure:**
```
Name
Frontend Developer | Remote | Moscow
RU / EN / DE

[Links: GitHub | Netlify | Telegram]

SKILLS
TypeScript, JavaScript (ES6+), React, SolidJS, HTML/CSS
Architecture: FSD, Component DI, EventBus, custom framework development
Tools: Vite, Vitest, ESLint, PostCSS, CSS Modules, Git, Figma
Languages: Russian (native), English (~C1, proficient), German (C1, certified)

PROJECTS
mmpy.messenger — Real-time chat PWA
  • Vanilla TypeScript + Handlebars, no framework dependencies
  • Custom component system with DI, reactive store, client-side routing
  • WebSocket messaging, i18n (7 languages), CSS Modules
  • FSD architecture, 50%+ test coverage
  → Live: [link]  Code: [link]  Design: [link]

[TDLIB project — once ready]

ABOUT
Self-taught developer focused on architecture and clean code.
Designed UIs in Figma and built them from scratch without frameworks.
Former German language teacher — strong communication and problem-solving.
```

**Key rules:**
- No "no degree" anywhere. Just don't mention education — it's not required for the section to exist.
- "Self-taught" is a strength word. Use it once, confidently.
- Figma skill goes in Skills, not a separate section.
- German teaching → "strong communication" (reframe, don't explain).

### 2.2 — Platform profiles

**HeadHunter (hh.ru):**
- [ ] Title: "Frontend-разработчик (TypeScript, React) | Удалённо"
- [ ] Salary: set to 150,000 RUB (shows as minimum; you negotiate up)
- [ ] Key skills tags: TypeScript, React, JavaScript, CSS, Git, Figma, Vite, REST API, WebSocket
- [ ] "About me" section: 3-4 sentences, RU. Mention: self-taught, architecture focus, trilingual, live project link.
- [ ] Experience: list this project as work-equivalent experience under "Проектная деятельность" or "Фриланс".

**Habr Career (career.habr.com):**
- [ ] Same core info. Habr Career audience is more technical — lean heavier on architecture, FSD, DI patterns.
- [ ] Link your GitHub prominently.
- [ ] Skill assessments: take any available frontend quizzes (they boost visibility).
- [ ] "Готов к удалённой работе" — check this.

**LinkedIn (international reach):**
- [ ] EN profile. Title: "Frontend Developer | TypeScript, React | Open to Remote"
- [ ] Featured section: link to live messenger + GitHub.
- [ ] Set "Open to Work" with remote preference, target countries: Germany, Netherlands, UK, US, anywhere.
- [ ] Connect with 50+ recruiters/devs in first week (LinkedIn algorithm rewards activity).

**Telegram channels (highest velocity for RU market):**
- [ ] Join and monitor daily:
  - `@frontend_jobs` / `@frontend_ru` — frontend-specific
  - `@devjobs` — general dev jobs
  - `@remote_it` — remote IT jobs RU
  - `@javascript_jobs`
  - `@fordev` — Habr community jobs
- [ ] Respond to posts within 1 hour of posting. Speed matters in Telegram job channels.

**Other:**
- [ ] `getmatch.ru` — tech job matching platform, popular in RU
- [ ] `geekjob.ru` — another RU tech job board
- [ ] `djinni.co` — Ukrainian/CIS market, many remote frontend roles
- [ ] `weworkremotely.com`, `remoteok.com` — international remote (lower response rate, but worth having a profile)

---

## Phase 3: Interview Prep (Week 2-4, ongoing)

### 3.1 — Technical fundamentals
These topics come up in 90% of junior+ frontend interviews in RU:

**JavaScript/TypeScript core (must-know):**
- [ ] Closures, scope chain, hoisting
- [ ] `this` binding (4 rules + arrow functions)
- [ ] Prototypes, prototype chain, `class` desugaring
- [ ] Event loop, microtasks vs macrotasks, `Promise` internals
- [ ] `Map`/`Set`/`WeakMap`/`WeakRef` — when and why
- [ ] TypeScript: generics, utility types, type narrowing, discriminated unions

**Browser & DOM:**
- [ ] Critical rendering path (HTML→DOM→CSSOM→Render Tree→Layout→Paint)
- [ ] Event delegation, bubbling, capturing
- [ ] `requestAnimationFrame`, `IntersectionObserver`
- [ ] Web Storage, IndexedDB basics
- [ ] Service Workers / PWA basics (you have a PWA — be able to explain it)

**Network:**
- [ ] HTTP/1.1 vs HTTP/2, HTTPS/TLS handshake basics
- [ ] REST principles, status codes, CORS (you work with a real API — speak from experience)
- [ ] WebSocket protocol (you implemented it — deep-dive, this is your advantage)
- [ ] Caching: `ETag`, `Cache-Control`, service worker cache strategies

**React (even if you prefer SolidJS, 80% of jobs ask React):**
- [ ] Hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback` — when each is needed
- [ ] Virtual DOM diffing, reconciliation, keys
- [ ] Component lifecycle mapped to hooks
- [ ] State management: Context, Redux Toolkit basics, Zustand
- [ ] React Router v6 patterns

**CSS:**
- [ ] Flexbox and Grid — layout any design without hacks
- [ ] Specificity rules, cascade, inheritance
- [ ] BEM vs CSS Modules vs CSS-in-JS tradeoffs (you use CSS Modules — own it)
- [ ] Responsive design: `clamp()`, container queries, media queries

### 3.2 — Architecture (your differentiator)
You built a framework. Most junior+ candidates haven't. Prepare to talk about:

- [ ] Why you chose FSD and how layers depend on each other
- [ ] How your DI pattern works (DOMService, FragmentService injection)
- [ ] EventBus pattern — why, alternatives (pub/sub vs Observer vs signals)
- [ ] Your Store implementation — how it compares to Redux/MobX concepts
- [ ] Router implementation — History API, guards, how params work
- [ ] Trade-offs: what you'd do differently in a production app

### 3.3 — Behavioral / soft skills
- [ ] "Tell me about yourself" — 60-second pitch, practiced until natural:
  *"I'm a self-taught frontend developer. I built a real-time messenger from scratch in TypeScript — no frameworks — with my own component system, routing, and state management. I designed the UI in Figma and implemented FSD architecture. I speak three languages and I'm focused on writing clean, well-tested code."*
- [ ] "Why no CS degree?" → "I learn by building. Here's what I built." (redirect to portfolio)
- [ ] "What's your weakness?" → Pick something real but non-fatal: "I sometimes over-architect small tasks — I'm learning to balance YAGNI with extensibility."
- [ ] Prepare 2-3 questions to ask THEM: team size, code review process, tech stack evolution plans.

### 3.4 — Practice format
- [ ] Solve 2-3 LeetCode Easy/Medium per week (arrays, strings, hash maps — not hard DSA). Focus on clean JS/TS solutions. RU interviewers rarely go beyond medium.
- [ ] Do 1 mock interview per week. Options:
  - `pramp.com` — free peer mock interviews
  - Find a study buddy in Telegram frontend communities
  - Record yourself answering questions, review the recording

---

## Phase 4: Active Application (Week 2 onwards, continuous)

### 4.1 — Application velocity
- [ ] **Target: 5-10 applications per day** in Weeks 2-4.
- [ ] Track everything in a spreadsheet: Company | Date | Source | Status | Notes.
- [ ] **Don't filter too hard.** Apply to jobs that ask for 1-2 years experience even if you have 0 formal years. Your project IS experience.
- [ ] **Customize cover letter per company** — 3 sentences max:
  1. What caught your interest about the role
  2. Your most relevant project/skill for THIS role
  3. Link to live demo + GitHub

### 4.2 — Target company tiers

**Tier 1 — High chance, great learning (apply first):**
- Outsource/agency companies (they hire fast, care less about degrees): EPAM, Luxoft, DataArt, Arcadia, SimbirSoft, KODE, Surf, Effective
- Startups on hh.ru / Telegram (smaller teams, faster hiring, more autonomy)
- EdTech: Skyeng, Skillbox, GeekBrains (they value self-learners)

**Tier 2 — Medium chance, good pay:**
- Product companies: Ozon, Avito, Lamoda, Dodo, 2GIS, HeadHunter itself
- Fintech: Tinkoff (competitive but they do hire self-taught), Raiffeisen, Alfa-Bank
- These often have multi-stage interviews — use Tier 1 interviews as practice

**Tier 3 — Stretch goals:**
- Yandex (you did their Praktikum course — mention it)
- VK / Mail.ru
- International remote (Toptal, Turing, Arc.dev — require passing their screening)

### 4.3 — Response optimization
- [ ] If no response in 5 days → follow up once via email/message. Then move on.
- [ ] If you get a rejection after interview → ask for feedback. 50% of companies will give useful notes.
- [ ] If you get an offer below 150k → negotiate. "I'm looking for [X] based on [project complexity, skills]. Is there flexibility?" The worst they say is no.

---

## Phase 5: Continuous Improvement (ongoing)

- [ ] After each interview, write down every question you couldn't answer. Study it that evening.
- [ ] Ship one feature to mmpy.messenger per week (keeps GitHub green, gives you fresh things to talk about).
- [ ] Once TDLIB app has MVP — add it to resume, GitHub profile, all platforms.
- [ ] If you hit Week 6 with zero offers: reassess. Consider:
  - Widening salary range to 120k+ for first job (get in the door, then switch in 6-12 months)
  - Taking a trial/test project (common in RU market, usually 3-5 day tasks)
  - Contributing to open source for visibility

---

## Weekly Schedule Template

| Day | Focus |
|-----|-------|
| Mon | Code (mmpy polish or TDLIB) + 5 applications |
| Tue | Interview prep (JS/TS theory) + 5 applications |
| Wed | Code + respond to messages/schedule interviews |
| Thu | Interview prep (React + architecture) + 5 applications |
| Fri | Code + applications + update tracking sheet |
| Sat | 2h LeetCode + 2h project work |
| Sun | Rest / light reading (Habr articles, docs) |

---

## Key Metrics to Track

| Metric | Week 2 | Week 4 | Week 6 | Week 8 |
|--------|--------|--------|--------|--------|
| Applications sent | 30+ | 70+ | 100+ | 120+ |
| Responses received | 5+ | 15+ | 25+ | 30+ |
| Interviews done | 1-2 | 5+ | 10+ | 15+ |
| Offers | 0 | 0-1 | 1-2 | 1-3 |

These are realistic numbers. The RU junior market has ~5-15% response rates, higher if you apply via Telegram and include a live project link.

---

## The "Unfair Advantages" You Should Leverage

1. **Trilingual (RU/EN/DE)** — German-speaking companies with RU dev teams (SAP CIS, Siemens RU, Deutsche Bank Tech) specifically look for this. Highlight it.
2. **Figma proficiency** — most frontend devs can't design. You can. This makes you a "frontend developer who doesn't need a designer for prototypes." Agencies love this.
3. **Built a framework** — at junior+ level, almost nobody has done this. It's your trump card in architecture discussions.
4. **Teaching experience** — reframe as mentoring/communication skill. "I've explained complex concepts to non-technical learners" = great for code reviews and team collaboration.
5. **AI/automation interest** — mention it carefully. Frame as "I use AI tools to increase productivity" not "I use AI to write code for me." Companies want efficient developers, not ones who outsource thinking.

---

## Anti-Patterns to Avoid

- **Don't say "pet project"** in professional contexts. Say "personal project" or just "project." "Pet project" downplays the work.
- **Don't list every technology you've touched.** List what you can discuss confidently in an interview.
- **Don't wait until everything is perfect.** Apply with what you have now and improve in parallel.
- **Don't do unpaid test tasks longer than 8 hours.** Respect your time. If a company asks for a week-long unpaid task, that's a red flag.
- **Don't badmouth self-education.** Never say "unfortunately I don't have a degree." Say nothing, or say "I chose a project-based learning path."
