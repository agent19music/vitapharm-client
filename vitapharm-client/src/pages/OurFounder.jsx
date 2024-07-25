import React from 'react';
import founderImage1 from '/cessjourney.webp'; // Replace with your image paths
import founderImage2 from '/cessjourney2.webp';
import founderImage3 from '/cessjourney.jpg';
import Header from '../components/Header'
import Footer from '../components/ModernFooter'


const FounderPage = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen py-16 px-8 md:px-16 lg:px-32 container mx-auto"> 
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center font-futuramedbold mb-8 text-brown-custom">Meet Our Founder</h1>

      {/* Founder Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <img 
          src={founderImage1} 
          alt="Founder" 
          className="w-full h-auto rounded-lg shadow-lg" 
        />
        <img 
          src={founderImage2} 
          alt="Founder" 
          className="w-full h-auto rounded-lg shadow-lg" 
        />
        <img 
          src={founderImage3} 
          height='366'
          widht='366'
          alt="Founder" 
          className="w-full h-auto rounded-lg shadow-lg" 
        />
      </div>

      {/* Founder Story */}
     <div className="prose lg:prose-xl text-gray-800 leading-relaxed font-futurabold mt-8">
          <p className="text-xl">  {/* Increased text size */}
            Our founder, Cecilia Kafura, knows firsthand the struggles of achieving radiant, healthy skin.  
            For years, she battled with acne,rough and untextured skin feeling frustrated and disheartened by the lack of effective solutions.
          </p>
          <p className="text-xl">
            Fueled by her own journey, she immersed herself in the world of skincare, becoming an expert in the science and art of skin health.  
            Drawing on her personal experiences and extensive knowledge, she developed a unique approach to skincare that focuses on achieving glowing and radiant skin. 
          </p>
          <p className="text-xl">
            Today, Cecilia has helped thousands of women overcome their own skin challenges and discover the joy of truly glowing skin.  
            Her passion and expertise are woven into every product and service we offer, making us the trusted partner in your quest for timeless beauty.
          </p>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default FounderPage;
