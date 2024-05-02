import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';
import SignUpPage from './pages/SigupPage';
import CheckoutPage from './pages/CheckoutPage';



function App() {
 

  return (
   
    <BrowserRouter>
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<LandingPage />} />  
      <Route path="/222" element={<SingleProductCard />} />  
      <Route path="/333" element={<SignUpPage />} />  
      <Route path="/444" element={<CheckoutPage />} />  


     
      
    </Routes>

  
    </ChakraProvider>
    
    </BrowserRouter>
   
  
  )
}

export default App
