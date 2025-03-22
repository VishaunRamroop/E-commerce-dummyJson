import {useState} from 'react';
import useCart from '../../contexts/Cart_Context';
import './Cart.css'

export default function CartItem({item}) {
  const {id,title,description,quantity,thumbnail,price}= item;
  const {add,minus,remove}= useCart()
  return (
    <div className='cart-item'>
        <p>{title}</p>
        <img src={thumbnail} alt={title} width={100} height={100}  />
        <p>{price} x {quantity}</p>
        <div className="btn-container">
        <button  className="add btn" onClick={()=>add(item)}>Add</button>
        <button className="minus btn"  onClick={()=>minus(item)}>Minus</button>
        <button  className="remove btn" onClick={()=>remove(item)}>Remove</button>
        </div>
    </div>
  )
}
