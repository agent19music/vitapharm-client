import React, { useState } from 'react';

export default function SingleProductCard() {
    let product = {
        'images': ['/prod2.webp', '/slide1.avif', '/slide2.jpg'],
        'brand': "L'oreal",
        'product_type': 'Scalp Advanced',
        'price': {
            '100ml': '2,500',
            '300ml': '4,500',
            '500ml': '6,500'
        }
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedSize, setSelectedSize] = useState('100ml');

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="flex justify-center m-auto self-center w-full">
            <section className="py-12 sm:py-16 w-full max-w-6xl">
                <div className="container mx-auto px-4">
                    {/* Navigation */}
                    <nav className="flex">
                        <ol role="list" className="flex items-center">
                            <li className="text-left">
                                <div className="-m-1">
                                    <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </a>
                                </div>
                            </li>
                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <div className="-m-1">
                                        <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Products </a>
                                    </div>
                                </div>
                            </li>
                            <li className="text-left">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <div className="-m-1">
                                        <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> Coffee </a>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    {/* Product Images */}
                    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
                        {/* Product Image */}
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img className="h-full w-full max-w-full object-cover cursor-zoom-in" src={selectedImage} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0 bg-black w-full">
                                <div className="flex justify-between items-start bg-green-400 w-full">
                                    {product.images.map((image, index) => (
                                        <button key={index} type="button" className="w-20 h-20 overflow-hidden border-2 border-gray-900 text-center" onClick={() => setSelectedImage(image)}>
                                            <img className="h-full w-full object-cover" src={image} alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-8 lg:col-span-2 lg:row-span-2 lg:row-end-2">
                            {/* Product Title */}
                            <h1 className="sm:text-2xl lg:text-3xl font-bold text-gray-900">{product.brand} - {product.product_type}</h1>

                            {/* Reviews */}
                            <div className="mt-5 flex items-center">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                                        </svg>
                                    ))}
                                    <p className="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
                                </div>
                            </div>

                            {/* Coffee Type */}
                            <h2 className="mt-8 text-base text-gray-900">Bottle Size</h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label>
                                    <input type="radio" name="type" value="100ml" className="peer sr-only" checked={selectedSize === '100ml'} onChange={() => handleSizeChange('100ml')} />
                                    <p className={`peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold ${selectedSize === '100ml' ? 'bg-black text-white' : ''}`}>100 ml</p>
                                </label>
                                <label>
                                    <input type="radio" name="type" value="300ml" className="peer sr-only" checked={selectedSize === '300ml'} onChange={() => handleSizeChange('300ml')} />
                                    <p className={`peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold ${selectedSize === '300ml' ? 'bg-black text-white' : ''}`}>300 ml</p>
                                </label>
                                <label>
                                    <input type="radio" name="type" value="500ml" className="peer sr-only" checked={selectedSize === '500ml'} onChange={() => handleSizeChange('500ml')} />
                                    <p className={`peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold ${selectedSize === '500ml' ? 'bg-black text-white' : ''}`}>500 ml</p>
                                </label>
                            </div>

                            {/* Price and Add to cart */}
                            <div className="mt-10 flex flex-col items-center sm:flex-row sm:justify-between sm:items-center border-t border-b py-4">
                                <div className="flex items-center">
                                    <h1 className="text-3xl font-bold"> Ksh {product.price[selectedSize]}</h1>
                                </div>
                                <button type="button" className="inline-flex items-center justify-center rounded-none border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>

                            {/* Additional Details */}
                            <ul className="mt-8 space-y-2">
                                {/* Additional details */}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
