import React from 'react';
import { ChevronLeft, ChevronRight } from "react-feather"
import '../App.css'
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';


const ProductCard = ({ product, addToCart } ) => (
  <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border bg-zinc-100 shadow-md">
    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden" href="#">
      <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={product.image} alt="product image" />
      <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={product.zoom_image} alt="product image" />
      <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">15% OFF</span> 
    </a>
    <div className="mt-4 px-5 pb-5">
      <a href="#">
        <h5 className="text-xl tracking-tight text-black">{product.brand} {product.product_type}</h5>
      </a>
      <div className="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span className="text-3xl font-bold text-black">{product.price}</span>
          <span className="text-sm text-black line-through">${parseFloat(product.price.replace(',', '')) * 1.75}</span>
        </p>
      </div>
      <a  onClick={() => addToCart(product.id)} href="#" className="hover:border-white/40 flex items-center justify-center border border-transparent bg-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 hover:text-white hover:font-semibold ">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to cart
      </a>
    </div>
  </div>
);

const TwoProductList = () => {
  const { addToCart } = useContext(ProductContext);
  const products = [
    { 'id': 1,
      'image': '/prod1.webp',
      'zoom_image':'glide2.jpeg',
      'brand' : 'CeraVe',
      'product_type': 'Hydrating Cleanser',
      'price': '3,700' },
    {
      'id': 2,
      'image': '/prod2.webp',
      'zoom_image':'slide2.jpg',
      'brand' : "L'oreal",
      'product_type': 'Scalp Advanced',
      'price': '2,500' },
    {
      'id': 3,
      'image': '/prod3.jpg',
      'zoom_image':'/slide3.jpg',
      'brand' : "ORS",
      'product_type': 'Sheen Spray',
      'price': '700' },
    {
      'id': 4,
      'image': '/prod4.webp',
      'zoom_image':'slide4.jpg',
      'brand' : "CeraVe",
      'product_type': 'Moisturizing Cream',
      'price': '4,100' },
    {
      'id': 5,
      'image': '/prod5.jpg',
      'zoom_image':'slide5.jpeg',
      'brand' : "Dior",
      'product_type': 'Lip Oil',
      'price': '8,750' },
    {
      'id': 6,
      'image': '/prod6.jpg',
      'zoom_image':'slide6.jpeg',
      'brand' : "CeraVe",
      'product_type': 'Acne Control Cleanser',
      'price': '1,700' }
  ];
  const [start, setStart] = React.useState(0);

  const scrollLeft = () => {
    setStart(Math.max(0, start - 4));
  };

  const scrollRight = () => {
    setStart(Math.min(products.length - 4, start + 4));
  };



  return (
    <div className=''>
      <div className="flex flex-col justify-center  min-w-screen items-center">
        <div className='space-1 align-bottom self-end mr-24'>
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
        <div className="flex p-9 transition-all duration-500 ease-in-out w-full  items-center justify-evenly ">
          {products.slice(start, start + 4).map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoProductList;
