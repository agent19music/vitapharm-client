import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';




function App() {
 

  return (
   
    <BrowserRouter>
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<LandingPage />} />  
      <Route path="/222" element={<SingleProductCard />} />  

     
      
    </Routes>

  
    </ChakraProvider>
    
    </BrowserRouter>
   
  
  )
}

export default App
