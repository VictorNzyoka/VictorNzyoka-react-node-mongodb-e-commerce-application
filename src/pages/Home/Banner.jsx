// import React from 'react'

import { Link } from "react-router-dom"
import bannerImg from "../../assets/header.png"

const Banner = () => {
  return (
    <div className="section__container header__container">
        <div className="header__content z-30">
            <h4>UP TO 80% Discount on</h4>
            <h1>Girls Fashion</h1>
            <p>Explore a wide range of trendy and stylish outfits for girls, from casual wear to formal dresses, all at incredible prices. Don&apos;t miss out on the biggest fashion sale of the season. Whether you&apos;re looking for dresses, shoes, or accessories, we&apos;ve got everything you need to elevate your wardrobe. Shop now and enjoy up to 80% off on select items!</p>
            <button className="btn"><Link to="/shop">EXPLORE NOW</Link></button>
        </div>
        <div className="header__image">
            <img src={bannerImg} alt="Hero Section Image"/>
        </div>
    </div>
  )
}

export default Banner
