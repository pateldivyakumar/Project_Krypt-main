import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState, useContext } from "react";

import { useAuth } from '../context/AuthContext';

import { Loader } from './';import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const Login = ({ onSwitchToRegister, onLoginSuccess }) => {const Login = () => {import { SiEthereum } from "react-icons/si";

  const [formData, setFormData] = useState({

    email: '',  const [formData, setFormData] = useState({import { FaGoogle } from "react-icons/fa";

    password: ''

  });    email: '',import { AuthContext } from "../context/AuthContext";

  const [errors, setErrors] = useState({});

  const { login, loading, error } = useAuth();    password: ''



  const handleChange = (e) => {  });const Input = ({ placeholder, name, type, value, handleChange, icon }) => (

    const { name, value } = e.target;

    setFormData(prev => ({  <div className="relative">

      ...prev,

      [name]: value  const handleChange = (e) => {    <input

    }));

    // Clear error when user starts typing    setFormData({      placeholder={placeholder}

    if (errors[name]) {

      setErrors(prev => ({      ...formData,      type={type}

        ...prev,

        [name]: ''      [e.target.name]: e.target.value      value={value}

      }));

    }    });      onChange={(e) => handleChange(e, name)}

  };

  };      className="my-2 w-full rounded-sm p-2 pl-10 outline-none bg-transparent text-white border border-gray-400 text-sm white-glassmorphism"

  const validateForm = () => {

    const newErrors = {};    />



    if (!formData.email) {  const handleSubmit = (e) => {    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">

      newErrors.email = 'Email is required';

    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {    e.preventDefault();      {icon}

      newErrors.email = 'Email is invalid';

    }    console.log('Login attempt:', formData);    </div>



    if (!formData.password) {    // Add login logic here  </div>

      newErrors.password = 'Password is required';

    } else if (formData.password.length < 6) {  };);

      newErrors.password = 'Password must be at least 6 characters';

    }



    setErrors(newErrors);  return (const Login = ({ onLoginSuccess, switchToRegister }) => {

    return Object.keys(newErrors).length === 0;

  };    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-600">  const [formData, setFormData] = useState({



  const handleSubmit = async (e) => {      <div className="max-w-md w-full space-y-8">    email: "",

    e.preventDefault();

            <div>    password: ""

    if (!validateForm()) {

      return;          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">  });

    }

            Sign in to your account  const [showPassword, setShowPassword] = useState(false);

    const result = await login(formData.email, formData.password);

              </h2>  const [isLoading, setIsLoading] = useState(false);

    if (result.success) {

      onLoginSuccess?.(result.user);        </div>  const [error, setError] = useState("");

    }

  };        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>



  const inputStyles = "w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors";          <div className="rounded-md shadow-sm -space-y-px">  const { login } = useContext(AuthContext);

  const errorStyles = "text-red-400 text-sm mt-1";

            <div>

  return (

    <div className="w-full max-w-md mx-auto">              <input  const handleChange = (e, name) => {

      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-8">                id="email"    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));

          Welcome Back

        </h2>                name="email"    setError(""); // Clear error when user types

        

        <form onSubmit={handleSubmit} className="space-y-6">                type="email"  };

          {error && (

            <div className="bg-red-900/50 border border-red-400 text-red-300 px-4 py-3 rounded-lg">                required

              {error}

            </div>                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  const handleSubmit = async (e) => {

          )}

                placeholder="Email address"    e.preventDefault();

          <div>

            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">                value={formData.email}    setIsLoading(true);

              Email Address

            </label>                onChange={handleChange}    setError("");

            <input

              type="email"              />

              id="email"

              name="email"            </div>    const { email, password } = formData;

              value={formData.email}

              onChange={handleChange}            <div>

              placeholder="Enter your email"

              className={inputStyles}              <input    if (!email || !password) {

              disabled={loading}

            />                id="password"      setError("Please fill in all fields");

            {errors.email && <p className={errorStyles}>{errors.email}</p>}

          </div>                name="password"      setIsLoading(false);



          <div>                type="password"      return;

            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">

              Password                required    }

            </label>

            <input                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

              type="password"

              id="password"                placeholder="Password"    // Demo credentials check

              name="password"

              value={formData.password}                value={formData.password}    if (email === "dp998035@gmail.com" && password === "DSP@1501") {

              onChange={handleChange}

              placeholder="Enter your password"                onChange={handleChange}      // Demo login success

              className={inputStyles}

              disabled={loading}              />      const demoUser = {

            />

            {errors.password && <p className={errorStyles}>{errors.password}</p>}            </div>        id: 1,

          </div>

          </div>        email: "dp998035@gmail.com",

          <button

            type="submit"        fullName: "Demo User",

            disabled={loading}

            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"          <div>        loginType: "traditional"

          >

            {loading ? (            <button      };

              <div className="flex items-center">

                <Loader />              type="submit"      

                <span className="ml-2">Signing In...</span>

              </div>              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"      const demoToken = "demo_token_12345";

            ) : (

              'Sign In'            >      login(demoToken, demoUser);

            )}

          </button>              Sign in      onLoginSuccess(demoUser);

        </form>

            </button>      setIsLoading(false);

        <div className="mt-6 text-center">

          <p className="text-gray-400">          </div>      return;

            Don't have an account?{' '}

            <button        </form>    }

              onClick={onSwitchToRegister}

              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"      </div>

              disabled={loading}

            >    </div>    try {

              Sign up here

            </button>  );      const response = await fetch('http://localhost:3001/api/auth/login', {

          </p>

        </div>};        method: 'POST',



        <div className="mt-4 text-center">        headers: {

          <button

            onClick={() => window.location.reload()}export default Login;          'Content-Type': 'application/json',

            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"        },

          >        body: JSON.stringify({ email, password }),

            Forgot your password?      });

          </button>

        </div>      const data = await response.json();

      </div>

    </div>      if (response.ok) {

  );        login(data.token, data.user);

};        onLoginSuccess(data.user);

      } else {

export default Login;        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Network error. Please try again.");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen gradient-bg-welcome">
      <div className="flex flex-col items-center justify-center p-8">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <SiEthereum className="text-white text-4xl mr-3" />
          <h1 className="text-3xl sm:text-4xl text-white text-gradient font-bold">
            Quantum Transfer
          </h1>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md p-8 blue-glassmorphism rounded-xl">
          <h2 className="text-2xl text-white text-center mb-6 font-semibold">
            Welcome Back
          </h2>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Traditional Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              handleChange={handleChange}
              icon={<span>📧</span>}
            />

            <div className="relative">
              <Input
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                handleChange={handleChange}
                icon={<span>🔒</span>}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2952e3] text-white py-3 rounded-md hover:bg-[#2546bd] transition duration-200 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-200 font-semibold flex items-center justify-center"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              type="button"
              onClick={switchToRegister}
              className="text-[#2952e3] hover:text-[#2546bd] font-semibold"
            >
              Sign Up
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <button
              type="button"
              className="text-gray-400 hover:text-white text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-white text-xs">Secure</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-white text-xs">Fast</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-white text-xs">Global</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
