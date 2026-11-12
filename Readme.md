Q1. What's the difference between a <div> and a semantic element like <section> ?
Ans : Both are generic block-level containers with no default styling difference — visually they render
identically. The difference is meaning: semantic tags tell the browser, search engines, and screen
readers what a region of the page actually i s, which a <div> never does.
Use a semantic tag whenever the content has a real structural role (navigation, an article, a page
footer). Reach for <div> only when you need a wrapper purely for styling or scripting, with no
semantic meaning to convey.

Q2.What do the defer and async attributes do on a <script> tag?
Ans:Both let the browser download the script without blocking HTML parsing, but they differ in when the script actually runs. async executes the script the instant it finishes downloading, which can interrupt parsing and means scripts may run out of order relative to each other.
defer waits until the HTML is fully parsed before running, and multiple deferred scripts always execute in the order they appear in the document. For most app scripts, defer is the safer default.

Q3. What's the difference between localStorage , sessionStorage , and cookies?
Ans: All three store data in the browser, but they differ in lifespan and where the data goes.
localStorage persists indefinitely until explicitly cleared, with no expiry. sessionStorage is wiped the moment the browser tab closes.
Cookies are the odd one out: they're small (~4KB), have an optional expiry date, and — unlike the other two — are sent to the server with every matching HTTP request, which makes them the right (and sometimes only) choice for anything the server needs to read, like session tokens.

Q4. Why does the alt attribute on <img> matter, and what happens without it?
Ans: It's the text description a screen reader announces in place of the image, and what displays if the
image fails to load. Without it, a screen reader user gets no information about the image at all — it's
simply skipped or read as a meaningless filename.
It also carries real SEO weight, since search engines can't "see" an image and rely on alt text to
understand what it shows. A decorative image with no informational value should still get alt=""
(empty, not omitted) so screen readers skip it cleanly.

Q5. When should you use an id versus a class attribute?
Ans: An id must be unique on the page and is meant for one specific element — a page anchor, a
JavaScript hook, or a form label target. A class is designed to be reused across many elements that
share the same styling or behavior.
A common interview follow-up: using the same id twice is invalid HTML and will silently break any
JavaScript using getElementById , since it only ever returns the first match

Q06 What does the viewport meta tag do, and why is it essential for responsive design?
