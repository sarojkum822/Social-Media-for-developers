import React, { useContext, useEffect, useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import UserContext from '../Context/UserContext';

const Login = () => {

  const { isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    user,
    setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })



  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, formData, { 
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });
  
      // Store the cookie in the local storage
      localStorage.setItem('cookie', response.headers);
      
      // Update authentication state
      setIsAuthenticated(true);
      // setUser()
      console.log(response.data.user);
  
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  

  if(isAuthenticated){
    return navigate('/');
  }


  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input required type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <button type='submit'>Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
