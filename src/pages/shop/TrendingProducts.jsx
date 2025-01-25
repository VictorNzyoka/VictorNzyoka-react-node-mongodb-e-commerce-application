import React, { useState } from 'react'
import ProductsCard from './ProductsCard'
import products from "../../data/products.json"

const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts] = useState(8);
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
