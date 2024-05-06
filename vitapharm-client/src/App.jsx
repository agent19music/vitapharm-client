import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';
import SignUpPage from './pages/SigupPage';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './pages/Cart';
import {CookiesProvider} from 'react-cookie'
import ProductProvider from './context/ProductContext';


function App() {
 Cookies.set('session_id', {expires:7, path: '/'})
 const sessionId = Cookies.get('session_id');

  return (
   
    <BrowserRouter>
    <ProductProvider>
    <CookiesProvider>
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<LandingPage />} />  
      <Route path="/222" element={<SingleProductCard />} />  
      <Route path="/333" element={<SignUpPage />} />  
      <Route path="/444" element={<CheckoutPage />} />  
      <Route path="/555" element={<Cart />} />  


     
      
    </Routes>

  
    </ChakraProvider>
    </CookiesProvider>
    </ProductProvider>
    </BrowserRouter>
   
  
  )
}

export default App
