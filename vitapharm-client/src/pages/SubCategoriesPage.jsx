import {React, useContext} from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/ModernFooter';
import SubCategory from '../components/SubCategory';


export default function SubCategoriesPage() {
    const {subcategory} = useParams();
    const {setSubCategory} = useContext(ProductContext);
    setSubCategory(subcategory);
  return (
    <div>
    <Header />
      <nav>
        {/* Breadcrumb here */}
      </nav>
      <section>
        <SubCategory/>
       
      </section>
      <Footer/>
  </div>
  )
}
