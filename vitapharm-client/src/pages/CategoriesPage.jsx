import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { Box, VStack, Skeleton, SkeletonCircle, Heading, Text } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/ModernFooter';

const CategoriesPage = () => {
  const { subCategories } = useContext(ProductContext);

  const skeletonLoading = (
    <VStack spacing={8} align="center">
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" width="300px">
          <SkeletonCircle size="10" mb="4" />
          <Skeleton height="20px" mb="2" />
          <Skeleton height="20px" mb="2" />
          <Skeleton height="20px" mb="2" />
        </Box>
      ))}
    </VStack>
  );

  if (!subCategories || subCategories.length === 0) {
    // Render skeleton loading while data is being fetched
    return (
      <>
        <Header />
        <Box p={8} textAlign="center">
          {skeletonLoading}
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box p={8}>
        <VStack spacing={8} align="start">
          {subCategories.map((category, index) => (
            <Box key={index} width="100%">
              <h2 className="text-3xl font-bold font-futuramedbold mb-4">{category.category.toUpperCase()}</h2>
            
              <ul className="flex flex-wrap">
                {category.sub_categories.map((subCategory, subIndex) => (
                  <Link
                    to={`/category/${category.category}/${subCategory}`}
                    key={subIndex}
                    className="mx-2 my-1 px-4 py-2 bg-brown-custom text-white hover:text-white rounded-full font-futurabold"
                  >
                    {subCategory}
                  </Link>
                ))}
              </ul>
            </Box>
          ))}
        </VStack>
      </Box>
      <Footer />
    </>
  );
};

export default CategoriesPage;
