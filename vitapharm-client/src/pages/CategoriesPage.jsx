import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { Box, VStack, Skeleton, SkeletonCircle, Heading, Text, HStack } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/ModernFooter';

const CategoriesPage = () => {
  const { subCategories } = useContext(ProductContext);
  const [sortedSubCategories, setSortedSubCategories] = useState([]);

  useEffect(() => {
    if (subCategories) {
      const sorted = [...subCategories].sort((a, b) => a.category.localeCompare(b.category));
      sorted.forEach(category => {
        category.sub_categories.sort();
      });
      setSortedSubCategories(sorted);
    }
  }, [subCategories]);


  const skeletonLoading = (
  <div className="container py-8">
  <VStack spacing={8}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Box key={index} width="full" padding="6" bg="white">
        <Skeleton height="56px" width="99px" mb="5" /> {/* Box-shaped skeleton */}
        <HStack spacing={4}>
          {Array.from({ length: 5 }).map((_, idx) => ( // 8 skeletons
            <Skeleton key={idx} height="40px" width="80px" className="rounded-full" /> 
          ))}
        </HStack>
      </Box>
    ))}
  </VStack>
</div>
  );

  if (!sortedSubCategories || sortedSubCategories.length === 0) {
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
          {sortedSubCategories.map((category, index) => (
            <Box key={index} width="100%">
                <Link  to={`/categories/${category.category}`} className='hover:text-brown-custom'>
              <h2 className="text-3xl font-bold font-futuramedbold mb-4">{category.category.toUpperCase()}</h2>
              </Link>
            
              <ul className="flex flex-wrap">
                {category.sub_categories.map((subCategory, subIndex) => (
                  <Link
                    to={`/categories/${category.category}/${subCategory}`}
                    key={subIndex}
                    className="mx-2 my-1 px-4 py-2 bg-brown-custom text-white hover:text-white rounded-full font-futurabold capitalize"
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
