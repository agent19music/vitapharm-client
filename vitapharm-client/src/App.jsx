import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import 'swiper/css/bundle';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';
import CustomerForm from './pages/AppointmentPage';
import CheckoutPage from './pages/CheckoutPage';
import SideMenu from './components/SideMenu';
import Brands from './pages/Brands'
import Cart from './pages/Cart';


import { CookiesProvider } from 'react-cookie';
import ProductProvider from './context/ProductContext';
import Cookies from 'js-cookie'; // Import Cookies from js-cookie
import Header from './components/Header';
import UserProvider from './context/UserContext';


function App() {
  const [updateCart, setUpdateCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  return (
    <BrowserRouter>
     <ChakraProvider>

      <ProductProvider>
        <UserProvider>
        <CookiesProvider>
         
            <Routes>
              <Route path="/111" element={<LandingPage setUpdateCart={setUpdateCart} updateCart={updateCart} setCartItems={setCartItems} cartItems={cartItems}/>} />
              <Route path="/product/:productId" element={<SingleProductCard />} />
              <Route path="/333" element={<CustomerForm />} />
              <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>} />
              <Route path="/777" element={<Header />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/555" element={<Cart />} />
            </Routes>
          
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
