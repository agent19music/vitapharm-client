import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/ModernFooter';
import { Skeleton, Box, useDisclosure, Button } from '@chakra-ui/react';
import { ChevronUp } from 'react-feather';

const SearchResultsPage = () => {
  const { products, addToCart } = useContext(ProductContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Show after scrolling 100px
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter((product) => {
    let lowerCaseQuery = query.toLowerCase();
    let name = product.name.toLowerCase();
    let description = product.description.toLowerCase();
    let category = product.category.toLowerCase();
    let subCategory = product.sub_category.toLowerCase();

    return (
      name.includes(lowerCaseQuery) ||
      description.includes(lowerCaseQuery) ||
      category.includes(lowerCaseQuery) ||
      subCategory.includes(lowerCaseQuery)
    );
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SkeletonCard = () => (
    <div className="skeleton-card group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border bg-zinc-100 shadow-md product-card">
      <Box className="relative mx-3 mt-3 flex h-64 overflow-hidden">
        <Skeleton height="100%" width="100%" />
      </Box>
      <div className="mt-4 px-5 pb-5">
        <Skeleton height="20px" my="2" />
        <Skeleton height="36px" mt="4" />
      </div>
    </div>
  );

  return (
    <div className="search-results-page mx-auto">
      <Header />

      <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" width="100%" justifyItems="center" className="py-8">
        {filteredProducts.length === 0
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} addToCart={addToCart} />
            ))}
      </SimpleGrid>

      {showScrollButton && (
        <Button
          position="fixed"
          bottom="9"
          left="4"
          zIndex="42"
          onClick={scrollToTop}
          backgroundColor="gray.100"
          _hover={{ backgroundColor: '#4D0A1E', color: 'white'  }}
          color="black"
        >
          <ChevronUp size={24} />
        </Button>
      )}

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
