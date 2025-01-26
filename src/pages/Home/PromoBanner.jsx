import React from "react"

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span>
          <i className="ri-truck-line"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>Free shipping on all orders above $100 with nationwide delivery</p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-money-dollar-circle-line"></i>
        </span>
        <h4>Money Guarantee</h4>
        <p>30-day money-back guarantee for all purchases with no questions asked</p>
      </div>
      <div className="banner__card">
        <span>
          <i className="ri-user-voice-line"></i>
        </span>
        <h4>24/7 Support</h4>
        <p>Dedicated customer support team available round the clock for assistance</p>
      </div>
    </section>
  )
}

export default PromoBanner

