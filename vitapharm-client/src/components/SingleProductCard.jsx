import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';

export default function SingleProductCard() {
    const { productId } = useParams();
    const {addToCart, apiEndpoint} = useContext(ProductContext)
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [sessionToken, setSessionToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionToken = async () => {
            try {
                let storedToken = localStorage.getItem('session_token');
                let tokenExpiration = localStorage.getItem('token_expiration');

                if (storedToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
                    setSessionToken(storedToken);
                } else {
                    const response = await fetch(`${apiEndpoint}/session`);
                    const { session_token } = await response.json();
                    storedToken = session_token;
                    tokenExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);
                    localStorage.setItem('session_token', session_token);
                    localStorage.setItem('token_expiration', tokenExpiration);
                    setSessionToken(session_token);
                }
            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };

        fetchSessionToken();

        const expirationTimer = setTimeout(() => {
            fetchSessionToken();
        }, 2 * 60 * 60 * 1000);

        return () => clearTimeout(expirationTimer);
    }, []);

    useEffect(() => {
        const fetchProduct = async (token) => {
            try {
                const response = await fetch(`${apiEndpoint}/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProduct(data);
                setSelectedVariation(data.variations[0]); // Set default variation
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (sessionToken) {
            fetchProduct(sessionToken);
        }
    }, [productId, sessionToken]);
    console.log(product);
    console.log(productId);

    // const addToCart = async () => {
    //     if (!sessionToken) return;

    //     try {
    //         const response = await fetch('http://localhost:5000/api/vitapharm/cart/add', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${sessionToken}`
    //             },
    //             body: JSON.stringify({ product_id: productId, quantity: 1 })
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error adding to cart:', error);
    //     }
    // };

    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Header />
            <div className="flex justify-center m-auto self-center w-full py-12 sm:py-16">
                <section className="w-full max-w-6xl">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center lg:space-x-8">
                            <div className="w-full lg:w-1/2">
                                <div className="relative mb-6 lg:mb-0 flex items-center justify-center">
                                    <img
                                        className="w-full lg:h-96 h-80 object-contain bg-white"
                                        src={selectedImage || product.images[0]?.url}
                                        alt="product"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 p-2">
                                        {product.images.map((image, index) => (
                                            <img
                                                key={index}
                                                className="w-16 h-16 object-cover cursor-pointer border-2 border-transparent hover:border-[#693f2d]"
                                                src={image.url}
                                                alt={`thumbnail ${index}`}
                                                onClick={() => setSelectedImage(image.url)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="lg:pl-16">
                                    <h1 className="mb-2 text-3xl font-futurabold text-black">
                                        {product.name}
                                    </h1>
                                    <p className="mb-6 text-sm font-futura text-gray-500">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-3xl font-futurabold text-black">Ksh {selectedVariation ? selectedVariation.price : "N/A"}</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-futurabold text-gray-700">
                                            Select size:
                                        </label>
                                        <div className="flex space-x-4">
                                            {product.variations.map((variation) => (
                                                <button
                                                    key={variation.id}
                                                    onClick={() => handleVariationChange(variation)}
                                                    className={`px-4 py-2 border ${selectedVariation && selectedVariation.id === variation.id ? 'border-[#693f2d] bg-[#693f2d] text-white' : 'border-gray-300 bg-white font-futurabold text-gray-700'} hover:bg-[#693f2d] hover:text-white`}
                                                >
                                                    {variation.size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button  onClick={() => addToCart(productId)}  className="flex items-center font-futurabold justify-center bg-[#693f2d] text-white px-5 py-3 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#693f2d] hover:bg-[#5a3524]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
