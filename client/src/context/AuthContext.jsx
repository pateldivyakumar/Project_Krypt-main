import React, { createContext, useContext, useState, useEffect } from 'react';import React, { createContext, useContext, useState, useEffect } from 'react';import React, { createContext, useContext, useState, useEffect } from 'react';



// Create Auth Context

const AuthContext = createContext();

const AuthContext = createContext();export const AuthContext = createContext();

// Custom hook to use auth context

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {export const useAuth = () => {export const useAuth = () => {

    throw new Error('useAuth must be used within an AuthProvider');

  }  const context = useContext(AuthContext);  const context = useContext(AuthContext);

  return context;

};  if (!context) {  if (!context) {



// Auth Provider Component    throw new Error('useAuth must be used within an AuthProvider');    throw new Error('useAuth must be used within an AuthProvider');

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);  }  }

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');  return context;  return context;



  // Check if user is logged in on component mount};};

  useEffect(() => {

    checkAuth();

  }, []);

export const AuthProvider = ({ children }) => {export const AuthProvider = ({ children }) => {

  // Check authentication status

  const checkAuth = async () => {  const [user, setUser] = useState(null);  const [user, setUser] = useState(null);

    try {

      const token = localStorage.getItem('token');  const [isAuthenticated, setIsAuthenticated] = useState(false);  const [isAuthenticated, setIsAuthenticated] = useState(false);

      if (!token) {

        setLoading(false);  const [isLoading, setIsLoading] = useState(true);  const [isLoading, setIsLoading] = useState(true);

        return;

      }



      const response = await fetch('http://localhost:5000/api/auth/me', {  useEffect(() => {  useEffect(() => {

        headers: {

          'Authorization': `Bearer ${token}`,    // Check if user is logged in (e.g., check localStorage, make API call)    // Check for existing authentication on app load

          'Content-Type': 'application/json'

        }    checkAuthStatus();    checkAuthStatus();

      });

  }, []);  }, []);

      if (response.ok) {

        const userData = await response.json();

        setUser(userData.user);

      } else {  const checkAuthStatus = async () => {  const checkAuthStatus = async () => {

        localStorage.removeItem('token');

      }    try {    try {

    } catch (error) {

      console.error('Auth check error:', error);      // Check localStorage for saved auth      const token = localStorage.getItem('authToken');

      localStorage.removeItem('token');

    } finally {      const savedUser = localStorage.getItem('quantum_user');      const storedUser = localStorage.getItem('user');

      setLoading(false);

    }      if (savedUser) {

  };

        const userData = JSON.parse(savedUser);      if (token && storedUser) {

  // Login function

  const login = async (email, password) => {        setUser(userData);        const userData = JSON.parse(storedUser);

    setError('');

    setLoading(true);        setIsAuthenticated(true);        



    try {      }        // Verify token is still valid (optional)

      const response = await fetch('http://localhost:5000/api/auth/login', {

        method: 'POST',    } catch (error) {        if (userData.loginType === 'wallet') {

        headers: {

          'Content-Type': 'application/json'      console.error('Error checking auth status:', error);          // For wallet users, just restore the session

        },

        body: JSON.stringify({ email, password })    } finally {          setUser(userData);

      });

      setIsLoading(false);          setIsAuthenticated(true);

      const data = await response.json();

    }        } else {

      if (response.ok) {

        localStorage.setItem('token', data.token);  };          // For traditional users, verify token with backend

        setUser(data.user);

        return { success: true, user: data.user };          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {

      } else {

        setError(data.message || 'Login failed');  const login = async (email, password) => {            headers: {

        return { success: false, error: data.message };

      }    try {              'Authorization': `Bearer ${token}`

    } catch (error) {

      const errorMessage = 'Network error. Please try again.';      setIsLoading(true);            }

      setError(errorMessage);

      return { success: false, error: errorMessage };      // Make API call to login          });

    } finally {

      setLoading(false);      const response = await fetch('/api/auth/login', {

    }

  };        method: 'POST',          if (response.ok) {



  // Register function        headers: {            setUser(userData);

  const register = async (username, email, password) => {

    setError('');          'Content-Type': 'application/json',            setIsAuthenticated(true);

    setLoading(true);

        },          } else {

    try {

      const response = await fetch('http://localhost:5000/api/auth/register', {        body: JSON.stringify({ email, password }),            // Token is invalid, clear storage

        method: 'POST',

        headers: {      });            logout();

          'Content-Type': 'application/json'

        },          }

        body: JSON.stringify({ username, email, password })

      });      if (response.ok) {        }



      const data = await response.json();        const userData = await response.json();      }



      if (response.ok) {        setUser(userData.user);    } catch (error) {

        localStorage.setItem('token', data.token);

        setUser(data.user);        setIsAuthenticated(true);      console.error('Auth check failed:', error);

        return { success: true, user: data.user };

      } else {        localStorage.setItem('quantum_user', JSON.stringify(userData.user));      logout();

        setError(data.message || 'Registration failed');

        return { success: false, error: data.message };        return { success: true, user: userData.user };    } finally {

      }

    } catch (error) {      } else {      setIsLoading(false);

      const errorMessage = 'Network error. Please try again.';

      setError(errorMessage);        const error = await response.json();    }

      return { success: false, error: errorMessage };

    } finally {        return { success: false, error: error.message };  };

      setLoading(false);

    }      }

  };

    } catch (error) {  const login = (userData, token = null) => {

  // Logout function

  const logout = () => {      console.error('Login error:', error);    if (token) {

    localStorage.removeItem('token');

    setUser(null);      return { success: false, error: 'Network error' };      localStorage.setItem('authToken', token);

    setError('');

  };    } finally {    }



  // Update user profile      setIsLoading(false);    localStorage.setItem('user', JSON.stringify(userData));

  const updateProfile = async (profileData) => {

    setError('');    }    setUser(userData);

    setLoading(true);

  };    setIsAuthenticated(true);

    try {

      const token = localStorage.getItem('token');  };

      const response = await fetch('http://localhost:5000/api/auth/profile', {

        method: 'PUT',  const register = async (name, email, password) => {

        headers: {

          'Authorization': `Bearer ${token}`,    try {  const logout = () => {

          'Content-Type': 'application/json'

        },      setIsLoading(true);    localStorage.removeItem('authToken');

        body: JSON.stringify(profileData)

      });      // Make API call to register    localStorage.removeItem('user');



      const data = await response.json();      const response = await fetch('/api/auth/register', {    setUser(null);



      if (response.ok) {        method: 'POST',    setIsAuthenticated(false);

        setUser(data.user);

        return { success: true, user: data.user };        headers: {  };

      } else {

        setError(data.message || 'Profile update failed');          'Content-Type': 'application/json',

        return { success: false, error: data.message };

      }        },  const updateUser = (updatedUserData) => {

    } catch (error) {

      const errorMessage = 'Network error. Please try again.';        body: JSON.stringify({ name, email, password }),    const newUserData = { ...user, ...updatedUserData };

      setError(errorMessage);

      return { success: false, error: errorMessage };      });    localStorage.setItem('user', JSON.stringify(newUserData));

    } finally {

      setLoading(false);    setUser(newUserData);

    }

  };      if (response.ok) {  };



  // Change password        const userData = await response.json();

  const changePassword = async (currentPassword, newPassword) => {

    setError('');        setUser(userData.user);  const value = {

    setLoading(true);

        setIsAuthenticated(true);    user,

    try {

      const token = localStorage.getItem('token');        localStorage.setItem('quantum_user', JSON.stringify(userData.user));    isAuthenticated,

      const response = await fetch('http://localhost:5000/api/auth/change-password', {

        method: 'PUT',        return { success: true, user: userData.user };    isLoading,

        headers: {

          'Authorization': `Bearer ${token}`,      } else {    login,

          'Content-Type': 'application/json'

        },        const error = await response.json();    logout,

        body: JSON.stringify({ currentPassword, newPassword })

      });        return { success: false, error: error.message };    updateUser,



      const data = await response.json();      }    checkAuthStatus



      if (response.ok) {    } catch (error) {  };

        return { success: true, message: data.message };

      } else {      console.error('Registration error:', error);

        setError(data.message || 'Password change failed');

        return { success: false, error: data.message };      return { success: false, error: 'Network error' };  return (

      }

    } catch (error) {    } finally {    <AuthContext.Provider value={value}>

      const errorMessage = 'Network error. Please try again.';

      setError(errorMessage);      setIsLoading(false);      {children}

      return { success: false, error: errorMessage };

    } finally {    }    </AuthContext.Provider>

      setLoading(false);

    }  };  );

  };

};

  // Clear error

  const clearError = () => {  const logout = () => {

    setError('');

  };    setUser(null);export default AuthContext;



  const value = {    setIsAuthenticated(false);

    user,    localStorage.removeItem('quantum_user');

    loading,  };

    error,

    login,  const value = {

    register,    user,

    logout,    isAuthenticated,

    updateProfile,    isLoading,

    changePassword,    login,

    clearError,    register,

    isAuthenticated: !!user    logout,

  };  };



  return (  return (

    <AuthContext.Provider value={value}>    <AuthContext.Provider value={value}>

      {children}      {children}

    </AuthContext.Provider>    </AuthContext.Provider>

  );  );

};};

export default AuthContext;