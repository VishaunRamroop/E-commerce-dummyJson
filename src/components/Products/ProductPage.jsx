
import useProduct from '../../contexts/Product_Context';
import './Products.css';
import { useEffect } from 'react';
export default function ProductPage() {
const{singleProduct,productId,setProductId,handleProductPage}= useProduct();
const{id,title,description,thumbnail,images,price,reviews,warrantyInformation,rating}= singleProduct;


useEffect(()=>{

},[])
  return (
    <div className='single-product-container'>
     <div className="single-product-wrapper">
        <img src={thumbnail} alt={title} />
        <p>{title}</p>
        <p>{description}</p>
        <p>{warrantyInformation}</p>
        <p>{price}</p>
        <p>{rating}</p>
        <ul>{reviews?.map((item)=>{
          return <li> {item.rating}{item.comment}</li>
        })}</ul>
     </div>
   

    </div>
  )
}
