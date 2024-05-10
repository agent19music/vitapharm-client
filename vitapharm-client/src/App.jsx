import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import 'swiper/css/bundle';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';
import CustomerForm from './pages/AppointmentPage';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './pages/Cart';
<<<<<<< HEAD
import SideMenu from './components/SideMenu';


=======
import { CookiesProvider } from 'react-cookie';
import ProductProvider from './context/ProductContext';
import Cookies from 'js-cookie'; // Import Cookies from js-cookie
import Header from './components/Header';
import UserProvider from './context/UserContext';
>>>>>>> 2aa923a35b7b4bbe15896e0b3d86316e3837b687

function App() {
  // Correctly setting and getting session_id cookie
  Cookies.set('session_id', 'value', { expires: 7, path: '/' });
  const sessionId = Cookies.get('session_id');

  return (
    <BrowserRouter>
<<<<<<< HEAD
    <ChakraProvider>
      <Routes>
      <Route path="/111" element={<LandingPage />} />  
      <Route path="/222" element={<SingleProductCard />} />  
      <Route path="/333" element={<SignUpPage />} />  
      <Route path="/444" element={<CheckoutPage />} />  
      <Route path="/555" element={<Cart />} />  
      <Route path="/666" element={<SideMenu />} />


     
      
    </Routes>

  
    </ChakraProvider>
    
=======
      <ProductProvider>
        <UserProvider>
        <CookiesProvider>
          <ChakraProvider>
            <Routes>
              <Route path="/111" element={<LandingPage />} />
              <Route path="/222" element={<SingleProductCard />} />
              <Route path="/333" element={<CustomerForm />} />
              <Route path="/444" element={<CheckoutPage />} />
              <Route path="/555" element={<Cart />} />
              <Route path="/777" element={<Header />} />
            </Routes>
          </ChakraProvider>
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
>>>>>>> 2aa923a35b7b4bbe15896e0b3d86316e3837b687
    </BrowserRouter>
  );
}

export default App;
