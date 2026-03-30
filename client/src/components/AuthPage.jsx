import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import Login from './Login';

import Register from './Register';import Login from './Login';import Login from './Login';



const AuthPage = ({ onAuthSuccess }) => {import Register from './Register';import Register from './Register';

  const [activeTab, setActiveTab] = useState('login');



  const handleSwitchToRegister = () => {

    setActiveTab('register');const AuthPage = () => {const AuthPage = ({ onAuthSuccess }) => {

  };

  const [isLogin, setIsLogin] = useState(true);  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToLogin = () => {

    setActiveTab('login');

  };

  return (  const switchToRegister = () => setIsLogin(false);

  const handleAuthSuccess = (user) => {

    console.log('Authentication successful:', user);    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900">  const switchToLogin = () => setIsLogin(true);

    if (onAuthSuccess) {

      onAuthSuccess(user);      <div className="flex justify-center pt-8">

    }

  };        <div className="bg-white rounded-lg p-1">  const handleAuthSuccess = (userData, token) => {



  return (          <button    onAuthSuccess(userData, token);

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md">            className={`px-6 py-2 rounded-md transition-colors ${  };

        {/* Header */}

        <div className="text-center mb-8">              isLogin

          <h1 className="text-4xl font-bold text-white mb-2">

            Quantum Transfer                ? 'bg-blue-600 text-white'  return (

          </h1>

          <p className="text-gray-400">                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'    <div>

            Secure Web3 Blockchain Platform

          </p>            }`}      {isLogin ? (

        </div>

            onClick={() => setIsLogin(true)}        <Login 

        {/* Tab Navigation */}

        <div className="flex bg-gray-800 rounded-lg p-1 mb-6">          >          onLoginSuccess={handleAuthSuccess}

          <button

            onClick={() => setActiveTab('login')}            Login          switchToRegister={switchToRegister}

            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${

              activeTab === 'login'          </button>        />

                ? 'bg-blue-600 text-white'

                : 'text-gray-400 hover:text-white'          <button      ) : (

            }`}

          >            className={`px-6 py-2 rounded-md transition-colors ${        <Register 

            Sign In

          </button>              !isLogin          onRegisterSuccess={handleAuthSuccess}

          <button

            onClick={() => setActiveTab('register')}                ? 'bg-purple-600 text-white'          switchToLogin={switchToLogin}

            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${

              activeTab === 'register'                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'        />

                ? 'bg-green-600 text-white'

                : 'text-gray-400 hover:text-white'            }`}      )}

            }`}

          >            onClick={() => setIsLogin(false)}    </div>

            Sign Up

          </button>          >  );

        </div>

            Register};

        {/* Auth Forms */}

        <div className="transition-all duration-300">          </button>

          {activeTab === 'login' ? (

            <Login        </div>export default AuthPage;

              onSwitchToRegister={handleSwitchToRegister}

              onLoginSuccess={handleAuthSuccess}      </div>

            />      

          ) : (      <div className="container mx-auto">

            <Register        {isLogin ? <Login /> : <Register />}

              onSwitchToLogin={handleSwitchToLogin}      </div>

              onRegisterSuccess={handleAuthSuccess}    </div>

            />  );

          )}};

        </div>

export default AuthPage;
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Quantum Transfer. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              Help
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;