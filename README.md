# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

**Deployment & Demo Instructions (Netlify)**

This project is a frontend demo of an E-Waste Management Portal. It uses frontend-only demo credentials and auto-selection by hostname for showcasing multiple college demos on separate Netlify sites.

Quick steps to deploy on Netlify:

1. Build the site locally to verify:

```bash
npm install
npm run build
```

2. Create a new site on Netlify and connect the repository, or drag-and-drop the `dist/` folder from the project root.

3. For multi-college demos, create distinct Netlify sites or subdomains whose hostnames include one of the tokens below (the app checks the hostname and auto-selects the mapped college):

- `ropar` -> COL-001 (IIT Ropar)
- `mandi` -> COL-002 (IIT Mandi)
- `kurukshetra` -> COL-003 (NIT Kurukshetra)
- `jalandhar` -> COL-004 (NIT Jalandhar)
- `hamirpur` -> COL-005 (NIT Hamirpur)
- `thapar` -> COL-006 (Thapar)
- `una` -> COL-007 (IIIT Una)
- `chandigarh` -> COL-008 (Chandigarh University)
- `lovely` -> COL-009 (LPU)
- `chitkara` -> COL-010 (Chitkara)

Example: a Netlify site named `epr-ropar-demo` results in `epr-ropar-demo.netlify.app` — the app sees `ropar` in the hostname and opens the IIT Ropar demo.

Demo credentials (frontend-only)

User IDs and passwords for each college (demo; stored in source code):

- COL-001 (IIT Ropar): `ropar_admin` / `epr-ropar-2026`
- COL-002 (IIT Mandi): `mandi_admin` / `epr-mandi-2026`
- COL-003 (NIT Kurukshetra): `kurukshetra_admin` / `epr-kkr-2026`
- COL-004 (NIT Jalandhar): `jalandhar_admin` / `epr-jal-2026`
- COL-005 (NIT Hamirpur): `hamirpur_admin` / `epr-hamirpur-2026`
- COL-006 (Thapar): `thapar_admin` / `epr-thapar-2026`
- COL-007 (IIIT Una): `una_admin` / `epr-una-2026`
- COL-008 (Chandigarh University): `chandigarh_admin` / `epr-chd-2026`
- COL-009 (LPU): `lpu_admin` / `epr-lpu-2026`
- COL-010 (Chitkara): `chitkara_admin` / `epr-chitkara-2026`

Security: these are hard-coded frontend demo credentials. For any real deployment you MUST replace authentication with a secure backend, HTTPS, and hashed passwords.

If you want, I can:
- Add per-site logos and banners based on college selection.
- Add a small admin UI to update demo credentials (in-memory only).
- Produce a step-by-step Netlify guide with screenshots.


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
