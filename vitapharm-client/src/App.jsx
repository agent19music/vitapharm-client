import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import 'swiper/css/bundle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SingleProductCard from './components/SingleProductCard';
import CustomerForm from './pages/AppointmentPage';
import CheckoutPage from './pages/CheckoutPage';
import Brands from './pages/Brands'
import Cart from './pages/Cart';
import Categories from './pages/Categories';


import { CookiesProvider } from 'react-cookie';
import ProductProvider from './context/ProductContext';
import Header from './components/Header';
import UserProvider from './context/UserContext';
import SingleBrand from './pages/SingleBrand';
import Pay from './pages/paystack';
import Payment from './pages/paystackfull';



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
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/brands/:brand" element={<SingleBrand />} />
              <Route path='/pay' element={<Pay />} />
              <Route path='/payment' element={<Payment />} />

            </Routes>
          
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
