import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import '../App.css';
import { ProductContext } from '../context/ProductContext';
import { Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'react-feather';


const ProductCard = ({ product, addToCart }) => {
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
 const size = firstVariation ? firstVariation.size : null;


  return (
   <div className="product-card group relative border-zinc-100/30  lg:w-72  flex flex-col self-center overflow-hidden border shadow-md lg:max-h-96 sm:ml-10">
      <Link to={`/products/${product.id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
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
  const { filteredBrands, addToCart } = useContext(ProductContext);
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

  return (
    <>
      {loading ? (
          <div className="grid grid-cols-4 gap-4 mt-20 ">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`col-span-1 ${i % 4 === 0 ? 'ml-4' : ''}`}>
              <SkeletonCard />
            </div>
          ))}
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
                    <ProductCard key={index} product={product} addToCart={addToCart} />
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
