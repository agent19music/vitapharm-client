import { createContext, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";


export const ProductContext = createContext();

export default function ProductProvider({ children }) {

  

    const apiEndpoint = 'http://127.0.0.1:5000/api/vitapharm';

    const [products, setProducts] = useState([]);
    const [sessionToken, setSessionToken] = useState(null);
    const [updateCart, setUpdateCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [onChange, setOnChange] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0); // State to track number of items in cart
    const [cartEmpty, setCartEmpty] = useState(true); // State to track if cart is empty

    const toast = useToast();




    useEffect(() => {
      const fetchSessionToken = async () => {
        try {
            let storedToken = localStorage.getItem('session_token');
            let refreshToken = localStorage.getItem('refresh_token');
            let tokenExpiration = localStorage.getItem('token_expiration');
    
            if (storedToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
                setSessionToken(storedToken);
            } else if (refreshToken) {
                const response = await fetch('http://localhost:5000/api/vitapharm/session/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`
                    }
                });
                const data = await response.json();
                const newToken = data.session_token;
                const newExpiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
                localStorage.setItem('session_token', newToken);
                localStorage.setItem('token_expiration', newExpiration);
                setSessionToken(newToken);
            } else {
                const response = await fetch('http://localhost:5000/api/vitapharm/session');
                const { session_token, refresh_token } = await response.json();
                const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
                localStorage.setItem('session_token', session_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('token_expiration', expiration);
                setSessionToken(session_token);
            }
        } catch (error) {
            console.error('Error fetching session token:', error);
        }
    };

        fetchSessionToken(); // Fetch token on component mount

        // expiration timer for the token
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
                console.log("Data fetched:", data); // Log the data here
            } catch (error) {
                console.log(error);
            }
        };
        
        if (sessionToken) {
            fetchData(sessionToken);
        }
    
    }, [sessionToken]);
    


    const addToCart = async (id) => {
        if (!sessionToken) return; // Handle missing token
    
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
          console.log(data);
    
          // Add the toast here
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
        // setUpdateCart(true); // Trigger cart update
        // setUpdateCart(false); // Reset trigger
      };

      const calculateCartTotal = (cartData) => {
        if (!Array.isArray(cartData)) {
            console.error('calculateCartTotal expected an array, but received:', cartData);
            return;
        }
        
        let subtotalPrice = 0;
        cartData.forEach((item) => {
            subtotalPrice += item.quantity * item.variation_price; // Ensure correct calculation
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
        setCartItemCount(data.length); // Update cart item count
        setCartEmpty(data.length === 0); // Update cart empty status
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [updateCart, sessionToken, apiEndpoint]);

  const updateCartItemQuantity = async (productId, quantityChange) => {
    if (!sessionToken) return;
    try {
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
            return;
        }

        const updatedCart = await response.json();
        console.log('Updated Cart Response:', updatedCart); // Debugging
a
        if (Array.isArray(updatedCart)) {
            setCartItems(updatedCart); // Set updated cart items directly
            calculateCartTotal(updatedCart); // Calculate the total based on updated cart
        } else {
            console.error('Unexpected response format:', updatedCart);
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
    }
};


  
  const incrementQuantity = (productId) => {
    updateCartItemQuantity(productId, 1);
  };

  const decrementQuantity = (productId) => {
    updateCartItemQuantity(productId, -1);
  };

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
    calculateCartTotal,
    decrementQuantity,
    incrementQuantity,
    updateCartItemQuantity,
     
};


    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    );
}