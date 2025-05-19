import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import useProduct from '../../contexts/Product_Context';
import useCart from '../../contexts/Cart_Context';
import Pagination from '../Pagination/Pagination';

import toast,{ useToaster } from 'react-hot-toast';
import '../../index.css'
export default function ProductList() {
  const {loading,setLoading,error,setError,products,getProducts,currentPage,setCurrentPage,operation,setOperation,open,setOpen,minPrice,maxPrice,total,product,category,setCategory}= useProduct();
const{add,cart}= useCart();


async function handleAdd(product){
  try {
   const addItem= await add(product);

  toast.success(`Successfully added ${product.title} Item`)

  } catch (error) {
    console.error(error)
    toast.error('Item Not added')
  }
}

  useEffect(()=>{
    getProducts(currentPage,operation,category,minPrice,maxPrice)
   
  },[currentPage])
// console.log(cart)
  // useEffect(()=>{
  //   window.scrollTo({top:300,behavior:'smooth'})
  // },[currentPage])
return <>

    {<div className="flex justify-center ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 mt-4 min-h-80vh">
          {products?.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col rounded-lg border border-gray-200 bg-white min-h-100vh"
            >
              <img
                alt={product?.title}
                src={product?.thumbnail}
                className="aspect-3/4 w-full bg-gray-200 object-cover  sm:aspect-auto sm:h-96"
              />
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0 pointer-events-none" />
                    {product.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{product?.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm text-gray-500 italic">{product?.category}</p>
                  <p className="text-base font-medium text-gray-900">${product?.price}</p>
                </div>
                <button className='font-bold text-lg bg-red-500 text-white p-3 rounded-md cursor-pointer transition duration-300 hover:bg-red-600 active:bg-red-400 active:text-black' onClick={()=>handleAdd(product)}>Add</button>
              </div>
               
            </div>
           
          ))}
          
        </div>
         {<Pagination/>}
      </div>
     
    </div>}
  
</>
  
}
