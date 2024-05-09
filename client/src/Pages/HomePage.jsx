import React, { useContext } from 'react'
import '../Styles/Homepage.css'
import UserContext from '../Context/UserContext'

const HomePage = () => {
  
  const { isAuthenticated, user } = useContext(UserContext);

  console.log(user, isAuthenticated);

  return (
    <>
      <div className='home'>
        hey
      </div>
    </>
  )
}

export default HomePage