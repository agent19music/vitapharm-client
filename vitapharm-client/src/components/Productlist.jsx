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
  const size = firstVariation ? firstVariation.size : null;

  return (
    <div className="group relative border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md">
      <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={`${product.images[0]?.url}`} alt="product image" />
        {product.images.length > 1 && (
          <>
            <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={`${product.images[1]?.url}`} alt="product image" />
            <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
          </>
        )}
        <div className="absolute -right-16 bottom-0 space-y-2 transition-all duration-300 group-hover:right-0">
          <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={()=>addToCart(product.id)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom ">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-futurabold tracking-tight text-black">{product.name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-futura font-bold text-black">Ksh {price !== null ? price : "N/A"}</span>
            <span className="text-1.5xl font-futura font-bold text-black ml-3" style={{ lineHeight: '0.5' }}>{size !== null ? size.toUpperCase() : "N/A"}</span>
          </p>
        </div>
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
