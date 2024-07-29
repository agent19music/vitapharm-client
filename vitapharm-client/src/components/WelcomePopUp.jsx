import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Skeleton } from '@chakra-ui/react';
import { Clipboard } from 'react-feather';

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const promoCode = 'CEOBDAY10';

  useEffect(() => {
    // Check if the popup has been shown before
    if (localStorage.getItem('popupShown') !== 'true') {
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    if (showPopup && imageLoaded) {
      const hasShownFireworks = localStorage.getItem('hasShownFireworks');
      if (!hasShownFireworks) {
        const duration = 3000; // 3 seconds
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFD700', '#693F2D'] // Hex colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFD700', '#693F2D'] // Hex colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();
        localStorage.setItem('hasShownFireworks', 'true');
      }
    }
  }, [showPopup, imageLoaded]);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('popupShown', 'true'); // Store as string
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    showPopup && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="popup-overlay absolute w-full h-full bg-black opacity-50" onClick={handleClose}></div>
        <div className="popup-content relative bg-white rounded-lg shadow-lg p-8 w-96">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
            {/* Close button SVG */}
          </button>

          <Skeleton isLoaded={imageLoaded} className="w-full rounded-md mb-4">
            <img 
              src="/model2.jpeg" 
              alt="Promo" 
              className="w-full rounded-md mb-4"
              onLoad={() => setImageLoaded(true)} 
            />
          </Skeleton>

          <h3 className="text-2xl font-futuramedbold mb-2">Welcome to Vitapharm !</h3>
          <p className="text-gray-700 font-futurabold mb-4">Get 10% off your first purchase with this code on checkout</p>

          <div className="relative flex items-center justify-center shadow-sm mx-auto bg-gray-100 rounded-lg overflow-hidden">
            <input
              value={promoCode}
              readOnly
              className="w-full py-2 px-4 text-center rounded-none focus:outline-none"
              name="text"
              type="text"
            />
            <Clipboard className='hover:cursor-pointer' onClick={copyToClipboard} />
            {copied && (
              <span className="absolute top-0 left-0 w-full text-xs text-green-600">Copied!</span>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Popup;
