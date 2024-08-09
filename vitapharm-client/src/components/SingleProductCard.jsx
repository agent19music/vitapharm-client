import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import { UserContext } from '../context/UserContext';
import Footer from './ModernFooter';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Skeleton, SkeletonText, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";

export default function SingleProductCard() {
    const { productSlug } = useParams();
    const { addToCart, selectedProduct, setSelectedProduct, apiEndpoint } = useContext(ProductContext);
    const { sessionToken } = useContext(UserContext);
    const [product, setProduct] = useState(selectedProduct || null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiEndpoint}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            return [];
        }
    };

    // Function to deslugify the URL slug to match the product name
    const deslugify = (slug) => {
        const parts = slug.split('-');
        parts.pop(); // Remove the last part (the nanoid)
        return parts.join(' ').replace(/-/g, ' ');
    };

    useEffect(() => {
        const loadProduct = async () => {
            let foundProduct = product;
            if (!selectedProduct || selectedProduct.length === 0) {
                setLoading(true);
                const products = await fetchData();
                const urlName = deslugify(productSlug);
                foundProduct = products.find(prod => prod.name.toLowerCase() === urlName.toLowerCase());
            }
            
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedVariation(foundProduct.variations[0]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productSlug, selectedProduct]);

    useEffect(() => {
        if (product) {
            setSelectedProduct(product);
        }
    }, [product, setSelectedProduct]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);
    };

    return (
        <div>
            <Header flag={'spc'} />
            <div className="flex flex-col md:flex-row justify-center m-auto w-full py-12 sm:py-16 min-h-80">
                <div className="flex w-full max-w-6xl px-6 h-full flex-col md:flex-row">
                    {/* Selected Image */}
                    <div className="lg:order-2 sm:order-1 w-full md:w-4/12 flex items-center justify-center mb-6 md:mb-0">
                        {loading ? (
                            <Skeleton height="100%" width="100%" />
                        ) : (
                            <Zoom>
                                <img
                                    className="w-full lg:h-[38rem] h-[30rem] object-contain bg-white"
                                    src={selectedImage || `${product.images[0]?.url}`}
                                    alt="product"
                                />
                            </Zoom>
                        )}
                    </div>

                    {/* Image Thumbnails */}
                    <div className="lg:order-1 sm:order-2 w-full md:w-1/12 flex md:flex-col items-center space-x-3 md:space-y-3 md:justify-start md:mt-4">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} height="60px" width="60px" />
                            ))
                        ) : (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-16 h-16 object-cover cursor-pointer border-2 ${selectedImage === image.url ? 'border-black' : 'border-transparent'} hover:border-black`}
                                    src={`${image.url}`}
                                    alt={`thumbnail ${index}`}
                                    onClick={() => setSelectedImage(image.url)}
                                />
                            ))
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="order-3 w-full md:w-7/12 p-8">
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
                                <div>
                                    <span className="rounded-full font-futurabold">
                                        {product.brand.toUpperCase()}
                                        <span className="ml-1.5 text-3xl relative bottom-1">.</span> 
                                    </span>

                                    <span className="ml-2 my-1 py-2 rounded-full font-futurabold">
                                        {product.category.toUpperCase()}
                                        <span className="ml-1.5 text-3xl relative bottom-1">.</span> 
                                    </span>
                                    <span className="ml-2 my-1 py-2 rounded-full font-futurabold">
                                        {product.sub_category.toUpperCase()} 
                                    </span>
                                </div>

                                <p className="mt-2.5 font-futura text-xl leading-relaxed desktop-product-description">
                                    {product.description}
                                </p>
                                <div className="mobile-product-description-accordion">
                                    <Accordion allowToggle className="my-10">
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex="1" textAlign="left" className="font-futurabold text-2xl">
                                                        Product Description
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4} className="font-futura text-lg leading-relaxed">
                                                {product.description} 
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
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
                                                className={`spbs px-6 py-3 border ${selectedVariation && selectedVariation.id === variation.id ? 'border-[#4D0A1E] bg-[#4D0A1E] text-white' : 'border-gray-300 bg-white font-futurabold text-gray-700'} hover:bg-[#4D0A1E] hover:text-white`}
                                            >
                                                {variation.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6 mb-8">
                                    <Link onClick={() => addToCart(product.id)} className="spbs flex items-center font-futurabold justify-center bg-[#4D0A1E] text-white px-6 py-4 text-center text-sm font-medium focus:outline-none hover:bg-[#5a3524] rounded-0 hover:text-white">
                                        ADD TO CART
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
