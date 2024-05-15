import React from 'react';

const Brands = ({ brands }) => {
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap justify-center">
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
  );
};

export default Brands;
