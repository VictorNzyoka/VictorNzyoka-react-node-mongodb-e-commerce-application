// import React from 'react'
import Blogs from "../blogs/Blogs"
import TrendingProducts from "../shop/TrendingProducts"
import Banner from "./Banner"
import Categories from "./Categories"
import DealsSection from "./DealsSection"
import Hero from "./Hero"
import PromoBanner from "./PromoBanner"

const Home = () => {
  return (
    <>
      <Banner/>
      <Categories/>
      <Hero/>
      <TrendingProducts/>
      <DealsSection/>
      <PromoBanner/>
      <Blogs/>
    </>
  )
}

export default Home
