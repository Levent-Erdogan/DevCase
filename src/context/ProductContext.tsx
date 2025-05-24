'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  productCode: string;
  barcode: string;
  stock: number;
  status: boolean;
  category: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  setCurrentPage: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://devcase.isiksoftyazilim.com/api/products?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data && data.data) {
          setProducts(data.data);
          setTotalPages(data.totalPages || 1);
          setTotalItems(data.totalItems || 0);
        } else {
          setProducts([]);
          setTotalPages(1);
          setTotalItems(0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Veri alınamadı');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      currentPage, 
      totalPages, 
      totalItems,
      setCurrentPage 
    }}>
      {children}
    </ProductContext.Provider>
  );
}; 