import {useState,useMemo} from 'react'
import useProduct from '../../contexts/Product_Context';
import './Pagination.css'
export default function Pagination() {
  const{currentPage,setCurrentPage,products,handlePrevPage,handleNextPage,getProducts,total,limit,maxPages,handleSelectedPage}= useProduct();

const isDisabled = currentPage >=maxPages-1;
const pageNumbers = useMemo(()=>{
const numbers =[];
const maxShow=5;
const range =2;

if(maxPages <= maxShow){
  for(let i =0;i<maxPages;i++){
    numbers.push(i)
  }
}else{
  numbers.push(0)

  for(let i = Math.max(currentPage-range,1);i<=Math.min(currentPage+range,maxPages-2);i++){
    numbers.push(i)
  }
  numbers.push(maxPages-1)
  console.log(numbers)
  return numbers
}
return numbers
},[currentPage,maxPages])
  return (
    <div className='pagination-wrapper'>
        <button className='pagination-btn' disabled={currentPage<=0}  onClick={()=>handlePrevPage(currentPage)}>Prev</button>

        {maxPages&& (<div className='pagination-btn-display'>
          {pageNumbers?.map((pages,index)=>{
           return <div className="pagination-item" key={index}>
             
            <button key={pages} onClick={()=>handleSelectedPage(pages)} className={pages===currentPage?'page-btn active':'page-btn'}> {index >0 && pages -pageNumbers[index-1]>1 && (<span>...</span>)}{pages+1}</button> 
           </div>
          })}


        </div>)}
        <button className='pagination-btn' disabled={currentPage >=maxPages-1 } onClick={()=>handleNextPage(currentPage)}>Next</button>
      
   
    </div>
  )
}
