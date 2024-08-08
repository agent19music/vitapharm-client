import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import Footer from '../components/ModernFooter';
import { Skeleton, Box, VStack, HStack, SkeletonCircle } from '@chakra-ui/react';
import Header from '../components/Header';

const Brands = () => {
  const { brands } = useContext(ProductContext);

  const extractFirstLetter = (str) => {
    return str[0].toUpperCase();
  };

  if (!brands || brands.length === 0) {
    // Render skeletons while loading
    return (
      <>
        <Header />
        <div className="container mx-auto py-8">
          <VStack spacing={8}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Box key={index} width="full" padding='6'  bg='white'>
                <SkeletonCircle size='14' mb='5' />
                <HStack spacing={4}>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} height="40px" width="120px" className="rounded-full" />
                  ))}
                </HStack>
              </Box>
            ))}
          </VStack>
        </div>
        <Footer />
      </>
    );
  }

  const brandsWithLetters = brands.map((brand) => ({
    name: brand,
    letter: extractFirstLetter(brand),
  }));

  const groupedBrands = brandsWithLetters.reduce((acc, brand) => {
    const firstLetter = brand.letter;
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // Sort the letters and brands within each letter group
  const sortedGroupedBrands = Object.keys(groupedBrands)
    .sort()
    .reduce((acc, letter) => {
      acc[letter] = groupedBrands[letter].sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {});
    

  return (
    <div className="">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap justify-center">
          {Object.entries(sortedGroupedBrands).map(([letter, brands]) => (
            <div key={letter} className="w-full mb-8">
              <h2 className="text-3xl font-futuramedbold mb-4">{letter}</h2>
              <ul className="flex flex-wrap">
                {brands.map((brand, index) => (
                  <Link
                    to={`/brands/${brand.name}`}
                    key={index}
                    className="mx-2 my-1 px-4 py-2 bg-brown-custom text-white hover:text-white rounded-full font-futurabold"
                  >
                    {brand.name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Brands;
