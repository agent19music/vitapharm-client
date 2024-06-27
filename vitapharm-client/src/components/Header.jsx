import React,{useState, useEffect, useContext} from 'react'
import WithSubnavigation from '../components/Navbar'
import TextTransition,{presets} from 'react-text-transition'
import SideMenu from '../components/SideMenu'
import { Link as RouterLink } from 'react-router-dom';
import { Search } from 'react-feather';
import WhatsappFloatingActionButton from './WhatsappFloatingActionButton'
import { InputGroup, Input, InputRightElement, IconButton, Popover, PopoverTrigger, PopoverContent, Box, SimpleGrid, Text, Link, Flex, Image } from '@chakra-ui/react';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';


export default function Header() {

  const {products} = useContext(ProductContext)
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
    return () => clearTimeout(intervalId);
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

const handleChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  if (query.length >= 2) {
    handleSearch(query);
  } else {
    setSearchResults([]); // clear results when query is less than 2 characters
  }
};

  // Render the categories
  

  return (
    <header>
        <div className='info-bar'>
          <div className='info-item font-futurabold'>
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </div>
        </div>
        <div className='primary-bar'>
          <RouterLink className='logo-holder ' to={'/111'}>
            <img src='/logo.png' alt='' className='logo' />
          </RouterLink>
          <div className='search-bar align-bottom min-h-max mx-4'>
  <Popover isOpen={searchResults.length > 0}>
    <PopoverTrigger>
      <InputGroup size="lg">
        <Input
          placeholder="Search products or brands"
          border="2px"
          borderColor="black.400"
          focusBorderColor='#693F2D'
          borderRadius="lg"
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
    <PopoverContent  width="75vw">
      <Box p={4} w='100%'  >
        <SimpleGrid columns={[3, null, 3]} spacing='40px' width='100%'>
          {searchResults.map((result, index) => (
            <Link
              as={RouterLink}
              to={`/product/${result.id}`}
              key={index}
              style={{ textDecoration: 'none' }}
              className='custom-link font-futura'
            >
              <Flex
                align="center"
                className='bg-zinc-100 rounded-md hover:bg-brown-custom hover:text-white'
                style={{ textDecoration: 'none' }}
              >
                <Image
                  src={`${result.images[0]?.url}`}
                  alt={result.name}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                  mr={3}
                />
                <Text style={{ textDecoration: 'none' }}>{result.name}</Text>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
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
              <p className='font-futurabold'>Orders above 3000 bob</p>
            </div>
          </div>
        </div>
        <section className='navbar'>
          <WithSubnavigation/>
        </section>
        <WhatsappFloatingActionButton/>
      </header>
  )
}
