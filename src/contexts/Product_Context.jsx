import { useState,useContext,createContext } from "react";
import axios from "axios";
const ProductContext = createContext();
export  function ProductProvider({children}){

const [products,setProducts]= useState([]);
const [loading,setLoading]= useState(false);
const [error,setError]= useState(false);
const [currentPage,setCurrentPage]= useState(0);
const [operation,setOperation]= useState('');
const [category,setCategory]= useState('');
const [total,setTotal]= useState(null);
const [limit,setLimit]= useState(10);
const [maxPages,setMaxPage]= useState(0)
const [singleProduct,setSingleProduct]= useState({});
const [open,setOpen]= useState(false);
async function getProducts(currentPage,operationType,category) {
switch(operationType){
  
  case 'reset':
    try {
      setOperation(operationType)
      setCategory('')
      setLoading(true);
      console.log('reset')
      const {data} = await axios(`https://dummyjson.com/products?limit=10&skip=${10*currentPage}`);

      const newTotal = data.total;
    
      if(newTotal && limit && limit >0){
        setTotal(newTotal);
    
        const calculatedMaxPage = Math.ceil(newTotal/limit);
        if(currentPage >= calculatedMaxPage){
          setMaxPage(calculatedMaxPage);
        }else{
          setMaxPage(calculatedMaxPage);
        }
        if(calculatedMaxPage ===1){
          setCurrentPage(0)
        }
      }else{
        setMaxPage(0)
      };
      if(data){
   
   
        setLoading(false);
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e)
      setError(e);
    }
    break;
  
    case 'filter':
      try {
        setCategory(category)
        setOperation(operationType)
        setLoading(true);
        console.log('filter')
        const {data} = await axios(`https://dummyjson.com/products/category/${category}?limit=10&skip=${10*currentPage}`);
      
        const newTotal = data.total;
        // const newLimit= data.limit;
        // console.log(newTotal,newLimit)
        if(newTotal && limit &&limit >0){
          setTotal(newTotal);
          // setLimit(newLimit);
          const calculatedMaxPage = Math.ceil(newTotal/limit);
      
          if(currentPage >= calculatedMaxPage){
            setMaxPage(calculatedMaxPage);
          }else{
            setMaxPage(calculatedMaxPage);
          }
          if(calculatedMaxPage ===1){
            setCurrentPage(0)
          };
        
        }else{
          setMaxPage(0)
        }
        if(data){
     
     
          setLoading(false);
          setProducts(data.products);
        }
    
      } catch (e) {
        console.error(e)
        setError(e);
      }
      break;
    default:
      try {
        setLoading(true);
     
        const {data} = await axios(`https://dummyjson.com/products?limit=10&skip=${10*currentPage}`);
 
        const newTotal = data.total;
      
        if(newTotal && limit && limit >0){
          setTotal(newTotal);
      
          const calculatedMaxPage = Math.ceil(newTotal/limit);
          if(currentPage >= calculatedMaxPage){
            setMaxPage(calculatedMaxPage);
          }else{
            setMaxPage(calculatedMaxPage);
          }
          if(calculatedMaxPage ===1){
            setCurrentPage(0)
          }
        }else{
          setMaxPage(0)
        };
        if(data){
     
     
          setLoading(false);
          setProducts(data.products);
        }
      } catch (e) {
        console.error(e)
        setError(e);
      }
}
};

async function handleNextPage(){

console.log(currentPage)
console.log(maxPages)
console.log(total,limit)
if(currentPage <maxPages -1 && products.length >0){
  const nextPage= currentPage +1;
  setCurrentPage(nextPage);
  await getProducts(nextPage,operation,category)
}
  
};
async function handlePrevPage(){
 if(currentPage >0){
  const nextPage= currentPage -1
  setCurrentPage(nextPage);
  await getProducts(nextPage,operation,category)
 }
};

async function handleSelectedPage(page){
  setCurrentPage(page);
  await getProducts(page,operation,category)
}


let values={
  loading,setLoading,error,setError,products,setProducts,getProducts,currentPage,setCurrentPage,operation,setOperation,handlePrevPage,handleNextPage,setCategory,category,singleProduct,total,limit,maxPages,handleSelectedPage,open,setOpen
}
  return <ProductContext.Provider value={values}>
          {children}

   </ProductContext.Provider>


}



export default function useProduct(){
  return useContext(ProductContext)
}