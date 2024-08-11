import React, { useState, useEffect, useContext } from 'react';
import WithSubnavigation from '../components/Navbar';
import TextTransition, { presets } from 'react-text-transition';
import SideMenu from '../components/SideMenu';
import { Link as RouterLink } from 'react-router-dom';
import { Search } from 'react-feather';
import WhatsappFloatingActionButton from './WhatsappFloatingActionButton';
import { InputGroup, Input, InputRightElement, Popover, PopoverTrigger, PopoverContent, Box, SimpleGrid, Text, Link, Flex, Image, Button, VStack, StackDivider } from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import Breadcrumbs from '../components/Breadcrumb'

export default function Header({flag}) {
  const { products, navigateToSingleProductView } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);




  const TEXTS = [
    'HOME OF SKIN CARE SOLUTIONS',
    'ALL YOUR FAVOURITE SKIN CARE BRANDS FOUND HERE',
    'NEED A SERVICE ? BOOK AN APPOINTMENT FOR FREE !',
    'THE BEST DEALS IN TOWN',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800 // every 4.8 seconds
    );
    return () => clearInterval(intervalId);
  }, []);

  function handleSearch(query) {
    // Split the query into individual terms
    let queryTerms = query.toLowerCase().split(' ');

    let exactMatches = [];
    let partialMatches = [];

    products.forEach(product => {
        let name = product.name.toLowerCase();
        let brand = product.brand.toLowerCase();
        let category = product.category.toLowerCase();
        let subCategory = product.sub_category.toLowerCase();

        let isExactMatch = false; 

        // Check for exact match of the entire query 
        if (queryTerms.length > 1) {
            isExactMatch = 
                name === query ||
                brand === query ||
                category === query ||
                subCategory === query;
        } 

        // If not a multi-word exact match, check for individual term matches
        if (!isExactMatch) {
            isExactMatch = queryTerms.some(term =>
                name === term ||
                brand === term ||
                category === term ||
                subCategory === term
            );
        }

        let isPartialMatch = queryTerms.every(term =>
            name.includes(term) ||
            brand.includes(term) ||
            category.includes(term) ||
            subCategory.includes(term)
        );

        if (isExactMatch) {
            exactMatches.push(product);
        } else if (isPartialMatch) {
            partialMatches.push(product);
        }
    });
    // Combine the results, prioritizing exact matches
    let filtered = exactMatches.concat(partialMatches);

    setSearchResults(filtered);
}


  

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      handleSearch(query);
    } else {
      setSearchResults([]); // clear results when query is less than 2 characters
    }
  };

  return (
    <header>
    <div className='info-bar md:flex md:flex-row md:justify-between '>
  <div className='info-item font-futurabold text-sm md:text-base'>
    {TEXTS.map((text, idx) => (
      <TextTransition key={idx} springConfig={presets.wobbly}>
        {TEXTS[(index + idx) % TEXTS.length]}
      </TextTransition>
    ))}
  </div>
</div>
<div className='mobile-primary-bar '>
<div className='flex justify-between items-center'>
  <div className='flex items-center'>
    <nav>
      <WithSubnavigation/>
    </nav>
    <RouterLink className='logo-holder' to={'/'}>
      <img src='/logo.png' alt='' className='logo' />
    </RouterLink>
  </div>
  <div className='mr-9 flex items-center'>
    <SideMenu/>
  </div>
</div>
<div className='search-bar align-bottom min-h-max  min-w-80 mx-auto mb-3'>
          <Popover isOpen={searchResults.length > 0} closeOnBlur>
            <PopoverTrigger>
              <InputGroup size="lg">
                <Input
                  placeholder="Search products or brands"
                  border="2px"
                  borderColor="black.400"
                  focusBorderColor='#4D0A1E'
                  borderRadius={0}
                  py="6"
                  pr="12"
                  fontSize="lg"
                  value={searchQuery}
                  onChange={handleChange}
                  className='font-futurabold'
                />
                <InputRightElement
                  pointerEvents="none"
                  children={<Search color="gray" />}
                  mr="2"
                />
              </InputGroup>
            </PopoverTrigger>
            <PopoverContent width="75vw">
              <Box p={4} w='100%'>
              <VStack
  divider={<StackDivider borderColor="gray.200" />}
  spacing={4}
  align="stretch"
  width="100%"
  className=' overflow-x-scroll'
>
  {searchResults.slice(0, 3).map((result, index) => {
    const firstVariation = result.variations?.[0];
    const price = firstVariation ? firstVariation.price : null;
    const size = firstVariation ? firstVariation.size : null;

    

    return (
      <div
      onClick={()=>navigateToSingleProductView(result, flag)}
        key={index}
        style={{ textDecoration: 'none' }}
        className="custom-link font-futura"
      >
        <Flex
          align="center"
          justify="space-between"
          className="bg-zinc-100 rounded-md hover:bg-brown-custom hover:text-white"
          style={{ textDecoration: 'none' }}
          p={3}
        >
          <Flex direction="column">
            <Text style={{ textDecoration: 'none' }}>{result.name}</Text>
            {price && size && (
              <Text>{`${price} ${size}`}</Text>
            )}
          </Flex>
          <Image
            src={`${result.images[0]?.url}`}
            alt={result.name}
            boxSize="50px"
            objectFit="cover"
            borderRadius="md"
          />
        </Flex>
      </div>
    );
  })}
</VStack>

                {searchResults.length > 3 && (
                  <RouterLink to={`/search-results?query=${searchQuery}`}>
                    <button className='w-full bg-brown-custom text-white mt-4 py-2 rounded-none font-futurabold'>
                      View All Results
                    </button>
                  </RouterLink>
                )}
              </Box>
            </PopoverContent>
          </Popover>
        </div>

</div>



      <div className='desktop-primary-bar'>
        <RouterLink className='logo-holder ' to={'/'}>
          <img src='/logo.png' alt='' className='logo' />
        </RouterLink>
        <div className='search-bar align-bottom min-h-max mx-4'>
          <Popover isOpen={searchResults.length > 0} closeOnBlur>
            <PopoverTrigger>
              <InputGroup size="lg">
                <Input
                  placeholder="Search products or brands"
                  border="2px"
                  borderColor="black.400"
                  focusBorderColor='#4D0A1E'
                  borderRadius={0}
                  py="6"
                  pr="12"
                  fontSize="lg"
                  value={searchQuery}
                  onChange={handleChange}
                  className='font-futurabold'
                />
                <InputRightElement
                  pointerEvents="none"
                  children={<Search color="gray" />}
                  mr="2"
                />
              </InputGroup>
            </PopoverTrigger>
            <PopoverContent width="75vw">
              <Box p={4} w='100%'>
                <SimpleGrid columns={[3, null, 3]} spacing='40px' width='100%'>
                  {searchResults.slice(0, 9).map((result, index) => {
                    const firstVariation = result.variations?.[0];
                    const price = firstVariation ? firstVariation.price : null;
                    const size = firstVariation ? firstVariation.size : null;

                    return (
                      <div
                       onClick={()=>navigateToSingleProductView(result, flag)}
                        key={index}
                        style={{ textDecoration: 'none' }}
                        className='custom-link font-futura'
                      >
                        <Flex
                          align="center"
                          justify="space-between"
                          className='bg-zinc-100 rounded-md hover:bg-brown-custom hover:text-white'
                          style={{ textDecoration: 'none' }}
                          p={3}
                        >
                          <Flex direction="column">
                            <Text style={{ textDecoration: 'none' }}>{result.name}</Text>
                            {price && size && (
                              <Text>{`${price} ${size}`}</Text>
                            )}
                          </Flex>
                          <Image
                            src={`${result.images[0]?.url}`}
                            alt={result.name}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        </Flex>
                      </div>
                    );
                  })}
                </SimpleGrid>
                {searchResults.length > 9 && (
                  <RouterLink to={`/search-results?query=${searchQuery}`}>
                    <button  className='w-full bg-brown-custom text-white mt-4 py-2 rounded-none font-futurabold'>
                      View All Results
                    </button>
                  </RouterLink>
                )}
              </Box>
            </PopoverContent>
          </Popover>
        </div>

        <div className='whatsapp-info-holder '>
          <div className='whatsapp-info'>
            <div className=' flex align-middle'>
              <SideMenu />
            </div>
          </div>
          <div className='free-shipping-banner'>
            <h6 className='font-futurabold'>Free shipping</h6>
            <p className='font-futurabold'>Orders above 15,000 bob</p>
          </div>
        </div>
      </div>
      <section className='desktop-navbar'>
        {/* <WithSubnavigation /> */}
       <WithSubnavigation/>
      </section>
      <WhatsappFloatingActionButton />
      <Breadcrumbs/>
    </header>
  );
}