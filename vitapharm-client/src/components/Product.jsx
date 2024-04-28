import React,{useContext} from 'react';
// import { ProductContext } from '../context/ProductsContext';
import '../App.css'


const ProductCard = ({ product }) => (
  <div className="w-full h-full rounded overflow-hidden m-4 hover:cursor-pointer relative ">
    <div className="w-full overflow-hidden relative">
      <img className=" w-64 transition-all duration-500 ease-in-out transform hover:scale-110" src={product.image} alt={product.brand} />
      <div className="absolute inset-0 bg-zinc-0 opacity-50 hover:opacity-0 transition-opacity duration-500 ease-in-out"></div>
      {product.product_colors && product.product_colors.length > 1 && 
        <div className="absolute bottom-1 left-0 px-3 py-1 text-xs font-sans">{product.product_colors.length} colours</div>
      }
    </div>
    <div className="px-6 py-4 text-left">
      <div className="font-sans subpixel-antialiased mb-2">{product.brand}</div>
      <p className= "font-sans text-gray-700 text-base">{product.product_type}</p>
    </div>
    <div className="px-6 pt-4 pb-2 text-left">
     Kshs {product.price &&<span className="font-sans inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span>}
    </div>
  </div>
);





const ProductList = () => {
  // const { products } = useContext(ProductContext);
  const products = [
    { 'image': '/prod1.webp',
      'brand' : 'CeraVe',
      'product_type': 'Hydrating Cleanser',
      'price': '3,700' ,

    },
    {
      'image': '/prod2.jpg',
      'brand' : "L'oreal",
      'product_type': 'Scalp Advanced',
      'price': '3,700' ,
    },
    {
      'image': '/prod3.jpg',
      'brand' : "ORS",
      'product_type': 'Sheen Spray',
      'price': '3,700' ,
    },
    {
      'image': '/prod4.webp',
      'brand' : "CeraVe",
      'product_type': 'Moisturizing Cream',
      'price': '3,700' ,
    },
    {
      'image': '/prod5.jpg',
      'brand' : "Dior",
      'product_type': 'Lip Oil',
      'price': '1,700' ,
    },
    {
      'image': '/prod5.jpg',
      'brand' : "Dior",
      'product_type': 'Lip Oil',
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
    <div className="flex flex-col justify-center min-h-screen min-w-screen items-center space-x-6">
     <div className='space-1 align-bottom'>
     <button aria-label="Previous slide" class="Button-ds ProductRail-Pagination__button ProductRail-Pagination__button--back Button-ds--clear Button-ds--compact Button-ds--icon" type="button" tabindex="0" aria-controls="swiper-wrapper-ef939342c81de69e" aria-disabled="false" onClick={scrollLeft}>
      <svg class="Button-ds__icon" aria-hidden="true" width="16" height="16"><path d="M12 14.75L4.5 8 12 1.25" fill-rule="nonzero" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </button>
     <button aria-label="Next slide" class="Button-ds ProductRail-Pagination__button ProductRail-Pagination__button--forward Button-ds--clear Button-ds--compact Button-ds--icon" type="button" tabindex="0" aria-controls="swiper-wrapper-ef939342c81de69e" aria-disabled="false" onClick={scrollRight}>
        <svg class="Button-ds__icon" aria-hidden="true" width="16" height="16"><path d="M4 14.75L11.5 8 4 1.25" fill-rule="nonzero" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg></button>
     </div>
      <div className="flex p-9 transition-all duration-500 ease-in-out ">
        {products.slice(start, start + 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
};


export default ProductList;
