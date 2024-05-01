import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';





function App() {
 

  return (
   
    <BrowserRouter>
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<LandingPage />} />  
     
      
    </Routes>

  
    </ChakraProvider>
    
    </BrowserRouter>
   
  
  )
}

export default App
