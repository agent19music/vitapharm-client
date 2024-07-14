import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const SearchResultsPage = () => {
  const { products } = useContext(ProductContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const filteredProducts = products.filter(product => {
    let lowerCaseQuery = query.toLowerCase();
    let name = product.name.toLowerCase();
    let description = product.description.toLowerCase();
    let category = product.category.toLowerCase();
    let subCategory = product.sub_category.toLowerCase();

    return name.includes(lowerCaseQuery) || description.includes(lowerCaseQuery) || category.includes(lowerCaseQuery) || subCategory.includes(lowerCaseQuery);
  });
  return (
    <div className="search-results-page mx-auto">
      <Header/>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px" width="100%" justifyItems="center">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} addToCart={() => {}} />
        ))}
      </SimpleGrid>
    </div>
  );
  
};

export default SearchResultsPage;
