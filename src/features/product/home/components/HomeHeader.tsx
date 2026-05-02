import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductFilter from "../../components/ProductFilter";

interface Category {
  label: string;
  value: string;
}

interface Props {
  search: string;
  onSearch: (value: string) => void;
  selectedCategory: string;
  onCategory: (value: string) => void;
  categories: Category[];
}

export default function HomeHeader({
  search,
  onSearch,
  selectedCategory,
  onCategory,
  categories,
}: Props) {
  const [open, setOpen] = useState(false);
  const selectedCategoryLabel =
    categories.find((category) => category.value === selectedCategory)?.label ??
    "Categoria";

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
            {selectedCategoryLabel} <ChevronDown size={16} />
          </button>
          {open && (
            <ul className="absolute top-full left-0 mt-1 bg-gray-700 rounded shadow-lg min-w-max">
              {categories.map((category) => (
                <li
                  key={category.label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onCategory(category.value);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-600 cursor-pointer ${
                    selectedCategory === category.value ? "bg-gray-600" : ""
                  }`}
                >
                  {category.label}
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
