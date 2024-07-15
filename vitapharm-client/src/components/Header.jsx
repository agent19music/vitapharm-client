import React, { useState, useEffect, useContext } from 'react';
import WithSubnavigation from '../components/Navbar';
import TextTransition, { presets } from 'react-text-transition';
import SideMenu from '../components/SideMenu';
import { Link as RouterLink } from 'react-router-dom';
import { Search } from 'react-feather';
import WhatsappFloatingActionButton from './WhatsappFloatingActionButton';
import { InputGroup, Input, InputRightElement, Popover, PopoverTrigger, PopoverContent, Box, SimpleGrid, Text, Link, Flex, Image, Button, VStack, StackDivider } from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import Navbar from './MegaMenu';
import Breadcrumbs from '../components/Breadcrumb'

export default function Header() {
  const { products } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);




  const TEXTS = [
    '30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS',
    'ALL YOUR FAVOURITE SKIN CARE BRANDS FOUND HERE',
    'NEED A SERVICE ? BOOK AN APPOINTMENT FOR FREE !',
    'THE BEST DEALS IN TOWN'
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
    let lowerCaseQuery = query.toLowerCase();

    let filtered = products.filter(product => {
      let name = product.name.toLowerCase();
      let description = product.description.toLowerCase();
      let category = product.category.toLowerCase();
      let subCategory = product.sub_category.toLowerCase();

      return name.includes(lowerCaseQuery) || description.includes(lowerCaseQuery) || category.includes(lowerCaseQuery) || subCategory.includes(lowerCaseQuery);
    });

    setSearchResults(filtered);
  }
  console.log(searchResults);

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
                  focusBorderColor='#693F2D'
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
      <Link
        as={RouterLink}
        to={`/products/${result.id}`}
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
      </Link>
    );
  })}
</VStack>

                {searchResults.length > 9 && (
                  <RouterLink to={`/search-results?query=${searchQuery}`}>
                    <Button mt={4} colorScheme="teal" variant="outline">
                      View All Results
                    </Button>
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
                  focusBorderColor='#693F2D'
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
                      <Link
                        as={RouterLink}
                        to={`/products/${result.id}`}
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
                      </Link>
                    );
                  })}
                </SimpleGrid>
                {searchResults.length > 9 && (
                  <RouterLink to={`/search-results?query=${searchQuery}`}>
                    <Button mt={4} colorScheme="teal" variant="outline">
                      View All Results
                    </Button>
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
            <p className='font-futurabold'>Orders above 8000 bob</p>
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