import { useState,useContext,createContext,useMemo } from "react";
import axios from "axios";
const ProductContext = createContext();
export  function ProductProvider({children}){

const [products,setProducts]= useState([]);
const [loading,setLoading]= useState(false);
const [error,setError]= useState(false);
const [currentPage,setCurrentPage]= useState(0);
const [operation,setOperation]= useState('normal');
const [category,setCategory]= useState('');
const [total,setTotal]= useState(null);
const [limit,setLimit]= useState(10);
const [maxPages,setMaxPage]= useState(0)
const [singleProduct,setSingleProduct]= useState({});
const [open,setOpen]= useState(false);
const [minPrice,setMinPrice]= useState('1');
const [maxPrice,setMaxPrice]= useState('1000');
const [noProducts,setNoProduct]= useState(false)
  const [priceRange,setPriceRange]= useState([0,1000]);
async function getProducts(page,operationType,category,minPrice,maxPrice) {
switch(operationType){
  
  case 'reset':
    try {
      setOperation(operationType)
      setCategory('')
      setLoading(true);
      console.log('reset')
      const {data} = await axios(`https://dummyjson.com/products?limit=10&skip=${10*page}`);

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
    }finally{
      setLoading(false)
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
        };
        if(data){
     
     
          setLoading(false);
          setProducts(data.products);
        }
    
      } catch (e) {
        console.error(e)
        setError(e);
      }finally{
        setLoading(false)
      }
      break;
      case 'price':
      try {
        setLoading(true);
        setOperation(operationType);
   
          if(!category) {
            setLoading(false)
            console.warn('no category selected');
            setOperation('normal')
            return;
          }
        let  {data}= await axios(`https://dummyjson.com/products/category/${category}`)
          console.log(data)
         
             const filteredProduct = data?.products.filter((item)=>item.price >=minPrice &&  item.price <= maxPrice);
              if(!filteredProduct || filteredProduct.length===0){
                console.warn('No products found')
                setProducts([]);
                setLoading(false);
                setTotal(0);
                setMaxPage(0);
                setCurrentPage(0)
                setOperation('normal')
                setNoProduct(true)
                return
              }
                  console.log(filteredProduct);
                  setNoProduct(false)
                  const paginatedProducts = filteredProduct?.slice(
                  currentPage * limit,
                currentPage * limit + limit
                  );
    
      
             const newTotal = filteredProduct?.length;
        
             if(newTotal && newTotal >0 && limit && limit >0){
              setTotal(newTotal);
              console.log('after set new total')
              const calculatedMaxPage= Math.ceil(newTotal/limit);
              console.log(calculatedMaxPage)
              setMaxPage(calculatedMaxPage)
              console.log('after set calculated max page')
              if(calculatedMaxPage ===1){
                setCurrentPage(0)
                console.log('after if calculated max page ===1')
                 }
          console.log(paginatedProducts)
                if(paginatedProducts.length ===0) setProducts([])
          setProducts(paginatedProducts);
        console.log('after set products')
   
                }
              
               
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
      break;
    case 'normal':
      try {
        setLoading(true);
     
        const {data} = await axios(`https://dummyjson.com/products?limit=10&skip=${10*page}`);
 
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
      }finally{
        setLoading(false)
      }
      break;
      default:
      
      try {
        setLoading(true);
     
        const {data} = await axios(`https://dummyjson.com/products?limit=10&skip=${10*page}`);
 
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
      }finally{
        setLoading(false)
      }
}
};

async function handleNextPage(page){

console.log(currentPage)
console.log(maxPages)
console.log(total,limit)
if(currentPage <maxPages -1 && products.length >0){
  const nextPage= page +1;
  setCurrentPage(nextPage);

  if(!category){
    
      await getProducts(nextPage,'normal','')
  }
}
  
};
async function handlePrevPage(page){
 if(currentPage >0){
 
  const nextPage= page -1
  setCurrentPage(nextPage);
  if(!category){
      
      await getProducts(nextPage,'normal','')
  }
 }
};

async function handleSelectedPage(page){
  setCurrentPage(page);
  await getProducts(page,operation)
}

const values = useMemo(() => ({
  loading,
  setLoading,
  error,
  setError,
  products,
  setProducts,
  getProducts,
  currentPage,
  setCurrentPage,
  operation,
  setOperation,
  handlePrevPage,
  handleNextPage,
  setCategory,
  category,
  singleProduct,
  total,
  limit,
  maxPages,
  handleSelectedPage,
  open,
  setOpen,
  priceRange,
  setPriceRange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  noProducts
}), [
  loading,
  error,
  products,
  currentPage,
  operation,
  category,
  singleProduct,
  total,
  limit,
  maxPages,
  open,
  priceRange,
  minPrice,
  maxPrice,

]);
  return <ProductContext.Provider value={values}>
          {children}

   </ProductContext.Provider>


}



export default function useProduct(){
  return useContext(ProductContext)
}