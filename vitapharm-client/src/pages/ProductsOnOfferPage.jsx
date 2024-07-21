import {React, useContext} from 'react'
import Header from '../components/Header'
import { SimpleGrid } from '@chakra-ui/react'
import { ProductContext } from '../context/ProductContext'
import ProductOnOfferCard from '../components/ProductsOnOfferCard'
import { Skeleton, Box } from '@chakra-ui/react';
import Footer from '../components/ModernFooter'


export default function ProductsOnOfferPage() {
    const {productsOnOffer, addToCart} = useContext(ProductContext)
    console.log(productsOnOffer);

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
          
         {productsOnOffer.message !== '' && <div className='flex justify-center items-center h-full py-64'>
            <h2 className='font-futurabold'> OOPS ! NO PRODUCTS CURRENTLY ON OFFER</h2>
            {/* <h5 className='font-futura'>Shop around to get product here !!</h5> */}
          </div>}
          <SimpleGrid columns={[1, 2, 3]} spacing="40px" width="100%" justifyItems="center" className='my-8'>
            {productsOnOffer && productsOnOffer.length === 0 ? 
              Array(6).fill().map((_, i) => <SkeletonCard key={i} />) : 
              productsOnOffer.length > 1 && productsOnOffer.map((product, index) => (
                <ProductOnOfferCard key={index} product={product} addToCart={addToCart} />
              ))
            }
          </SimpleGrid>
          <Footer/>
        </div>
      );
}
