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

  export default brandsWithLetters;
  