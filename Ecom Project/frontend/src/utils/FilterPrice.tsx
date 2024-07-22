import React, { useState } from 'react'

type PriceFilterProps = {
    onFilterChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({onFilterChange}) => {
    const [minPrice,setMinPrice] = useState<number>(0)
    const [maxPrice,setMaxPrice] = useState<number>(Infinity)

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMinPrice(value);
        onFilterChange(value,maxPrice);
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxPrice(value)
        onFilterChange(minPrice,value);
    }

    return (
        <div className="price-filter">
          <h1 className='text-white' style={{fontSize: "20px"}}>Price Filter</h1>
          <div>
            <label className='text-white font-serif'>
              Min Price:
              <input style={{height: "30px",color: "black"}}
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </label>
          </div>
          <div>
            <label className='text-white font-serif'>
              Max Price:
              <input style={{height: "30px",color: "black"}}
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </label>
          </div>
        </div>
      );
}

export default PriceFilter;