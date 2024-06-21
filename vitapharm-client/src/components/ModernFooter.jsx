import React from 'react';
import { Mail, Facebook, Twitter, Instagram, MessageCircle } from 'react-feather';

const Footer = () => {
  return (
    <footer className="bg-brown-custom text-white p-10 font-futura">
      <div className="grid grid-cols-4 gap-10">
        <div>
          <h3 className="font-bold text-lg mb-2">OUR LOCATIONS</h3>
          <p>Nairobi- Adile Plaza, Chania</p>
          <p>Nairobi Jammia Mal, CBD Shop</p>
          <p>Mombasa- Nyoli Centre Shoje</p>
          <p>Jubileo Exchange Building, Kaunda Stech Shop Na. 3, CBD</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">STAY IN THE LOOP</h3>
          <input className="w-full px-3 py-2 mb-2 border border-gray-300 text-brown-custom rounded-md" type="email" placeholder="Email Address" />
          <button className="w-full px-3 py-2 bg-white text-brown-custom font-bold rounded-md">Subscribe</button>
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
        <div className="flex space-x-4">
          <Facebook className="text-white hover:text-pink-300" />
          <Twitter className="text-white hover:text-pink-300" />
          <Instagram className="text-white hover:text-pink-300" />
          <Mail className="text-white hover:text-pink-300" />
          <MessageCircle className="text-white hover:text-pink-300" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
