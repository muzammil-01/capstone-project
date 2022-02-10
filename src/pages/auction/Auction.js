import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auction.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore';
import {projectAuth} from '../../firebase/config'

export default function Auction() {
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const { updateDocument, response, deleteDocument } = useFirestore('auctions');
  const { documents, error } = useCollection('auctions');
  const [show , setShow] = useState(true)
  var use = projectAuth.currentUser;


  const endAuction = async (id) => {

    if (window.confirm("Are you sure you want to delete the Auction?")) {
      await deleteDocument(id);
    }

  }




  const bidAuction = (auctionId, price) => {
    if (!user) {
      alert('Please login first');
    }
    
    let newPrice = Math.floor((price * 1.1));
    updateDocument(auctionId,{
      startingPrice:newPrice,
      currWinner: use.displayName
    })
    
  };
  return (
    <div>
      <center><Link to='/createauction' className="btn mt-4" >Create Auction</Link></center>
      <div className="container">
        {documents && documents.map((auction) => {
          return (
            <div className="cards" key={auction?.id}>
              <div className="image-section">
              <img src={auction?.attachment} alt="" />
              </div>
              <div className="content">
                <h1>{auction?.title}</h1>
                <p>{auction?.description}</p>
                <p><strong>Auction Duration:</strong> {auction?.duration} hours</p>
                <div className="flex">

                {user?.uid === auction?.createdBy.id &&
                 <button className='btn' onClick={()=> endAuction(auction.id)}>end Auction</button>
                }

                 {user?.uid !== auction?.createdBy.id && show && <button className='btn' onClick={()=> bidAuction(auction.id, auction.startingPrice)}>Bid</button>}
                
                <p>RS. {auction?.startingPrice}</p>
                </div>
                {auction.currWinner && <p>latest bid by: {auction.currWinner}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>


  );

}
