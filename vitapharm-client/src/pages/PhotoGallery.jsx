import React from 'react';
import { Grid, GridItem, Tooltip } from '@chakra-ui/react';
import Header from '../components/Header';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Footer from '../components/ModernFooter';


const images = [
  'pgl1.png',
  'pgl2.png',
  'pgl3.png',
  'pgl4.png',
  'pgl5.png',
  'pgl6.png',
  'pgl7.png',
  'pgl8.png',
  'pgl9.png',
  'model2.jpeg',
  'model3.jpeg',
  'model1.jpeg',
  // Add more image URLs as needed
];

export default function PhotoGallery() {
  return (
    <div>
      <Header />
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4} 
        p={4}
      >
        {images.map((src, index) => (
          <GridItem key={index}>
            <Tooltip label="Zoom In">
              <Zoom>
                <img src={src} alt={`Image ${index + 1}`} className="w-150 max-h-auto cursor-pointer object-cover" />
              </Zoom>
            </Tooltip>
          </GridItem>
        ))}
      </Grid>
      <Footer/>
    </div>
  );
}
