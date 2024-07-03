import React from 'react';
import { Grid, GridItem, Tooltip, IconButton } from '@chakra-ui/react';
import Header from '../components/Header';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const images = [
  'booklady.jpg',
  'booklady.jpg',
  'booklady.jpg',
  'booklady2.jpg',
  'booklady2.jpg',
  'booklady2.jpg',
  // Add more image URLs as needed
];

export default function PhotoGallery() {
  return (
    <div>
    <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
      {images.map((src, index) => (
        <GridItem key={index}>
          <Tooltip label="Zoom In">
            <Zoom>
              <img src={src} alt={`Image ${index + 1}`} className="w-150 h-50 cursor-pointer object-cover" />
            </Zoom>
          </Tooltip>
        </GridItem>
      ))}
    </Grid>
  </div>
  
  );
}

