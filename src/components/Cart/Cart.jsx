import {useEffect, useState} from 'react'
import useCart from '../../contexts/Cart_Context'
import CartItem from './CartItem';
import currencyFormatter from '../utilities/CurrencyFormatter.mjs';
import './Cart.css'
// export default function Cart() {
//   const {cart,getTotalPrice}= useCart();
//   const total =getTotalPrice();
//   console.log(currencyFormatter(total))
//   console.log(cart)
//   return (
//    <div className="cart-container">
//       {cart?.map((item)=>{
//         return <div key={item.id} className="cart-wrapper">
//             <CartItem item={item}/>
            
//         </div>
//       })}   
//       <p>Total : {currencyFormatter(total)}</p>
//       <button className='checkout btn'>CheckOut</button>
//    </div>
//   )
// }
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'



export default function Cart() {
   const {cart,getSubTotalPrice,setQuantity,remove,calculateTax}= useCart();
console.log(cart)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart?.length ===0? <p>No Items in Cart</p>:cart?.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="shrink-0">
                    <img
                      alt={product?.title}
                      src={product?.thumbnail}
                      className="size-24 rounded-md object-cover sm:size-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a  className="font-medium text-gray-700 hover:text-gray-800">
                              {product?.title}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.category}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="grid w-full max-w-16 grid-cols-1">
                          <select
                            name={`quantity-${productIdx}`}
                            aria-label={`Quantity, ${product.title}`}
                            defaultValue={product?.quantity}
                            className="cursor-pointer appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                            onChange={(e)=>setQuantity(product,e.target.value)}
                          >
                        
                            {[...Array(15)].map((ipt,index)=>{
                              return <option className='flex flex-row justify-center items-center'>{index+1}</option>
                            })}
                        
                          </select>
                         
                        </div>
                            
                        <div className="absolute top-0 right-0">
                          <button type="button" className="m-2   ">
                            <span className="sr-only">Remove</span>
                            <span className="p-2 m-2 rounded-xl text-xxl text-black font-bold transition duration-150 hover:text-red-700  hover:bg-red-200" onClick={()=>{remove(product)}} >X</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                     
                    
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

     
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${getSubTotalPrice()}</dd>
              </div>
              {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  { <span>Shipping estimate</span> }
                  <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div> */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Estimated Tax</span>
             
                </dt>
                <dd className="text-sm font-medium text-gray-900">${calculateTax(getSubTotalPrice())}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${(getSubTotalPrice()+ calculateTax(getSubTotalPrice())).toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
