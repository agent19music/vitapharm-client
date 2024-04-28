import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ProductContext = createContext()

export default function ProductProvider({ children }) {

const apiEndpoint = '/api/v1/products.json?brand=covergirl&product_type=foundation'

const [products, setProducts] = useState([])
const [onChange, setOnChange] = useState(false)

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
}, [products,apiEndpoint]);



const contextData = {
   products,
   apiEndpoint
  }

  return (
    <ProductContext.Provider value={contextData}>{children}</ProductContext.Provider>
  )
}