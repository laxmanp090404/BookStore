import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  const date = new Date();

  return (
    <div className='flex flex-col list-none  bg-gradient-to-r from-bg-[#0066b3] to bg-[#0066b3] via-[#275e88]  text-[hsl(39,100%,93%)] p-2'>
    <footer  id='contact' className=' flex gap-5 py-[2%] md:flex-row flex-col md:justify-between justify-center items-center md:px-[1%] md:pb-[2%] md:items-start list-none bg-[#6ae8f1]] text-[rgb(255,243,220)]'>
      <div className='mx-10 w-1/6 flex flex-col justify-start items-start gap-3 text-2xl'>
        <img className='w-[96px] h-[96px] rounded-2xl opacity-85' src='https://tse1.mm.bing.net/th?id=OIP.-B0WkXQi06OF6ZVp4T-06wHaHa&pid=Api&P=0&h=180 ' />
        <span className=' text-white font-extrabold text-opacity-90'>Book<span className='text-[#8ab1e5] poetsen-one-regular'>Haven</span></span>
        <span className='text-xl freeman-regular text-yellow-300'><span className='satisfy-regular text-white'>Developed</span> by Laxman</span>
      </div>
        <nav className=' flex flex-col items-center bg-blue-400 bg-opacity-70 md:h-[25vh] md:py-0 py-4 h-auto px-4 rounded-xl shadow-md duration-300 ease-out hover:shadow-lg md:w-[300px] w-[280px]  shadow-blue-300'>
        <li className=' text-2xl  text-[#061b14] font-bold my-2'>BookHaven</li>
        <li className='cursor-pointer text-wrap text-lg '>About Us</li>
        <li className='cursor-pointer text-wrap text-lg'>Careers</li>
        <li className='cursor-pointer text-wrap text-lg'>Contact Us</li>
        <li className='cursor-pointer text-wrap text-lg'>Follow Us</li></nav>
        <nav className='support flex flex-col items-center bg-blue-400 bg-opacity-70  md:h-[25vh] md:py-0 py-4 h-auto px-4 rounded-xl shadow-md duration-300 ease-out hover:shadow-lg md:w-[300px] w-[280px] shadow-blue-300'>
        <li className='text-2xl  text-[#061b14] font-bold my-3'>Support</li>
          <li className='cursor-pointer text-wrap text-lg '>FAQ</li>
          <li className='cursor-pointer text-wrap text-lg '>Cancellation Policy</li>
        </nav>
        {/* <nav className='book flex flex-col items-center bg-indigo-400 bg-opacity-70  md:h-[25vh] md:py-0 py-4 h-auto px-4 rounded-xl shadow-md duration-300 ease-out hover:shadow-lg md:w-[300px] w-[280px] shadow-blue-300'>
        <li className='text-2xl  text-[#061b14] font-bold my-3'>Developer</li>
          <li className='cursor-pointer text-wrap text-lg '>About Dev</li>
          <li className='cursor-pointer text-wrap text-lg '>Projects</li>
        </nav> */}
        <nav className='terms flex flex-col items-center bg-blue-400 bg-opacity-70  md:h-[25vh] md:py-0 py-4 h-auto px-4 rounded-xl shadow-md duration-300 ease-out hover:shadow-lg md:w-[300px] w-[280px] shadow-blue-300'>
          <li className='text-2xl  text-[#061b14] text-wrap font-bold my-3'>Terms and Privacy</li>
          <li className='text-wrap text-lg'>Terms and Conditions</li>
          <li className='text-wrap text-lg'>Privacy Policy</li>
        </nav>
    </footer>
    <p className="text-sm self-center my-3">© 2024 Bookhaven. All rights reserved.</p>
        </div>
  )
}

export default Footer