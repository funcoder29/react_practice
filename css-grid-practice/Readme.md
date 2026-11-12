# CSS Grid Cheat Sheet

CSS Grid is a **two-dimensional** layout system: it lets you control both rows and columns at the same time. Properties are split into two groups:

- [Grid container properties](#grid-container-properties) (set on the parent)
- [Grid item properties](#grid-item-properties) (set on the children)

All examples below assume this basic markup:

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

---

## Grid container properties

### `display: grid` and `display: inline-grid`

Turns an element into a grid container. Its direct children become grid items.

| Value         | Behavior                                                             |
| ------------- | -------------------------------------------------------------------- |
| `grid`        | The container is **block-level** and takes the full available width. |
| `inline-grid` | The container is **inline-level** and only as wide as its content.   |

```css
.container {
  display: grid; /* or inline-grid */
}
```

---

### `grid-template-columns`

Defines the **number of columns** and the **width** of each one.

```css
/* 3 columns: 100px, 200px and 300px wide */
grid-template-columns: 100px 200px 300px;

/* 3 columns, each 200px wide */
grid-template-columns: repeat(3, 200px);

/* 3 flexible columns, each at least 200px and sharing the leftover space equally */
grid-template-columns: repeat(3, minmax(200px, 1fr));

/* Fixed sidebar + flexible content */
grid-template-columns: 250px 1fr;
```

> `fr` is a _fraction_ of the available space. `1fr 2fr` gives the second column twice the width of the first.

---

### `grid-template-rows`

Sets the **height** of each row. It uses the same syntax as `grid-template-columns`.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px; /* row 1 = 100px, row 2 = 200px */
}
```

Rows that are not explicitly defined (for example a third row here) are created automatically and sized by their content, unless you set `grid-auto-rows`.

---

### `row-gap`, `column-gap`, `gap`

Sets the space **between** rows and columns (not around the outer edges).

| Property     | Sets                    |
| ------------ | ----------------------- |
| `row-gap`    | Space between rows      |
| `column-gap` | Space between columns   |
| `gap`        | Shorthand: `row column` |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 10px;

  /* same as: */
  gap: 20px 10px;

  /* one value applies to both: */
  gap: 20px;
}
```

---

### `justify-items` (horizontal alignment of items)

Aligns each item **horizontally inside its own grid cell**.

**Values:** `stretch` | `start` | `end` | `center`

| Value     | Behavior                                                              |
| --------- | --------------------------------------------------------------------- |
| `stretch` | **Default.** The item fills the whole width of its cell.              |
| `start`   | The item is aligned to the left and only takes up its content width.  |
| `end`     | The item is aligned to the right and only takes up its content width. |
| `center`  | The item is centered and only takes up its content width.             |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-items: center;
}
```

---

### `align-items` (vertical alignment of items)

Aligns each item **vertically inside its own grid cell**.

**Values:** `stretch` | `start` | `end` | `center` | `baseline`

| Value      | Behavior                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| `stretch`  | **Default.** The item fills the whole height of its cell.                |
| `start`    | The item is aligned to the top and only takes up its content height.     |
| `end`      | The item is aligned to the bottom and only takes up its content height.  |
| `center`   | The item is centered vertically and only takes up its content height.    |
| `baseline` | Items are aligned so the baselines of their text line up across the row. |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
  align-items: center;
}
```

---

### `place-items`

Shorthand for `align-items` and `justify-items`, in that order.

```css
.container {
  place-items: center; /* align-items: center; justify-items: center; */
  place-items: start end; /* align-items: start;  justify-items: end;    */
}
```

---

### `justify-content` (horizontal alignment and spacing of the columns)

While `justify-items` aligns items _within their cells_, `justify-content` positions the **whole grid** inside the container. It only has a visible effect when the grid is **narrower** than the container (for example, columns with fixed widths).

**Values:** `start` | `end` | `center` | `space-between` | `space-around` | `space-evenly`

#### Positioning the whole grid

| Value    | Behavior                                       |
| -------- | ---------------------------------------------- |
| `start`  | The grid is placed at the left edge (default). |
| `center` | The grid is centered horizontally.             |
| `end`    | The grid is placed at the right edge.          |

#### Controlling the spacing between columns

