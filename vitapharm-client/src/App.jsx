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
import UserProvider from './context/UserContext';
import SingleBrand from './pages/SingleBrand';
import PromoCode from './components/PromoCode';
import PhotoGallery from './pages/PhotoGallery';
import Blogs from './pages/Blogs';
import FAQPage from './pages/FAQPage';
import SearchResultsPage from './pages/SearchResults';
import ProductsOnOfferPage from './pages/ProductsOnOfferPage';



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
              <Route path="/" element={<LandingPage setUpdateCart={setUpdateCart} updateCart={updateCart} setCartItems={setCartItems} cartItems={cartItems}/>} />
              <Route path="/products/:productId" element={<SingleProductCard />} />
              <Route path="/bookappointment" element={<CustomerForm />} />
              <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>} />
              <Route path="/777" element={<PromoCode />} />
              <Route path="/photogallery" element={<PhotoGallery />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/brands/:brand" element={<SingleBrand />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/FAQ" element={<FAQPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/limitedtimeoffer" element={<ProductsOnOfferPage />} />

            </Routes>
          
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
