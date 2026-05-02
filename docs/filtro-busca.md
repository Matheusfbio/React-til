# Filtro de Busca com State Lifting

## O que foi construído

Um campo de busca no `HomeHeader` que filtra os produtos exibidos no `ProductList` em tempo real.

---

## Conceitos aplicados

### 1. Filtro com `.filter()`

A forma mais simples de filtrar uma lista em React é derivar um novo array a partir do estado, sem precisar de um estado separado para os resultados:

```tsx
const filtered = products.filter((p) =>
  p.productName.toLowerCase().includes(search.toLowerCase())
);
```

O `.toLowerCase()` em ambos os lados garante que a busca ignore maiúsculas/minúsculas.

---

### 2. State Lifting (Elevação de Estado)

O `HomeHeader` e o `ProductList` são irmãos — um não acessa o estado do outro diretamente. A solução é **elevar o estado** para o pai comum, o `App.tsx`.

```
App.tsx         ← dono do estado `search`
├── HomeHeader  ← recebe `search` + `onSearch` (lê e atualiza)
└── ProductList ← recebe `search` (só lê)
```

```tsx
// App.tsx
const [search, setSearch] = useState("");
const handleSearch = useCallback((value: string) => setSearch(value), []);

<HomeHeader search={search} onSearch={handleSearch} />
<ProductList search={search} />
```

Regra: **o estado deve viver no ancestral comum mais próximo** de todos os componentes que precisam dele.

---

### 3. Separação de responsabilidades

O input foi extraído para um componente `ProductFilter` dedicado, deixando cada arquivo com uma única responsabilidade:

| Arquivo | Responsabilidade |
|---|---|
| `App.tsx` | Dono do estado `search` |
| `HomeHeader.tsx` | Layout do cabeçalho, renderiza o input |
| `ProductFilter.tsx` | Apenas o input controlado |
| `ProductList.tsx` | Busca os produtos e aplica o filtro |

---

### 4. `memo` + `useCallback`

Ao separar o input em um componente filho, surgiu a necessidade de evitar re-renders desnecessários.

**`memo`** faz o componente só re-renderizar se as props mudarem:

```tsx
const ProductFilter = memo(({ value, onChange }: Props) => (
  <input ... />
));
```

**`useCallback`** mantém a referência da função estável entre renders:

```tsx
const handleSearch = useCallback((value: string) => setSearch(value), []);
```

Sem `useCallback`, o `memo` seria inútil — a função seria recriada a cada render do `App`, fazendo o `ProductFilter` re-renderizar de qualquer forma.

**Quando usar `useCallback`:**
- Função passada como prop para filho com `memo`
- Função usada como dependência de `useEffect` ou `useMemo`
- Não usar para funções usadas apenas dentro do próprio componente

---

## Fluxo completo

```
usuário digita
     ↓
ProductFilter.onChange
     ↓
handleSearch (App.tsx)
     ↓
setSearch → re-render do App
     ↓
search desce como prop para ProductList
     ↓
.filter() gera novo array → lista atualizada
```
