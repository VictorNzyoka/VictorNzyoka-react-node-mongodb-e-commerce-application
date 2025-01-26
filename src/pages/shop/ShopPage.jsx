import React, { useEffect, useState } from 'react'
import productsData from "../../data/products.json"
import ProductsCard from './ProductsCard';
import ShopFiltering from './ShopFiltering';

const filters = {
    categories: ['all', 'accessories', 'dress' , 'jewellery' , 'cosmetics',],
    colors: ['all','black', 'gold', 'blue' , 'green' ,'silver' ,'biege' , 'red'],
    priceRanges:[
        {label: 'under Ksh50',min:0, max:50},
        {label: 'Ksh50 - Ksh100',min:50, max:100},
        {label: 'Ksh100 -Ksh500',min:100, max:500},
        {label: 'Ksh500 - Ksh1000',min:500, max:1000},
        {label: 'Ksh2000 and above',min:1000, max:Infinity},
    ]
}

const ShopPage = () => {
    const [products,setProducts] = useState(productsData);
    const [filtersState,setFiltersState] =useState({
        category:'all',
        color:'all',
        priceRanges:''
    })

    //filtering functions
    const applyFilters = () => {
        let filteredProducts = productsData;
      
        // Filter by category
        if (filtersState.category && filtersState.category !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filtersState.category
          );
        }
      
        // Filter by color
        if (filtersState.color && filtersState.color !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product) => product.color === filtersState.color
          );
        }
      
        // Filter by price range
        if (filtersState.priceRanges) {
          const selectedPriceRange = filters.priceRanges.find(
            (range) => range.label === filtersState.priceRanges
          );
      
          if (selectedPriceRange) {
            const { min, max } = selectedPriceRange;
            filteredProducts = filteredProducts.filter(
              (product) => product.price >= min && product.price <= max
            );
          }
        }
      
        setProducts(filteredProducts);
      };
      
        useEffect(() => {
            applyFilters()
        },[filtersState])

        //clear the filters
        const clearFilters = () => {
            setFiltersState({       
                category:'all',
                color:'all',
                priceRanges:''

            })
        }


  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>Browse a diverse range of categories</p>

      </section>
      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
            {/* Leftside */}
            <ShopFiltering 
            filters={filters} 
            filtersState={filtersState} 
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}/>
        {/* right side */}
        <div>
            <h3 className='text-xl font-medium mb-4'>Products available</h3>
            <ProductsCard products={products}/>
        </div>
        </div>
        

      </section>
    </>
  )
}

export default ShopPage