| Value           | Behavior                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| `space-between` | Space is added **only between** columns. The first and last columns touch the container edges.          |
| `space-around`  | Space is added around every column. The space at the **edges is half** the space between columns.       |
| `space-evenly`  | Space is **identical** everywhere: before the first column, between columns, and after the last column. |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  width: 600px;
  justify-content: space-between;
}
```

Visual idea for a 600px container with three 100px columns (300px of free space):

```text
space-between: |[1]      [2]      [3]|     gaps: 0 | 150 | 150 | 0
space-around:  | [1]    [2]    [3] |       gaps: 50 | 100 | 100 | 50
space-evenly:  |  [1]   [2]   [3]  |       gaps: 75 | 75 | 75 | 75
```

---

### `align-content` (vertical alignment and spacing of the rows)

The vertical counterpart of `justify-content`. It positions the **whole grid** inside the container and only has a visible effect when the grid is **shorter** than the container (for example, the container has a fixed `height`).

**Values:** `start` | `end` | `center` | `space-between` | `space-around` | `space-evenly`

#### Positioning the whole grid

| Value    | Behavior                                 |
| -------- | ---------------------------------------- |
| `start`  | The grid is placed at the top (default). |
| `center` | The grid is centered vertically.         |
| `end`    | The grid is placed at the bottom.        |

#### Controlling the spacing between rows

| Value           | Behavior                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `space-between` | Space is added **only between** rows. The first and last rows touch the container edges.       |
| `space-around`  | Space is added around every row. The space at the **edges is half** the space between rows.    |
| `space-evenly`  | Space is **identical** everywhere: before the first row, between rows, and after the last row. |

```css
.container {
  display: grid;
  grid-template-rows: repeat(2, 100px);
  height: 500px;
  align-content: space-evenly;
}
```

---

### `place-content`

Shorthand for `align-content` and `justify-content`, in that order: the **first** value is `align-content` and the **second** is `justify-content`.

```css
.container {
  place-content: center; /* both centered */
  place-content: end space-between; /* align-content: end; justify-content: space-between; */
}
```

---

### `grid-auto-flow`

Controls how items are automatically placed in the grid.

**Values:** `row` (default) | `column` | `dense`

| Value    | Behavior                                                                           |
| -------- | ---------------------------------------------------------------------------------- |
| `row`    | Items fill each row first, then move to the next row.                              |
| `column` | Items fill each column first (top to bottom), then move to the next column.        |
| `dense`  | Backfills earlier gaps with smaller items that fit (can be combined: `row dense`). |

```css
.container {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-auto-flow: column;
}
```

With 6 items and `column` flow, items 1 to 3 fill column 1, and items 4 to 6 fill column 2.

---

### `grid-template-areas`

Lets you name regions of the grid and lay items out visually. Each string is a row, and each word is a cell. Use `.` for an empty cell.

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

Rules: every row must have the same number of cells, and a named area must form a rectangle.

---

### `grid`

A shorthand that can set `grid-template-rows`, `grid-template-columns`, and `grid-template-areas` in one declaration.

```css
/* rows / columns */
.container {
  grid: 100px 200px / 1fr 2fr;
  /* grid-template-rows: 100px 200px; grid-template-columns: 1fr 2fr; */
}

/* with areas */
.container {
  grid:
    "header header" 80px
    "sidebar main" 1fr
    / 200px 1fr;
}
```

For readability, most people prefer writing the longhand properties.

---

## Grid item properties

These are set on the **children** of the grid container. Grid _lines_ are numbered starting at **1**, and a grid with 3 columns has 4 column lines.

```text
 line 1   line 2   line 3   line 4
   |  col 1  |  col 2  |  col 3  |
```

### `grid-column-start` and `grid-column-end`

The column lines where the item starts and ends.

### `grid-row-start` and `grid-row-end`

The row lines where the item starts and ends.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
}

.item-1 {
  grid-column-start: 1;
  grid-column-end: 3; /* spans columns 1 and 2 */
  grid-row-start: 1;
  grid-row-end: 3; /* spans rows 1 and 2 */
}
```

You can also use `span` to say how many tracks to cover, and `-1` to refer to the last line:

```css
.item-2 {
  grid-column-start: 2;
  grid-column-end: span 2;
} /* starts at line 2, covers 2 columns */
.item-3 {
  grid-column-start: 1;
  grid-column-end: -1;
} /* spans the full width */
```

---

### `grid-column` and `grid-row`

Shorthand for the start and end properties, written as `start / end`.

```css
.item-1 {
  grid-column: 1 / 3; /* grid-column-start: 1; grid-column-end: 3; */
  grid-row: 1 / 3; /* grid-row-start: 1;    grid-row-end: 3;    */
}

.item-2 {
  grid-column: span 2; /* covers 2 columns from its automatic position */
}
```

---

### `justify-self`

Aligns **one item** horizontally inside its cell. It overrides the container's `justify-items` for that item.

**Values:** `stretch` | `start` | `end` | `center`

```css
.item-1 {
  justify-self: end;
}
```

---

### `align-self`

Aligns **one item** vertically inside its cell. It overrides the container's `align-items` for that item.

**Values:** `stretch` | `start` | `end` | `center` | `baseline`

```css
.item-1 {
  align-self: center;
}
```

---

### `place-self`

Shorthand for `align-self` and `justify-self`, in that order.

```css
.item-1 {
  place-self: center; /* align-self: center; justify-self: center; */
  place-self: start end; /* align-self: start;  justify-self: end;    */
}
```

---

## Quick reference

| Goal                                     | Container property | Item property  |
| ---------------------------------------- | ------------------ | -------------- |
| Align items **inside cells**, horizontal | `justify-items`    | `justify-self` |
| Align items **inside cells**, vertical   | `align-items`      | `align-self`   |
| Both of the above                        | `place-items`      | `place-self`   |
| Position **the whole grid**, horizontal  | `justify-content`  | n/a            |
| Position **the whole grid**, vertical    | `align-content`    | n/a            |
| Both of the above                        | `place-content`    | n/a            |

## Full example: a responsive card grid

```html
<div class="cards">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
</div>
```

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  place-items: stretch;
}

.card {
  padding: 24px;
  background: #f4f4f8;
  border-radius: 8px;
}
```

The cards automatically wrap onto new rows as the screen gets narrower, and each card is at least 200px wide.
