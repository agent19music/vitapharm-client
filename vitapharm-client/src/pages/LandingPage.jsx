import React, { useState, useEffect } from 'react';
import Carousel from '../components/2Carousel';
import Footer from '../components/ModernFooter';
import ProductsOnOffer from '../components/ProducsOnOffer';
import { Link as RouterLink } from 'react-router-dom';
import SocialVideos from '../components/SocialVideos';
import Header from '../components/Header';
import BannerCarousel from '../components/Carousel';
import RecentlyAddedProducts from '../components/RecentlyAddedProducts'

export default function LandingPage() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800 // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const slides = ['/C1.png'];
  const mobileSlides = ['/CM7.png', '/CM6.png', '/CM1.png', '/CM2.png'];

  

  return (
    <div>
      <Header/>
      <section className='bg max-w-screen my-3 carousel desktopslides'>
       <BannerCarousel/>
      </section>
      <section className='bg max-w-screen my-3 mx-0 carousel mobileslides'>
        <Carousel autoSlide={true}>
          {mobileSlides.map((s, i) => (
            <img className='banner-slide min-w-full ' key={i} src={s} />
          ))}
        </Carousel>
      </section>
   
      <section className='wrxx my-5' id='wrxx'>  
        <ProductsOnOffer />
      </section>
       <section className='wrxx my-5' >  
        <RecentlyAddedProducts />
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
              <RouterLink to={'/bookappointment'} className='group flex w-full items-center justify-center rounded py-1 text-center font-bold hover:text-white h-14'>
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
      <section className='my-5'>
      <SocialVideos/>
      </section>
      <section>
      <Footer />
      </section>
     
    </div>
  );
}
