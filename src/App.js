import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';

function App() {
  const [products,setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  console.log(currentCategory)

  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  
    console.log(data);
  };

  fetchData();
}, []);

  useEffect(() => {
    const  fetchCategory = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const categoryData = await res.json();
      setCategory(categoryData)
    };

    fetchCategory();

  },[])
  
  return (
    <>
      <div className='frontpage'>
        <Navbar></Navbar>      
          <h1 className='frontpage-h1'>Discover. Compare. Choose Smart.</h1>
        <p className='frontpage-p'>Explore a curated list of top products across every category — from tech to lifestyle. Instantly compare features, prices, and ratings. Make confident decisions with zero scroll fatigue.</p>
        <div className="select-wrapper">
           <select onChange= {(e) => {setCurrentCategory(e.target.value)}}>
            <option value="">All Categories</option>
             {category.map((each) => (
            <option key={each} value={each}>{each}</option>
            ))}
         </select>
        </div>
         
        <div className='product-grid'>
          {products.filter(product => currentCategory === "" || product.category === currentCategory).map((product) => {
            return (
              <div className="product-card">
              <img src={product.image} alt={product.title} className="product-img" />
               <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-desc">{product.description}</p>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-price">${product.price}</p>
               </div>
            </div>
            )   
          })}
        </div>
      </div>
    </>
  )
}

export default App
