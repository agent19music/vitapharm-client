import React,{useState, useEffect} from 'react'
import TextTransition, { presets } from 'react-text-transition';
import { Input } from '@chakra-ui/react';
import WithSubnavigation from '../components/Navbar';



export default function Bands() {
  const TEXTS = ['30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS', 'BANKAI SENBOZAKURA KAGEYOSHI', 'KATON GYOKYAKU NO JUTSU', 'RASEN SHIRUKEN']
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4800, // every 4.8 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div>
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
                <div className='whatsapp'>
                  <div></div>
                  <div></div>
                </div>
              </div>

            </div>
            <section>
        <WithSubnavigation/>
        </section>
        </header>
       
    </div>
  )
}
