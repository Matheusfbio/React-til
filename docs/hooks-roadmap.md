# Roadmap prático de Hooks no React

Este projeto pode virar um laboratório para praticar hooks em problemas comuns de um dev pleno React: busca, filtro, loading, cache simples, formularios, performance e organizacao de estado.

## Ordem recomendada

### 1. `useState`

Use quando o componente precisa lembrar alguma informacao que muda com interacao do usuario.

Exemplos no projeto:

```tsx
const [search, setSearch] = useState("");
const [open, setOpen] = useState(false);
```

Quando usar:

- Campo controlado
- Abrir/fechar menu, modal ou dropdown
- Guardar filtros simples
- Guardar estado visual local

Exercicio:

- Adicionar um filtro de categoria no `HomeHeader`
- Guardar a categoria selecionada em estado no `App`
- Filtrar a lista por busca e categoria ao mesmo tempo

---

### 2. `useEffect`

Use para sincronizar o componente com algo externo ao React.

Exemplo no projeto:

```tsx
useEffect(() => {
  const fetchProduct = async () => {
    const response = await fetch("api/products");
    const data = await response.json();
    setProducts(data);
  };

  fetchProduct();
}, []);
```

Quando usar:

- Buscar dados em API
- Escutar eventos globais, como `resize` ou `keydown`
- Sincronizar com `localStorage`
- Criar e limpar subscriptions

Quando evitar:

- Calcular valores derivados de props ou estado
- Filtrar arrays simples
- Atualizar um estado que poderia ser calculado durante o render

Exercicio:

- Melhorar o `useProducts` para expor `error`
- Colocar `loading` como `true` enquanto a requisicao esta acontecendo
- Mostrar erro na tela quando o fetch falhar

---

### 3. `useMemo`

Use para memorizar um valor calculado quando o calculo e caro ou quando a referencia estavel ajuda outro hook/componente.

Exemplo possivel no `ProductList`:

```tsx
const filtered = useMemo(() => {
  return products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase()),
  );
}, [products, search]);
```

Quando usar:

- Filtros, ordenacoes ou transformacoes caras em listas grandes
- Objetos/arrays passados para componentes memoizados
- Valores usados como dependencia de outros hooks

Quando evitar:

- Calculos triviais
- Tentar corrigir renderizacao desnecessaria sem medir ou entender a causa

Exercicio:

- Extrair o filtro de produtos para `useMemo`
- Adicionar ordenacao por preco
- Garantir que a lista filtrada e ordenada seja derivada de `products`, `search` e `sort`

---

### 4. `useCallback`

Use para memorizar uma funcao quando a referencia dela importa.

Exemplo no projeto:

```tsx
const handleSearch = useCallback((value: string) => {
  setSearch(value);
}, []);
```

Quando usar:

- Funcao passada para componente filho com `memo`
- Funcao usada como dependencia de `useEffect`, `useMemo` ou outro hook customizado
- Callbacks em componentes pesados ou listas grandes

Quando evitar:

- Funcoes pequenas usadas apenas dentro do mesmo componente
- Usar por padrao em todo handler

Regra mental:

- `memo` cuida do componente
- `useCallback` cuida da referencia da funcao
- `useMemo` cuida da referencia ou custo de um valor

Exercicio:

- Manter `ProductFilter` com `memo`
- Passar `onSearch` com `useCallback`
- Usar React DevTools Profiler para observar renders antes/depois

---

### 5. `useRef`

Use para guardar um valor mutavel que nao deve causar re-render, ou para acessar um elemento DOM.

Exemplo possivel:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

function focusSearch() {
  inputRef.current?.focus();
}
```

Quando usar:

- Focar input
- Guardar id de timeout/debounce
- Guardar valor anterior
- Integrar com libs que manipulam DOM

Quando evitar:

- Guardar dados que devem aparecer na tela
- Substituir `useState` para escapar de re-render

Exercicio:

- Criar um atalho `/` para focar o campo de busca
- Usar `useRef` para acessar o input
- Usar `useEffect` para registrar e limpar o evento de teclado

---

### 6. Hooks customizados

Use para extrair logica reutilizavel, nao apenas para mover codigo de lugar.

Exemplo atual:

```tsx
const { products, loading } = useProducts();
```

Um bom hook customizado normalmente:

- Tem uma responsabilidade clara
- Esconde detalhes de efeito, estado ou API
- Retorna uma API pequena e previsivel
- Pode ser testado isoladamente

Exercicios:

- Melhorar `useProducts` para retornar `{ products, loading, error, refetch }`
- Criar `useProductFilters(products, { search, category, sort })`
- Criar testes para os filtros sem depender de fetch

---

### 7. `useReducer`

Use quando o estado tem varias transicoes relacionadas.

Exemplo de problema:

```ts
type ProductFilterState = {
  search: string;
  category: string;
  sort: "name" | "price-asc" | "price-desc";
};
```

Quando usar:

- Formularios com muitos campos
- Filtros com varias acoes
- Estado com regras de transicao
- Quando varios `setState` comecam a ficar espalhados

Quando evitar:

- Estado simples, como abrir/fechar dropdown
- Um unico campo de input

Exercicio:

- Trocar `search`, `category` e `sort` por um reducer
- Criar acoes `setSearch`, `setCategory`, `setSort` e `clearFilters`
- Adicionar botao para limpar todos os filtros

---

## Problemas reais para praticar neste projeto

1. Busca com debounce
2. Filtro por categoria
3. Ordenacao por preco e nome
4. Estado de loading correto
5. Estado de erro na tela
6. Botao de tentar novamente
7. Hook customizado para filtros
8. Testes para hook de API e hook de filtro
9. Persistir filtros no `localStorage`
10. Atalho de teclado para focar busca

## Sequencia de estudo sugerida

1. Revisar `useState` e state lifting com busca e categoria
2. Melhorar `useEffect` no `useProducts`
3. Criar `useMemo` para lista filtrada
4. Usar `useCallback` somente onde a referencia importa
5. Praticar `useRef` com foco no input e debounce
6. Extrair regras para hooks customizados
7. Refatorar filtros complexos para `useReducer`

## Regra de ouro

Antes de usar um hook, pergunte:

- Isso e estado, efeito colateral, valor derivado, referencia mutavel ou transicao complexa?

Resposta:

- Estado que muda a tela: `useState`
- Sincronizacao com algo externo: `useEffect`
- Valor derivado/caro: `useMemo`
- Funcao com referencia importante: `useCallback`
- Valor mutavel sem render: `useRef`
- Muitas transicoes de estado: `useReducer`
- Logica reutilizavel: hook customizado
