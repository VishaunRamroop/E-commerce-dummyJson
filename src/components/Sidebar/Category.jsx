
// import useProduct from '../../contexts/Product_Context';


// import './Category.css';
// export default function Category() {
//   const {getProducts,products,operation,currentPage,setCurrentPage,handleCategory,setCategory,category,open,setOpen}= useProduct();
 
//   async function handleChange(e){
//     setCategory(e.target.value);
//     console.log(e.target.value);
//     await getProducts(0,'filter',e.target.value)
//   }

//   const categoryOptions=['Beauty','Fragrances','Furniture','Smartphones','Groceries','Sunglasses']
//   return (
//     <div className={open ==true?"category-container active":"category-container"} >
     
//    <div className="category-wrapper">
   
//     <h2>Categories</h2>
//    <label htmlFor="">
//       {categoryOptions.map((item,index)=>{
        
//      return <div className="" key={index}>  {item}<input name= 'category'type='checkbox'value={item.toLowerCase()}
//      onChange={(e)=>handleChange(e)}
//      /></div>
//       })}

// </label>
// <button className='btn reset-btn' onClick={async()=>{await getProducts(0,'reset','')}}>Reset</button>
//    {/* <select name="" id="" onChange={(e)=>handleChange(e)}>
//       <option value="" defaultValue disabled>Select a Category</option>
    
//       <option value="beauty">Beauty</option>
//       <option value="fragrances">Fragrances</option>
//       <option value="furniture">Furniture</option>
//       <option value="smartphones">Smartphones</option>
//       <option value="groceries">Groceries</option>
//       <option value="sunglasses">Sunglasses</option>
    
//      </select> */}
     

//    </div>
    
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductList from '../Products/ProductList'
import useProduct from '../../contexts/Product_Context'

export default function Category() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [toggle,setToggle]= useState(false);
  const {category,setCategory,minPrice,setMinPrice,maxPrice,setMaxPrice,getProducts,currentPage,setCurrentPage,operation,setOperation,product,total,loading,noProducts}= useProduct();
   const categoryOptions=['Beauty','Fragrances','Furniture','Smartphones','Groceries','Sunglasses']
  const filters = [
  
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Beauty', label: 'All New Arrivals',type:'radio',name:'category' },
      { value: 'Fragrances', label: 'Tees',type:'radio' ,name:'category'},
      { value: 'Furniture', label: 'Crewnecks',type:'radio',name:'category'},
      { value: 'Smartphones', label: 'Sweatshirts',type:'radio',name:'category' },
      { value: 'Groceries', label: 'Pants & Shorts',type:'radio',name:'category' },
    ],
  },{
    id:'price',
    name:'price',
    options:[
      {value:'mix',label:'min',type:'number'},
     { value:'max',label:'max',type:'number'}
  ]
  }
]

 function handleChange(id,value,index,label){
  
  if(id==='price'){
    const newPrice =value
    label==='min' && setMinPrice(newPrice)
    label==='max' && setMaxPrice(newPrice)
  }else if(id==='category'){
    const newCategory= value;
    setCategory(newCategory)
  }

};

async function handleSubmit(e){
  e.preventDefault();
  const cate = category ||''
  await getProducts(0,'price',cate,minPrice,maxPrice);
  setCurrentPage(0)


};


