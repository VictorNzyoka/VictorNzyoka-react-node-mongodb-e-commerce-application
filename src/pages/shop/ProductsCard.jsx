import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../components/RatingStars';

const ProductsCard = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>; 
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="product__card">
         <div className='relative'>
          <Link to={`/shop/${product._id}`}>
            <img
              src={product.image}
              alt={product.name || 'Product image'}
              className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
            />
          </Link>
          <div className='hover:block absolute top-3 right-3'>
          <button> <i className="ri-shopping-cart-line bg-primary p-1.5 text-white
          hover:bg-primary-dark"></i></button>
          </div>
          </div>
          <div className='product__card__content'>
            <h4>{product.name}</h4>
            <p>Ksh{product.price} {product.oldPrice ? <s>Ksh{product?.oldPrice}</s>: null}</p>
            <RatingStars rating={product.rating}/>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsCard;
