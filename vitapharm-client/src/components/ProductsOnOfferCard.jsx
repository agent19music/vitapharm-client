import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'react-feather';


const ProductOnOfferCard = ({ product, addToCart }) => {
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
    <div className="group relative border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border shadow-md">
    <Link to={`/products/${product.id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden">  
      <img className="peer absolute top-0 right-0 h-full w-full object-cover"  src={`${product.images[0]?.url}`} alt="product image" />
      {product.images.length > 1 && (
        <>
          <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"  src={`${product.images[1]?.url}`} alt="product image" />
          <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
          <span className="absolute top-0 left-0 m-2 rounded-none bg-black px-2 text-center text-sm font-medium text-white">{calculatePercentageOff(dealPrice, price)}% OFF</span> 

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
            <span className="text-3xl font-futura font-bold text-black">Ksh {dealPrice !== null ? dealPrice : "N/A"}</span>
            <span className="text-md font-futura font-bold text-black line-through ml-2">{price !== null ? price : "N/A"}</span>

            <span className="text-1.5xl font-futura font-bold text-black ml-3" style={{ lineHeight: '0.5' }}>{size !== null ? size.toUpperCase() : "N/A"}</span>
          </p>
        </div>
    </div>
  </div>
  );
};

export default ProductOnOfferCard;
