import React,{useState} from 'react'
import WithSubnavigation from '../components/Navbar'
import TextTransition,{presets} from 'react-text-transition'
import SideMenu from '../components/SideMenu'
import { Input } from '@chakra-ui/react'

export default function Header() {
    const TEXTS = ['30% OFF ON ALL FACIAL PRODUCTS ON SUNDAYS', 'BANKAI SENBOZAKURA KAGEYOSHI', 'KATON GYOKYAKU NO JUTSU', 'RASEN SHIRUKEN']
    const [index, setIndex] = useState(0);

  return (
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
<div className=' flex align-middle'>
 <SideMenu/>
</div>

  
</section>
</header>
  )
}
