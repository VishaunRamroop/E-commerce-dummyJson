import {useEffect, useState} from 'react'
import './Slider.css';
import { FaHandPointLeft } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
export default function Slider({slider}) {
  const [count,setCount]= useState(1);
  function handleNext(){
    setCount(prevCount => (prevCount === slider.length-1? 0:prevCount+1))
  };
  function handlePrev(){
    setCount(prevCount  => (prevCount  ===0?slider.length-1:prevCount  -1))
  };
  useEffect(()=>{
    const interval = setInterval(()=>{
      handleNext()
    },3000)

    return ()=>clearInterval(interval)
  },[count])
  return (
    <div className="slider-container">
        <button className='slider-btn next' aria-label='Go to Next Image' onClick={()=>handleNext()}><FaHandPointRight className='right-finger' size={25} /></button>
        <button className='slider-btn prev' aria-label='Go to Previous Image' onClick={()=>handlePrev()}><FaHandPointLeft className='left-finger'  size={25}/></button>
      <div className="slider-wrapper">
    
        <div className="slider">
      
          {slider.map((tavern,index)=>{
            return <img className={count===index? 'slider-img active':'slider-img'} key={tavern.id ||index} src={count ===tavern.id ?tavern.src:null}/>
          })}
        </div>
      </div>
    </div>
  )
}
