import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './contexts/Product_Context.jsx';
import { CartProvider } from './contexts/Cart_Context.jsx';
import {Toaster} from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <BrowserRouter>
<CartProvider>
<ProductProvider>

   <App />
    <Toaster position='bottom-right'/>
  </ProductProvider>
</CartProvider>
   </BrowserRouter>

  </StrictMode>,
)
