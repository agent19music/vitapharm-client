import React, { useState, useContext, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import { ProductContext } from '../context/ProductContext';
import { useSwipeable } from 'react-swipeable';
import { Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const firstVariation = product.variations?.[0];
  const price = firstVariation ? firstVariation.price : null;
  const size = firstVariation ? firstVariation.size : null;
  const dealPrice = product.deal_price

  function calculatePercentageOff (dealPrice, price){
    let diff = (price-dealPrice)
    let percentagediff = (diff/price *(100))
    return Math.floor(percentagediff)
  }

  return (
    <div className="product-card group relative border-zinc-100/30  lg:w-72  flex flex-col self-center overflow-hidden border shadow-md lg:max-h-96 sm:ml-10">
      <Link to={`/products/${product.id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden">
        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={`${product.images[0]?.url}`} alt="product image" />
        {product.images.length > 1 && (
          <>
            <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"  src={`${product.images[1]?.url}`} alt="product image" />
            <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
            <span className="absolute top-0 left-0 m-2 rounded-none bg-black px-2 text-center text-sm font-medium text-white">{calculatePercentageOff(dealPrice, price)}% OFF</span> 

          </>
        )}
      </Link>
      <div className="absolute -right-16 bottom-0 space-y-2 transition-all duration-300 group-hover:right-0">
        <Link className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Link>
        <Link onClick={() => addToCart(product.id)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-brown-custom hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h12.72a2 2 0 002-1.61L23 6H6"></path>
          </svg>
        </Link>
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-futurabold tracking-tight text-black">{product.name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-futura font-bold text-black">Ksh {dealPrice !== null ? dealPrice : "N/A"}</span>
            <span className="text-md font-futura font-bold text-black line-through ml-2">{price !== null ? price : "N/A"}</span>

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

const ProductsOnOffer = () => {
  const { productsOnOffer, addToCart } = useContext(ProductContext);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productsOnOffer.length !== 0) {
      setLoading(false);
    }
  }, [productsOnOffer]);

  onst scrollLeft = () => {
  setStart(Math.max(0, start - 4));
};

const scrollRight = () => {
  setStart(Math.min(productsOnOffer.length - 4, start + 4));
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
{  productsOnOffer.message == ''   &&   <span className="relative justify-start m-2 rounded-none bg-red-600 px-2 text-center text-md font-futurabold text-white">HOT DEALS</span>
      }      </div>
      {productsOnOffer.length > 4 && (
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
        className={`p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white ${start >= productsOnOffer.length - 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          : productsOnOffer.length >1 && productsOnOffer.slice(start, start + 4).map((product, index) => (
              <ProductCard key={index} product={product} addToCart={addToCart} />
            ))}
      </div>
    </div>
  </div>
  
  );
};

export default ProductsOnOffer;
