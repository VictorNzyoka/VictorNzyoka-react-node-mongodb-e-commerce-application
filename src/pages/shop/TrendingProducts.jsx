import React, { useState } from 'react'
import ProductsCard from './ProductsCard'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'gold', 'blue', 'green', 'silver', 'biege', 'red'],
    priceRanges: [
        { label: 'under Ksh50', min: 0, max: 50 },
        { label: 'Ksh50 - Ksh100', min: 50, max: 100 },
        { label: 'Ksh100 -Ksh500', min: 100, max: 500 },
        { label: 'Ksh500 - Ksh1000', min: 500, max: 1000 },
        { label: 'Ksh2000 and above', min: 1000, max: Infinity },
    ]
}


const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts] = useState(8);

    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRanges: ''
    });

    const { category, color, priceRanges } = filtersState;
    const [minPrice, maxPrice] = priceRanges.split("-").map(Number);
    
    const { data: {products = [], totalPages,totalProducts} = {}, error, isLoading } = useFetchAllProductsQuery({
            category: category !== 'all' ? category : '',
            color: color !== 'all' ? color : '',
            minPrice: isNaN(minPrice) ? '' : minPrice,
            maxPrice: isNaN(maxPrice) ? '' : maxPrice,
            // page: currentPage,
            // limit: ProductsPerPage,
        });
    
    const loadMoreProducts = () => {
        setVisibleProducts(preCount => preCount + 4)
    }
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
        <p className='section__subheader mb-12'>
            Explore our latest collection of trending products, handpicked just for you. From fashion to gadgets, discover what's popular right now and get exclusive offers.
        </p> 
        <div className='mt-12'>
        <ProductsCard products={products.slice(0,visibleProducts)}/>
        </div>
        <div className='product__btn'>
            {
                visibleProducts < products.length && (
                    <button className='btn' onClick={loadMoreProducts}>
                        Load More
                    </button>
                )
            }
        </div>
    </section>
  )
}

export default TrendingProducts
