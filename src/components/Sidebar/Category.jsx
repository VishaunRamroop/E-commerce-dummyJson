
import useProduct from '../../contexts/Product_Context';


import './Category.css';
export default function Category() {
  const {getProducts,products,operation,currentPage,setCurrentPage,handleCategory,setCategory,category,open,setOpen}= useProduct();
 
  async function handleChange(e){
    setCategory(e.target.value);
    console.log(e.target.value);
    await getProducts(0,'filter',e.target.value)
  }

  const categoryOptions=['Beauty','Fragrances','Furniture','Smartphones','Groceries','Sunglasses']
  return (
    <div className={open ==true?"category-container active":"category-container"} >
     
   <div className="category-wrapper">
   
    <h2>Categories</h2>
   <label htmlFor="">
      {categoryOptions.map((item,index)=>{
        
     return <div className="" key={index}>  {item}<input name= 'category'type='radio'value={item.toLowerCase()}
     onChange={(e)=>handleChange(e)}
     /></div>
      })}

</label>
<button className='btn reset-btn' onClick={async()=>{await getProducts(0,'reset','')}}>Reset</button>
   {/* <select name="" id="" onChange={(e)=>handleChange(e)}>
      <option value="" defaultValue disabled>Select a Category</option>
    
      <option value="beauty">Beauty</option>
      <option value="fragrances">Fragrances</option>
      <option value="furniture">Furniture</option>
      <option value="smartphones">Smartphones</option>
      <option value="groceries">Groceries</option>
      <option value="sunglasses">Sunglasses</option>
    
     </select> */}
     

   </div>
    
    </div>
  )
}
