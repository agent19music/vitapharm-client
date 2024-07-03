import {React, useContext} from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import Brand from '../components/Brand'
import Footer from '../components/ModernFooter'

export default function SingleBrand() {
  const {brand} = useParams()
  console.log(brand);
  const {setBrand} = useContext(ProductContext)
  setBrand(brand)

  return (
    <div>
    <section>
      <Brand/>
    </section>
    <Footer/>
    </div>
  )
}
