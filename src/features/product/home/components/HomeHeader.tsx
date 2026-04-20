import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductFilter from "../../components/ProductFilter";

const categories = ["Eletrônicos", "Roupas", "Alimentos"];

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

export default function HomeHeader({ search, onSearch }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-row items-center gap-4">
      <p className="text-xl font-bold">React Til</p>
      <div className="flex flex-row gap-4 items-center">
        <p>Produtos</p>
        <div className="relative" onBlur={() => setOpen(false)} tabIndex={0}>
          <button
            className="flex items-center gap-1"
            onClick={() => setOpen((prev) => !prev)}
          >
            Categoria <ChevronDown size={16} />
          </button>
          {open && (
            <ul className="absolute top-full left-0 mt-1 bg-gray-700 rounded shadow-lg min-w-max">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center bg-gray-700 rounded px-2 gap-2 ml-auto">
        <Search size={16} className="text-gray-400" />
        <ProductFilter value={search} onChange={onSearch} />
      </div>
    </header>
  );
}