useEffect(()=>{

getProducts(currentPage,'price',category,minPrice,maxPrice)
 

},[currentPage,category,minPrice,maxPrice])
  return (
    <div className="bg-white min-h-[100vh]">
     {<div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4" onSubmit={handleSubmit}>
                {filters.map((section) => (
                  <Disclosure key={section.name} as="div" className="border-t border-gray-200 pt-4 pb-4">
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-5 rotate-0 transform group-data-open:-rotate-180"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pt-4 pb-2">
                        <div className="space-y-6">
                          {section.id==='price'? section.options.map((item,index)=>{
                        return  <div key={item.label}> {item.label ==='min' ? <input key={item.label} type='number' value={minPrice} placeholder={`${item.label}`} name={item.label} onChange={(e)=>handleChange('price',e.target.value,index,item.label)}/>:<input className='' type='number' value={maxPrice} placeholder={`${item.label}`} name={item.label} onChange={(e)=>handleChange('price',e.target.value,index,item.label)}/>}
                      
                        </div>
                    
                          }): section.options.map((item,index)=>{
                       return    <label key={item.value} className="flex items-center space-x-2 cursor-pointer gap-5 justify-start">{item.value} <input className='hidden peer' type='radio' name={item.name} value={item.value} onChange={(e)=>{handleChange('category',e.target.value,index,item.label)}}/>
                         <div className="w-4 h-4 border-2 border-gray-600 rounded-sm peer-checked:bg-gray-800 peer-checked:border-gray-800" />
                       </label>
                          })
                          
                          }
                      
                        </div>
                        {/* <input type='number' value={priceRange[0]} name='min' onChange={()=>{setPriceRange([Number(e.target.value),priceRange[1]])}}/>
                        <input type='number'value={priceRange[1]} name='max' onChange={()=>{setPriceRange([Number(priceRange[0]),e.target.value])}}/> */}
                      </DisclosurePanel>
                     
                    </fieldset>
                  </Disclosure>
                ))}
                     <button className='bg-gray-200 p-5 m-5 rounded-lg' type='submit'  onClick={() => setMobileFiltersOpen(false)}>Submit</button>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-[100vh] justify-center items-center">
          
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Categories</h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest releases!
            </p>
            
          </div>
            <button onClick={()=>setToggle(!toggle)} className=' bg-black text-white text-lg hidden lg:inline-flex items-center transition p-4 rounded-lg duration-300 ease-in-out hover:bg-gray-600 active:bg-cyan-400'>Filter</button>
          <div className="pt-12 grid-cols-1 h-full">
            
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">Filters</span>
                <PlusIcon aria-hidden="true" className="ml-1 size-5 shrink-0 text-gray-400" />
              </button>

              <div className="hidden lg:block">
                <form onSubmit={handleSubmit} className={toggle? "divide-y divide-gray-200 grid grid-cols-3 w-full justify-center items-center box-border max-h-[800px] w-full  transition-[max-height,opacity] duration-300 ease-in-out opacity-100":"divide-y divide-gray-200 grid grid-cols-3 w-full justify-center items-center box-border max-h-[0px] w-full  transition-[max-height,opacity] duration-300 ease-in-out opacity-0"}>
                  {filters.map((section) => (
                    <div key={section.name} className="h-full w-full">
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                        <div className="space-y-3 pt-6">
                          {section.id==='price'? section.options.map((item,index)=>{
                        return  <div key={item.label}> {item.label ==='min' ? <input key={item.label} type='number' value={minPrice} placeholder={`${item.label}`} name={item.label} onChange={(e)=>handleChange('price',e.target.value,index,item.label)}/>:<input className='' type='number' value={maxPrice} placeholder={`${item.label}`} name={item.label} onChange={(e)=>handleChange('price',e.target.value,index,item.label)}/>}
                      
                        </div>
                    
                          }): section.options.map((item,index)=>{
                       return    <label key={item.value} className="flex items-center space-x-2 cursor-pointer gap-5 justify-start">{item.value} <input className='hidden peer' type='radio' name={item.name} value={item.value} onChange={(e)=>{handleChange('category',e.target.value,index,item.label)}}/>
                         <div className="w-4 h-4 border-2 border-gray-600 rounded-sm peer-checked:bg-gray-800 peer-checked:border-gray-800" />
                       </label>
                          })
                          
                          }
                        </div>
                      </fieldset>
                    </div>
                  ))}
                  <button className='bg-gray-200 p-5 m-5 rounded-lg active:bg-gray-500'  type='submit'>Submit</button>
                </form>
              </div>
            </aside>

          
            <div className="mt-6 lg:col-span-4 lg:mt-0 xl:col-span-4">{ noProducts ===true ? <p>No products match your filter</p>:<ProductList/>}</div>
          </div>
        </main>
      </div>}
    </div>
  )
}


