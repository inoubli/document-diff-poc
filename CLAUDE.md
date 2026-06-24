# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200 (auto-reloads on change)
npm run build      # production build → dist/
npm run watch      # development build with watch mode
npm test           # run unit tests with Vitest
```

To run a single test file:

```bash
npx ng test --include="src/app/some.spec.ts"
```

## Architecture

Angular 22 standalone component application.

No NgModules.

All components use the `imports` array directly.

- Entry: `src/main.ts`
- Config: `src/app/app.config.ts`
- Routing: `src/app/app.routes.ts`
- Global styles: `src/styles.scss`
- Tests: Vitest + Angular TestBed

## Code Style

Prettier is configured.

TypeScript strictness is enabled:

- noImplicitOverride
- noImplicitReturns
- noFallthroughCasesInSwitch
- noPropertyAccessFromIndexSignature

---

# Documents Differences POC

## Project Goal

Build a Documents Differences Viewer.

The application compares two document versions and displays them side by side.

The backend is responsible for document parsing and diff generation.

The Angular frontend is responsible only for visualization and interaction.

This is a Proof Of Concept (POC).

The solution should remain simple, clean, maintainable, and production-oriented.

---

## Business Requirements

The user can:

- View the original document on the left.
- View the modified document on the right.
- See highlighted differences.
- See a sidebar listing all detected differences.
- Filter differences by status.
- Click a difference card and navigate directly to the corresponding location in both documents.
- See which difference is currently active.

Supported diff statuses:

- added
- deleted
- modified

Supported target types:

- text
- table-cell
- table-row
- image

---

## Architecture Overview

We are implementing a hybrid backend/frontend architecture.

### Backend Responsibilities

The backend:

- Parses DOCX/PDF files.
- Compares documents.
- Generates ready-to-render HTML.
- Injects stable technical identifiers into HTML.
- Generates diff metadata.
- Returns a JSON response.

### Frontend Responsibilities

The frontend:

- Renders backend HTML.
- Applies visual highlights.
- Displays diff cards.
- Filters visible differences.
- Navigates to differences.
- Manages active selection state.

### Important

The frontend must never:

- Recompute diffs.
- Parse documents.
- Tokenize text.
- Compare content.
- Generate selectors.

The frontend must trust the backend response.

---

## Backend API Contract

The frontend consumes the following response.

```ts
export interface DocumentDiffResponse {
  leftHtml: string;
  rightHtml: string;
  diffs: DiffItem[];
}

export interface DiffItem {
  id: string;
  status: 'added' | 'deleted' | 'modified';
  targetType: 'text' | 'table-cell' | 'table-row' | 'image';
  label: string;
  left: DiffTarget | null;
  right: DiffTarget | null;
}

export interface DiffTarget {
  nodeId: string;
  selector: string;
}
```

---

## Example Backend Response

```json
{
  "leftHtml": "<div class='doc-page'><p data-node-id='paragraph-1'>...</p></div>",
  "rightHtml": "<div class='doc-page'><p data-node-id='paragraph-1'>...</p></div>",
  "diffs": [
    {
      "id": "diff-paragraph-1",
      "status": "modified",
      "targetType": "text",
      "label": "Taux modifié",
      "left": {
        "nodeId": "paragraph-1",
        "selector": "[data-segment-id='p1-s2']"
      },
      "right": {
        "nodeId": "paragraph-1",
        "selector": "[data-segment-id='p1-s2']"
      }
    }
  ]
}
```

---

## HTML Contract

The backend HTML contains stable identifiers.

Examples:

```html
<p data-node-id="paragraph-1">
  Le taux annuel appliqué au contrat est de
  <span data-segment-id="p1-s2">
    3.20%
  </span>
