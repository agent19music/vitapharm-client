import LandingPage from './pages/LandingPage'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/css/bundle';
import REACTDOM from 'react-dom'





function App() {
 

  return (
    <div>
    <ChakraProvider>
    <LandingPage/>

  
    </ChakraProvider>
    </div>
  
  )
}

export default App
