import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/login", formData)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token)
                toast.success("Login successful");
                navigate("/");
            } else {
                toast.error("Unexpected response data");
            }
        } catch (error) {
            toast.error("Invalid Login!!")
            
        }
        setFormData({ email: '', password: '' });
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-rose-400 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
          <Toaster />
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-md relative block w-full h-12 my-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full h-12 my-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-12 flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className='text-center font-semibold text-xl'>
          <span>Don't have an account?</span>
          <Link to="/" className='px-2'>Register</Link>
        </div>
          </div>
        </div>
      );
}

export default Login