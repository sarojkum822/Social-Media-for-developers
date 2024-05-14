import React, { useState } from 'react';
import '../Styles/Register.css';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/register`,
        formData, // Directly pass formData here
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      
      toast.success(response.data.message);
      navigate('/login');
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2 className='text-3xl mb-2'>Sign Up</h2>
        <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>

          <input required type="text" className='p-2 w-[400px]' placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input required type="email" className='p-2 w-[400px]' placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input required type="password" className='p-2 w-[400px]' placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <button type='submit'  className='font-medium rounded-md bg-sky-400 p-2 hover:text-white'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
