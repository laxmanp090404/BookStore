import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser, loginState } from '../Slices/UserSlice';
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //for authentication
  axios.defaults.baseURL = '/';
  axios.defaults.withCredentials=true;
  const handleshowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`/api/loginuser`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = res.data;
      console.log("User details", result.user);
      if (res.status === 200) {
        toast.success(result.message);
        dispatch(addUser(result.user));
        dispatch(loginState(true));
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Login failed:', result);
        toast.error(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <>
      <Toaster />
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 -mt-20">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-[#2528d2]">Login</h2>
            <h3 className="text-sm mt-4 text-[#2528d2]">If already a member please login</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff]"
                type="email"
                placeholder="Email"
              />
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none focus-within:border-blue-800 focus-within:bg-blue-200 placeholder-blue-300 focus-within:placeholder-blue-600 duration-200 p-2 mt-8 rounded-xl border text-[#2736ff] w-full"
                  placeholder="Password"
                />
                <svg
                  onClick={handleshowPassword}
                  className="cursor-pointer absolute top-1/2 right-3 translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </div>
              <button type="submit" className="bg-[#2736ff] rounded-xl text-white py-2">
                Login
              </button>
            </form>
            <div className="text-xs mt-4 flex justify-between items-center font-bold">
              <p>Don't have an account?</p>
              <Link to={'/signup'} className="py-2 bg-white border-rounded-xl rounded-xl my-2">
                Register
              </Link>
            </div>
          </div>
          <div className="w-1/2 md:block hidden">
            <img
              src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1715216667~exp=1715217267~hmac=04eef7e5f08a309e24750e7710c5a611aeb3bf0979f54ab70ca15e0d7f7af42b"
              className="rounded-2xl"
              alt="loginvector"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
