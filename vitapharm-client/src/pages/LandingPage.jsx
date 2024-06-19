import React, { useState, useEffect } from 'react';
import Carousel from '../components/2Carousel';
import VitapharmFooter from '../components/Footer';
import ProductList from '../components/Productlist';
import { Link as RouterLink } from 'react-router-dom';
import SocialVideos from '../components/SocialVideos';
import Header from '../components/Header';

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

  const categories = [
    { title: "Makeup", image: "/1.jpg", description: "Makeup products" },
    { title: "Haircare", image: "/2.jpg", description: "Haircare products" },
    { title: "Bodycare", image: "/5.jpg", description: "Bodycare products" },
    { title: "Skincare", image: "/3.jpg", description: "Skincare products" }
  ];
  

  return (
    <div>
      <Header/>
      <section className='bg max-w-screen m-3 carousel desktopslides'>
        <Carousel autoSlide={true}>
          {slides.map((s, i) => (
            <img className='banner-slide ' key={i} src={s} />
          ))}
        </Carousel>
      </section>
      <section className='bg max-w-screen m-3 carousel mobileslides'>
        <Carousel autoSlide={true}>
          {mobileSlides.map((s, i) => (
            <img className='banner-slide ' key={i} src={s} />
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
      <section className='wrxx'>  
        <ProductList />
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
      <VitapharmFooter />
    </div>
  );
}
