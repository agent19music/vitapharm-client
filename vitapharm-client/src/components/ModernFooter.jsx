import { React, useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Spinner } from '@chakra-ui/react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { apiEndpoint } = useContext(ProductContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isEmailError) 
      setIsLoading(true);
      {
      try {
        const response = await fetch(`${apiEndpoint}/customeremails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Stop loading, regardless of success or failure
      }
    }
  };

  const isEmailError = !success && submitted && !email.includes('@');

  return (
    <footer className="bg-brown-custom text-white p-10 font-futura">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:order-1 order-3">
          <h3 className="font-bold text-lg mb-2">OUR LOCATIONS</h3>
          <p>Nairobi- Adlife Plaza, Chania Rd</p>
          <p>Nairobi Sawa Mall, CBD Shop A14</p>
        </div>
        <div className="md:order-2 order-1">
          <h3 className="font-bold text-lg mb-2">STAY IN THE LOOP</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 mb-2 border border-gray-300 text-brown-custom rounded-none focus:outline-none focus:ring-2 focus:ring-brown-custom subinput"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit" className="w-full px-3 py-2 bg-white text-brown-custom font-bold hover:border-brown-custom rounded-none subbtn">Subscribe</button>
            {error && <p className="text-red-500">{error}</p>}
            {isEmailError && <p className="text-red-500 font-futurabold text-sm">Email is required and should include '@'.</p>}
            {success && <p className="text-green-400 font-futurabold text-sm">We have received your email!</p>}
          </form>
        </div>
        <div className="md:order-3 order-4">
          <h3 className="font-bold text-lg mb-2">GET TO KNOW US</h3>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/">Home</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/whoweare">Who We Are</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/blogs">Blog</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/photogallery">Photo Gallery</a>


        </div>
        <div className="md:order-4 order-5">
          <h3 className="font-bold text-lg mb-2">HELP & INFO</h3>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/FAQ">FAQ</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="/privacypolicy">Privacy Policy</a>
          {/* <a className="block mb-1 text-gray-100 hover:text-white" href="#">Cookie Policy</a> */}
          {/* <a className="block mb-1 text-gray-100 hover:text-white" href="#">Terms of Service</a> */}
        </div>
        <div className="md:order-5 order-2">
          <h3 className="font-bold text-lg mb-2">SOCIAL LINKS</h3>
          <a className="block mb-1 text-gray-100 hover:text-white"  target='blank' href="https://www.instagram.com/vitapharmcosmeticsandpharmacy/">Instagram</a>
          <a className="block mb-1 text-gray-100 hover:text-white"  target='blank' href="https://www.tiktok.com/@vitapharmcosmetics?lang=en">Tiktok</a>
          <a className="block mb-1 text-gray-100 hover:text-white"  target='blank' href="https://www.facebook.com/vitapharmpharmacyandcosmetics">Facebook</a>
         
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p>© 2024 - Vitapharm Cosmetics and Pharmacy</p>

      </div>
    </footer>
  );
};

export default Footer;
