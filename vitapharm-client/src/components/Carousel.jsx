import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import '../App.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Skeleton, Box } from '@chakra-ui/react'; // Import Box

const BannerCarousel = () => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div style={{ maxWidth: '100vw' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="mySwiper"
        loop={true}
      >
        <SwiperSlide className="">
          {!imagesLoaded && (
            <Skeleton height="100%" width="100%" /> 
          )}
          <img
            src="/C19.png"
            alt="Banner"
            className="banner-slide"
            onLoad={handleImageLoad} // Trigger when image loads
            style={{ display: imagesLoaded ? 'block' : 'none' }} // Hide initially
          />
        </SwiperSlide>
        <SwiperSlide className="">
          {!imagesLoaded && (
            <Skeleton height="100%" width="100%" /> 
          )}
          <img
            src="/C3.png"
            alt="Banner"
            className="banner-slide"
            onLoad={handleImageLoad}
            style={{ display: imagesLoaded ? 'block' : 'none' }}
          />
        </SwiperSlide>
        <SwiperSlide className="">
          {!imagesLoaded && (
            <Skeleton height="100%" width="100%" /> 
          )}
          <img
            src="/C4.png"
            alt="Banner"
            className="banner-slide"
            onLoad={handleImageLoad}
            style={{ display: imagesLoaded ? 'block' : 'none' }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
