# CSS Fundamentals

A concise, practical reference covering the core concepts of Cascading Style Sheets (CSS): how to add CSS to a page, selectors, text and font styling, the box model, the cascade, tables, display, positioning, and units.

## Table of Contents

1. [Ways to Add CSS](#1-ways-to-add-css)
2. [Types of Selectors](#2-types-of-selectors)
3. [Text and Font Styling](#3-text-and-font-styling)
4. [The CSS Box Model](#4-the-css-box-model)
5. [Cascading, Specificity and Inheritance](#5-cascading-specificity-and-inheritance)
6. [Table Styling](#6-table-styling)
7. [The `display` Property](#7-the-display-property)
8. [The `position` Property](#8-the-position-property)
9. [CSS Units](#9-css-units)

---

## 1. Ways to Add CSS

CSS can be applied to an HTML document in three ways.

| Method                  | Where it lives                           | Best for                                                       |
| ----------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| **Inline style**        | `style` attribute on an HTML element     | Quick, one-off tweaks to a single element                      |
| **Internal stylesheet** | `<style>` block inside the `<head>`      | Single-page projects or page-specific styles                   |
| **External stylesheet** | Separate `.css` file linked via `<link>` | Multi-page projects; recommended for maintainability and reuse |

```html
<!-- 1. Inline style -->
<p style="color: blue;">Hello</p>

<!-- 2. Internal stylesheet -->
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>

<!-- 3. External stylesheet -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

---

## 2. Types of Selectors

Selectors define which HTML elements a set of CSS rules applies to.

### 2.1 Element (Tag) Selector

Applies the same style to every instance of a given tag.

```css
h1 {
  color: blue;
}
```

### 2.2 Universal Selector

Applies a style to all elements on the page.

```css
* {
  color: aqua;
}
```

### 2.3 Class Selector

Used to apply different styles to the same tag or to create reusable custom styles. A class can be used on multiple elements. Prefix the class name with a dot (`.`).

```css
.success {
  color: green;
}

.error {
  color: red;
}
```

### 2.4 ID Selector

Targets one specific element. An `id` must be unique within a page. Prefix the id with a hash (`#`).

```css
#root {
  /* styles for the element with id="root" */
}
```

---

## 3. Text and Font Styling

### 3.1 Text Styles

```css
.orange {
  background-color: orange;
  text-align: center;
  letter-spacing: 4px;
  word-spacing: 5px;
}
```

| Property           | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `background-color` | Sets the background color                                       |
| `text-align`       | Aligns text horizontally (`left`, `center`, `right`, `justify`) |
| `letter-spacing`   | Adjusts the space between characters                            |
| `word-spacing`     | Adjusts the space between words                                 |

### 3.2 Font Styles

```css
.font-styles {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
  font-weight: bold;
  text-decoration: underline;
  font-size: 50px;
}
```

| Property          | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `font-family`     | Preferred typeface, with fallbacks listed in order       |
| `font-style`      | Normal, italic or oblique text                           |
| `font-weight`     | Thickness of the text (`normal`, `bold`, or `100`–`900`) |
| `text-decoration` | Underline, overline, line-through, or none               |
| `font-size`       | Size of the text                                         |

---

## 4. The CSS Box Model

In web design, every HTML element is treated as a rectangular box. The CSS Box Model is the standard that browsers use to calculate the size and spacing of these boxes.

The box model consists of four parts, from the inside out:

1. **Content** – the actual text, image or other media.
2. **Padding** – the space between the content and the border.
3. **Border** – the line that wraps around the padding and content.
4. **Margin** – the space outside the border, separating the element from its neighbors.

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

---

## 5. Cascading, Specificity and Inheritance

### 5.1 Cascading

When two rules have equal specificity, the one declared **last** in the stylesheet wins.

```css
h2 {
  color: red;
}

h2 {
  color: blue;
}
/* The heading text will be blue */
```

### 5.2 Specificity

Specificity determines which rule the browser applies when multiple rules with different selectors target the same element. From lowest to highest:

1. Element (tag) selector
2. Class selector
3. ID selector
4. Inline style

The `!important` flag overrides normal specificity. Use it sparingly, as it makes styles harder to maintain and debug.

```css
p {
  color: red !important;
}
```

### 5.3 Inheritance

When a style is applied to a parent element and the child has no style of its own for that property, the child inherits the value from the parent. Properties such as `color` and `font-family` are inherited by default, while others, such as `margin` and `border`, are not.

---

## 6. Table Styling

```css
th,
td {
  border: 1px solid gray; /* adds a border to header and data cells */
}

table {
  border-collapse: collapse; /* merges adjacent cell borders into a single line */
  width: 60%;
}

td {
  text-align: center;
  height: 50px;
  vertical-align: bottom;
}
```

---

## 7. The `display` Property

| Value    | Behavior                                                                 |
| -------- | ------------------------------------------------------------------------ |
| `inline` | Takes up only as much width as its content; does not start on a new line |
| `block`  | Takes up the full available width and starts on a new line               |
| `none`   | Removes the element from the layout entirely (it is not rendered)        |

---

## 8. The `position` Property

| Value      | Behavior                                                            |
| ---------- | ------------------------------------------------------------------- |
| `static`   | Default. Element follows the normal document flow                   |
| `relative` | Positioned relative to its normal position                          |
| `absolute` | Positioned relative to the nearest positioned ancestor              |
| `fixed`    | Positioned relative to the viewport; stays in place when scrolling  |
| `sticky`   | Toggles between `relative` and `fixed` depending on scroll position |

---

## 9. CSS Units

### Absolute units

- `px` – pixels
- `pc` – picas (1pc = 12pt)

### Relative units

- `em` – relative to the font size of the parent element
- `rem` – relative to the font size of the root (`html`) element
- `%` – relative to the parent element
- `vh` / `vw` – 1% of the viewport height / width

### Functions for calculations

- `calc()` – performs arithmetic, e.g. `width: calc(100% - 40px);`
- `min()` – uses the smallest of the given values
- `max()` – uses the largest of the given values

```css
.container {
  width: min(90%, 1200px);
  height: calc(100vh - 60px);
}
```
