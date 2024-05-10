import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';
import WithSubnavigation from '../components/Navbar';
import Carousel from '../components/2Carousel';
import VitapharmFooter from '../components/Footer';
import TwoProductList from '../components/Productlist';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { Search } from 'react-feather';
import SocialVideos from '../components/SocialVideos';

export default function LandingPage() {

  const TEXTS = [
    '30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS',
    'BANKAI SENBOZAKURA KAGEYOSHI',
    'KATON GYOKYAKU NO JUTSU',
    'RASEN SHIRUKEN'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800 // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const slides = ['/pic3.png', '/pic3.png', '/pic3.png', '/pic3.png'];

  const categories = [
    { title: "Makeup", image: "/1.jpg", description: "Makeup products" },
    { title: "Haircare", image: "/2.jpg", description: "Haircare products" },
    { title: "Bodycare", image: "/5.jpg", description: "Bodycare products" },
    { title: "Skincare", image: "/3.jpg", description: "Skincare products" }
  ];
  
  // Render the categories
  

  return (
    <div>
      <header>
        <div className='info-bar'>
          <div className='info-item'>
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </div>
        </div>
        <div className='primary-bar'>
          <div className='logo-holder '>
            <img src='/logo.png' alt='' className='logo' />
          </div>
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
              <a href='' className='whatsapp'>
                Whatsapp
              </a>
              <a href=''>0745071299</a>
            </div>
            <div className='free-shipping-banner'>
              <h6>Free shipping</h6>
              <p>Orders above 3000 bob</p>
            </div>
          </div>
        </div>
        <section className='navbar'>
<WithSubnavigation/>
<div className=' flex align-middle'>
 <SideMenu/>
</div>

  
</section>
      </header>
      <section className='bg max-w-screen m-3'>
        <Carousel autoSlide={true}>
          {slides.map((s, i) => (
            <img className='banner-slide' key={i} src={s} />
          ))}
        </Carousel>
      </section>
      <section className='image-categories flex justify-center m-3'>
  {categories.map((category, index) => (
    <div className='relative p-2 overflow-hidden' key={index}>
      <h3 className='image-categories-titles text-center absolute inset-0 text-white font-extrabold'>
        {category.title}
      </h3>
      <img
        className='category-pic transform transition-transform duration-300 group-hover:scale-110'
        src={category.image}
        alt={category.title}
      />
      <div className="text-center absolute bottom-0 left-0 w-full h-0 overflow-hidden transition-all duration-500 ease-in-out bg-black bg-opacity-50 group-hover:h-full">
        <p className="text-white font-bold py-2 transform translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">{category.description}</p>
      </div>
    </div>
  ))}
</section>




      <section>
        <TwoProductList />
      </section>
      <section className='my-4'>
  <div className='container flex justify-center items-center mx-auto services'>
    <div className='items-center service-woman mr-24'>
      <img src='/service.webp' alt='lady' className='rounded-md w-140 h-70 object-cover mx-auto' />
    </div>
    <div className='container flex flex-col items-center text-wrap max-w-80'>
      <div>
        <h4 className='font-bold p-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          temporibus aliquid sunt recusandae corrupti, ipsa possimus modi,
          expedita quod hic dolorem aliquam perspiciatis.
        </h4>
      </div>
      <div className=''>
        <p className='py-4'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
          reprehenderit facilis sequi laborum repudiandae, enim beatae
          neque itaque blanditiis illum expedita sapiente exercitationem,
          dolores suscipit molestiae ea a nulla illo dolor sunt earum ullam
          magni nesciunt. Laborum magni possimus deleniti natus rem animi
          dolorum enim nobis labore, nemo nihil atque aliquid necessitatibus
          consectetur adipisci sint m
        </p>
      </div>
      <div className='group flex w-full cursor-pointer items-center justify-center vp-bo px-6 py- text-white transition'>
        <Link to={'/333'} className='group flex w-full items-center justify-center rounded py-1 text-center font-bold hover:text-white'>
          Book an appointment
        </Link>
        <svg
          className='flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M14 5l7 7m0 0l-7 7m7-7H3' />
        </svg>
      </div>
    </div>
  </div>
</section>

      {/* <SocialVideos/> */}
      <VitapharmFooter />
    </div>
  );
}
