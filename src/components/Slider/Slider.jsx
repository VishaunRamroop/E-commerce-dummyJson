import {useEffect, useState} from 'react';
import  './Slider.css';
import slides from './slider.mjs'
export default function Slider() {


  const [slideIndex,setSlideIndex]= useState(0)
  let interval = null;

  function showSlide(index){}

  function handlePrev(){
    setSlideIndex(s=>(s<1?slides.length-1:s-1))


  };
  function handleNext(){ 
   setSlideIndex(s=>(s>=slides.length-1?0:s+1))
  
  };


useEffect(() => {
  slides.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, [slides]);



  useEffect(()=>{
    const nextSlide = setInterval(()=>{
      handleNext()
    },2000)
    return ()=>clearInterval(nextSlide)
  },[])
  return (
    <div className='slider'>
      <div className="slides">
      
      {slides?.map((item,index)=>{
        return <div key={item.id} className={item.id===slideIndex? 'displaySlide slide':'slide'}><img  src={item.src} alt="" /></div>
      })}
        
  
      </div>
   
      <button className='prev' onClick={handlePrev}>prev</button>
      <button className='next' onClick={handleNext}>next</button>
    </div>
  )
}
