# The Complete Frontend Interview Guide

**40 real frontend interview questions: HTML, CSS, JavaScript, browser internals and React, each with a clear, practical answer.**

## Contents

**40 questions · 5 parts**

1. [Part 1: HTML and Semantics](#part-1-html-and-semantics) (Q1–Q7)
2. [Part 2: CSS and Layout](#part-2-css-and-layout) (Q8–Q15)
3. [Part 3: JavaScript Fundamentals](#part-3-javascript-fundamentals) (Q16–Q25)
4. [Part 4: Browser, Performance and Responsive Design](#part-4-browser-performance-and-responsive-design) (Q26–Q32)
5. [Part 5: React and Modern Practices](#part-5-react-and-modern-practices) (Q33–Q40)
6. [Final tips for interview day](#final-tips-for-interview-day)

---

## Part 1: HTML and Semantics

_The structural questions that reveal whether you understand what each tag actually means, not just what it looks like._

### Q1. What's the difference between a `<div>` and a semantic element like `<section>`?

Both are generic block-level containers with no default styling difference — visually they render identically. The difference is meaning: semantic tags tell the browser, search engines, and screen readers what a region of the page actually _is_, which a `<div>` never does.

Use a semantic tag whenever the content has a real structural role (navigation, an article, a page footer). Reach for `<div>` only when you need a wrapper purely for styling or scripting, with no semantic meaning to convey.

> 💡 **Tip:** If you'd struggle to name the div ("what IS this region?"), that's usually a sign it should be a semantic tag instead.

---

### Q2. What do the `defer` and `async` attributes do on a `<script>` tag?

Both let the browser download the script without blocking HTML parsing, but they differ in when the script actually runs. `async` executes the script the instant it finishes downloading, which can interrupt parsing and means scripts may run out of order relative to each other.

`defer` waits until the HTML is fully parsed before running, and multiple deferred scripts always execute in the order they appear in the document. For most app scripts, `defer` is the safer default.

```html
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
```

---

### Q3. What's the difference between `localStorage`, `sessionStorage`, and cookies?

All three store data in the browser, but they differ in lifespan and where the data goes. `localStorage` persists indefinitely until explicitly cleared, with no expiry. `sessionStorage` is wiped the moment the browser tab closes.

Cookies are the odd one out: they're small (~4KB), have an optional expiry date, and — unlike the other two — are sent to the server with every matching HTTP request, which makes them the right (and sometimes only) choice for anything the server needs to read, like session tokens.

---

### Q4. Why does the `alt` attribute on `<img>` matter, and what happens without it?

It's the text description a screen reader announces in place of the image, and what displays if the image fails to load. Without it, a screen reader user gets no information about the image at all — it's simply skipped or read as a meaningless filename.

It also carries real SEO weight, since search engines can't "see" an image and rely on `alt` text to understand what it shows. A decorative image with no informational value should still get `alt=""` (empty, not omitted) so screen readers skip it cleanly.

---

### Q5. When should you use an `id` versus a `class` attribute?

An `id` must be unique on the page and is meant for one specific element — a page anchor, a JavaScript hook, or a form label target. A `class` is designed to be reused across many elements that share the same styling or behavior.

A common interview follow-up: using the same `id` twice is invalid HTML and will silently break any JavaScript using `getElementById`, since it only ever returns the first match.

---

### Q6. What does the viewport meta tag do, and why is it essential for responsive design?

Without it, mobile browsers render the page at a fake desktop width (usually 980px) and then zoom it out to fit the screen — producing tiny, unreadable text even on a perfectly responsive layout.

Setting `width=device-width` tells the browser to use the device's actual screen width as the layout viewport, and `initial-scale=1` sets the starting zoom level, which together let your CSS media queries behave the way you'd expect.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

### Q7. What's the difference between a block-level element and an inline element?

A block-level element (like `<div>` or `<p>`) always starts on a new line and takes up the full available width by default, and you can set its width/height directly.

An inline element (like `<span>` or `<a>`) flows within a line of text, only takes up as much width as its content needs, and ignores top/bottom margin and explicit width/height unless you change its `display` value.

---

## Part 2: CSS and Layout

_Box model, positioning, specificity and the two layout systems every interviewer expects you to know cold._

### Q8. Explain the CSS Box Model. What's the difference between `content-box` and `border-box`?

Every element is a rectangular box made of four layers, from the inside out: content, padding, border, and margin. By default (`content-box`), width and height apply only to the content — padding and border get added on top, making the element visually larger than the width you set.

`border-box` changes that: width and height now include padding and border, so the box stays exactly the size you specify. Most modern CSS resets set `box-sizing: border-box` globally because it's far more predictable to work with.

```
+----------------------------------------------+
| margin                                       |
|  +----------------------------------------+  |
|  | border                                 |  |
|  |  +----------------------------------+  |  |
|  |  | padding                          |  |  |
|  |  |  +----------------------------+  |  |  |
|  |  |  | content (width x height)   |  |  |  |
|  |  |  +----------------------------+  |  |  |
|  |  +----------------------------------+  |  |
|  +----------------------------------------+  |
+----------------------------------------------+
```

_`box-sizing: content-box` (default) adds padding + border ON TOP of width. `border-box` includes them INSIDE it._

---

### Q9. What's the difference between `relative`, `absolute`, `fixed`, and `sticky` positioning?

`relative` positions an element relative to its own normal position, without removing it from the document flow. `absolute` removes it from flow entirely and positions it relative to its nearest positioned ancestor (or the page, if there isn't one).

`fixed` positions relative to the browser viewport and stays put even when the page scrolls. `sticky` behaves like `relative` until a scroll threshold is crossed, then switches to behaving like `fixed` — the classic use case being a header that sticks once you scroll past it.

---

### Q10. How does CSS specificity work?

Specificity decides which rule wins when multiple selectors target the same element. It's calculated as a score across three tiers: inline styles beat everything, then ID selectors, then classes/attributes/pseudo-classes, then element selectors.

A higher tier always wins regardless of how many lower-tier selectors you stack — ten classes can never out-rank a single ID. When scores tie, the rule that appears later in the stylesheet wins. `!important` overrides normal specificity entirely and should be used sparingly.

```css
#nav {
} /* 1 ID       -> highest */
.menu.active {
} /* 2 classes  -> middle  */
nav {
} /* 1 element  -> lowest  */
```

---

### Q11. What's the difference between Flexbox and CSS Grid? When would you use each?

Flexbox lays items out along a single axis (a row or a column) and is ideal when content should determine the size of each item — a nav bar, a button group, a card's internal layout.

Grid lays items out across rows and columns simultaneously, which makes it the better choice for overall page layout or any component that's genuinely two-dimensional, like a dashboard or a photo gallery. In practice, most real UIs use both together.

|            | Flexbox                                                        | Grid                                                              |
| ---------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Dimensions | One (a row or a column)                                        | Two (rows and columns)                                            |
| Behavior   | Items flow in a row (or column), each sized by its own content | Items snap into an explicit row & column grid you define up front |

> **Rule of thumb:** Flexbox for a single row/column of items, Grid for laying out the whole page or a 2D component.

---

### Q12. What's the difference between a pseudo-class and a pseudo-element?

A pseudo-class (single colon, `:hover`, `:nth-child()`) targets an element in a particular _state_ or _position_ — it still refers to a real element that exists in the DOM.

A pseudo-element (double colon, `::before`, `::first-line`) targets a specific _part_ of an element, or creates content that doesn't exist in the DOM at all, like injecting decorative text before an element's content.

```css
a:hover {
  color: teal;
}
p::first-line {
  font-weight: bold;
}
```

---

### Q13. What's the practical difference between `em`, `rem`, `%`, and `px`?

`px` is an absolute, fixed unit that ignores any surrounding context. `em` is relative to the font size of the _current_ element, which means it compounds awkwardly when nested elements each set their own font size.

`rem` is relative to the root (`<html>`) font size only, so it stays predictable no matter how deeply it's nested — which is why most teams default to `rem` for spacing and font sizes. `%` is relative to the parent element's corresponding property, most commonly used for widths.

---

### Q14. What causes "specificity wars" in large CSS codebases, and how do you avoid them?

They happen when competing selectors keep escalating in specificity to override each other — IDs, nested selectors, and eventually `!important` stacked on `!important` — until no one can confidently predict which rule will actually apply.

The fix is mostly discipline: keep selectors flat and class-based rather than deeply nested, avoid ID selectors and `!important` in component styles, and adopt a naming convention (like BEM) or scoped styles (CSS Modules, CSS-in-JS) so class names never collide in the first place.

---

### Q15. What's the difference between `visibility: hidden`, `display: none`, and `opacity: 0`?

`display: none` removes the element from layout entirely — it takes up no space, and isn't rendered or announced by screen readers. `visibility: hidden` hides it visually but keeps its space in the layout; it also isn't read by most screen readers.

`opacity: 0` makes it fully transparent, but it still occupies space _and_ stays interactive — it can still be clicked and is still announced to screen readers, which makes it a common accidental-bug source when developers mean to truly hide something.

---

## Part 3: JavaScript Fundamentals

_The questions that come up in almost every frontend interview — scope, closures, async behavior, and the quirks in between._

### Q16. What's the difference between `var`, `let`, and `const`?

`var` is function-scoped (or global), gets hoisted and initialized as `undefined`, and can be redeclared — behavior that causes real bugs in loops and conditionals. `let` and `const` are block-scoped, meaning they only exist inside the `{ }` they were declared in.

`const` additionally prevents reassigning the variable itself — though if it holds an object or array, the _contents_ can still be mutated. Modern code defaults to `const`, switching to `let` only when a variable genuinely needs to be reassigned.

---

### Q17. What is "hoisting" in JavaScript?

JavaScript moves variable and function _declarations_ to the top of their scope before running any code — but it doesn't move the assignment with them. A `var` is hoisted and initialized as `undefined`, while `let` / `const` are hoisted but stay in an unusable "temporal dead zone" until their declaration line runs.

Function declarations (`function foo(){}`) are hoisted fully, body included, which is why you can call them before they appear in the file — unlike function expressions assigned to a variable.

```js
console.log(x); // undefined, not an error
var x = 5;

console.log(y); // ReferenceError
let y = 5;
```

---

### Q18. What's a closure? Can you give a practical example?

A closure is a function that "remembers" the variables from the scope it was created in, even after that outer function has finished running. This is what lets JavaScript create private state without classes.

It's also the classic mechanism behind things like counters, memoization, and the `useState`-style pattern — any time an inner function keeps referring back to a variable from its enclosing function.

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 — count persisted
```

---

### Q19. What's the difference between `==` and `===`?

`===` (strict equality) compares both value and type with no conversion — `1 === "1"` is `false`. `==` (loose equality) first coerces both sides to a matching type before comparing, which produces results many developers find surprising.

Interviewers often follow up with a gotcha like `[] == false` (true!) to check whether you understand JavaScript's coercion rules. The practical advice stands regardless: default to `===` unless you have a specific, deliberate reason to allow coercion.

---

### Q20. How does `this` behave differently in a regular function versus an arrow function?

In a regular function, `this` is determined by _how the function is called_ — as a method, it's the object before the dot; called plain, it's `undefined` in strict mode (or the global object otherwise). That makes it change depending on context, which trips people up inside callbacks.

An arrow function has no `this` of its own — it captures `this` lexically from the scope it was _defined_ in, permanently. That's exactly why arrow functions are the natural fit for callbacks inside a method, where you want `this` to still mean the outer object.

---

### Q21. What's the difference between event bubbling and event capturing?

When an event fires, it actually travels through the DOM twice: the capturing phase goes from the `document` down to the target element, then the bubbling phase goes back up from the target to the `document`. `addEventListener` listens on the bubbling phase by default.

Bubbling is what makes **event delegation** possible — attaching one listener to a parent and inspecting `event.target`, instead of attaching a separate listener to every child element.

```js
parent.addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    /* handle */
  }
});
```

---

### Q22. What's the difference between synchronous and asynchronous code, and what does a Promise actually represent?

Synchronous code runs top to bottom, each line blocking the next until it finishes. Asynchronous code lets a slow operation (a network request, a timer) run in the background without freezing the rest of the program while it waits.

A Promise is an object representing the eventual result of that background operation — it's always in one of three states: _pending_, _fulfilled_, or _rejected_. `async/await` is just syntax that makes working with promises read like synchronous code.

---

### Q23. What's the difference between `null` and `undefined`?

`undefined` means a variable has been declared but never assigned a value — it's JavaScript's own default. `null` is a value a developer assigns deliberately to represent "no value, on purpose."

A common follow-up: `typeof undefined` is `"undefined"`, but `typeof null` is `"object"` — a long-standing language quirk that's never been fixed, for backward-compatibility reasons.

---

### Q24. What is the Event Loop, and why does it matter for JavaScript's concurrency model?

JavaScript runs on a single thread, so it can't truly do two things at once — the Event Loop is the mechanism that makes it _feel_ concurrent anyway. The call stack runs code; slow operations get handed off to the browser's Web APIs; once they finish, their callback waits in a queue.

The event loop's one job is to check, over and over: is the call stack empty? If so, take the next callback from the queue and push it onto the stack. This explains why `setTimeout(fn, 0)` still doesn't run immediately — it has to wait for the current stack to fully clear first.

```
Call Stack ──(async call handed off)──▶ Web APIs (setTimeout, fetch, DOM events)
    ▲                                         │
    │                                         ▼
Event Loop ◀──────────── Callback / Microtask Queue
                         (.then() • async/await • setTimeout callback)
```

_Queued callbacks only run once the call stack is completely empty._

---

### Q25. What's the difference between `.map()`, `.forEach()`, and `.filter()`?

`.forEach()` runs a function on every item purely for a side effect (logging, pushing elsewhere) and always returns `undefined` — you can't chain off it. `.map()` also runs on every item, but builds and returns a brand-new array of the same length from whatever each call returns.

`.filter()` returns a new array containing only the items for which the callback returned `true` — its length is usually shorter than the original. All three leave the original array unchanged.

```js
[1, 2, 3].map((n) => n * 2); // [2,4,6]
[1, 2, 3].filter((n) => n > 1); // [2,3]
```

---

## Part 4: Browser, Performance and Responsive Design

_What happens under the hood between a URL and a painted page — and how to make that process faster._

### Q26. What happens when you type a URL into the browser and press Enter?

At a high level: the browser resolves the domain to an IP address via DNS, opens a TCP connection (plus a TLS handshake for HTTPS), and sends an HTTP request. The server responds with the HTML, which the browser starts parsing immediately.

While parsing, the browser discovers and fetches linked CSS and JavaScript, builds the DOM and CSSOM, combines them into a render tree, and finally paints pixels to the screen — a sequence usually called the Critical Rendering Path.

1. **DNS Lookup** — find the server's IP
2. **TCP + TLS** — open a secure connection
3. **Request HTML** — server sends the page
4. **Parse → DOM** — build the document tree
5. **CSSOM + Render** — apply styles, paint pixels

_This whole sequence is what interviewers mean by "what happens when you load a page"._

---

### Q27. What's the Critical Rendering Path, and why do interviewers ask about it?

It's the exact sequence of steps a browser takes to convert HTML, CSS, and JavaScript into pixels on screen: parse HTML into the DOM, parse CSS into the CSSOM, combine them into a render tree, compute each element's layout, then paint.

Interviewers ask because understanding it explains _why_ performance advice works — why render-blocking CSS in `<head>` delays first paint, and why a `<script>` without `defer` partway down the page halts HTML parsing until it finishes downloading and running.

---

### Q28. What's the difference between mobile-first and desktop-first responsive design?

Mobile-first means writing your base CSS for the smallest screen first, then using `min-width` media queries to progressively add complexity as the viewport grows. Desktop-first does the reverse: full layout first, then `max-width` queries strip things away for smaller screens.

Mobile-first is the more common modern default, partly because it forces you to prioritize content from the start, and partly because it tends to ship less CSS to mobile users, who are disproportionately on slower connections.

```css
/* mobile-first */
.card {
  display: block;
}
@media (min-width: 768px) {
  .card {
    display: flex;
  }
}
```

---

### Q29. What are some concrete techniques to improve a website's loading performance?

**Ship less:** compress and resize images, minify and tree-shake CSS/JS, and lazy-load anything below the fold (images, non-critical scripts). Reduce render-blocking resources by deferring non-essential JavaScript and inlining only truly critical CSS.

**Reduce round trips:** use a CDN so assets load from a server physically closer to the visitor, set proper cache headers so repeat visits skip the network entirely, and preconnect to third-party domains your page depends on.

---

### Q30. What's the difference between client-side rendering (CSR) and server-side rendering (SSR)?

In CSR, the server sends a mostly-empty HTML shell plus a JavaScript bundle; the browser downloads and runs that JS to build the actual page. First meaningful paint is slower, but once loaded, navigation within the app feels instant.

In SSR, the server renders full HTML for each request before sending it, so the browser can paint real content immediately — better for perceived speed and SEO — at the cost of more work per request on the server. Frameworks like Next.js let you mix both per-page.

---

### Q31. What's a CDN, and why does it improve performance?

A Content Delivery Network is a geographically distributed set of servers that cache and serve your static assets (images, CSS, JS, fonts) from whichever location is physically closest to the visitor, instead of every request traveling back to one origin server.

The main win is reduced latency — shorter physical distance means a faster round trip. Most CDNs also absorb traffic spikes and reduce load on your origin server, since cached assets never have to hit it at all.

---

### Q32. What's the difference between debouncing and throttling?

Both limit how often a function runs in response to a rapid-fire event (typing, scrolling, resizing), but they do it differently. Debouncing waits until the event stops firing for a set delay, then runs the function once — ideal for a search box that shouldn't fire a request on every keystroke.

Throttling runs the function at most once per fixed interval, no matter how continuously the event keeps firing — better for something like a scroll handler that needs to keep responding throughout the scroll, just not on every single pixel.

```js
// debounce: waits for a pause
// throttle: runs at a steady interval, no matter what
```

---

## Part 5: React and Modern Practices

_The framework-level questions most teams now expect, plus a few judgment calls interviewers like to probe._

### Q33. What's the Virtual DOM, and why does React use it?

It's a lightweight JavaScript object tree that mirrors the real DOM. When state changes, React builds a new virtual tree, diffs it against the previous one, and calculates the smallest possible set of real-DOM changes needed — then applies only those.

Direct, frequent real-DOM manipulation is comparatively slow, since the browser has to recalculate layout and repaint. Batching updates through a virtual diff first is what makes frequent UI updates in React feel fast.

```
State changes (setState() / useState())
      │
      ▼
New Virtual DOM (a lightweight JS object tree)
      │  diff
      ▼
Real DOM (only the changed nodes get updated)
```

_Direct real-DOM writes are slow — React batches changes and touches the page only where something actually changed._

---

### Q34. What's the difference between props and state in React?

Props are passed INTO a component from its parent — they're read-only from the receiving component's perspective, and the component should never modify them directly. State is data a component owns and manages internally, and changing it triggers a re-render.

A useful mental model: props are how a parent configures a child; state is a component's own memory of things that can change over time.

---

### Q35. What are React Hooks? Name a few common ones.

Hooks are functions that let function components use features — state, lifecycle behavior, context — that used to require a class component. They were introduced to make stateful logic reusable without the awkward patterns classes required.

`useState` holds local state; `useEffect` runs side effects (data fetching, subscriptions) after render; `useContext` reads a Context value; `useRef` holds a mutable value that doesn't trigger a re-render when it changes.

```js
const [count, setCount] = useState(0);
useEffect(() => {
  document.title = `${count}`;
}, [count]);
```

---

### Q36. What's the difference between a controlled and an uncontrolled component?

A controlled component has its value driven entirely by React state — the input's `value` comes from state, and every keystroke calls `onChange` to update that state, making React the single source of truth.

An uncontrolled component manages its own value internally, the way a plain HTML input does — you read its current value on demand via a `ref` instead of tracking every change in state. Controlled is the more common, more predictable default; uncontrolled can be simpler for very basic forms.

---

### Q37. What's the purpose of the `key` prop when rendering a list in React?

It gives React a stable identity for each item across re-renders, so it can tell which items were added, removed, or reordered instead of re-rendering the entire list from scratch. Without the right key, React falls back to matching by position, which can cause stale state or UI to attach to the wrong row.

The key must be unique among siblings and should come from the data itself (an ID), not the array index — using the index breaks as soon as the list is reordered or filtered.

```jsx
{
  items.map((item) => <Row key={item.id} data={item} />);
}
```

---

### Q38. What's the difference between a class component and a function component?

Class components manage state via `this.state` / `this.setState()` and hook into lifecycle methods like `componentDidMount`. Function components use Hooks (`useState`, `useEffect`) to achieve the same results with noticeably less boilerplate.

Function components with Hooks are now the standard for new code — they're easier to test, avoid the recurring confusion around `this` binding, and make it far easier to reuse stateful logic via custom hooks. Class components still exist in plenty of production codebases, so it's worth recognizing the pattern.

---

### Q39. What does "lifting state up" mean in React?

When two sibling components need to share or stay in sync with the same piece of state, that state is moved up to their closest common parent, which then passes it down to both as props. The parent becomes the single source of truth.

It's the standard answer to "how do siblings share state" before reaching for something heavier like Context or a state-management library — and a good interview answer shows you'd try this first rather than jumping straight to a library.

---

### Q40. How would you decide between CSS Modules, CSS-in-JS, and a framework like Bootstrap for a project?

It comes down to team size, how custom the design needs to be, and how much runtime cost is acceptable. Bootstrap (or Tailwind) ships the fastest for standard UI and keeps a team visually consistent with minimal CSS writing, at the cost of a more generic look unless you invest in overriding it.

CSS Modules give scoped, collision-free class names with zero runtime cost — a solid default for custom design systems. CSS-in-JS offers the most dynamic, component-colocated styling, but adds a runtime and bundle-size cost worth weighing against the project's actual needs.

---

## Final tips for interview day

You've covered all 40 questions. A few last tips:

- Don't just memorize these answers — be ready to explain _why_ each one is true. Interviewers probe follow-up questions far more than they ask for a definition.
- If you don't know an answer, say so and reason through it out loud. Interviewers consistently rate clear thinking under uncertainty above a lucky guess.
- Have one real project ready to walk through in depth — the decisions you made, and what you'd do differently now, come up in almost every interview.

---

## Continue learning with uicode

Subscribe to [@uicodebyk2](https://www.youtube.com/@uicodebyk2) on YouTube for mock interviews and deeper dives into these topics.
