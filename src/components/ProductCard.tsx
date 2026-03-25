import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {product.category}
          </span>
          <div className="flex items-center text-amber-400">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium text-stone-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-stone-900 mb-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 bg-stone-900 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-stone-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
