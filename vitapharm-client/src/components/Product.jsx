import React,{useContext} from 'react';
// import { ProductContext } from '../context/ProductsContext';
import '../App.css'
import { ChevronLeft, ChevronRight } from "react-feather"
import { px } from 'framer-motion';



const ProductCard = ({ product }) => (
  <div className="w-full rounded overflow-hidden m-4 hover:cursor-pointer relative self-center h-96 ">
    <div className="w-full overflow-hidden relative">
      <img className=" w-64 transition-all duration-500 ease-in-out transform hover:scale-110 " src={product.images[0]?.url} alt={product.brand} />
      <div className="absolute inset-0 bg-zinc-100 opacity-50 hover:opacity-0  transition-opacity duration-500 ease-in-out"></div>
      {product.product_colors && product.product_colors.length > 1 && 
        <div className="absolute bottom-1 left-0 px-3 py-1 text-xs font-sans">{product.product_colors.length} colours</div>
      }
    </div>
    <div className="px-6 py-4 text-left">
      <div className="font-sans subpixel-antialiased mb-2">{product.brand}</div>
      <p className= "font-sans text-gray-700 text-base">{product.product_type}</p>
    </div>
    <div className="px-6 pt-4 pb-2 text-left">
     Kshs {product.price &&<span className="font-sans inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.price}</span>}
    </div>
  </div>
);





const ProductList = () => {
  // const { products } = useContext(ProductContext);
  const products = [
    { 'image': '/prod1.webp',
      'zoom-image':'glide2.jpeg',
      'brand' : 'CeraVe',
      'product_type': 'Hydrating Cleanser',
      'price': '3,700' ,

    },
    {
      'image': '/prod2.jpg',
      'zoom-image':'slide2.jpg',
      'brand' : "L'oreal",
      'product_type': 'Scalp Advanced',
      'price': '2,500' ,
    },
    {
      'image': '/prod3.jpg',
      'zoom-image':'/slide3.jpg',
      'brand' : "ORS",
      'product_type': 'Sheen Spray',
      'price': '700' ,
    },
    {
      'image': '/prod4.webp',
      'zoom-image':'slide4.jpg',
      'brand' : "CeraVe",
      'product_type': 'Moisturizing Cream',
      'price': '4,100' ,
    },
    {
      'image': '/prod5.jpg',
      'zoom-image':'slide5.jpeg',
      'brand' : "Dior",
      'product_type': 'Lip Oil',
      'price': '8,750' ,
    },
    {
      'image': '/prod6.jpg',
      'zoom-image':'slide6.jpeg',
      'brand' : "CeraVe",
      'product_type': 'Acne Control Cleanser',
      'price': '1,700' ,
    }
  ]
  const [start, setStart] = React.useState(0);

  const scrollLeft = () => {
    setStart(Math.max(0, start - 4));
  };

  const scrollRight = () => {
    setStart(Math.min(products.length - 4, start + 4));
  };

  return (
    <div className=''>
    <div className="flex flex-col justify-center  min-w-screen items-center ">
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
      <div className="flex p-9 transition-all duration-500 ease-in-out ">
        {products.slice(start, start + 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
    </div>
  );
};


export default ProductList;
