import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import '../App.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Import Tailwind CSS classes
import 'tailwindcss/tailwind.css';

const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      effect="fade"
      className="mySwiper"
    >
      {/* Add SwiperSlide components here */}
      <SwiperSlide className="">
        <img
          src="/"
          alt="Banner"
          className="banner-slide"
        />
      </SwiperSlide>
      <SwiperSlide className="">
        <img
          src="/"
          alt="Banner"
          className="banner-slide"
        />
      </SwiperSlide>
      {/* Repeat SwiperSlide for additional images */}
    </Swiper>
  );
};

export default BannerCarousel;
