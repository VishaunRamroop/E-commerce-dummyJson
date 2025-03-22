import {useState,useEffect} from 'react'
import useProduct from '../../contexts/Product_Context';
import ProductCard from './ProductCard';
import Category from '../Sidebar/Category';
import Pagination from '../Pagination/Pagination'
import './Products.css'
export default function ProductList() {
  const {loading,setLoading,error,setError,products,getProducts,currentPage,setCurrentPage,operation,setOperation,open,setOpen}= useProduct();

  useEffect(()=>{
    getProducts(0,operation,'',null)
  },[operation])
  return (
 
   <div className="product-container" >
      <Category/>
    
      <div className="product-wrapper">
      
      {loading? <h1>Loading Products Please wait</h1>: products?.map((product)=>{
          return <ProductCard key={product.id} product ={product}/>
        })}
        <Pagination/>
      </div>
       
   </div>
  )
}
