import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import Footer from './ModernFooter';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Skeleton, SkeletonText, Box } from '@chakra-ui/react';

export default function SingleProductCard() {
    const { productId } = useParams();
    const { addToCart, apiEndpoint } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [sessionToken, setSessionToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

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
    }, [apiEndpoint]);

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
    }, [apiEndpoint, productId, sessionToken]);

    useEffect(() => {
        setSelectedImage(null);
    }, [productId]);

    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);
    };

    return (
        <div>
            <div className="flex justify-center m-auto w-full py-12 sm:py-16 min-h-screen">
                <div className="flex w-full max-w-6xl px-6 h-full space-x-8">
                    {/* Image Thumbnails */}
                    <div className="w-1/12 flex flex-col items-center space-y-3 ">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} height="100px" width="100px" />
                            ))
                        ) : (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-22 h-22 object-cover cursor-pointer border-2 ${selectedImage === image.url ? 'border-black' : 'border-transparent'} hover:border-black`}
                                    src={image.url}
                                    alt={`thumbnail ${index}`}
                                    onClick={() => setSelectedImage(image.url)}
                                />
                            ))
                        )}
                    </div>

                    {/* Selected Image */}
                    <div className="w-4/12 flex items-center justify-center ">
                        {loading ? (
                            <Skeleton height="100%" width="100%" />
                        ) : (
                            <Zoom>
                                <img
                                    className="w-full lg:h-[38rem] h-[30rem] object-contain bg-white"
                                    src={selectedImage || product.images[0]?.url}
                                    alt="product"
                                />
                            </Zoom>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="w-7/12 p-8">
                        {loading ? (
                            <Box>
                                <Skeleton height="40px" mb="4" />
                                <SkeletonText mt="4" noOfLines={4} spacing="4" />
                                <Skeleton height="20px" mt="6" />
                                <Skeleton height="20px" mt="4" />
                                <Skeleton height="20px" mt="4" />
                                <Skeleton height="20px" mt="4" />
                                <Skeleton height="40px" mt="6" />
                                <Skeleton height="40px" mt="4" />
                            </Box>
                        ) : (
                            <>
                                <h1 className="mb-4 text-4xl font-futurabold text-black uppercase">
                                    {product.name}
                                </h1>
                                <p className="mb-8 text-lg font-futura text-gray-500 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex items-center mb-6">
                                    <span className="text-4xl font-futurabold text-black">Ksh {selectedVariation ? selectedVariation.price : "N/A"}</span>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-3 text-lg font-futurabold text-gray-700">
                                        Size:
                                    </label>
                                    <div className="flex space-x-6">
                                        {product.variations.map((variation) => (
                                            <button
                                                key={variation.id}
                                                onClick={() => handleVariationChange(variation)}
                                                className={`px-6 py-3 border ${selectedVariation && selectedVariation.id === variation.id ? 'border-[#693f2d] bg-[#693f2d] text-white' : 'border-gray-300 bg-white font-futurabold text-gray-700'} hover:bg-[#693f2d] hover:text-white`}
                                            >
                                                {variation.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6 mb-8">
                                    <div className="flex items-center space-x-3 border border-gray-300 px-4 py-3">
                                        <button className="text-lg font-bold" onClick={() => setQuantity(quantity - 1)}>-</button>
                                        <span>{quantity}</span>
                                        <button className="text-lg font-bold" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => addToCart(productId)} className="flex items-center font-futurabold justify-center bg-[#693f2d] text-white px-6 py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#693f2d] hover:bg-[#5a3524]">
                                        ADD TO CART
                                    </button>
                                    <button onClick={() => buyNow(productId)} className="flex items-center font-futurabold justify-center bg-pink-500 text-white px-6 py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-pink-500 hover:bg-pink-600">
                                        BUY IT NOW
                                    </button>
                                </div>
                                <button className="flex items-center font-futurabold justify-center bg-black text-white px-6 py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-black hover:bg-gray-800">
                                    ADD TO WISHLIST
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
