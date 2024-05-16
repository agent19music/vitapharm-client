import React from 'react';
import ImageHoverOverlay from '@findingzumo/image-hover-overlay';
const ImageWithOverlay = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ImageHoverOverlay
        image={{
          url: '/1.jpg',
          alt: 'Makeup Image',
        }}
        overlayBackgroundColor="rgba(255, 255, 255, 0.5)"
        overlayTextColor="#333"
        overlayTransitionDuration={1000} // 1000ms = 1 second
      >
        <div>
          {/* Your content here */}
          <h2>Makeup proucts</h2>
          <p>Browse our cataloge of your favourite makeup proucts</p>
        </div>
      </ImageHoverOverlay>
    </div>
  );
};

export default ImageWithOverlay;
