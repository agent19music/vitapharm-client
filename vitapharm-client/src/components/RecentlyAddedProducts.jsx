import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import { ProductContext } from '../context/ProductContext';
import { useSwipeable } from 'react-swipeable';
import { Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';
import { Search, ShoppingBag } from 'react-feather';


const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
  const size = firstVariation ? firstVariation.size : null;
  const dealPrice = product.deal_price

 

  return (
   <div className="group relative border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md lg:max-h-96">
    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
      <img className="peer absolute top-0 right-0 h-full w-full object-cover"  src={`${product.images[0]?.url}`} alt="product image" />
      {product.images.length > 1 && (
        <>
          <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"  src={`${product.images[1]?.url}`} alt="product image" />
          <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>

        </>
      )}
      <div className="absolute -right-16 bottom-0 space-y-2 transition-all duration-300 group-hover:right-0">
      <Link to={`/products/${product.id}`} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
      <Search className="h-5 w-5" color="currentColor" />
    </Link>
    <Link onClick={()=>addToCart(product.id)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
      <ShoppingBag className=" h-5 w-5" color="currentColor" />
    </Link>
      </div>
    </div>
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
  <div className="skeleton-card group border-zinc-100/30 flex flex-col self-center overflow-hidden border bg-zinc-100 shadow-md">
    <Box className="relative mx-3 mt-3 flex h-80 overflow-hidden">
      <Skeleton height="100%" width="100%" />
    </Box>
    <div className="mt-4 px-5 pb-5">
      <Skeleton height="20px" my="2" />
      <Skeleton height="36px" mt="4" />
    </div>
  </div>
);

const RecentlyAddedProducts = () => {
  const { recentlyAddedProducts, addToCart } = useContext(ProductContext);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);

console.log(recentlyAddedProducts)
  useEffect(() => {
    if (recentlyAddedProducts.length !== 0) {
      setLoading(false);
    }
  }, [recentlyAddedProducts]);

 const scrollLeft = () => {
  setStart(Math.max(0, start - 4));
};

const scrollRight = () => {
  setStart(Math.min(recentlyAddedProducts.length - 4, start + 4));
};




  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="overflow-container ">
    <div className="flex flex-col justify-center min-w-screen items-center relative">
      <div className="absolute left-0 top-0 ml-2 mt-2">
{  recentlyAddedProducts.length > 0   &&   <span className="relative justify-start m-2 rounded-none bg-brown-custom px-2 text-center text-md font-futurabold text-white">NEW ARRIVALS</span>
      }      </div>
      {recentlyAddedProducts.length > 4 && (
        <div className="space-1 align-bottom self-end mr-24 buttons">
               <button
        onClick={scrollLeft}
        className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={start === 0}
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={scrollRight}
        className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start >= recentlyAddedProducts.length - 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={start >= recentlyAddedProducts.length - 4}
      >
        <ChevronRight size={40} />
      </button>

        </div>
      )}
      <div
        {...handlers}
        className="flex p-9 transition-all duration-500 ease-in-out w-full items-center justify-evenly overflow-x-hidden"
      >
        {loading
          ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          : recentlyAddedProducts.length >1 && recentlyAddedProducts.slice(start, start + 4).map((product, index) => (
              <ProductCard key={index} product={product} addToCart={addToCart} />
            ))}
      </div>
    </div>
  </div>
  
  );
};

export default RecentlyAddedProducts;
