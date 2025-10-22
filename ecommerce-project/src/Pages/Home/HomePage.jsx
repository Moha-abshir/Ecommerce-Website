import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../Shared-Components/header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export function HomePage({cart}) {
  const [products, setProducts] = useState([]);


  useEffect(()=>{
    axios.get('/api/products')
    .then(res => setProducts(res.data))
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}