</p>
```

```html
<tr data-row-id="table-1-r1">
```

```html
<td data-cell-id="table-1-r1-c2">
```

```html
<img data-image-id="image-1" />
```

The frontend must use selectors provided by the backend.

Example:

```ts
"[data-segment-id='p1-s2']"
```

The frontend must never generate selectors itself.

---

# Angular Rules

## Framework

Always use:

- Angular 22
- Standalone Components
- Signals
- computed()
- inject()
- Angular Material 3
- SCSS

Prefer modern Angular APIs.

Use:

```ts
inject(SomeService)
```

instead of constructor injection when appropriate.

Use:

```ts
signal()
computed()
effect()
```

for local component state.

---

## Templates

Use Angular control flow syntax.

Preferred:

```html
@if (...)
```

```html
@for (...)
```

```html
@switch (...)
```

Avoid legacy syntax unless required.

---

## State Management

Do not introduce:

- NgRx
- Akita
- NGXS
- ComponentStore

The application is small.

Use Signals only.

---

## RxJS

Avoid unnecessary RxJS.

Use RxJS only when needed for:

- HTTP
- async streams
- Angular integrations

Prefer Signals for local UI state.

---

## Dependency Injection

Prefer:

```ts
private readonly service = inject(Service);
```

instead of constructor injection.

---

## Styling

Use:

- SCSS
- CSS variables where useful
- Angular Material 3

Avoid:

- inline styles
- large global stylesheets
- complicated CSS architecture

Keep styles component-scoped whenever possible.

---

# Angular Material

Use Angular Material 3 components.

Preferred components:

- MatToolbar
- MatCard
- MatButton
- MatIcon
- MatDivider
- MatChips
- MatButtonToggle
- MatTooltip
- MatProgressSpinner

Keep the UI clean and professional.

Do not over-design the POC.

---

# Suggested Folder Structure

```text
src/app/features/document-diff/

├── models/
│   ├── document-diff.model.ts
│
├── data/
│   └── document-diff.mock.ts
│
├── services/
│   ├── document-diff.service.ts
│   └── document-highlight.service.ts
│
├── components/
│   ├── document-diff-page/
│   ├── document-html-viewer/
│   ├── diff-sidebar/
│   └── diff-card/
│
└── pages/
    └── document-diff-page/
```

Folder structure can evolve if needed.

Keep the architecture simple.

---

# Main Screen Layout

The application contains:

```text
+-------------------------------------------------------+
| Filters                                               |
+-------------------------------------------------------+
|                                                       |
| Left Viewer       | Right Viewer      | Diff Sidebar  |
|                   |                   |               |
|                   |                   |               |
|                   |                   |               |
|                   |                   |               |
|                   |                   |               |
+-------------------------------------------------------+
```
Filters will hold three buttons:

- added
- deleted
- modified

Left Viewer and Right Viewer must have a fixed height and vertical scroll.

Diff Sidebar will hold cards representing the list of diffs.
---

# Rendering Strategy

Document viewers receive:

- HTML content
- Diff metadata
- Active diff
- Enabled filters

The viewer:

1. Renders backend HTML.
2. Locates diff targets using backend selectors.
3. Applies highlight classes.
4. Applies active state.
5. Supports scrolling to a diff.

---

# Highlight Rules

Status colors:

## Added

Light green highlight.

## Deleted

Light pink highlight.

May use line-through when appropriate.

## Modified

Light orange highlight.

---

## Active Diff

The currently selected diff should be visually emphasized.

Example:

- outline
- stronger border
- elevated background

Keep styling simple.

---

# Sidebar Requirements

The sidebar displays all diffs.

Each diff card shows:

- label
- status
- target type

The filters section allows filtering by:

- added
- deleted
- modified

The active diff should be visually distinguishable.

Clicking a card selects the diff.

---

# Navigation Requirements

When a diff card is clicked:

1. Set active diff.
2. Scroll left viewer to matching target.
3. Scroll right viewer to matching target.
4. Use smooth scrolling.
5. Try to center the target vertically.

If one side does not exist (added/deleted), scroll only the existing side.

---

# Security

Backend HTML is considered trusted for the POC.

Create a dedicated HTML viewer component responsible for rendering backend HTML safely.

Keep all HTML rendering logic isolated in one place.

Do not spread DomSanitizer logic across multiple components.

---

# POC Development Phases

## Phase 1

Project setup.

Deliver:

- Angular Material setup
- Page layout
- Mock data integration

## Phase 2

Document rendering.

Deliver:

- Left viewer
- Right viewer
- HTML rendering

## Phase 3

Highlight system.

Deliver:

- Apply highlights
- Status colors
- Active diff

## Phase 4

Sidebar.

Deliver:

- Diff cards
- Filters

## Phase 5

Navigation.

Deliver:

- Scroll to diff
- Active selection synchronization

## Phase 6

Polish.

Deliver:

- Material styling
- Cleanup
- Refactoring
- Tests

---

# Development Strategy

Build incrementally.

After every major feature:

1. Build the application.
2. Fix compilation issues.
3. Verify behavior manually.
4. Commit small focused changes.

Do not generate large amounts of unused code.

Prefer small reusable components.

Prefer readability over abstraction.

Avoid over-engineering.

---

# Success Criteria

The POC is considered successful when:

- Both documents are displayed side by side.
- Backend HTML is rendered correctly.
- Diffs are highlighted.
- Diff cards are displayed.
- Filters work.
- Clicking a diff navigates to the corresponding location.
- Angular code remains simple, clean, and maintainable.
- The frontend does not perform any diff computation.