import {React, useContext} from 'react'
import Header from '../components/Header'
import AllProducts from '../components/AllProducts'
import { ProductContext } from '../context/ProductContext'
import Footer from '../components/ModernFooter'
export default function AllProductsPage() {
  return (
    <div>
      <Header />
        <nav>
          {/* Breadcrumb here */}
        </nav>
        <section>
          <AllProducts/>
         
        </section>
        <Footer/>
    </div>
  )
}
