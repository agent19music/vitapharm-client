import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import '../App.css';
import { ProductContext } from '../context/ProductContext';
import { Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
  const size = firstVariation ? firstVariation.size : null;

  return (
    <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md">
      <Link to={`/product/${product.id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={`${product.images[0]?.url}`} alt="product image" />
        {product.images.length > 1 && (
          <>
            <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={`${product.images[1]?.url}`} alt="product image" />
            <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
          </>
        )}
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
        <button onClick={() => addToCart(product.id)} className="hover:border-white/40 flex items-center justify-center border border-transparent vp-bo px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 hover:text-white font-futurabold hover:font-semibold ">
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
  const { filteredCategories, addToCart } = useContext(ProductContext);
  const [start, setStart] = useState({});
  const [loading, setLoading] = useState(true);

  const groupedByBrand = filteredCategories.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }
    acc[product.brand].push(product);
    return acc;
  }, {});

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setLoading(false);
    }
  }, [filteredCategories]);

  const scrollLeft = (brand) => {
    setStart((prevStart) => ({
      ...prevStart,
      [brand]: Math.max(0, (prevStart[brand] || 0) - 4),
    }));
  };

  const scrollRight = (brand) => {
    setStart((prevStart) => ({
      ...prevStart,
      [brand]: Math.min(
        groupedByBrand[brand].length - 4,
        (prevStart[brand] || 0) + 4
      ),
    }));
  };

  return (
    <>
      {loading ? (
          <div className="grid grid-cols-4 gap-4 mt-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`col-span-1 ${i % 4 === 0 ? 'ml-4' : ''}`}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : (
        <div className=''>
          <div className="flex flex-col justify-center min-w-screen items-center">
            <div className="flex flex-col w-full items-center justify-evenly p-9 transition-all duration-500 ease-in-out">
              {Object.keys(groupedByBrand).map((brand) => (
                <div key={brand} className="w-full mb-6">
                  <h4 className="text-xl font-futuramedbold font-semibold mb-4">{brand.toUpperCase()}</h4>
                  {groupedByBrand[brand].length > 4 && (
                    <div className='space-1 align-bottom self-end mr-24'>
                      <button
                        onClick={() => scrollLeft(brand)}
                        className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                      >
                        <ChevronLeft size={40} />
                      </button>
                      <button
                        onClick={() => scrollRight(brand)}
                        className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                      >
                        <ChevronRight size={40} />
                      </button>
                    </div>
                  )}
                  <div className="flex w-full items-center justify-evenly">
                    {groupedByBrand[brand].slice(start[brand] || 0, (start[brand] || 0) + 4).map((product, index) => (
                      <ProductCard key={index} product={product} addToCart={addToCart} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}  
export default Category;
