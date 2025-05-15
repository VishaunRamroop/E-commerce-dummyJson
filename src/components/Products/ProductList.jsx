import {useState,useEffect} from 'react'
import useProduct from '../../contexts/Product_Context';
import ProductCard from './ProductCard';
import Category from '../Sidebar/Category';
import Pagination from '../Pagination/Pagination';
import '../../index.css'
export default function ProductList() {
  const {loading,setLoading,error,setError,products,getProducts,currentPage,setCurrentPage,operation,setOperation,open,setOpen,minPrice,maxPrice,total,product,category}= useProduct();

  useEffect(()=>{
    getProducts(0,operation,'',minPrice,maxPrice)
  },[operation,total,product?.length,minPrice,maxPrice])

  // useEffect(()=>{
  //   window.scrollTo({top:300,behavior:'smooth'})
  // },[currentPage])
return <>

    {total===0? <p>No products matching your filter was found</p>:<div className="flex justify-center min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 mt-4 min-h-80vh">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <img
                alt={product?.title}
                src={product?.thumbnail}
                className="aspect-3/4 w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96"
              />
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{product?.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm text-gray-500 italic">{product?.category}</p>
                  <p className="text-base font-medium text-gray-900">{product?.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
         {<Pagination/>}
      </div>
     
    </div>}
  
</>
  
}
