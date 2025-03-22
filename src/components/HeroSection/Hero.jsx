import {useState} from 'react'
import Slider from '../Slider/Slider.jsx';
import slider from '../Slider/slider.mjs';
import './Hero.css'
export default function Hero() {
  return (
   <div className="hero-container">
    <Slider slider={slider}/>
   </div>
  )
}
