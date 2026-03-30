# React TIL — Products

Aplicação frontend para listagem de produtos, construída com React 19, TypeScript e Vite.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — bundler e dev server
- **Tailwind CSS 4** — estilização
- **pnpm** — gerenciador de pacotes

## Estrutura de pastas

```
src/
├── features/
│   └── product/
│       ├── components/     # ProductList, ProductCard
│       ├── hooks/          # useProducts (lógica de estado)
│       ├── services/       # chamadas de API
│       ├── types.ts        # interface Product
│       └── index.ts        # barrel export
├── App.tsx
└── main.tsx
```

A arquitetura segue os princípios SOLID por feature, onde cada camada tem uma única responsabilidade — componentes cuidam da UI, hooks gerenciam estado, e services isolam as chamadas de API.

## Como rodar

```bash
pnpm install
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Proxy de API

O Vite está configurado para fazer proxy de `/api` para o backend em `http://localhost:8082`, evitando problemas de CORS em desenvolvimento.

## Alias de importação

O alias `@` aponta para `src/`, permitindo imports absolutos:

```ts
import { ProductList } from '@/features/product'
```
