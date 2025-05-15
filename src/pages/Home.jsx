import {useEffect, useState} from 'react'
import Hero from '../components/HeroSection/Hero';
import ProductList from '../components/Products/ProductList';
import useProduct from '../contexts/Product_Context';
import Category from '../components/Sidebar/Category';
import './Home.css'

export default function Home() {
  const {getProducts,operation,category,loading}= useProduct();


  return (
   <div className="home-container">
    <Hero/>
    <Category/>

   </div>
  )
}
