import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [message, setMessage] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [username,setUsername] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            phone,
            password
        }
        console.log(data)
    }
  return (
    <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
            <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>

                <input type="text"  name='username' id='username'
                onChange={(e) => setUsername(e.target.value)}
                placeholder='UserName' required className='
                w-full bg-gray-100 focus:outline-none px-5 py-3'/>

                    <input type="text"  name='email' id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Adress' required className='
                w-full bg-gray-100 focus:outline-none px-5 py-3'/>
                
                <input
                type="tel"
                name="phone"
                id="phone"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="+254 700 000 000"
                required
                className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 px-5 py-3 rounded-md"
                pattern="^\+?[1-9]\d{1,14}$"
                title="Please enter a valid phone number (E.164 format recommended)"
              />
                
                <input type="text"  name='password' id='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' required className='
                w-full bg-gray-100 focus:outline-none px-5 py-3'/>

                {
                    message && <p className='text-red-500'>{message}</p>
                }
                <button
                 type='submit'
                className='w-full mt-5 bg-primary text-white hover:bg-indigo-500
                font-medium py-3 rounded-md'>Login</button>

            </form>
            <p
            className='my-5 italic text-sm text-center'
            >Have an account? <Link to="/login" className='text-blue-600 underline px-1'> Login </Link> here</p>
        </div>
      
    </section>
  )
}

export default Register
