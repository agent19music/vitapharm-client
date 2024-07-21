import React from 'react';
import { Grid, GridItem, Tooltip, IconButton } from '@chakra-ui/react';
import Header from '../components/Header';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const images = [
  'booklady.jpg',
  'booklady.jpg',
  'booklady.jpg',
  'model2.jpeg',
  'model3.jpeg',
  'model1.jpeg',
  // Add more image URLs as needed
];

export default function PhotoGallery() {
  return (
    <div>
      <Header/>
    <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
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
  </div>
  
  );
}

