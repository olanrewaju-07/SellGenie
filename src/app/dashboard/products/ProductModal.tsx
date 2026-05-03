import { useState, useEffect, useRef } from "react";
import { X, ImageIcon, Upload } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  stock: number;
  details: string;
  image: string;
  active: boolean;
};

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
  productToEdit?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, productToEdit }: ProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setName(productToEdit.name);
        setPrice(productToEdit.price);
        setOriginalPrice(productToEdit.originalPrice || "");
        setStock(productToEdit.stock.toString());
        setDetails(productToEdit.details);
        setImage(productToEdit.image);
      } else {
        // Reset for new
        setName("");
        setPrice("");
        setOriginalPrice("");
        setStock("10");
        setDetails("");
        setImage("");
      }
    }
  }, [isOpen, productToEdit]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      originalPrice: originalPrice || undefined,
      stock: parseInt(stock) || 0,
      details,
      image,
      active: productToEdit ? productToEdit.active : true, // Preserve active status if editing
    };

    if (productToEdit) {
      onSave({ ...productData, id: productToEdit.id });
    } else {
      onSave(productData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-slate-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Red Floral Ankara Dress"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₦)</label>
              <input 
                required
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 14000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Compare at Price</label>
              <input 
                type="number" 
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stock Quantity</label>
              <input 
                required
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Details/Variants</label>
              <input 
                type="text" 
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. Sizes: S M L XL"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-500/20"
            >
              {productToEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
