import {React, useContext, useEffect,useState} from 'react';
import ProductContext from '../context/ProductContext'
import { Link as RouterLink } from 'react-router-dom';



const CaegoryPreview = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);


  //   useEffect(() => {
  //   if (category) {
  //     const filtered = products.filter(product => product.category === category);
  //     setFilteredCategories(filtered);
  //   } else {
  //     setFilteredCategories(products);
  //   }
  // }, [category, products]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {[
          { path: '/categories/face', src: '/face.jpg', alt: 'Face Category', count:'241 products' },
          { path: '/categories/lips', src: '/lips.jpeg', alt: 'Lips Category', count:'62 products' },
           { path: '/categories/body', src: '/slide4.jpg', alt: 'Body Category', count:'25 products' },
          { path: '/categories/skincare', src: '/prod6.png', alt: 'Skincare Category', count:'35 products' },
        ].map((category, index) => (
          <RouterLink key={index} to={category.path} className="relative group mb-6">
            <img 
              src={category.src} 
              alt={category.alt} 
              className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-101" 
            />
           <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out desktop-image-overlay-text">
  <div class="text-white text-lg font-futuramedbold">
    {category.alt}
  </div>
  <div class="text-white text-lg font-futurabold">
    {category.count}
  </div>
</div>

<div className='mobile-text-below-image'>
<div class="text-md font-futuramedbold">
    {category.alt}
  </div>
  <div class="text-md  font-futurabold">
    {category.count}
  </div>
  </div>

          </RouterLink>
        ))}
      </div>
  );
};

export default CaegoryPreview;
