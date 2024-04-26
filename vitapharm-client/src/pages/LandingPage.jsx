import React, {useEffect, useState} from 'react'
import { Input } from '@chakra-ui/react'
import TextTransition, { presets } from 'react-text-transition';
import '../App.css'
import WithSubnavigation from '../components/Navbar';
import BannerCarousel from '../components/Carousel';

export default function  LandingPage

() {
  const TEXTS = ['30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS', 'BANKAI SENBOZAKURA KAGEYOSHI', 'KATON GYOKYAKU NO JUTSU', 'RASEN SHIRUKEN']
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800, // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const slides = [
    '/pic2npng', 
    '/pic4.png',
    'pic1.png'
  ]
  return (
    <div>

        <header className='whb-header'>
          <div className='whb-main-header'>
            <div >
              <div className='container'>
                <div className='web-flex'>
                  <div ></div>
                  <div >
                    <div className='wd-header-text.set-cont-mb-s.reset-last-child.animation-effect-outer'>
                      <p>roll ot </p>
                    <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
                    </div>
                  </div>
                  <div className='whb-column.whb-col-right.whb-visible-lg'> 
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='container'>
                <div className='whb-flex-row'>
                  <div></div>
                  <div> here</div>
                  <div></div>

                </div>

              </div>
            </div>
          </div>
        </header>
        <section>
        <WithSubnavigation/>
        </section>
       <section>
       <BannerCarousel/>
       </section>
      
      
       
    </div>
  )
}
