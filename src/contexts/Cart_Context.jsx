import { useState,useContext,createContext } from "react";
import useProduct from "./Product_Context";
import useLocalStoreage from "../hooks/useLocalStorage.mjs";
const CartContext= createContext();


export function CartProvider({children}){

const [cart,setCart]= useLocalStoreage('cart',[]);

const [totalCost,setTotalCost]= useState(0);

function getQuantity(){
 
let quantity=0;
cart?.forEach((item)=>{quantity =item.quantity +quantity})
return quantity
}

function getTotalPrice(){
let price=0;
cart?.forEach((item)=>{
  price = item.quantity* item.price +price;
});
return price
}


function add(arg) {


console.log(arg)

  setCart(cart=>{
    const existingProduct = cart?.find(item=>item.id===arg.id);
  
    if(!existingProduct){
      return [...cart,{id:arg.id,title:arg.title,description:arg.description,category:arg.category,thumbnail:arg.thumbnail,quantity:1,price:arg.price}]
    }else{
      return cart.map((item)=> item.id===arg.id? {...item,quantity:item.quantity+1} :item
      )
    }
   });
    
};
function setQuantity(arg,quant){
  setCart(cart=> {
    const existingProduct = cart.find(item=>item.id===arg.id);
    if(existingProduct){
      return cart?.map((item)=> item.id===arg.id?{ ...item,quantity:Number(quant)}:item)
    }
  })
}
async function minus(arg) {
setCart(cart=>{

  const existingProduct = cart.find(item=>item.id===arg.id);

if(existingProduct){
  if(existingProduct.quantity ===1){
    return cart.filter(item=>item.id!==arg.id)
  }else{
 return   cart.map((item)=>item.id===arg.id?{...item,quantity:item.quantity-1}:item)
  }

}
return cart
})
    
}
async function remove(arg) {
setCart(cart=>{
  const existingProduct = cart?.find((item)=>item.id===arg.id)
  if(existingProduct){
    return cart.filter((item)=>item.id !==arg.id)
  }
})
localStorage.setItem(cart)
}

let values={add,minus,remove,cart,getTotalPrice,getQuantity,setQuantity};
  return <CartContext.Provider value={values}>
    {children}
  </CartContext.Provider>
}



export default function useCart(){
  return useContext(CartContext)
}