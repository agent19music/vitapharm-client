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
import SideMenu from './components/SideMenu';
import Brands from './components/Brands';


import { CookiesProvider } from 'react-cookie';
import ProductProvider from './context/ProductContext';
import Cookies from 'js-cookie'; // Import Cookies from js-cookie
import Header from './components/Header';
import UserProvider from './context/UserContext';

function App() {
  // Correctly setting and getting session_id cookie
  Cookies.set('session_id', 'value', { expires: 7, path: '/' });
  const sessionId = Cookies.get('session_id');

  return (
    <BrowserRouter>

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
              <Route path="/brands" element={<Brands />} />
            </Routes>
          </ChakraProvider>
        </CookiesProvider>
        </UserProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
