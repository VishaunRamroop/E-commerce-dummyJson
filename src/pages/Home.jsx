import {useEffect, useState} from 'react'
import Hero from '../components/HeroSection/Hero';
import ProductList from '../components/Products/ProductList';
import useProduct from '../contexts/Product_Context';
import './Home.css'
export default function Home() {
  const {getProducts,operation,category}= useProduct();


  return (
   <div className="home-container">
    <Hero/>
    <ProductList/>

   </div>
  )
}
