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
import Categories from './pages/SingleCategoryPage';

import { CookiesProvider } from 'react-cookie';
import ProductProvider from './context/ProductContext';
import UserProvider from './context/UserContext';
import SingleBrand from './pages/SingleBrandPage';
import PromoCode from './components/PromoCode';
import PhotoGallery from './pages/PhotoGallery';
import Blogs from './pages/Blogs';
import FAQPage from './pages/FAQPage';
import SearchResultsPage from './pages/SearchResults';
import ProductsOnOfferPage from './pages/ProductsOnOfferPage';
import SubCategoriesPage from './pages/SubCategoriesPage';
import CategoriesPage from './pages/CategoriesPage';
import AllProductsPage from './pages/AllProductsPage';
import WhoWeAre from './pages/WhoWeAre'
import FounderPage from './pages/OurFounder'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFoundPage from './pages/NotFoundPage';

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
              <Route path="/products/:productSlug" element={<SingleProductCard />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/bookappointment" element={<CustomerForm />} />
              <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>} />
              <Route path="/photogallery" element={<PhotoGallery />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:category" element={<Categories />} />
              <Route path="/categories/:category/:subcategory" element={<SubCategoriesPage />} />
              <Route path="/brands/:brand" element={<SingleBrand />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/FAQ" element={<FAQPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/limitedtimeoffer" element={<ProductsOnOfferPage />} />
              <Route path="/whoweare" element={<WhoWeAre />} />
              <Route path="/ourfounder" element={<FounderPage />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
