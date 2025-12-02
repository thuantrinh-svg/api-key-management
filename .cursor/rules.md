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

---

## File Size & Complexity Rules

### 1. Component File Size Limits

* **Maximum Lines:** Components should not exceed **200 lines** of code
* **Rule:** If a component file approaches 200 lines, it must be refactored into smaller sub-components
* **Rationale:** Smaller files are easier to test, understand, maintain, and reuse

### 2. Component Refactoring Patterns

When a component is too large, follow these strategies:

#### Extract Sub-Components
* Break the UI into logical, reusable sub-components
* Each sub-component should have a **single responsibility**
* Example: Instead of `ApiKeyTable` with 150+ lines, extract:
  - `ApiKeyTableHeader` - Renders table header
  - `ApiKeyTableRow` - Renders single row with actions
  - `ApiKeyTableEmpty` - Renders empty state
  - `ApiKeyTable` - Orchestrates the above components

#### Extract Custom Hooks
* Extract complex state management and side effects into **custom hooks**
* Examples of extractable logic:
  - Data fetching with loading/error states → `useFetchData()`
  - Form handling (validation, submission) → `useForm()`
  - Modal/dialog state management → `useDialog()`
  - Clipboard operations → `useClipboard()`
  - Visibility toggle state → `useToggle()`

#### Extract Utility Functions
* Move business logic, calculations, and transformations to **`lib/` utilities**
* Examples:
  - Key masking logic → `lib/formatting.ts`
  - Data filtering and sorting → `lib/filters.ts`
  - API error handling → `lib/api.ts`
  - Validation rules → `lib/validators.ts`

### 3. Specific Refactoring Actions

#### Pages (e.g., `/dashboard/page.tsx`)
* Pages should be **thin orchestrators** - maximum 100 lines
* **DO:** Import components, manage top-level state, pass props down
* **DON'T:** Include large UI blocks, complex calculations, or multiple hooks
* **Pattern:**
  ```tsx
  // Page: Only orchestration
  export default function Page() {
    const data = useFetchData();
    return <Layout><Component data={data} /></Layout>;
  }
  ```

#### Large Dialog/Modal Components
* Extract form sections into separate components
* Use custom hooks for form state (`useDialog`, `useForm`)
* Example: `ApiKeyDialog` should extract label+input patterns into `FormField` component

#### Tables with Many Columns
* Create row component: `TableRow` receives data and handlers
* Create header component: `TableHeader` with column definitions
* Extract cell rendering logic into separate components
* Use array of column configs to avoid repetition

#### Pages with Multiple Panels
* Extract each panel/section into its own component file
* Use directory structure: `api-playground/` folder with:
  - `ApiPlayground.tsx` (main container)
  - `RequestPanel.tsx` (request configuration)
  - `ResponsePanel.tsx` (response display)
  - `CodeExample.tsx` (code generation)

### 4. Props Drilling Prevention

* **Rule:** Components should not pass more than **3-4 levels of props**
* **Solutions:**
  - Use Context API for deeply nested data
  - Extract into custom hooks instead of drilling
  - Use component composition patterns

### 5. Conditional Rendering

* **Rule:** Use **guard clauses** and early returns
* **Avoid:** Deep nesting with ternaries and `&&` operators
* **Pattern:**
  ```tsx
  // ✅ GOOD - Guard clauses
  if (isLoading) return <Skeleton />;
  if (isError) return <Error message={error} />;
  if (!data) return null;
  
  return <Content data={data} />;
  
  // ❌ BAD - Deep nesting
  return isLoading ? <Skeleton /> : isError ? <Error /> : !data ? null : <Content />;
  ```

### 6. TypeScript Best Practices in Components

* **Export Types:** Define and export prop interfaces at top of file
* **Example:**
  ```tsx
  export interface ApiKeyTableProps {
    apiKeys: ApiKey[];
    onCopy: (key: string, name: string) => void;
    onEdit: (apiKey: ApiKey) => void;
    onDelete: (id: string) => void;
  }
  
  export function ApiKeyTable({
    apiKeys,
    onCopy,
    onEdit,
    onDelete,
  }: ApiKeyTableProps) {
    // Component code
  }
  ```
* **Use `as const` for fixed values:**
  ```tsx
  const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
  ```

---

## Responsive Design Rules (Mobile-First)

### 1. Mobile-First Approach

* **Rule:** Design for mobile **first**, then scale up
* **Breakpoints:** Use Tailwind's default breakpoints
  - `sm` (640px) - Small phones
  - `md` (768px) - Tablets
  - `lg` (1024px) - Small desktops
  - `xl` (1280px) - Desktops

