import {React, useState, useContext} from 'react';
import { Mail, Facebook, Twitter, Instagram, MessageCircle } from 'react-feather';
import { ProductContext } from '../context/ProductContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const{apiEndpoint} = useContext(ProductContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation to check if the input is an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await fetch(`${apiEndpoint}/customeremails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('There was a problem submitting your email.');
      }

      // Clear the email input after successful submission
      setEmail('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <footer className="bg-brown-custom text-white p-10 font-futura">
      <div className="flex justify-between items-center mb-10">
        <div></div>
        <div className="flex space-x-4">
          <Facebook className="text-white hover:text-pink-300" />
          <Twitter className="text-white hover:text-pink-300" />
          <Instagram className="text-white hover:text-pink-300" />
          <Mail className="text-white hover:text-pink-300" />
          <MessageCircle className="text-white hover:text-pink-300" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <div>
          <h3 className="font-bold text-lg mb-2">OUR LOCATIONS</h3>
          <p>Nairobi- Adlife Plaza, Chania Rd</p>
          <p>Nairobi Sawa Mall, CBD Shop A14</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">STAY IN THE LOOP</h3>
          <form onSubmit={handleSubmit}>
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 text-brown-custom rounded-md focus:outline-none focus:ring-2 focus:ring-brown-custom"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full px-3 py-2 bg-white text-brown-custom font-bold hover:border-brown-custom">Subscribe</button>
      </form>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">GET TO KNOW US</h3>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Home</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Who We Are</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Blog</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Contact Us</a>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">HELP & INFO</h3>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">FAQ</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Privacy Policy</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Cookie Policy</a>
          <a className="block mb-1 text-gray-100 hover:text-white" href="#">Terms of Service</a>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p>© 2024 - Vitapharm Cosmetics and Pharmacy</p>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
