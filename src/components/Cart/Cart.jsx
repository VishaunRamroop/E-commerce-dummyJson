import {useState} from 'react'
import useCart from '../../contexts/Cart_Context'
import CartItem from './CartItem';
import currencyFormatter from '../utilities/CurrencyFormatter.mjs';
import './Cart.css'
export default function Cart() {
  const {cart,getTotalPrice}= useCart();
  const total =getTotalPrice();
  console.log(currencyFormatter(total))
  return (
   <div className="cart-container">
      {cart?.map((item)=>{
        return <div key={item.id} className="cart-wrapper">
            <CartItem item={item}/>
            
        </div>
      })}   
      <p>Total : {currencyFormatter(total)}</p>
      <button className='checkout btn'>CheckOut</button>
   </div>
  )
}
