import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorised = () => {
  return (
    <div className='min-h-[80vh] flex flex-col gap-10 text-extrabold text-2xl items-center justify-center'>
        <img alt='unauthorised image' src='/assets/Unauthorised.jpeg' className='w-[60vh] rounded-xl'/>
        <p>Login first to Access Your Cart</p>
        <Link to={"/login"} className='bg-[#041438] text-white cursor-pointer px-6 rounded-xl py-2 mb-8 hover:scale-110 hover:bg-white border-2 border-transparent hover:border-[#041438] hover:text-[#041438] duration-300 ease-in'>Login</Link>
    </div>
  )
}

export default Unauthorised