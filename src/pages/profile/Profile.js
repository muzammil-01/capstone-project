import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import {useCollection} from '../../hooks/useCollection'
import { useFirestore } from "../../hooks/useFirestore";
import bedIcon from '../../assets/bedIcon.svg'
import bathtubIcon from '../../assets/bathtubIcon.svg'
import { FaTrashAlt } from 'react-icons/fa';


export default function Profile() {

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { deleteDocument, response } = useFirestore('properties');
  const { documents, error } = useCollection('properties');

  const deleteProperty = async (id) => {

    if (window.confirm("Are you sure you want to delete the Property?")) {
      await deleteDocument(id);
    }

  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    console.log(user)
  }, [user])



  return (

          <>
            <center><h1>Profile</h1></center>
            <div className='user-profile'>
              <Avatar src={user?.photoURL} />
              <strong>
                Name: {user?.displayName} <br />
                Email: {user?.email} <br />
              </strong>
            </div>
            <hr />
            <center><h1>Your Properties</h1></center>
            <div className="container">
     {documents && documents.map((property)=>{
       if(user?.uid === property?.createdBy.id){
           return(
           
               <div className="cards" key={property.id}>
                 <div className="image-section">
                 <div className='delete'>
                            <i onClick={()=> {deleteProperty(property?.id)}}><FaTrashAlt/></i>
                </div>
                   <img src={property?.attachment} alt="" />
                 </div>
                   <div className="content">
                     <h3>Owner : <b> {property?.createdBy.displayName}</b>
                     </h3>
                   <div className='categoryListingInfoDiv'>
                     
                   <img src={bedIcon} alt='bed' />
                   <h3 className='categoryListingInfoText'>
                     {property?.bedrooms > 1
                       ? `${property?.bedrooms} Bedrooms`
                       : '1 Bedroom'}
                   </h3>
     
                   <img src={bathtubIcon} alt='bath' />
                   <h1 className='categoryListingInfoText'>
                     {property?.bathrooms > 1
                       ? `${property?.bathrooms} Bathrooms`
                       : '1 Bathroom'}
                   </h1>
                   </div>
     
                 <p className='categoryListingPrice'>
                  RS. {property?.regularPrice}
                  </p>
                     <Link to={`/${property.type}/${property.id}`}> view</Link>
                   </div>
               </div>
             )
       }
     
     })}
      </div>
          </>

  );
}
