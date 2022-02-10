import './Navbar.css'
import React, { useState } from "react";
import Avatar from './Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout';
import logo from '../assets/logo.jpg'
export default function Navbar() {
  const navigate = useNavigate()
  const { logout, isPending } = useLogout()
 const {user} = useAuthContext()
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (

    <nav className='navbar'>
        <div className='logo '>
            <h2 className='logo-heading'><span className='color'>Real</span> Estate</h2>
        </div>

        <div  className={
            showMediaIcons ? "menu-links mobile-menu-link" : "menu-links"
          }>
        <ul className='hover-links'>
          {!user &&(
            <li>
              <Link to='/login'>
                <button className='btn' onClick={()=> setShowMediaIcons(false)}>
                    Login
                </button>
                </Link>
              <Link to='/signup'>
                <button className='btn btn1' onClick={()=> setShowMediaIcons(false)}>
                Signup
                </button>
                </Link>
            </li>
          )}
          {user &&(
            <>
            <li className='me-3'>{user.displayName}</li>
            
            <span onClick={logout}><button className='btn'>Logout</button></span>
            <span onClick={()=> navigate('/create') }><button className='btn1 btn'>Sell</button></span>
            </>
          )}


        </ul>
        </div>
        <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
   </nav>
  );
}
