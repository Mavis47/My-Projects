import { useState } from 'react';
import Sidebar from '../layout/sidebar';
import "../styles/Homepage.css";
import Card from './../utils/card';

export default function Homepage() {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(Infinity);

    const handleFilterChange = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
      };

  return (
    <>  
        <div style={{display: "flex"}}>
            <div className="sidebar">
                <Sidebar onCategorySelect={setSelectedCategory} onFilterChange={handleFilterChange}/>
            </div>
            <div className='container'>
                <div className="heading">
                    <h1 className='heading-text'>Our Products</h1>
                </div>
                <div className="card-section">
                    <Card selectedCategory={selectedCategory} minPrice={minPrice} maxPrice={maxPrice}/>
                </div>
            </div>
        </div>
    </>
  )
}
