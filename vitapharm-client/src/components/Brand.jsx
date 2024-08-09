import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import '../App.css';
import { ProductContext } from '../context/ProductContext';
import { Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'react-feather';
import ProductCard from './ProductCard';


const SkeletonCard = () => (
  <div className="skeleton-card group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border bg-zinc-100 shadow-md product-card">
    <Box className="relative mx-3 mt-3 flex h-64 overflow-hidden">
      <Skeleton height="100%" width="100%" />
    </Box>
    <div className="mt-4 px-5 pb-5">
      <Skeleton height="20px" my="2" />
      <Skeleton height="36px" mt="4" />
    </div>
  </div>
);

const Category = () => {
  const { filteredBrands, addToCart, navigateToSingleProductView } = useContext(ProductContext);
  const [start, setStart] = useState({}); 
  const [loading, setLoading] = useState(true);

  const groupedByCategory = filteredBrands.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    if (filteredBrands.length > 0) {
      setLoading(false);
    }
  }, [filteredBrands]);

  const scrollLeft = (category) => {
    setStart((prevStart) => ({
      ...prevStart,
      [category]: Math.max(0, (prevStart[category] || 0) - 4),
    }));
  };

  const scrollRight = (category) => {
    setStart((prevStart) => ({
      ...prevStart,
      [category]: Math.min(
        groupedByCategory[category].length - 4,
        (prevStart[category] || 0) + 4
      ),
    }));
  };

useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
      {loading ? (
        <div className="mx-auto">
        <div className="desktop-skeleton">
          <div className="grid grid-cols-4 gap-4 mt-20 justify-center ml-20  ">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`col-span-1 ${i % 4 === 0 ? 'ml-4' : ''}`}>
              <SkeletonCard />
            </div>
          ))}
        </div>
        </div>
       <div className="mobile-skeleton">
  <div className="grid grid-cols-2 gap-4 mt-20">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="col-span-1">
        <SkeletonCard />
      </div>
    ))}
  </div>
</div>

        </div>
      ) : (
      <div>
      <div className='mobile-scroll-products'>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 overflow-x-auto snap-x snap-mandatory">
  {Object.keys(groupedByCategory).map((category) => (
    <div key={category} className="mb-6">
      <h3 className="text-xl font-futuramedbold  mb-4 ml-4">
        {category.toUpperCase()}
      </h3>

      {/* flex-nowrap keeps product cards on the same line and enables scrollbar */}
      <div className="flex flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory"> 
        {groupedByCategory[category].map((product, index) => (
          <ProductCard key={index} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  ))}
</div>
</div>

  <div className='desktop-noscroll-products'>
        <div className="flex flex-col justify-center min-w-screen items-center">
          <div className="flex flex-col w-full items-center justify-evenly p-9 transition-all duration-500 ease-in-out">
            {Object.keys(groupedByCategory).map((category) => (
              <div key={category} className="w-full mb-6">
                <h4 className="text-xl font-futuramedbold font-semibold mb-4">{category.toUpperCase()}</h4>
                {groupedByCategory[category].length > 4 && (
                  <div className='space-1 align-bottom self-end mr-24'>
                    <button
                      onClick={() => scrollLeft(category)}
                      className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start[category] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={start[category] === 0}
                    >
                      <ChevronLeft size={40} />
                    </button>
                    <button
                      onClick={() => scrollRight(category)}
                      className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start[category] >= groupedByCategory[category].length - 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={start[category] >= groupedByCategory[category].length - 4}
                    >
                      <ChevronRight size={40} />
                    </button>
                  </div>
                )}
      
                <div className="flex w-full items-center justify-evenly">
                  {groupedByCategory[category].slice(start[category] || 0, (start[category] || 0) + 4).map((product, index) => (
                    <ProductCard key={index} product={product} addToCart={addToCart} navigateToSingleProductView={navigateToSingleProductView} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
</div>
      
      )}
    </>
  );
}

export default Category;
