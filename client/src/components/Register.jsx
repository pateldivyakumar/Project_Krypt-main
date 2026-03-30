import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from "react";

import { useAuth } from '../context/AuthContext';

import { Loader } from './';import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {const Register = () => {import { SiEthereum } from "react-icons/si";

  const [formData, setFormData] = useState({

    username: '',  const [formData, setFormData] = useState({

    email: '',

    password: '',    name: '',const Input = ({ placeholder, name, type, value, handleChange, icon, error }) => (

    confirmPassword: ''

  });    email: '',  <div className="relative">

  const [errors, setErrors] = useState({});

  const { register, loading, error } = useAuth();    password: '',    <input



  const handleChange = (e) => {    confirmPassword: ''      placeholder={placeholder}

    const { name, value } = e.target;

    setFormData(prev => ({  });      type={type}

      ...prev,

      [name]: value      value={value}

    }));

    // Clear error when user starts typing  const handleChange = (e) => {      onChange={(e) => handleChange(e, name)}

    if (errors[name]) {

      setErrors(prev => ({    setFormData({      className={`my-2 w-full rounded-sm p-2 pl-10 outline-none bg-transparent text-white border text-sm white-glassmorphism ${

        ...prev,

        [name]: ''      ...formData,        error ? 'border-red-500' : 'border-gray-400'

      }));

    }      [e.target.name]: e.target.value      }`}

  };

    });    />

  const validateForm = () => {

    const newErrors = {};  };    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">



    if (!formData.username) {      {icon}

      newErrors.username = 'Username is required';

    } else if (formData.username.length < 3) {  const handleSubmit = (e) => {    </div>

      newErrors.username = 'Username must be at least 3 characters';

    }    e.preventDefault();    {error && <div className="text-red-400 text-xs mt-1">{error}</div>}



    if (!formData.email) {    if (formData.password !== formData.confirmPassword) {  </div>

      newErrors.email = 'Email is required';

    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {      alert('Passwords do not match'););

      newErrors.email = 'Email is invalid';

    }      return;



    if (!formData.password) {    }const Register = ({ onRegisterSuccess, switchToLogin }) => {

      newErrors.password = 'Password is required';

    } else if (formData.password.length < 6) {    console.log('Registration attempt:', formData);  const [formData, setFormData] = useState({

      newErrors.password = 'Password must be at least 6 characters';

    }    // Add registration logic here    fullName: "",



    if (!formData.confirmPassword) {  };    email: "",

      newErrors.confirmPassword = 'Please confirm your password';

    } else if (formData.password !== formData.confirmPassword) {    password: "",

      newErrors.confirmPassword = 'Passwords do not match';

    }  return (    confirmPassword: "",



    setErrors(newErrors);    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-purple-600">    agreeTerms: false

    return Object.keys(newErrors).length === 0;

  };      <div className="max-w-md w-full space-y-8">  });



  const handleSubmit = async (e) => {        <div>  const [showPassword, setShowPassword] = useState(false);

    e.preventDefault();

              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (!validateForm()) {

      return;            Create your account  const [isLoading, setIsLoading] = useState(false);

    }

          </h2>  const [errors, setErrors] = useState({});

    const result = await register(formData.username, formData.email, formData.password);

            </div>

    if (result.success) {

      onRegisterSuccess?.(result.user);        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>  const handleChange = (e, name) => {

    }

  };          <div className="rounded-md shadow-sm -space-y-px">    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;



  const inputStyles = "w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors";            <div>    setFormData((prevState) => ({ ...prevState, [name]: value }));

  const errorStyles = "text-red-400 text-sm mt-1";

              <input    

  return (

    <div className="w-full max-w-md mx-auto">                id="name"    // Clear specific error when user types

      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-8">                name="name"    if (errors[name]) {

          Create Account

        </h2>                type="text"      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

        

        <form onSubmit={handleSubmit} className="space-y-6">                required    }

          {error && (

            <div className="bg-red-900/50 border border-red-400 text-red-300 px-4 py-3 rounded-lg">                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  };

              {error}

            </div>                placeholder="Full name"

          )}

                value={formData.name}  const validateForm = () => {

          <div>

            <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">                onChange={handleChange}    const newErrors = {};

              Username

            </label>              />

            <input

              type="text"            </div>    if (!formData.fullName.trim()) {

              id="username"

              name="username"            <div>      newErrors.fullName = "Full name is required";

              value={formData.username}

              onChange={handleChange}              <input    }

              placeholder="Choose a username"

              className={inputStyles}                id="email"

              disabled={loading}

            />                name="email"    if (!formData.email.trim()) {

            {errors.username && <p className={errorStyles}>{errors.username}</p>}

          </div>                type="email"      newErrors.email = "Email is required";



          <div>                required    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {

            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">

              Email Address                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"      newErrors.email = "Email is invalid";

            </label>

            <input                placeholder="Email address"    }

              type="email"

              id="email"                value={formData.email}

              name="email"

              value={formData.email}                onChange={handleChange}    if (!formData.password) {

              onChange={handleChange}

              placeholder="Enter your email"              />      newErrors.password = "Password is required";

              className={inputStyles}

              disabled={loading}            </div>    } else if (formData.password.length < 6) {

            />

            {errors.email && <p className={errorStyles}>{errors.email}</p>}            <div>      newErrors.password = "Password must be at least 6 characters";

          </div>

              <input    }

          <div>

            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">                id="password"

              Password

            </label>                name="password"    if (!formData.confirmPassword) {

            <input

              type="password"                type="password"      newErrors.confirmPassword = "Please confirm your password";

              id="password"

              name="password"                required    } else if (formData.password !== formData.confirmPassword) {

              value={formData.password}

              onChange={handleChange}                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"      newErrors.confirmPassword = "Passwords do not match";

              placeholder="Create a password"

              className={inputStyles}                placeholder="Password"    }

              disabled={loading}

            />                value={formData.password}

            {errors.password && <p className={errorStyles}>{errors.password}</p>}

          </div>                onChange={handleChange}    if (!formData.agreeTerms) {



          <div>              />      newErrors.agreeTerms = "You must agree to the terms";

            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">

              Confirm Password            </div>    }

            </label>

            <input            <div>

              type="password"

              id="confirmPassword"              <input    setErrors(newErrors);

              name="confirmPassword"

              value={formData.confirmPassword}                id="confirmPassword"    return Object.keys(newErrors).length === 0;

              onChange={handleChange}

              placeholder="Confirm your password"                name="confirmPassword"  };

              className={inputStyles}

              disabled={loading}                type="password"

            />

            {errors.confirmPassword && <p className={errorStyles}>{errors.confirmPassword}</p>}                required  const handleSubmit = async (e) => {

          </div>

                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"    e.preventDefault();

          <button

            type="submit"                placeholder="Confirm password"    

            disabled={loading}

            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"                value={formData.confirmPassword}    if (!validateForm()) {

          >

            {loading ? (                onChange={handleChange}      return;

              <div className="flex items-center">

                <Loader />              />    }

                <span className="ml-2">Creating Account...</span>

              </div>            </div>

            ) : (

              'Create Account'          </div>    setIsLoading(true);

            )}

          </button>

        </form>

          <div>    try {

        <div className="mt-6 text-center">

          <p className="text-gray-400">            <button      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {

            Already have an account?{' '}

            <button              type="submit"        method: 'POST',

              onClick={onSwitchToLogin}

              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"        headers: {

              disabled={loading}

            >            >          'Content-Type': 'application/json',

              Sign in here

            </button>              Sign up        },

          </p>

        </div>            </button>        body: JSON.stringify({



        <div className="mt-4 text-center text-xs text-gray-500">          </div>          fullName: formData.fullName,

          By creating an account, you agree to our{' '}

          <a href="#" className="text-blue-400 hover:text-blue-300">        </form>          email: formData.email,

            Terms of Service

          </a>{' '}      </div>          password: formData.password,

          and{' '}

          <a href="#" className="text-blue-400 hover:text-blue-300">    </div>        }),

            Privacy Policy

          </a>  );      });

        </div>

      </div>};

    </div>

  );      const data = await response.json();

};

export default Register;

export default Register;      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onRegisterSuccess(data.user);
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: "Network error. Please try again." });
    }

    setIsLoading(false);
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

        {/* Register Card */}
        <div className="w-full max-w-md p-8 blue-glassmorphism rounded-xl">
          <h2 className="text-2xl text-white text-center mb-6 font-semibold">
            Create Account
          </h2>

          {errors.general && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {errors.general}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              handleChange={handleChange}
              icon={<span>👤</span>}
              error={errors.fullName}
            />

            <Input
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              handleChange={handleChange}
              icon={<span>📧</span>}
              error={errors.email}
            />

            <div className="relative">
              <Input
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                handleChange={handleChange}
                icon={<span>🔒</span>}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <div className="relative">
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                handleChange={handleChange}
                icon={<span>🔒</span>}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => handleChange(e, 'agreeTerms')}
                className="mt-1"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-[#2952e3] hover:text-[#2546bd]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#2952e3] hover:text-[#2546bd]">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeTerms && (
              <div className="text-red-400 text-xs">{errors.agreeTerms}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2952e3] text-white py-3 rounded-md hover:bg-[#2546bd] transition duration-200 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-400">Already have an account? </span>
            <button
              type="button"
              onClick={switchToLogin}
              className="text-[#2952e3] hover:text-[#2546bd] font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
          <div className="text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <div className="text-white text-xs">Encrypted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔐</div>
            <div className="text-white text-xs">Secure</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-white text-xs">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
