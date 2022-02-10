import React from 'react';
import './Explore.css'
import { Link } from 'react-router-dom';
import Pic1 from '../../assets/place1.jpg'
import Pic2 from '../../assets/place2.jpg'
import Timer from '../../components/Timer'

export default function Explore() {
  return (
    <div className='explore'>
    <header>
      <p className='pageHeader'>Explore Categories</p>
    </header>

    <main>
      <div className="container">

         <div className="cards crd">
             <div className="image-section">
               <img src={Pic1} alt="" />
             </div>
               <div className="content">
              <h1>Places for rent</h1>
               </div>
              <Link className='btn' to='/rent'>View</Link>
           </div>
           <div className="cards crd">
             <div className="image-section">
               <img src={Pic2} alt="" />
             </div>
               <div className="content">
              <h1>Places for Sale</h1>
               </div>
              <Link className='btn' to='/sale'>View</Link>
           </div>
      </div>
    </main>
  </div>
    );
}

      {/* <h2 className='exploreCategoryHeading'>Categories</h2>
      <div className='exploreCategories'>
        <Link to='/rent'>
          <img
            src={Pic1}
            alt='rent'
            className='exploreCategoryImg'
          />
          <h2 className='exploreCategoryName'>Places for rent</h2>
        </Link>
        <Link to='/sale'>
          <img
            src={Pic2}
            alt='sell'
            className='exploreCategoryImg'
          />
          <h2 className='exploreCategoryName'>Places for sale</h2>
        </Link>
      </div> */}