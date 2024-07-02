import React, { useState, useEffect } from 'react';
import Carousel from '../components/2Carousel';
import Footer from '../components/ModernFooter';
import ProductList from '../components/Productlist';
import { Link as RouterLink } from 'react-router-dom';
import SocialVideos from '../components/SocialVideos';
import Header from '../components/Header';
import BannerCarousel from '../components/Carousel';

export default function LandingPage() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800 // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const slides = ['/C1.png', '/C2.png', '/C3.png', '/C1.png'];
  const mobileSlides = ['/CM1.png', '/CM1.png', '/CM1.png', '/CM1.png'];

  

  return (
    <div>
      <Header className='sticky'/>
      <section className='bg max-w-screen  carousel desktopslides'>
      <BannerCarousel/>
      </section>
   
      <section className='wrxx' id='wrxx'>  
        <ProductList />
      </section>
      <section className='my-5 '>
        <div className='container flex justify-center items-center mx-auto services'>
          <div className='items-center service-woman mr-24'>
            <img src='/service.webp' alt='lady' className='rounded-md w-140 h-70 object-cover mx-auto' />
          </div>
          <div className='container flex flex-col items-center text-wrap max-w-80'>
            <div>
              <h4 className=' font-futuramedbold p-4'>
               VITAPHARM SKIN CONSULTATION AND BEAUTY SERVICES CENTER
              </h4>
            </div>
            <div className=''>
              <p className='py-4 font-futura'>
                Our skin consultation and beauty services center offers personalized skin care solutions,
                tailored to address your unique skin concerns and needs. Our team of experts will guide
                you through a comprehensive skin analysis, providing you with a customized treatment
                plan to achieve healthy, glowing skin.
              </p>
            </div>
            <div className='group flex w-full cursor-pointer items-center justify-center vp-bo font-futurabold px-6 py- text-white transition'>
              <RouterLink to={'/333'} className='group flex w-full items-center justify-center rounded py-1 text-center font-bold hover:text-white h-14'>
                Book an appointment
              </RouterLink>
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
      <SocialVideos/>
      <Footer />
    </div>
  );
}
