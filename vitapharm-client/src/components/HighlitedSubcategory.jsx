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
import ProductCard from './ProductCard';

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

const HighlitedSubCategory = () => {
  const { highlitedSubCategory, addToCart, navigateToSingleProductView } = useContext(ProductContext);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (highlitedSubCategory.length !== 0) {
      setLoading(false);
    }
  }, [highlitedSubCategory]);

 const scrollLeft = () => {
  setStart(Math.max(0, start - 4));
};

const scrollRight = () => {
  setStart(Math.min(highlitedSubCategory.length - 4, start + 4));
};




  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
    {  highlitedSubCategory.length > 0   &&   <span className="relative justify-start m-2 rounded-none bg-brown-custom p-2 text-center text-md font-futurabold text-white">SKINCARE</span>
      } 
    <div className="overflow-container ">
    <div className="flex flex-col justify-center min-w-screen items-center relative">
      <div className="absolute left-0 top-0 ml-2 mt-2">
     </div>
      {highlitedSubCategory.length > 4 && (
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
        className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start >= highlitedSubCategory.length - 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={start >= highlitedSubCategory.length - 4}
      >
        <ChevronRight size={40} />
      </button>

        </div>
      )}
      <div
        {...handlers}
        className="flex p-9 transition-all duration-500 ease-in-out w-full items-center justify-evenly overflow-x-hidden recently-added-desktop"
      >
        {loading
          ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          : highlitedSubCategory.length >1 && highlitedSubCategory.slice(start, start + 4).map((product, index) => (
              <ProductCard key={index} product={product} addToCart={addToCart} navigateToSingleProductView={navigateToSingleProductView} />
            ))}
      </div>

     <div {...handlers} className="flex p-9 transition-all duration-500 ease-in-out w-full items-center justify-evenly overflow-x-hidden recently-added-mobile">
  {loading 
    ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />) 
    : highlitedSubCategory.map((product, index) => (
        <ProductCard key={index} product={product} addToCart={addToCart} navigateToSingleProductView={navigateToSingleProductView} />
      )) 
  }
</div>

    </div>
  </div>
  </>
  
  );
};

export default HighlitedSubCategory ;
