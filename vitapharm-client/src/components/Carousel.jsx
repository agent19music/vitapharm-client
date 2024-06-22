import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import '../App.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const BannerCarousel = () => {
  return (
    <div style={{ maxWidth: '100vw' }}>
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
        loop={true}
      >
        {/* Add SwiperSlide components here */}
        <SwiperSlide className="">
          <img
            src="/C1.png"
            alt="Banner"
            className="banner-slide"
           
          />

        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="/C2.png"
            alt="Banner"
            className="banner-slide"
            
          />
        </SwiperSlide>
        <SwiperSlide className="">
          <img
            src="/C2.png"
            alt="Banner"
            className="banner-slide"
            
            
          />
        </SwiperSlide>
        {/* Repeat SwiperSlide for additional images */}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
