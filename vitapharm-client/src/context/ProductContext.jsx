import { createContext, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import HighlitedSubCategory from '../components/HighlitedSubcategory';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';



export const ProductContext = createContext();

export default function ProductProvider({ children }) {

  
    const navigate = useNavigate()
    const apiEndpoint = 'https://www.vitapharmcosmetics.co.ke/api/vitapharm';
    // const apiEndpoint = 'http://vitapharm-server-env.eba-k5q68s3p.eu-north-1.elasticbeanstalk.com/api/vitapharm'


  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productsOnOffer, setProductsOnOffer] =useState([])
  const [recentlyAddedProducts, setRecentlyAddedProducts] =useState([])
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredBrands, setFiltredBrands] = useState([]);
  const [sessionToken, setSessionToken] = useState(null);
  const [updateCart, setUpdateCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [onChange, setOnChange] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [highlitedBrand, setHighlightedBrand] = useState([]);
  const [highlitedSubCategory, setHighlightedSubCategory] = useState([]);






  const toast = useToast();

  useEffect(() => {
    const fetchSessionToken = async () => {
      try {
        let storedToken = localStorage.getItem('session_token');
        let tokenExpiration = localStorage.getItem('token_expiration');

        if (storedToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
          setSessionToken(storedToken);
        } else {
          const response = await fetch(`${apiEndpoint}/session`);
          const { session_token } = await response.json();
          const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
          localStorage.setItem('session_token', session_token);
          localStorage.setItem('token_expiration', expiration);
          setSessionToken(session_token);
        }
      } catch (error) {
        console.error('Error fetching session token:', error);
      }
    };

    fetchSessionToken(); // Fetch token on component mount

    const refreshInterval = setInterval(() => {
      fetchSessionToken();
    }, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(refreshInterval);
  }, []);
  
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch(`${apiEndpoint}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setProducts(data);
        setFilteredCategories([]);
        setFiltredBrands([]);
      } catch (error) {
        console.log(error);
      }
    };

    if (sessionToken) {
      fetchData(sessionToken);
    }
  }, [sessionToken]);

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch(`${apiEndpoint}/products/offer`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setProductsOnOffer(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (sessionToken) {
      fetchData(sessionToken);
    }
  }, [sessionToken]);

 useEffect(() => {
    const topProducts = products
      .sort((a, b) => b.id - a.id)
      .slice(0, 8);
    setRecentlyAddedProducts(topProducts);
  }, [products]);


  const addToCart = async (id) => {
    if (!sessionToken) return; // Handle missing token
    
    const isProductInCart = cartItems.some(item => item.product_id === id);
    if (isProductInCart) {
      toast({
        title: "Product already in cart.",
        description: "This product is already in your cart.",
        status: "info",
        duration: 1200,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
        colorScheme: "yellow",
      });
      return;
    }

    try {
      const response = await fetch(`${apiEndpoint}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ product_id: id, quantity: 1 })
      });
      const data = await response.json();
      
      toast({
        title: "Product added.",
        description: "The product has been added to your cart.",
        status: "success",
        duration: 1200,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
        colorScheme: "green",
      });

      setUpdateCart(prev => !prev); // Trigger cart update
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const calculateCartTotal = (cartData) => {
    if (!Array.isArray(cartData)) {
      console.error('calculateCartTotal expected an array, but received:', cartData);
      return;
    }
    
    let subtotalPrice = 0;
    cartData.forEach((item) => {
      subtotalPrice += item.quantity * item.total_price;
    });
    setSubtotal(subtotalPrice);
    setTotal(subtotalPrice);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!sessionToken) return;
      try {
        const response = await fetch(`${apiEndpoint}/cart`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error ${response.status}: ${response.statusText}`, errorData);
          return;
        }

        const data = await response.json();
        setCartItems(data);
        calculateCartTotal(data);
        setCartItemCount(data.length);
        setCartEmpty(data.length === 0);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [updateCart, sessionToken, apiEndpoint]);

  const updateCartItemQuantity = async (productId, quantityChange) => {
    if (!sessionToken) return;
    try {
      setCartItems(prevCartItems => {
        const updatedCartItems = prevCartItems.map(item => 
          item.product_id === productId ? { ...item, quantity: item.quantity + quantityChange } : item
        ).filter(item => item.quantity > 0);

        calculateCartTotal(updatedCartItems);
        return updatedCartItems;
      });

      const response = await fetch(`${apiEndpoint}/cart/update`, {
        method: 'POST',
        headers: {        
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          product_id: productId,
          quantity_change: quantityChange
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error ${response.status}: ${response.statusText}`, errorData);
        setUpdateCart(prev => !prev);
      } else {
        const updatedCart = await response.json();
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      setUpdateCart(prev => !prev);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const response = await fetch(`${apiEndpoint}/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          product_id: productId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error ${response.status}: ${response.statusText}`, errorData);
      } else {
        setUpdateCart(prev => !prev);
        toast({
          title: "Item removed from cart.",
          status: "success",
          duration: 1200,
          isClosable: true,
          position: "top-right",
          variant: "subtle",
          colorScheme: "green",
        });
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

   // Function to deslugify the URL slug to match the product name
 const scrappedDeslugify = (slug) => {
    // Split the slug into parts, using both hyphens and underscores
    const parts = slug.split(/[-_]/);
    const lastPart = parts.pop(); // Remove the last part (the nanoid)

    // Handle special cases where the % sign should be placed and add '+' where needed
    for (let i = 0; i < parts.length; i++) {
        const match = parts[i].match(/^(\d+(?:\.\d+)?)$/); // Match integers and decimals

        if (match) {
            const number = match[0];
            if (i > 0 && /(?:gel|peel|solution|suspension|acid|retinoid|retinol|resveratrol|arbutin|vitamin|lactic|glycolic|ascorbyl)$/i.test(parts[i - 1])) {
                parts[i] = `${number}%`;
            } else if (i < parts.length - 1 && /^(?:gel|peel|solution|suspension|acid|retinoid|retinol|ha)$/i.test(parts[i + 1])) {
                parts[i] = `${number}%`;
            } else if (i > 0 && /(?:bha|aha)$/i.test(parts[i - 1])) {
                parts[i] = `${number}%`;
            } else {
                parts[i] = `${number}`; // Keep the number as is
            }
        }

        // Insert '+' between certain parts
        if (parts[i].toLowerCase() === 'bha' && i > 0 && parts[i - 1].toLowerCase() === 'aha') {
            parts.splice(i, 0, '+');
            i++;
        } else if (parts[i].toLowerCase() === 'ferulic' && i > 0 && parts[i - 1].toLowerCase() === 'resveratrol') {
            parts.splice(i, 0, '+');
            i++;
        } else if (parts[i].toLowerCase() === 'ha' && i > 0 && parts[i - 1].toLowerCase() === 'arbutin') {
            parts.splice(i, 0, '+');
            i++;
        }
    }

    // Capitalize the first letter of each word and join with spaces
    const result = parts.join(' ')
                        .replace(/\b\w/g, char => char.toUpperCase())  // Capitalize the first letter of each word
                        .replace(/\s{2,}/g, ' ');  // Replace multiple spaces with a single space

    return result;
};


  const incrementQuantity = (productId) => {
    updateCartItemQuantity(productId, 1);
  };

  const decrementQuantity = (productId) => {
    const item = cartItems.find(item => item.product_id === productId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(productId, -1);
    } else {
      toast({
        title: "Minimum quantity reached.",
        description: "You cannot reduce the quantity below 1.",
        status: "info",
        duration: 1200,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
        colorScheme: "yellow",
      });
    }
  };

  function extractBrands(data) {
    const brands = data.map(item => item.brand);
    return [...new Set(brands)];
  }

  function extractCategories(data) {
    const categories = data.map(item => item.category);
    return [...new Set(categories)];
  }

  useEffect(() => {
  const categoryMap = {};

  products.forEach(product => {
    const category = product.category.toLowerCase(); // Convert to lowercase
    const sub_category = product.sub_category.toLowerCase(); // Convert to lowercase
    
    if (!categoryMap[category]) {
      categoryMap[category] = new Set(); // Use Set to avoid duplicates
    }
    categoryMap[category].add(sub_category);
  });

  const categoryArray = Object.entries(categoryMap).map(([category, subCategories]) => ({
    category,
    sub_categories: Array.from(subCategories) // Convert Set to array
  }));

  setSubCategories(categoryArray);
}, [products]); 



  let categories = extractCategories(products);
  let brands = extractBrands(products);


  const extractFirstLetter = (str) => {
    return str[0].toUpperCase();
  };

  const brandsWithLetters = brands.map((brand) => ({
    name: brand,
    letter: extractFirstLetter(brand),
  }));

  useEffect(() => {
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(products);
    }
  }, [category, products]);

  useEffect(() => {
    if (subCategory) {
      const filtered = products.filter(product => product.sub_category.toLowerCase() === subCategory.toLowerCase());
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories(products);
    }
  }, [subCategory, products]);

