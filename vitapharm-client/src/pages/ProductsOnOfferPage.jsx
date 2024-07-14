import {React, useContext} from 'react'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import { SimpleGrid } from '@chakra-ui/react'
import { ProductContext } from '../context/ProductContext'

export default function ProductsOnOfferPage() {
    const {productsOnOffer} = useContext(ProductContext)
    return (
        <div className="search-results-page mx-auto">
          <Header/>
          <SimpleGrid columns={[1, 2, 3]} spacing="40px" width="100%" justifyItems="center">
            {productsOnOffer.map((product, index) => (
              <ProductCard key={index} product={product} addToCart={() => {}} />
            ))}
          </SimpleGrid>
        </div>
      );
      
}
