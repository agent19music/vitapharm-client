import LandingPage from './pages/LandingPage'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Bands from './pages/Bands';





function App() {
 

  return (
    <BrowserRouter>
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<Bands />} />  
      <Route path="/404" element={<LandingPage />} />
      
    </Routes>

  
    </ChakraProvider>
    
    </BrowserRouter>
  
  )
}

export default App