useEffect(() => {
  const filteredProducts = products.filter(
    (product) => product.brand.toLowerCase() === "la roche posay"
  );
    const slicedProducts = filteredProducts.slice(0, 8);

  setHighlightedBrand(slicedProducts);
}, [products]);

useEffect(() => {
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === "skincare"
  );
   

  setHighlightedSubCategory(filteredProducts);
}, [products]);

 useEffect(() => {
    if (brand) {
      const filtered = products.filter(product => product.brand === brand);
      setFiltredBrands(filtered);
    } else {
      setFiltredBrands(products);
    }
  }, [brand, products]);

  
  function slugify(int) {
    const baseSlug = int  
    return `${baseSlug}-${nanoid(12)}`;
  }
  
  function navigateToSingleProductView(product, flag) {
    const slug = slugify(product.id);
    setSelectedProduct(product);
  
    navigate(`/products/${slug}`);
  
    if (flag === 'spc') {  // Strict comparison for flag value
      window.location.reload(); // Use window.location.reload for better control
    }
  }
  




  const contextData = {
    products,
    apiEndpoint,
    addToCart,
    sessionToken,
    setCartItems,
    cartItems,
    subtotal,
    total,
    cartItemCount,
    cartEmpty,
    removeCartItem,
    calculateCartTotal,
    decrementQuantity,
    incrementQuantity,
    updateCartItemQuantity,
    brands,
    brandsWithLetters,
    categories,
    filteredCategories,
    setCategory,
    setBrand,
    filteredBrands,
    setTotal,
    setCartEmpty,
    setCartItemCount,
    productsOnOffer,
    subCategories,
    filteredSubCategories,
    setSubCategory,
    recentlyAddedProducts,
    highlitedBrand,
    highlitedSubCategory,
    selectedProduct,
   navigateToSingleProductView,
   setSelectedProduct
  };

  return (
    <ProductContext.Provider value={contextData}>
      {children}
    </ProductContext.Provider>
  );
}
