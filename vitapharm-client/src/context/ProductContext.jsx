import { createContext, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";


export const ProductContext = createContext();

export default function ProductProvider({ children }) {

  

    const apiEndpoint = 'http://127.0.0.1:5000/api/vitapharm';

    const [products, setProducts] = useState([]);
    const [sessionToken, setSessionToken] = useState(null);
    const [onChange, setOnChange] = useState(false);


    useEffect(() => {
        const fetchSessionToken = async () => {
            try {
                let storedToken = localStorage.getItem('session_token')
                let tokenExpiration = localStorage.getItem('token_expiration')

                if (storedToken && tokenExpiration && new Date(tokenExpiration) > new Date()) {
                    setSessionToken(storedToken);
                } else {
                    const response = await fetch('http://localhost:5000/api/vitapharm/session');
                    const { session_token } = await response.json();
                    storedToken = session_token
                    tokenExpiration = new Date(Date.now() + 2 * 60 * 60 * 1000);
                    localStorage.setItem('session_token', session_token);
                    localStorage.setItem('token_expiration', tokenExpiration)
                    setSessionToken(session_token);

                }
            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };

        fetchSessionToken(); // Fetch token on component mount

        // expiration timer for the token
        const expirationTimer = setTimeout(() => {
            // Token expired, fetch a new token
            fetchSessionToken();
        }, 2 * 60 * 60 * 1000); // 2 hours timer

        return () => clearTimeout(expirationTimer); // clears timer on component unmount
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
    

    function addToCart2(productId) {
        console.log('productId:', productId);
        console.log('sessionId:', sessionId);
        fetch(`${apiEndpoint}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionId}`
            },
            body: JSON.stringify({ productId })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Item added to cart:', data);
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
        });
    }

    const addToCart = async (id) => {
      const toast = useToast()
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
              description: "The product has been successfully added to your cart.",
              status: "success",
              duration: 5000,
              isClosable: true,
          });
      } catch (error) {
          console.error('Error adding to cart:', error);
      }
  };
  

    const contextData = {
        products,
        apiEndpoint,
        addToCart,
        sessionToken
    };

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    );
}


