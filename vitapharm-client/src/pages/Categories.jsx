import {React, useContext} from 'react'
import Header from '../components/Header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import Category from '../components/Category'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import VitapharmFooter from '../components/Footer'

export default function Categories() {
  const {category} = useParams();
  const {setCategory} = useContext(ProductContext);
  setCategory(category);
  return (
    <div>
        <Header/>
        <nav>
          {/* Breadcrumb here */}
        </nav>
        <section>
          <Category/>
         
        </section>
        <VitapharmFooter/>
    </div>
  )
}
