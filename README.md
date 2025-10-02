# Front-End Assignment – UI Components

This project contains two UI components built from scratch using **React, TypeScript, Tailwind CSS, and Storybook**:

1. **InputField** – A fully accessible input component with support for labels, helper text, error states, variants, sizes, clear button, and password toggle.  
2. **DataTable** – A generic, reusable table component with sorting, row selection, loading/empty states, and accessibility features.

---

## 🚀 Quick Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run Storybook (recommended for component review):
   ```bash
   npm run storybook
   ```
   Storybook will be available at [http://localhost:6006](http://localhost:6006).

3. Run the app with demo usage in `App.tsx` (optional):
   ```bash
   npm run dev
   ```
   App will be available at [http://localhost:3000](http://localhost:3000) or Vite default port.

---

## 🛠 Tech Stack & Decisions

- **React + TypeScript** → Strong typing and reusable, generic components (DataTable uses generics for flexibility).  
- **Tailwind CSS** → Utility-first styling, responsive out-of-the-box.  
- **Storybook** → Interactive playground for component states and variations.  
- **No external UI libraries** → All components coded fully from scratch as required.  
- **PostCSS** → Used internally by Tailwind for styling.  

---

## ♿ Accessibility Notes

- **InputField**
  - Uses `aria-invalid` and `aria-describedby` for validation feedback.  
  - Error messages announced with `role="alert"`.  

- **DataTable**
  - Column headers use `aria-sort` to reflect sorting state.  
  - Row selection checkboxes have descriptive `aria-label`s.  

- **General**
  - Semantic HTML elements: `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`.  
  - Fully keyboard-accessible.  

---

## 📱 Responsive Notes

- Input and table scale with Tailwind `sm|md|lg` classes.  
- Table is wrapped in `overflow-auto` for horizontal scrolling on smaller screens.  
- Components tested in both light/dark themes using Tailwind’s `dark:` variant.  

---

## 📦 Deployment

There are two ways to deploy your work:

### 1. Deploy Storybook (recommended)
Storybook gives reviewers an interactive component playground.

- Build Storybook:
  ```bash
  npm run build-storybook
  ```
  This creates a static site in the `storybook-static/` folder.  

- Deploy options:
  - **Vercel / Netlify** → Point to `storybook-static/` folder when deploying.  
  - **Chromatic (official Storybook hosting)**:
    ```bash
    npx chromatic --project-token=<your-token>
    ```

### 2. Deploy Full App (with App.tsx demo)
If you want to showcase the demo app as well:

- Build your app (Vite/CRA/Next.js):
  ```bash
  npm run build
  ```
- Deploy the generated `dist/` or `build/` folder to Vercel, Netlify, or GitHub Pages.  

---

## ✅ Submission Summary

- **Tech used:** React, TypeScript, Tailwind CSS, Storybook, Jest/RTL for tests.  
- **No external UI libraries or AI tools** used.  
- **Focus:** Clean, maintainable, and scalable code with accessibility in mind.  