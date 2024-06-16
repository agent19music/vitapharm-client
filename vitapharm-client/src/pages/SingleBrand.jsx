import {React, useContext} from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import Brand from '../components/Brand'
import VitapharmFooter from '../components/Footer'

export default function SingleBrand() {
  const {brand} = useParams()
  console.log(brand);
  const {setBrand} = useContext(ProductContext)
  setBrand(brand)

  return (
    <div>
    <Header/>
    <section>
      <Brand/>
    </section>
    <VitapharmFooter/>
    </div>
  )
}
