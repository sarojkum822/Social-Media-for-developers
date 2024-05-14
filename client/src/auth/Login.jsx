import React, { useContext, useEffect, useState } from 'react';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserContext from '../Context/UserContext';

const Login = () => {

  const { isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    user,
    setUser,
  login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })



  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(formData);
        navigate('/');
        toast.success('Login successful');
    } catch (error) {
        toast.error(error.message);
    }
};

 

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='text-3xl mb-2'>Login</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input required className='p-2 w-[400px]'  type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input required className='p-2 w-[400px]' type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <button type='submit' className='font-medium rounded-md bg-sky-400 p-2 hover:text-white'>Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
