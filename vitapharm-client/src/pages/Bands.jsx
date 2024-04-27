import React,{useState, useEffect} from 'react'
import TextTransition, { presets } from 'react-text-transition';
import { Input } from '@chakra-ui/react';
import WithSubnavigation from '../components/Navbar';
import BannerCarousel from '../components/Carousel';
import Carousel from '../components/2Carousel';




export default function Bands() {
  const TEXTS = ['30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS', 'BANKAI SENBOZAKURA KAGEYOSHI', 'KATON GYOKYAKU NO JUTSU', 'RASEN SHIRUKEN']
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800, // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const slides = [
    '/pic3.png'
  ]
  return (
    <div >
        <header>
            <div className='info-bar'>
                <div className='info-item'>  <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition></div>
            </div>
            <div >
              <div className='primary-bar'>
                <div className='logo-holder'>  
                <img src="/seanandprincelogo.jpg" alt="" className='logo' />
                </div>
                <div className='search-bar'>
                   <Input placeholder='Search product or brand' id='search.InputFieldUnderline__input.InputFieldUnderline__input--active' size='md'/>           
                </div>
                <div className='whatsapp-info-holder'>
                  <div className='whatsapp-info'>
                    <a href="" className='whatsapp'> Whatsapp</a>
                    <a href="">0745071299</a>
                  </div>
                  <div className='free-shipping-banner'>
                    <h6>Free shipping</h6>
                    <p>Orders above 3000 bob</p>

                  </div>
                </div>
              </div>

            </div>
            <section className='navbar'>
        <WithSubnavigation/>
        </section>
        </header>
        <section className='bg max-w-screen m-3'>
      <Carousel autoSlide={true} >
       {slides.map((s)=> (<img className='banner-slide' key={index} src={s}/>))}
       </Carousel>
       </section>
       <section className='image-categories flex justify-center m-3'>
        <div className='relative p-2'>  <h3 className='image-categories-titles text-center absolute inset-0 self-center text-white font-extrabold' >makeup</h3><img src="/1.jpg" alt="" /></div>
         <div className='relative p-2'>  <h3 className='image-categories-titles text-center absolute inset-0 self-center font-bold text-white' >haircare</h3><img src="/2.jpg" alt="" /></div>
        <div className='relative p-2'><h3  className='image-categories-titles text-center absolute inset-0 self-center font-bold text-white'>bodycare</h3><img src="/5.jpg" alt="" /></div>
        <div className='relative p-2'><h3  className='image-categories-titles text-center absolute inset-0 self-center font-bold text-white'> skincare</h3><img src="/3.jpg" alt="" /></div> 
         
       </section >
       <section className=' mt-4'>
        <div className='container flex justify-center items-center m-auto'>
          <div className='flex justify-center items-center '>
            <img src="/woman.webp" alt="lady" className='img-fluid' />
          </div>
          <div className='flex-column items-center text-wrap max-w-80'>
            <div><h4 className='text-bold'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime temporibus aliquid sunt recusandae corrupti, ipsa possimus modi, expedita quod hic dolorem aliquam perspiciatis.
              </h4></div>
            <div><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa reprehenderit facilis sequi laborum repudiandae, enim beatae neque itaque blanditiis illum expedita sapiente exercitationem, dolores suscipit molestiae ea a nulla illo dolor sunt earum ullam magni nesciunt. Laborum magni possimus deleniti natus rem animi dolorum enim nobis labore, nemo nihil atque aliquid necessitatibus consectetur adipisci sint molestias id. Laudantium impedit, recusandae quae, ratione vel facilis magnam nisi ipsum reiciendis vitae hic iste molestias, architecto harum expedita. Odit, quam?</p></div>
            <div></div>
          </div>
          
          </div> 

       </section>
      
    </div>
  )
}
