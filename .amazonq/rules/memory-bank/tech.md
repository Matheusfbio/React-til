# Tech Stack

## Languages & Runtimes
- TypeScript ~5.9.3 — strict mode, ES2023 target, verbatimModuleSyntax
- TSX/JSX via react-jsx transform (no React import needed in components)

## Core Dependencies
| Package | Version | Role |
|---|---|---|
| react + react-dom | ^19.2.4 | UI framework |
| tailwindcss | ^4.2.2 | Utility-first CSS (Vite plugin, no config file) |
| lucide-react | ^1.8.0 | Icon library |

## Dev / Build
| Package | Version | Role |
|---|---|---|
| vite | ^8.0.1 | Dev server + bundler |
| @vitejs/plugin-react | ^6.0.1 | React Fast Refresh |
| @tailwindcss/vite | ^4.2.2 | Tailwind as Vite plugin |
| typescript-eslint | ^8.57.0 | ESLint flat config for TS |
| vitest | ^4.1.2 | Unit test runner |
| @testing-library/react | ^16.3.2 | Component testing utilities |
| jsdom | ^29.0.1 | DOM environment for tests |

## Package Manager
- pnpm (lockfile: pnpm-lock.yaml)

## Development Commands
```bash
pnpm dev        # Start dev server at http://localhost:5173
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm test       # vitest (watch mode)
pnpm preview    # Preview production build
```

## Key Configuration

### Path Alias
`@` → `src/` (configured in both vite.config.ts and tsconfig.app.json)
```ts
import { ProductList } from '@/features/product'
```

### API Proxy (vite.config.ts)
`/api/*` → `http://localhost:8082/*` (strips `/api` prefix, changeOrigin: true)

### TypeScript Strict Flags
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`
- `verbatimModuleSyntax` — requires `import type` for type-only imports
- `erasableSyntaxOnly` — disallows runtime-erased TS syntax

### Test Setup
- Environment: jsdom
- Setup file: `src/test/setup.ts`
- Globals: true (no explicit `import { describe, it }` needed)
- Coverage: @vitest/coverage-v8
