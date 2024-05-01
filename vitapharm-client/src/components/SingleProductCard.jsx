import React, { useState } from 'react';

export default function SingleProductCard() {
    let product = {
        'images': ['/prod2.jpg', '/slide1.jpg', '/slide2.jpg'],
        'brand': "L'oreal",
        'product_type': 'Scalp Advanced',
        'price': '2,500',
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div> 
            <section className="sm:py-16 bg-pink-600 w-full">
                <div className="container mx-auto px-4 bg-orange-300">
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
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 bg-black">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img className="h-96 w-full object-cover" src={selectedImage} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0 flex justify-between bg-orange-300">
                                <div className="flex flex-row justify-between w-full bg-green-300">
                                    {product.images.map((image, index) => (
                                        <button key={index} type="button" className="w-20 h-20 overflow-hidden border-2 border-gray-900 text-center" onClick={() => setSelectedImage(image)}>
                                            <img className="h-full w-full object-cover" src={image} alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
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
                            <h2 className="mt-8 text-base text-gray-900">Coffee Type</h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label>
                                    <input type="radio" name="type" value="Powder" className="peer sr-only" checked />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">Powder</p>
                                </label>
                                <label>
                                    <input type="radio" name="type" value="Whole Bean" className="peer sr-only" />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">Whole Bean</p>
                                </label>
                                <label>
                                    <input type="radio" name="type" value="Ground" className="peer sr-only" />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">Ground</p>
                                </label>
                            </div>

                            {/* Choose subscription */}
                            <h2 className="mt-8 text-base text-gray-900">Choose subscription</h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                <label>
                                    <input type="radio" name="subscription" value="4 Months" className="peer sr-only" />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">4 Months</p>
                                    <span className="mt-1 block text-center text-xs">$80/mo</span>
                                </label>
                                <label>
                                    <input type="radio" name="subscription" value="8 Months" className="peer sr-only" checked />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">8 Months</p>
                                    <span className="mt-1 block text-center text-xs">$60/mo</span>
                                </label>
                                <label>
                                    <input type="radio" name="subscription" value="12 Months" className="peer sr-only" />
                                    <p className="peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold">12 Months</p>
                                    <span className="mt-1 block text-center text-xs">$40/mo</span>
                                </label>
                            </div>

                            {/* Price and Add to cart */}
                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className="text-3xl font-bold">$60.50</h1>
                                    <span className="text-base">/month</span>
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
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                    <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                                    </svg>
                                    Free shipping worldwide
                                </li>
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                    <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                                    </svg>
                                    Cancel Anytime
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
