import {useState} from 'react'
import { Link } from 'react-router-dom';
import ProductPage from './ProductPage';
import useProduct from '../../contexts/Product_Context';
import useCart from '../../contexts/Cart_Context';
export default function ProductCard({product}) {
  const {id,title,description,price,category,thumbnail}= product;
  const{handleProductPage,setProductId}= useProduct();
  const {add,cart,minus}= useCart();
 
  console.log(cart)
  return (
    <div className='card'>
      <img src={thumbnail} alt={title} loading='lazy' />
      <div className="card-body">
        <p>{title}</p>
        <p>{description}</p>  
        <p>${price}</p>
      </div>
      <button className='add-btn' onClick={()=>{add(product)}}>Add to Cart</button>
     
    </div>
  )
}
