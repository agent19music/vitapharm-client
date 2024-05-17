import React,{useState, useEffect} from 'react'
import WithSubnavigation from '../components/Navbar'
import TextTransition,{presets} from 'react-text-transition'
import SideMenu from '../components/SideMenu'
import {  InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Search } from 'react-feather';
import WhatsappFloatingActionButton from './WhatsappFloatingActionButton'


export default function Header() {
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
 
  
  // Render the categories
  

  return (
      <header>
        <WhatsappFloatingActionButton/>
        <div className='info-bar'>
          <div className='info-item'>
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </div>
        </div>
        <div className='primary-bar'>
          <Link className='logo-holder ' to={'/111'}>
            <img src='/logo.png' alt='' className='logo' />
          </Link>
          <div className='search-bar align-bottom min-h-max mx-4'>
          <InputGroup size="lg">
      <Input
        placeholder="Search products or brands"
        border="2px"
        borderColor="black.400"
        focusBorderColor='pink.400'
        borderRadius="lg"
        py="6"
        pr="12"
        fontSize="lg"
      />
      <InputRightElement
        pointerEvents="none"
        children={<Search color="gray" />}
        
        mr="2"
      />
    </InputGroup>
          </div>
          <div className='whatsapp-info-holder '>
            <div className='whatsapp-info'>
            <div className=' flex align-middle'>
            <SideMenu/>
            </div>
              
            </div>
            <div className='free-shipping-banner'>
              <h6>Free shipping</h6>
              <p>Orders above 3000 bob</p>
            </div>
          </div>
        </div>
        <section className='navbar'>
<WithSubnavigation/>


  
</section>
      </header>
  )
}
