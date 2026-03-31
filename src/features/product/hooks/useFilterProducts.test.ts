import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useProducts from "./useProducts";

const mockProducts = [
  {
    id: 1,
    productName: "Notebook",
    category: "tech",
    price: 3000,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    productName: "Mouse",
    category: "tech",
    price: 150,
    createdAt: "2024-01-02",
  },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

// --- Unitário ---

describe("useProducts — unitário", () => {
  it("inicia com products vazio e loading false", () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => [],
    } as Response);

    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("popula products após fetch bem-sucedido", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => mockProducts,
    } as Response);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
    });
  });

  it("mantém products vazio em caso de erro", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual([]);
    });
  });
});

// --- Integração ---

describe("useProducts — integração", () => {
  it("chama a URL correta", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => mockProducts,
    } as Response);

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith("api/products");
    });
  });

  it("loading é false após o fetch finalizar", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => mockProducts,
    } as Response);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