### 2. Layout Adjustments

#### Sidebar on Mobile
* **Hide on mobile:** Use `hidden lg:block` for sidebar
* **Use mobile nav:** Implement collapsible hamburger menu for `sm` and `md`
* **Avoid fixed positioning:** Use responsive fixed or relative positioning

#### Grid Layouts
* **Mobile:** Single column (grid-cols-1)
* **Tablet:** Two columns (md:grid-cols-2)
* **Desktop:** Two or more (lg:grid-cols-3)
* **Pattern:**
  ```tsx
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  ```

#### Spacing & Padding
* **Mobile:** Reduce padding (p-4 or p-6 on mobile)
* **Desktop:** Increase padding (lg:p-8)
* **Pattern:**
  ```tsx
  className="p-4 md:p-6 lg:p-8"
  ```

### 3. Table Responsiveness

* **Rule:** Tables don't work well on mobile
* **Solutions:**
  - **Card view on mobile:** Hide table, show card-based view (md:table shows, hide on sm)
  - **Horizontal scroll:** Use `overflow-x-auto` with `-m-4` to full-width scroll
  - **Column hiding:** Hide non-essential columns on mobile, show on desktop
  - **Example:**
    ```tsx
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Table content */}
      </table>
    </div>
    ```

### 4. Button & Interactive Elements

* **Min size:** Ensure clickable areas are at least **44px** (accessibility standard)
* **Mobile stacking:** Use `flex flex-col md:flex-row` for button groups
* **Pattern:**
  ```tsx
  className="flex flex-col gap-2 md:flex-row md:gap-4"
  ```

### 5. Typography on Mobile

* **Heading sizes:** Scale down on mobile
  - `text-2xl md:text-3xl lg:text-4xl`
* **Avoid overflow:** Use `truncate` or `line-clamp-*` for long text
* **Line length:** Aim for 40-60 characters on mobile, 70-80 on desktop

### 6. Forms on Mobile

* **Full width:** `w-full` on inputs/selects
* **Larger touch targets:** `py-3` instead of `py-2` for mobile
* **Label placement:** Stack labels above inputs
* **Error messages:** Display below field with `mt-1` spacing

### 7. Navigation on Mobile

* **Visible on desktop:** `lg:flex` or `lg:grid`
* **Hidden on mobile:** Use `hidden lg:block`
* **Mobile drawer/menu:** Implement collapsible menu with hamburger icon
* **Pattern:**
  ```tsx
  <nav className="hidden lg:flex">
    {/* Desktop nav */}
  </nav>
  <MobileMenu className="lg:hidden" />
  ```

---

## Code Organization - Feature-Based Structure

### Directory Structure Example

```
app/
├── dashboard/                    # Dashboard feature
│   ├── page.tsx                 # Main page (thin)
│   ├── components/
│   │   ├── DashboardHeader.tsx
│   │   ├── ApiKeySection.tsx
│   │   └── StatsCard.tsx
│   └── hooks/
│       └── useDashboardData.ts
├── api-playground/              # API Playground feature
│   ├── page.tsx                 # Main page (thin)
│   ├── components/
│   │   ├── RequestPanel.tsx
│   │   ├── ResponsePanel.tsx
│   │   ├── CodeExample.tsx
│   │   └── TabSwitcher.tsx
│   └── hooks/
│       ├── useApiExecution.ts
│       └── useCodeGeneration.ts
├── components/                  # Shared components (global)
│   ├── Sidebar.tsx
│   ├── AuthButton.tsx
│   ├── FormField.tsx
│   └── Dialog.tsx
├── lib/                         # Shared utilities
│   ├── api.ts
│   ├── formatting.ts
│   ├── validators.ts
│   └── supabase/
├── hooks/                       # Shared custom hooks
│   ├── useApiKeys.ts
│   ├── useClipboard.ts
│   └── useToggle.ts
└── layout.tsx
```

---

## Performance Optimization Rules

* **Memoization:** Use `React.memo()` for components that receive complex props and don't change often
* **useMemo:** Cache expensive calculations
* **useCallback:** Memoize event handlers passed to child components
* **Code Splitting:** Use dynamic imports for large components/pages
  ```tsx
  const HeavyComponent = dynamic(() => import('./HeavyComponent'), { loading: () => <Skeleton /> });
  ```
* **Lazy Loading Images:** Use `next/image` with `loading="lazy"`

## CRITICAL: DO NOT CREATE ANY DOCUMENT (.md) EXCEPT USER FORCE TO CREATE A SPECIFIC DOCUMENTATION FILE
