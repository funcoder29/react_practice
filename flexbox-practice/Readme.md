# CSS Flexbox

## Introduction

**Flexbox** (the Flexible Box Layout Module) is a one-dimensional CSS layout model for arranging items in a row or a column. It makes it easy to align items, distribute space between them, and build layouts that adapt to different screen sizes without relying on floats or manual positioning.

Flexbox works with two kinds of elements:

- **Flex container**: the parent element with `display: flex` or `display: inline-flex`.
- **Flex items**: the direct children of the flex container.

### Main axis and cross axis

Flexbox layouts are built around two axes:

- The **main axis** is the direction in which items are laid out. It is set by `flex-direction`, and by default it runs horizontally (left to right).
- The **cross axis** is perpendicular to the main axis. By default it runs vertically (top to bottom).

Properties such as `justify-content` work along the **main axis**, while `align-items`, `align-self` and `align-content` work along the **cross axis**.

### Basic example

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
  border: 6px solid black;
}
```

## Table of Contents

- [Flex Container Properties](#flex-container-properties)
  - [display](#display)
  - [flex-direction](#flex-direction)
  - [flex-wrap](#flex-wrap)
  - [flex-flow](#flex-flow)
  - [gap, row-gap, column-gap](#gap-row-gap-column-gap)
  - [justify-content](#justify-content)
  - [align-items](#align-items)
  - [align-content](#align-content)
- [Flex Item Properties](#flex-item-properties)
  - [order](#order)
  - [flex-grow](#flex-grow)
  - [flex-shrink](#flex-shrink)
  - [flex-basis](#flex-basis)
  - [flex](#flex)
  - [align-self](#align-self)

---

# Flex Container Properties

These properties are applied to the **parent** element.

```css
.container {
  display: inline-flex;
  border: 6px solid rgb(0, 0, 0);
  flex-direction: row;
}
```

## display

Turns an element into a flex container and enables flexbox for its children.

| Value         | Behavior                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `flex`        | The container behaves like a **block-level** element: it takes the full available width and starts on a new line.       |
| `inline-flex` | The container behaves like an **inline-level** element: it only takes the width it needs and sits beside other content. |

```css
.container {
  display: flex; /* block-level flex container */
}

.container-inline {
  display: inline-flex; /* inline-level flex container */
}
```

## flex-direction

Sets the direction of the **main axis**, and therefore the direction in which items are placed.

| Value            | Description                               |
| ---------------- | ----------------------------------------- |
| `row`            | Items are placed left to right (default). |
| `row-reverse`    | Items are placed right to left.           |
| `column`         | Items are placed top to bottom.           |
| `column-reverse` | Items are placed bottom to top.           |

```css
.container {
  display: flex;
  flex-direction: column;
}
```

## flex-wrap

Controls whether items stay on a single line or wrap onto multiple lines when there isn't enough space.

| Value          | Description                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `nowrap`       | All items stay on one line (default). Items shrink where possible, and may overflow the container if they cannot shrink further. |
| `wrap`         | Items that don't fit move onto the next line below.                                                                              |
| `wrap-reverse` | Items wrap in the opposite direction, so overflowing items move to a new line **above** instead of below.                        |

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

### Wrapping in a column layout

If you give the container a fixed height, set `flex-direction: column` and `flex-wrap: wrap`, the items that fit within the height are stacked in the first column and the overflowing items start a new column.

```css
.container {
  display: flex;
  border: 6px solid rgb(0, 0, 0);
  flex-wrap: wrap;
  flex-direction: column;
  height: 400px;
}
```

## flex-flow

A shorthand for `flex-direction` and `flex-wrap`.

```css
.container {
  flex-flow: row wrap;
  /* same as:
     flex-direction: row;
     flex-wrap: wrap; */
}
```

## gap, row-gap, column-gap

Set the spacing between flex items without using margins.

| Property     | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `row-gap`    | Space between rows.                                                       |
| `column-gap` | Space between columns.                                                    |
| `gap`        | Shorthand: `gap: <row-gap> <column-gap>`. A single value applies to both. |

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 20px between rows and columns */
  /* gap: 10px 30px;    row gap 10px, column gap 30px */
}
```

## justify-content

Aligns items along the **main axis** and distributes any extra space.

| Value           | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `flex-start`    | Items are packed at the start (default).                                                 |
| `flex-end`      | Items are packed at the end.                                                             |
| `center`        | Items are centered.                                                                      |
| `space-between` | First item at the start, last at the end, equal space between the items.                 |
| `space-around`  | Equal space around each item, so the space at the edges is half the space between items. |
| `space-evenly`  | Equal space between items and at both edges.                                             |

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

