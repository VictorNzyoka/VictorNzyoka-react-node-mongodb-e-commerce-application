import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/header.png';

const Banner = () => {
  return (
    <div className="section__container header__container">
        <div className="header__content z-30">
            <h4 className="text-lg font-semibold text-red-600 uppercase tracking-widest mb-2">
                Sale Offer
            </h4>
            <div className="flex flex-col items-start">
                <h2 className="text-5xl font-bold text-gray-900">
                    New Fashion
                </h2>
                <h2 className="text-5xl font-bold text-gray-900">
                    Collection
                </h2>
            </div>
            <button className="btn bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition duration-300 mt-6">
                <Link to="/shop">Shop Collection</Link>
            </button>
        </div>
        <div className="header__image">
            <img src={bannerImg} alt="Hero Section Image" className="w-full h-auto"/>
        </div>
    </div>
  );
};

export default Banner;