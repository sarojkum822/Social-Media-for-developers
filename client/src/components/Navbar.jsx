import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { navbarData } from '../Constant';
import UserContext from '../Context/UserContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(UserContext);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out Successfully");
  };

  return (
    <div className="navbar p-2">
      <div className="logo">U-Code</div>
      <div className='nav-items'>
        {navbarData.map((item, index) => (
          <div key={index} className='nav-item'>
            {/* Conditionally render "Login", "Logout", or hide "Signup" based on isAuthenticated */}
            {item.label === '/login' && isAuthenticated ? (
              <Link className='logout' onClick={handleLogout}>Logout</Link>
            ) : item.label === '/register' && isAuthenticated ? (
              null // Don't render Signup when isAuthenticated is true
            ) : (
              <Link to={item.label}>{item.navitem}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
