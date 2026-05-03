"use client";

import { useState } from "react";
import { Plus, LayoutGrid, List, ImageIcon } from "lucide-react";
import ProductModal, { Product } from "./ProductModal";

const initialProducts: Product[] = [
  { id: '1', name: 'Red Floral Ankara Dress', price: '14000', stock: 12, details: 'Stock: 12 · Sizes: S M L XL', image: 'https://images.unsplash.com/photo-1515347619362-75fe218ee5e2?w=500&auto=format&fit=crop&q=60', active: true },
  { id: '2', name: 'Skincare Bundle (7-piece)', price: '45000', originalPrice: '52000', stock: 5, details: 'Stock: 5 · Low stock ⚠️', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60', active: true },
  { id: '3', name: 'Premium Leather Handbag', price: '32000', stock: 8, details: 'Stock: 8 · Color: Black, Brown', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop&q=60', active: true },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Product | Omit<Product, 'id'>) => {
    if ('id' in productData) {
      // Edit
      setProducts(prev => prev.map(p => p.id === productData.id ? productData as Product : p));
    } else {
      // Add
      const newProduct: Product = {
        ...productData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsModalOpen(false);
  };

  const handleToggleDeactivate = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Number(amount));
  };

  const activeCount = products.filter(p => p.active).length;

  return (
    <div className="space-y-6">
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{activeCount} active products · AI knows all of them</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
            <button className="px-3 py-2 bg-slate-100 text-slate-700 border-r border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="px-3 py-2 text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700">
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-900 dark:border-slate-800 ${!product.active ? 'opacity-60 grayscale-[0.5]' : ''}`}>
            <div className="h-48 bg-slate-100 flex items-center justify-center dark:bg-slate-800/50 relative overflow-hidden">
              {!product.active && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded z-10 dark:bg-red-900/50 dark:text-red-400">
                  INACTIVE
                </div>
              )}
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-10 w-10 text-slate-300" />
              )}
            </div>
            <div className="p-5 flex flex-col h-[180px]">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1" title={product.name}>{product.name}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500">{formatCurrency(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</p>
                  )}
                </div>
                <p className={`text-xs mt-1 line-clamp-1 ${product.stock <= 5 ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>
                  {product.details || `Stock: ${product.stock}`}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="flex-1 py-1.5 px-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleDeactivate(product.id)}
                  className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-lg transition-colors border ${product.active ? 'text-red-600 bg-white border-red-200 hover:bg-red-50 dark:bg-slate-800 dark:border-red-900/50 dark:hover:bg-red-900/20' : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-400'}`}
                >
                  {product.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Product Card */}
        <button
          onClick={handleOpenAdd}
          className="flex flex-col items-center justify-center h-[372px] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-500 transition-colors dark:bg-slate-900/50 dark:border-slate-700 dark:hover:border-emerald-500 dark:hover:bg-slate-800/50 group"
        >
          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:bg-slate-800 dark:group-hover:bg-emerald-900/30 transition-colors">
            <Plus className="h-6 w-6 text-slate-400 group-hover:text-emerald-600" />
          </div>
          <span className="font-medium text-slate-500 group-hover:text-emerald-600 dark:text-slate-400">Add New Product</span>
        </button>
      </div>
    </div>
  );
}
