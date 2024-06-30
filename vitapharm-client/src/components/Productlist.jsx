import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import { ProductContext } from '../context/ProductContext';
import { useSwipeable } from 'react-swipeable';
import { Skeleton, SkeletonText, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../App.css';

const ProductCard = ({ product, addToCart }) => {
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;

  return (
    <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md product-card">
      <Link className="relative mx-3 mt-3 flex h-80 overflow-hidden">  
        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={`${product.images[0]?.url}`} alt="product image" />
        {product.images.length > 1 && (
    <>
<img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={`${product.images[1]?.url}`} alt="product image"  />
<svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
    </>
   )}
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black font-futurabold px-2 text-center text-sm font-medium text-white">15% OFF</span>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight font-futurabold text-black">{product.name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold font-futura text-black">{price !== null ? price : "N/A"}</span>
            {price !== null && (
              <span className="text-sm text-black  font-futura line-through">Ksh {(price * 1.75).toFixed(2)}</span>
            )}
          </p>
        </div>
        <button onClick={() => addToCart(product.id)} className="hover:border-white/40 font-futurabold flex items-center justify-center border border-transparent vp-bo px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 hover:text-white hover:font-semibold ">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border bg-zinc-100 shadow-md product-card">
    <Box className="relative mx-3 mt-3 flex h-80 overflow-hidden">
      <Skeleton height="100%" width="100%" />
    </Box>
    <div className="mt-4 px-5 pb-5">
      <Skeleton height="20px" my="2" />
      <Skeleton height="36px" mt="4" />
    </div>
  </div>
);

const ProductList = () => {
  const { products, addToCart } = useContext(ProductContext);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const scrollLeft = () => {
    setStart(Math.max(0, start - 1));
  };

  const scrollRight = () => {
    setStart(Math.min(products.length - 1, start + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className=''>
      <div className="flex flex-col justify-center min-w-screen items-center">
        <div className='space-1 align-bottom self-end mr-24 buttons'>
          <button
            onClick={scrollLeft}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={scrollRight}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
        <div {...handlers} className="flex p-9 transition-all duration-500 ease-in-out w-full items-center justify-evenly overflow-x-hidden">
          {loading
            ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
            : products.slice(start, start + 4).map((product, index) => (
                <ProductCard key={index} product={product} addToCart={addToCart} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
