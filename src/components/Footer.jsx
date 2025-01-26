import React from 'react'
import img1 from "../assets/instagram-1.jpg"
import img2 from "../assets/instagram-2.jpg"
import img3 from "../assets/instagram-3.jpg"
import img5 from "../assets/instagram-5.jpg"
import img4 from "../assets/instagram-4.jpg"
import img6 from "../assets/instagram-6.jpg"

const Footer = () => {
  return (
    <>
        <footer className='section__container footer__container'>
            <div className='footer__col'>
                <h4>CONTACT INFO</h4>
                <p>
                    <span><i className="ri-map-pin-line"></i></span>
                    456,Main Street ,Machakos
                </p>
                <p>
                    <span><i className="ri-mail-line"></i></span>
                    shopless@gmail.com
                </p>
                <p>
                    <span><i className="ri-phone-line"></i></span>
                    +254796175283
                </p>
            </div>

            <div className='footer__col'>
                <h4>COMPANY</h4>
                <a href="/">Home</a>
                <a href="/">About Us</a>
                <a href="/"> Our Blogs</a>
                <a href="/">Terms and conditions</a>
                
            </div>
            <div className='footer__col'>
                <h4>QUICK LINKS</h4>
                <a href="/">Help</a>
                <a href="/">Track your order</a>
                <a href="/">Dresses</a>
                <a href="/">Categories</a>
            </div>
            <div className='footer__col'>
                <h4>TIKTOK</h4>
                <div className='instagram__grid'>
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                    <img src={img4} alt="" />
                    <img src={img5} alt="" />
                    <img src={img6} alt="" />
                </div>

            </div>
        </footer>
        <div className='footer__bar'>
            © 2025 by Shopless. All rights reserved.
        </div>
    </>
  )
}

export default Footer
