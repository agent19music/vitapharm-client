import React from 'react';
import brandsWithLetters from '../components/BrandsWithLetters';
import Header from '../components/Header';

const Brands = () => {
  let brands = brandsWithLetters;
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  return (
    <div className="">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap justify-center">
          {Object.entries(groupedBrands).map(([letter, brands]) => (
            <div key={letter} className="w-full mb-8">
              <h2 className="text-3xl font-bold mb-4">{letter}</h2>
              <ul className="flex flex-wrap">
                {brands.map((brand, index) => (
                  <li key={index} className="mx-2 my-1 px-4 py-2 bg-gray-200 rounded-full">
                    {brand.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
