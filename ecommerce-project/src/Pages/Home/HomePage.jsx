import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../Shared-Components/header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export function HomePage({cart}) {
  const [products, setProducts] = useState([]);


  useEffect( ()=>{
    async function fetchData(){

    const res = await axios.get('/api/products')
    setProducts(res.data);
    }
    fetchData();
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