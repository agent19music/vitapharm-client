import {React, useContext} from 'react'
import Header from '../components/Header'
import { SimpleGrid } from '@chakra-ui/react'
import { ProductContext } from '../context/ProductContext'
import ProductOnOfferCard from '../components/ProductsOnOfferCard'
import { Skeleton, Box } from '@chakra-ui/react';


export default function ProductsOnOfferPage() {
    const {productsOnOffer} = useContext(ProductContext)

    const SkeletonCard = () => (
      <div className="group border-zinc-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden border bg-zinc-100 shadow-md product-card">
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
          <Header/>
          <SimpleGrid columns={[1, 2, 3]} spacing="40px" width="100%" justifyItems="center">
            {productsOnOffer.length === 0 ? 
              Array(6).fill().map((_, i) => <SkeletonCard key={i} />) : 
              productsOnOffer.map((product, index) => (
                <ProductOnOfferCard key={index} product={product} addToCart={() => {}} />
              ))
            }
          </SimpleGrid>
        </div>
      );
}