## align-items

Aligns items **within each line** along the **cross axis**. It works for both single-line and multi-line containers.

| Value        | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `stretch`    | Items stretch to fill the line's height (default), if no height is set on them. |
| `flex-start` | Items align to the start of the cross axis.                                     |
| `flex-end`   | Items align to the end of the cross axis.                                       |
| `center`     | Items are centered on the cross axis.                                           |
| `baseline`   | Items align by the baseline of their text.                                      |

```css
.container {
  display: flex;
  height: 300px;
  align-items: center;
}
```

## align-content

Aligns the **lines themselves** as a group along the cross axis, and distributes extra space in the container.

> **Note:** `align-content` only has an effect when there are **multiple lines**. This requires `flex-wrap: wrap` (or `wrap-reverse`) and enough items to actually wrap. The container also needs extra cross-axis space, for example a fixed height.

| Value           | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `stretch`       | Lines stretch to share the extra space equally (default).            |
| `flex-start`    | Lines are packed at the start.                                       |
| `flex-end`      | Lines are packed at the end.                                         |
| `center`        | Lines are centered.                                                  |
| `space-between` | First line at the start, last at the end, equal space between lines. |
| `space-around`  | Equal space around each line.                                        |
| `space-evenly`  | Equal space between lines and at the edges.                          |

```css
.container {
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  align-content: space-between;
}
```

### align-items vs align-content

|                       | `align-items`          | `align-content`      |
| --------------------- | ---------------------- | -------------------- |
| Aligns                | Items inside each line | The lines as a group |
| Single-line container | Works                  | No effect            |
| Requires wrapping     | No                     | Yes                  |

---

# Flex Item Properties

These properties are applied to the **children** of the flex container.

## order

Controls the visual order of items. Items are sorted by `order` value, lowest first. The default is `0`, and negative values are allowed.

```css
.item-1 {
  order: 3;
}
.item-2 {
  order: 1;
}
.item-3 {
  order: 2;
}
/* Visual order: item-2, item-3, item-1 */
```

## flex-grow

Defines how much of the container's **available free space** an item should take, relative to the other items.

- Default: `0` (the item does not grow).
- If all items have `flex-grow: 1`, they share the free space equally.
- An item with `flex-grow: 2` gets twice as much of the free space as an item with `flex-grow: 1`.

```css
.item-1 {
  flex-grow: 1;
}
.item-2 {
  flex-grow: 2;
}
.item-3 {
  flex-grow: 1;
}
```

## flex-shrink

Defines how much an item shrinks, relative to the others, when the items are **larger than the container**.

- Default: `1` (the item can shrink).
- `flex-shrink: 0` prevents the item from shrinking.
- A higher value makes the item shrink more than its siblings.

```css
.item-1 {
  flex-shrink: 0;
} /* will not shrink */
.item-2 {
  flex-shrink: 2;
} /* shrinks twice as fast */
```

## flex-basis

Sets the **initial size** of an item along the main axis before free space is distributed. It acts like `width` in a row layout and `height` in a column layout.

- Default: `auto` (uses the item's `width` or `height`, or its content size).
- It takes any length value, such as `200px` or `30%`.

```css
.item {
  flex-basis: 200px;
}
```

## flex

A shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, in that order.

```css
.item {
  flex: 1 1 200px;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: 200px; */
}
```

Common shorthand values:

| Value        | Meaning                                                     |
| ------------ | ----------------------------------------------------------- |
| `flex: 1`    | `1 1 0%`: grow and shrink equally, starting from zero size. |
| `flex: auto` | `1 1 auto`: grow and shrink from the item's own size.       |
| `flex: none` | `0 0 auto`: fixed size, neither grows nor shrinks.          |

## align-self

Overrides the container's `align-items` value for a **single item** along the cross axis.

Values: `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch`.

```css
.container {
  display: flex;
  height: 300px;
  align-items: flex-start;
}

.item-2 {
  align-self: flex-end; /* only this item moves to the bottom */
}
```

---

## Quick Reference

| Applied to    | Properties                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **Container** | `display`, `flex-direction`, `flex-wrap`, `flex-flow`, `gap`, `justify-content`, `align-items`, `align-content` |
| **Items**     | `order`, `flex-grow`, `flex-shrink`, `flex-basis`, `flex`, `align-self`                                         |
