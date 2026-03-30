import React, { useEffect, useState } from 'react';import React from 'react';import React, { useEffect, useContext } from 'react';

import { useAuth } from '../context/AuthContext';

import { useLocation, useNavigate } from 'react-router-dom';

const AuthSuccess = ({ onContinue }) => {

  const { user } = useAuth();const AuthSuccess = ({ user, onContinue }) => {import { AuthContext } from '../context/AuthContext';

  const [countdown, setCountdown] = useState(3);

  return (

  useEffect(() => {

    const timer = setInterval(() => {    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900 to-green-600">const AuthSuccess = () => {

      setCountdown((prev) => {

        if (prev <= 1) {      <div className="max-w-md w-full text-center">  const location = useLocation();

          clearInterval(timer);

          onContinue?.();        <div className="bg-white rounded-lg p-8 shadow-xl">  const navigate = useNavigate();

          return 0;

        }          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">  const { login } = useContext(AuthContext);

        return prev - 1;

      });            <svg

    }, 1000);

              className="w-8 h-8 text-white"  useEffect(() => {

    return () => clearInterval(timer);

  }, [onContinue]);              fill="none"    const urlParams = new URLSearchParams(location.search);



  const handleContinueNow = () => {              stroke="currentColor"    const token = urlParams.get('token');

    onContinue?.();

  };              viewBox="0 0 24 24"    const userParam = urlParams.get('user');



  return (            >

    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md">              <path    if (token && userParam) {

        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl text-center">

          {/* Success Icon */}                strokeLinecap="round"      try {

          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">

            <svg                strokeLinejoin="round"        const user = JSON.parse(decodeURIComponent(userParam));

              className="w-10 h-10 text-white"

              fill="none"                strokeWidth={2}        login(token, user);

              stroke="currentColor"

              viewBox="0 0 24 24"                d="M5 13l4 4L19 7"        navigate('/'); // Redirect to main app

              xmlns="http://www.w3.org/2000/svg"

            >              />      } catch (error) {

              <path

                strokeLinecap="round"            </svg>        console.error('Error parsing user data:', error);

                strokeLinejoin="round"

                strokeWidth={2}          </div>        navigate('/login?error=auth_failed');

                d="M5 13l4 4L19 7"

              />                }

            </svg>

          </div>          <h2 className="text-2xl font-bold text-gray-900 mb-2">    } else {



          {/* Success Message */}            Welcome, {user?.name || 'User'}!      navigate('/login?error=missing_params');

          <h2 className="text-3xl font-bold text-white mb-4">

            Welcome to Quantum Transfer!          </h2>    }

          </h2>

                      }, [location, login, navigate]);

          {user && (

            <p className="text-gray-300 text-lg mb-2">          <p className="text-gray-600 mb-6">

              Hello, {user.username}!

            </p>            You have successfully logged in to Quantum Transfer.  return (

          )}

                    </p>    <div className="flex w-full justify-center items-center min-h-screen gradient-bg-welcome">

          <p className="text-gray-400 mb-8">

            Your account has been successfully {user ? 'authenticated' : 'created'}.                 <div className="flex flex-col items-center justify-center p-8">

            You're now ready to explore the future of blockchain transactions.

          </p>          <button        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>



          {/* Features Preview */}            onClick={onContinue}        <p className="text-white text-xl mt-4">Completing login...</p>

          <div className="space-y-3 mb-8">

            <div className="flex items-center text-gray-300">            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"      </div>

              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">

                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />          >    </div>

              </svg>

              <span>Secure MetaMask wallet integration</span>            Continue to Dashboard  );

            </div>

            <div className="flex items-center text-gray-300">          </button>};

              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">

                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />        </div>

              </svg>

              <span>Ethereum Sepolia testnet transactions</span>      </div>export default AuthSuccess;

            </div>

            <div className="flex items-center text-gray-300">    </div>

              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">  );

                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />};

              </svg>

              <span>Real-time transaction history</span>export default AuthSuccess;
            </div>
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Interactive GIF transaction cards</span>
            </div>
          </div>

          {/* Countdown and Continue Button */}
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Redirecting to the app in {countdown} seconds...
            </p>
            
            <button
              onClick={handleContinueNow}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Continue to App
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-xs">
              Make sure you have MetaMask installed and configured with Sepolia testnet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;