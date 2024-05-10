import React, { useState, useEffect } from 'react';



export default function SingleProductCard({ productId }) {
    const [product, setProducts] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState('100ml');
    const [sessionToken, setSessionToken] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchSessionToken = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/vitapharm/session');
                const { session_token } = await response.json();
                localStorage.setItem('session_token', session_token);
                setSessionToken(session_token);
            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };

        fetchSessionToken(); // Fetch token on component mount
    }, []);

    useEffect(() => {
        const fetchProducts = async (token) => {
            try {
                const response = await fetch(`http://localhost:5000/api/vitapharm/products/16`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (sessionToken) {
            fetchProducts(sessionToken);
        }
    }, [productId, sessionToken]); // Dependency array includes productId and sessionToken

    const addToCart = async () => {
        if (!sessionToken) return; // Handle missing token

        try {
            const response = await fetch('http://localhost:5000/api/vitapharm/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                },
                body: JSON.stringify({ product_id: 16, quantity: 1 })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center m-auto self-center w-full">
            <section className="py-12 sm:py-16 w-full max-w-6xl">
                <div className="container mx-auto px-4">
                    {/* Navigation */}
                    <nav className="flex">
                        {/* Navigation code */}
                    </nav>

                    {/* Product Images */}
                    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
                        {/* Product Image */}
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img className="h-full w-full max-w-full object-cover cursor-zoom-in" src={`data:image/png;base64,${selectedImage}`} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0 bg-black w-full">
                                <div className="flex justify-between items-start bg-green-400 w-full">
                                    {product.images.map((image, index) => (
                                        <button key={index} type="button" className="w-20 h-20 overflow-hidden border-2 border-gray-900 text-center" onClick={() => setSelectedImage(image.data)}>
                                            <img className="h-full w-full object-cover" src={`data:image/png;base64,${image.data}`} alt="" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-8 lg:col-span-2 lg:row-span-2 lg:row-end-2">
                            {/* Product Title */}
                            <h1 className="sm:text-2xl lg:text-3xl font-bold text-gray-900">{product.brand} - {product.name}</h1>
                            <h2 className="mt-8 text-base text-gray-900">{product.description}</h2>
                            <h2 className="mt-8 text-base text-gray-900">{product.category}, {product.sub_category}</h2>
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
                            {product.variations.map((variation, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={variation.size}
                                        className="peer sr-only"
                                        checked={selectedSize === variation.size}
                                        onChange={() => handleSizeChange(variation.size)}
                                    />
                                    <p className={`peer-checked:bg-black peer-checked:text-white border border-black px-6 py-2 font-bold ${selectedSize === variation.size ? 'bg-black text-white' : ''}`}>{variation.size}</p>
                                </label>
                            ))}
                        </div>

                            {/* Price and Add to cart */}
                            <div className="mt-10 flex flex-col items-center sm:flex-row sm:justify-between sm:items-center border-t border-b py-4">
                                <div className="flex items-center">
                                <h1 className="text-3xl font-bold"> Ksh {product.variations.find(variation => variation.size === selectedSize)?.price || ''}</h1>
                                </div>
                                <button type="button" onClick={addToCart} className="inline-flex items-center justify-center rounded-none border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
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
