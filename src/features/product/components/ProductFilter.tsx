import { memo } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProductFilter = memo(({ value, onChange }: Props) => (
  <input
    type="text"
    placeholder="Buscar produto..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded px-3 py-2 w-full max-w-sm"
  />
));

export default ProductFilter;
