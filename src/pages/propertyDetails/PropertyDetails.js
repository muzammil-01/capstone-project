import './PropertyDetails.css'
import { useParams } from 'react-router-dom'
import MapView from '../../map/MapView'
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import bathtubicon from '../../assets/bathtubIcon.svg'
import bedicon from '../../assets/bedIcon.svg'
import phone from '../../assets/call.png'
import email from '../../assets/email.svg'
import Avatar from '../../components/Avatar'


export default function PropertyDetails() {
  const { user } = useAuthContext()
  const [show, setShow] = useState(false)
  const { id } = useParams()
  const { document } = useDocument('properties', id)
  // console.log(document.lati, document.longi)
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <img className='image' src={document?.attachment} alt="" />
        </div>


        <div className="col-lg-5 col-md-6 col-sm-12">
          <div className='cardcont2 card p-3'>
              <h2>Property Description</h2>
            <div className='description mt-3'>
            <div>
              <img src={bathtubicon} alt="" />
               {document?.bathrooms} bathrooms
              </div>
              <div className='ms-5'>
              <img src={bedicon} alt="" /> {document?.bedrooms} bedrooms
            </div>
            </div>
            <div className='description2 mt-3'>
            <div><strong>Area:</strong> {document?.area} sqft</div>
              <div className='ms-5'><strong>Price:</strong> {document?.regularPrice} RS</div>
              </div>
              <div className='mt-3'>
              {document?.offer === true && <p><strong>Discounted Price:</strong>  {document?.discountedPrice} RS</p>}
              </div>
              <div className='mt-1'><strong>Address:</strong> {document?.address}</div>
          </div>
          <div className='cardcont2 card p-3 '>
            <h2>Owner Description</h2>
                <div className='mt-3 my-3'><strong>Name:</strong> {document?.createdBy?.displayName}</div>
            <button className='btn' onClick={() => setShow(!show)}>Contact Owner</button>
            {show && (
              <>
                <div className='flex '>
                  <p>
                    <img className='phone-image' src={phone} alt="" />{document?.phoneNo}
                    </p>
                    </div>
                <div className='flex'>
                  <p><img className='phone-image' src={email} alt="" />{document?.createdBy.email}</p>
                </div>
              </>)}
          </div>
        </div>
        <div className="row mt-5">
          <MapView />
        </div>
      </div>

    </div>

  )
}
