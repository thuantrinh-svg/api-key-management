## Clean Code & Design Patterns Rules

The core philosophy is to separate concerns and ensure components are easy to read, test, and reuse.

### 1. Component Modularity (Single Responsibility Principle - SRP)

* **Rule:** A component, function, or hook must do **one thing** and do it well.
* **Practice:** Strictly separate **Container/Smart** components (logic, state, data fetching) from **Presentational/Dumb** components (only receive props and render UI).
* **Avoid:** Components that couple complex business logic, global state management, and large UI structures together.

### 2. Design Patterns & Reusability

* **Custom Hooks:** Extract reusable, stateful logic (e.g., data fetching, form handling, side effects) into **custom hooks** (e.g., `useUserData`, `useFormValidation`).
    * *Rationale:* Keeps components clean and makes logic reusable and testable in isolation.
* **Composition over Inheritance:** Achieve code reuse by using **component composition** (passing children or props) rather than extending classes (if using class components).
* **HOCs (Higher-Order Components) / Render Props:** Use these patterns sparingly, preferring custom hooks for simpler logic sharing.

### 3. State Management

| State Type | Recommended Practice | Avoidance |
|------------|----------------------|-----------|
| **Local State**| Use `useState` or `useReducer`. | Over-using global state for component-specific data. |
| **Server State**| Use a dedicated library (e.g., React Query). | Storing asynchronous server data directly in global state (like Redux). |
| **Global State**| Use Context API or a library (e.g., Redux, Zustand). | Creating too many different global stores; tightly coupling UI to complex store logic. |

---

## Avoiding Bad Practices & Code Smells

These rules focus on maintaining quality, performance, and future-proofing the codebase.

### 1. Structure & Naming

* **DRY Principle:** **Do Not Repeat Yourself.** Extract duplicated code into utilities, helper functions, or custom hooks.
* **Descriptive Naming:** Use clear, unambiguous names:
    * Components should be Noun/Adjective (e.g., `UserProfile`, `PrimaryButton`).
    * Functions should be Verb phrases (e.g., `handleFormSubmit`, `calculateTotal`).
* **File Organization:** Organize files by **feature/domain** (e.g., `/auth/LoginForm.tsx`) rather than by type (e.g., `/components/LoginForm.tsx`).

### 2. TypeScript and Typing

* **Mandatory TypeScript:** All new code must be written in TypeScript.
* **No Implicit `any`:** **Strictly prohibit** the use of `any` without strong justification.
* **Interfaces/Types:** Define explicit **interfaces** or **types** for props, state, and complex function return values.

### 3. React Specific Bad Practices

* **Index as Key:** **Never** use the array index as the `key` prop when rendering lists unless the list is static and will never be reordered.
* **Unnecessary `useEffect`:** Avoid placing simple calculations or side effects that don't rely on the component lifecycle inside `useEffect`.
* **No Cleanup:** Ensure all effects that involve subscriptions, event listeners, or timers have a proper **cleanup function** to prevent memory leaks.

### 4. Code Quality & Performance

* **Guard Clauses:** Use **early returns/exits** (guard clauses) to handle error states or loading states first, reducing nesting and improving readability.
* **Immutability:** Always treat state updates as **immutable**. Never directly modify state objects or arrays; always create new copies.
* **Accessibility (A11y):** Prioritize **semantic HTML** and ensure all interactive elements include necessary `aria-*` attributes for screen readers.

---

## Documentation Policy

### CRITICAL: Do NOT Generate Documentation Unless Explicitly Requested

* **Rule:** **NEVER** proactively create documentation files (*.md, README, guides, etc.) unless the user explicitly asks for documentation.
* **Exceptions:** Only create documentation when the user specifically requests it with phrases like:
  * "Create documentation for..."
  * "Write a guide for..."
  * "Generate docs for..."
  * "Document this feature..."
* **What to Avoid:**
  * Do NOT create IMPLEMENTATION.md, UPDATES.md, CHANGELOG.md, or similar files automatically
  * Do NOT create setup guides, troubleshooting docs, or how-to guides unless asked
  * Do NOT create summary documents or feature lists after completing work
* **What IS Allowed:**
  * Code comments (inline documentation)
  * JSDoc/TSDoc for functions and components
  * Type definitions and interfaces
  * Updating existing documentation when explicitly told to do so
* **Rationale:** Keep the project clean and focused. Documentation should be intentional, not automatic.

### File Organization

* **Documentation Location:** All documentation files must be in the `docs/` folder
* **Database Scripts:** All SQL files must be in the `database/` folder
* **Root Files:** Only essential files in root (README.md, package.json, config files)