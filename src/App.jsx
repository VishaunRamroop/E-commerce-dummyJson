import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './pages/Home'
import ProductPage from './components/Products/ProductPage';
import Cart from './components/Cart/Cart';
function App() {
 

  return (
   <div className="app">
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/cart' element={<Cart/>}/>
 
    </Routes>
   </div>
  )
}

export default App
