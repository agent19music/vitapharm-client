import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'react-feather';
import { ProductContext } from '../context/ProductContext';



const ProductCard = ({ product, addToCart }) => {
  const {navigateToSingleProductView} = useContext(ProductContext)
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
  const size = firstVariation ? firstVariation.size : null;


  return (
    <div className="product-card group relative border-zinc-100/30  lg:w-72  flex flex-col self-center overflow-hidden border shadow-sm lg:max-h-96 sm:ml-10">
    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
      <img  onClick={()=> navigateToSingleProductView(product)} className="hover:cursor-pointer peer absolute top-0 right-0 h-full w-full object-cover"  src={`${product.images[0]?.url}`} alt="product image" />
      {product.images.length > 1 && (
        <>
          <img onClick={()=> navigateToSingleProductView(product)} className="hover:cursor-pointer peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"  src={`${product.images[1]?.url}`} alt="product image" />
          <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
        </>
      )}
      <div className="absolute -right-16 bottom-0 space-y-2 transition-all duration-300 group-hover:right-0">
      <div  onClick={()=> navigateToSingleProductView(product)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
      <Search className="h-5 w-5" color="currentColor" />
    </div>
    <Link onClick={()=>addToCart(product.id)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
      <ShoppingBag className=" h-5 w-5" color="currentColor" />
    </Link>
      </div>
    </div>
    <div className=" px-5 pb-5">
        <h5 className="text-xl font-futurabold tracking-tight text-black desktop-name-h5">{product.name}</h5>
        <h5 className="text-lg font-futurabold  text-black mobile-name-h5">{product.name}</h5>

      <div className="mt-2 flex items-center justify-between">
        <p>
          <span className="text-3xl font-futura text-black desktop-price-span">Ksh {price !== null ? price : "N/A"}</span>
          <span className="text-lg font-futura text-black mobile-price-span">Ksh {price !== null ? price : "N/A"}</span>

          <span className="text-xs font-futura text-black ml-2 mobile-size-span" >{size !== null ? size.toUpperCase() : "N/A"}</span>
          <span className="text-1.5xl font-futura text-black ml-3 desktop-size-span" >{size !== null ? size.toUpperCase() : "N/A"}</span>


        </p>
      </div>
    </div>
  </div>

  );
};

export default ProductCard;
