import React from 'react'

export default function Brands() {

    const brands = [
        'Absolute Repair',
        'Baki',
        'Bio Balance',
        'Bio-Oil',
        'Cerave',
        'Curl Expression',
        'DANG!',
        'Garnier',
        'Goatee',
        'Korean Skincare Brands',
        'L\'Oréal Professionnel Paris',
        'La Roche Posay',
        'L’ORÉAL',
        'L’ORÉAL PARIS',
        'Mandevu',
        'Marini Naturals',
        'Mizani',
        'ORS',
        'Products for Him: BaKi Bros',
        'Qasil',
        // Add more brands as needed
      ];
      
      const extractFirstLetter = (str) => {
        return str[0].toUpperCase();
      };
      
      const brandsWithLetters = brands.map((brand) => ({
        name: brand,
        letter: extractFirstLetter(brand),
      }));

      
  return (
    <div> <div className="flex flex-wrap justify-center">
    {Object.entries(groupedBrands).map(([letter, brands]) => (
      <div key={letter} className="w-full my-4">
        <h2 className="text-2xl font-bold mb-2">{letter}</h2>
        <ul className="flex flex-wrap">
          {brands.map((brand, index) => (
            <li key={index} className="mx-2">
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  </div>
  )
}
