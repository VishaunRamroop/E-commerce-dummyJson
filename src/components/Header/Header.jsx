import {useState} from 'react';
import Navbar from './Navbar/Navbar'
import './Header.css';
import { Link } from 'react-router-dom';
import useProduct from '../../contexts/Product_Context';
export default function Header() {
  const {getProducts}= useProduct();
  return (
    <header className="header-container">
      <h1 className='header-name' onClick={async()=>{await getProducts(0,'reset','')}}><Link to={'/'}>Shop</Link></h1>
   
      <Navbar/>
    </header>
  )
}
