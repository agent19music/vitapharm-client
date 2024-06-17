import React, { useContext } from 'react';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Brands = () => {
  const { brands } = useContext(ProductContext);

  const extractFirstLetter = (str) => {
    return str[0].toUpperCase();
  };

  const brandsWithLetters = brands.map((brand) => ({
    name: brand,
    letter: extractFirstLetter(brand),
  }));

  const groupedBrands = brandsWithLetters.reduce((acc, brand) => {
    const firstLetter = brand.letter;
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // Sort the letters and brands within each letter group
  const sortedGroupedBrands = Object.keys(groupedBrands)
    .sort()
    .reduce((acc, letter) => {
      acc[letter] = groupedBrands[letter].sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {});

  return (
    <div className="">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap justify-center">
          {Object.entries(sortedGroupedBrands).map(([letter, brands]) => (
            <div key={letter} className="w-full mb-8">
              <h2 className="text-3xl font-bold mb-4">{letter}</h2>
              <ul className="flex flex-wrap">
                {brands.map((brand, index) => (
                  <Link
                    to={`/brands/${brand.name}`}
                    key={index}
                    className="mx-2 my-1 px-4 py-2 bg-gray-200 rounded-full"
                  >
                    {brand.name}
                  </Link>
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
