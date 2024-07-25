import { React, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/ModernFooter';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export default function WhoWeAre() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
        <div className="container mx-auto py-24 px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-futurabold text-white">Unveil Your Natural Radiance</h1>
          <p className="text-xl md:text-2xl mt-4 text-white font-futurabold">Your journey to healthy, glowing skin starts here.</p>
        </div>
      </section>

      {/* About Us Content */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image Section (Replace with actual image) */}
          <div className="md:order-last">
 <img src="/model2.jpeg" alt="Skincare expert" className="lg:w-3/4 rounded-lg shadow-md" /> 
           </div>

          {/* Text Section */}
          <div className="prose max-w-none">
            <h2 className="text-3xl md:text-4xl font-futurabold brown-custom mb-8">Your Skin, Our Passion</h2>
            <p className='font-futurabold'>
              At Vitapharm, we're more than just a skincare shop. We're your partners in achieving the 
              luminous, healthy skin you've always dreamed of. Our carefully selected range of premium 
              products and bespoke services are designed to nourish, rejuvenate, and enhance your skin's natural beauty.
            </p>
            <p className='font-futurabold'>
              Led by a team of passionate skincare experts, we're committed to providing personalized 
              care and guidance tailored to your unique needs. We believe that every individual's skin 
              is a masterpiece, and we're here to help you unveil its full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-futurabold brown-custom text-center mb-8">Discover Our World of Transformation</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-futuramedbold brown-custom">Luxurious Facials</h3>
              <p>Revitalize and pamper your skin with our signature facials.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-futuramedbold brown-custom">Body Bliss</h3>
              <p className='font-futurabold'>Relax and rejuvenate with our soothing massages and expert waxing.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-futuramedbold brown-custom">Advanced Solutions</h3>
              <p className='font-futurabold'>Unveil your skin's best with cutting-edge treatments.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/bookappointment" className="bg-brown-custom hover:bg-white hover:text-brown-custom text-white font-futurabold py-3 px-6 rounded">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
