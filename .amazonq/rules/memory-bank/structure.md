# Project Structure

## Directory Layout

```
React-til/
├── src/
│   ├── features/
│   │   └── product/
│   │       ├── components/       # UI components (ProductList, ProductCard, ProductFilter)
│   │       ├── home/
│   │       │   └── components/   # HomeHeader (search + category controls)
│   │       ├── hooks/            # useProducts (fetch), useFilterProducts (filter logic)
│   │       ├── services/         # products.service.ts (API calls)
│   │       ├── types.ts          # Product interface
│   │       └── index.ts          # Barrel exports
│   ├── test/
│   │   └── setup.ts              # Vitest + jsdom global setup
│   ├── REST/
│   │   └── mutation.http         # HTTP client scratch file for API testing
│   ├── App.tsx                   # Root: state lifting for search + category
│   └── main.tsx                  # React DOM entry point
├── docs/                         # Study notes (filtro-busca.md, hooks-roadmap.md)
├── .amazonq/rules/memory-bank/   # AI context documentation
├── vite.config.ts                # Vite + Tailwind plugin + API proxy + path alias
├── eslint.config.js              # ESLint flat config with TS + React hooks rules
└── package.json
```

## Core Components & Relationships

```
App.tsx
 ├── state: search, selectedCategory
 ├── HomeHeader  ← receives search/category state + setters
 └── ProductList ← receives search + selectedCategory as props
      ├── useProducts() → fetches /api/products
      └── ProductCard   ← renders each filtered product
```

- State is lifted to App.tsx; filtering happens inside ProductList via inline logic
- useFilterProducts is a secondary hook (used for category-aware filtering experiments)
- ProductFilter is a memoized controlled input component

## Architectural Patterns

- Feature-based folder structure: all product-related code lives under `src/features/product/`
- Single Responsibility: components = UI, hooks = state/side-effects, services = API
- Barrel exports via `index.ts` for clean external imports
- State lifting: search and category state owned by App, passed down as props
- useCallback on handlers in App.tsx to prevent unnecessary re-renders
- memo on ProductFilter to avoid re-renders when unrelated state changes
