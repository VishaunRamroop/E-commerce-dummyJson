import {useState} from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../contexts/Cart_Context';
import useProduct from '../../../contexts/Product_Context';
import { FaShoppingCart } from "react-icons/fa";
import './Navbar.css';
export default function Navbar() {
  const{getQuantity}= useCart();
  const {getProducts}= useProduct();
  return (
    <nav className="navbar-container">
      <ul className='navbar-wrapper'>
        <li className="nav-item">
          <Link to={'/'}><span onClick={async()=>{await getProducts(0,'reset','')}}>Home</span></Link>
        </li>
     
        <li className="nav-item">
          <Link to={'/cart'}><FaShoppingCart /> <span>{getQuantity()}</span></Link>
        </li>
        
      </ul>
    </nav>
  )
}
