import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const CategoryPreview = () => {
    const categories = [
        { path: '/categories/face', src: '/face1.jpg', alt: 'Face Category', count: '241 products' },
        { path: '/categories/lips', src: '/lips1.jpg', alt: 'Lips Category', count: '62 products' },
        { path: '/categories/body', src: '/body1.jpg', alt: 'Body Category', count: '25 products' },
        { path: '/categories/skincare', src: '/skin1.jpg', alt: 'Skincare Category', count: '35 products' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
            {categories.map((category, index) => (
                <CategoryLink key={index} category={category} />
            ))}
        </div>
    );
};

const CategoryLink = ({ category }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <RouterLink 
            to={category.path} 
            className="relative group mb-6"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
        >
            <img src={category.src} alt={category.alt} className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:scale-101" />
            
            {/* Overlay that appears on hover */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 ${showOverlay ? 'opacity-100' : ''} transition duration-300 ease-in-out desktop-image-overlay-text`}>
                <div className="text-white text-lg font-futurabold">{category.alt}</div>
                <div className="text-white text-lg font-futurabold">{category.count}</div>
            </div>
            <div class={`absolute inset-0 text-white text-lg font-futuramedbold items-center justify-center flex desktop-image-bold-text ${showOverlay ? 'hidden' : ''}`}>
                {category.alt.toUpperCase()}
            </div>
            <div className='mobile-text-below-image'>
                <div className="text-md font-futuramedbold">{category.alt}</div>
                <div className="text-md font-futurabold">{category.count}</div>
            </div>

        </RouterLink>
    );
};


export default CategoryPreview;
