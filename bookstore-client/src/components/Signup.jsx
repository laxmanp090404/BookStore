import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignUp();
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER}/createuser`, {
                username,
                email,
                password,
                roles:[role]
            });

            if (res.status === 201) {
                toast.success("Signup Success");
                setTimeout(()=>{
                    navigate('/login');

                },2000)
            } else {
                toast.error("Signup failed. Please try again.");
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
                        <h2 className="font-bold text-2xl text-[#f57309]">SignUp</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="outline-none focus-within:border-orange-800 focus-within:bg-orange-200 placeholder-orange-300 focus-within:placeholder-orange-600 duration-200 p-2 mt-8 rounded-xl border text-[#f57309]"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="outline-none focus-within:border-orange-800 focus-within:bg-orange-200 placeholder-orange-300 focus-within:placeholder-orange-600 duration-200 p-2 mt-8 rounded-xl border text-[#f57309]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="outline-none focus-within:border-orange-800 focus-within:bg-orange-200 placeholder-orange-300 focus-within:placeholder-orange-600 duration-200 p-2 mt-8 rounded-xl border text-[#f57309] w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <svg
                                    onClick={handleShowPassword}
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
                            <select
        name="role"
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        required
        className='outline-none focus-within:border-orange-800  placeholder-orange-300 focus-within:placeholder-orange-600 duration-200 p-2 mt-8 rounded-xl border text-[#f57309] w-full '
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
                            <button type="submit" className="bg-[#f57309] rounded-xl text-white py-2">Signup</button>
                        </form>
                        <div className="text-xs mt-4 flex justify-between items-center font-bold">
                            <p>Have an account?</p>
                            <Link to="/login" className="py-2 bg-white border-rounded-xl rounded-xl my-2">Login</Link>
                        </div>
                    </div>
                    <div className="w-1/2 md:block hidden">
                        <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1715216667~exp=1715217267~hmac=04eef7e5f08a309e24750e7710c5a611aeb3bf0979f54ab70ca15e0d7f7af42b" className="rounded-2xl" alt="signup vector" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
