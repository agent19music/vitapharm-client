import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
  const size = firstVariation ? firstVariation.size : null;

  return (
    <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md relative">
      <Link to={`/product/${product.id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
        <img className="absolute top-0 right-0 h-full w-full object-cover transition-transform duration-500 group-hover:translate-x-full" src={`${product.images[0]?.url}`} alt="product image" />
        {product.images.length > 1 && (
          <img className="absolute top-0 right-0 h-full w-full object-cover transition-transform duration-500 group-hover:translate-x-0" src={`${product.images[1]?.url}`} alt="product image" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex flex-col items-center space-y-3 transition-transform duration-500 group-hover:translate-y-0">
            <button onClick={() => addToCart(product.id)} className="bg-white text-black py-2 px-4 rounded">
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="bg-white text-black p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553 4.553a8.5 8.5 0 11-1.414-1.414L19 9m-6 6a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
              </svg>
            </Link>
          </div>
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-futurabold tracking-tight text-black">{product.name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-futura font-bold text-black">Ksh {price !== null ? price : "N/A"}</span>
            <span className="text-1.5xl font-futura font-bold text-black ml-3" style={{lineHeight: '0.5'}}>{size !== null ? size.toUpperCase() : "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
