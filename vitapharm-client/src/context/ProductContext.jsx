import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(['session_id']);

    useEffect(() => {
        // Set session_id cookie if it doesn't exist
        if (!cookies.session_id) {
            const sessionId = generateSessionId();
            setCookie('session_id', sessionId, { path: '/' });
        }
    }, [cookies, setCookie]);

    const sessionId = cookies.session_id;

    const apiEndpoint = 'http://127.0.0.1:5000/api/vitapharm';

    const [products, setProducts] = useState([]);
    const [onChange, setOnChange] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiEndpoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [products, apiEndpoint]);

    function addToCart(productId) {
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

    const contextData = {
        products,
        apiEndpoint,
        addToCart
    };

    return (
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    );
}

function generateSessionId() {
    return uuidv4();
}
