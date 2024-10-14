import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, loginState, clearUser } from '../Slices/UserSlice';
import { updateCartQuantity } from '../Slices/cartSlice'; 

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [cookie, setCookie] = useState(null);
  const user = useSelector((store) => store.user.details);
  const login = useSelector((store) => store.user.login);
  const quant = useSelector((store)=> store.cart.totalQuantity);
  const [cartquant, setCartQuant] = useState(quant);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`/api/getuser`, { withCredentials: true });
        setCookie(response.data.cookies);
        if (response.data.cookies.token) {
          dispatch(addUser(response.data.user));
          dispatch(loginState(true));
        }
      } catch (error) {
        console.error('Error getting user details:', error);
      }
    };

    const getCartDetails = async () => {
      try {
        const response = await axios.get(`/api/cart`, { withCredentials: true });
        dispatch(updateCartQuantity(response.data.totalQuantity));
        setCartQuant(response.data.totalQuantity);
      } catch (error) {
        console.error('Error getting cart details:', error);
      }
    };

    getUserDetails();
    getCartDetails();
  }, [dispatch]);

  const role = user?.roles?.[0] || false;

  const handleAddBook = () => {
    nav('/uploadbook');
    setShowMenu(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        dispatch(clearUser());
        dispatch(loginState(false));
        setShowMenu(false);
        toast.success('Logged out successfully');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error logging out');
    }
  };

  const renderNavItems = () => (
    <nav className='webrel list-none md:flex w-[250px] md:justify-between xl: lg:text-xl md:text-md sm:text-[10px] hidden'>
      <Link to={'/'}>
        <li className='flex flex-col gap-1 justify-center items-center border-b-4 border-transparent hover:border-blue-700 duration-150 '>
          <span>Home</span>
        </li>
      </Link>
      <Link to={'/home'}>
        <li className='flex flex-col gap-1 justify-center items-center  border-b-4 border-transparent hover:border-blue-700 duration-150'>
          <span>{role === 'admin' ? 'ManageBooks' : 'Books'}</span>
        </li>
      </Link>
      {role !== 'admin' && (
        <Link to={'/contact'}>
          <li className='flex flex-col gap-1 justify-center items-center border-b-4 border-transparent hover:border-blue-700 duration-150'>
            <span>Contact</span>
          </li>
        </Link>
      )}
    </nav>
  );

  const renderProfileMenu = () => (
    <div>   
      
       <nav className='prof list-none flex w-[100px] md:w-[150px] justify-between relative'>
      {role =="admin"?(
        <div>
          
        </div>
      ):(<Link to={'/cart'}>
  <li className='flex flex-col gap-1 justify-center items-center'>
    <span className='relative'>  <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
        />
      </svg>
      <span className='absolute top-0 right-0 text-xs font-bold bg-[#041438] text-white px-1 rounded-full'> 
      </span>
    </span>
  </li>
</Link>)} 
       
      <Link>
        <li className='flex gap-2 text-xl justify-center items-center duration-300' onClick={() => setShowMenu(!showMenu)}>
          <span className='hidden md:block'>{user.username ? user.username : 'User'}</span>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
          </span>
        </li>
      </Link>
      {showMenu && (
        <div className='w-[100px] z-20 bg-[#183476] text-[#e3ecff] font-bold absolute top-10 right-0 rounded-md'>
          <ul className='list-none flex flex-col flex-start justify-center'>
            {login ? (
              <>
                <li className='cursor-pointer px-3 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-t-md' onClick={handleLogout}>
                  Logout
                </li>
                {role === 'admin' && (
                  <li className='cursor-pointer px-2 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-b-md' onClick={handleAddBook}>
                    Add Book
                  </li>
                )}
                {role === "user"?(<li className='cursor-pointer px-3 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-b-md'>Profile</li>):(<div></div>)}
                <li className='md:hidden block px-2 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-b-md'>{user.username ? user.username : 'User'}</li>
              </>
            ) : (
              <>
                <Link to={'/login'}>
                  <li className='cursor-pointer px-3 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-t-md' onClick={() => setShowMenu(false)}>
                    Login
                  </li>
                </Link>
                <Link to={'/signup'}>
                  <li className='cursor-pointer px-3 py-3 hover:bg-[#0d172e] duration-300 ease-out w-full rounded-b-md' onClick={() => setShowMenu(false)}>
                    Signup
                  </li>
                </Link>
                <li className='md:hidden block'>{user.username ? user.username : 'User'}</li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
    </div>

  );
  
  const colorScheme = role === "admin"?(" text-black"):("text-black")
  return (  
    <>
      <Toaster />
      <header className={`flex justify-between items-center px-3 border-b-3 border-[#080b37] header ${colorScheme}`}>
        <div className='logo font-bold md:text-3xl text-2xl flex items-center'>
          <Link to={'/'}>
            <img
              src='https://tse1.mm.bing.net/th?id=OIP.-B0WkXQi06OF6ZVp4T-06wHaHa&pid=Api&P=0&h=180'
              className='w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem]'
              alt='logo'
            />
          </Link>
          <span className='text-[#080b37] '>
            Book<span className='text-[#8ab1e5] poetsen-one-regular'>Haven</span>
          </span>
        </div>
        {renderNavItems()}
        {renderProfileMenu()}
      </header>
    </>
  );
};

export default Header;
