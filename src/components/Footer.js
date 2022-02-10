import React from 'react';
import './Footer.css'
import { useNavigate, useLocation } from 'react-router-dom'
import ExploreIcon from '../assets/exploreIcon.svg'
import OfferIcon from '../assets/offerIcon.svg'
import ProfileIcon from '../assets/personOutlineIcon.svg'
import Auction from '../assets/auction.svg'

export default function Footer() {
    const navigate = useNavigate()
  return (
      <div className='footer'>
          <div className="explore" onClick={()=> navigate('/')}>
          <img src={ExploreIcon} alt="" />
          <p>Explore</p>
          </div>
          <div className="offer" onClick={()=> navigate('/offer')}>
          <img src={OfferIcon} alt="" />
          <p>Offers</p>
          </div>
          <div className="profile" onClick={()=> navigate('/profile')}>
          <img src={ProfileIcon} alt="" />
          <p>Profile</p>
          </div>
          <div className="auction" onClick={()=> navigate('/auction')}>
              <img src={Auction} alt="" />
              <p>Auction</p>
          </div>
      </div>
  );
}
