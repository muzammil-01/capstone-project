import './Sale.css'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import bedIcon from '../../assets/bedIcon.svg'
import bathtubIcon from '../../assets/bathtubIcon.svg'

export default function Sale() {
  const { documents, error } = useCollection('properties');
  const { user } = useAuthContext();
 return (
   <div>
   <h1 className='sale-heading'>Places for sale</h1>
 <div className="container">
{ documents && documents.map((property)=>{
  if(property.type === "sale" && property.offer!==true){
      return(
      
          <div className="cards" key={property.id}>
            <div className="image-section">
              <img src={property.attachment} alt="" />
            </div>
              <div className="content">
                <h3>Owner : <b> {property.createdBy.displayName}</b>
                </h3>
              <div className='categoryListingInfoDiv'>
                
              <img src={bedIcon} alt='bed' />
              <h3 className='categoryListingInfoText'>
                {property.bedrooms > 1
                  ? `${property.bedrooms} Bedrooms`
                  : '1 Bedroom'}
              </h3>

              <img src={bathtubIcon} alt='bath' />
              <h1 className='categoryListingInfoText'>
                {property.bathrooms > 1
                  ? `${property.bathrooms} Bathrooms`
                  : '1 Bathroom'}
              </h1>
              </div>

            <p className='categoryListingPrice'>
             RS. {property.regularPrice}
             </p>
                <Link to={property.id}> view</Link>
              </div>
          </div>
        )
  }

})}
 </div>
   </div>
 );
}