import { useState, useEffect } from 'react';
import './Create.css'
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore.js';
import { projectStorage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Spinner from '../../components/Spinner'

export default function Create() {
    // const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('properties');
    const [loading, setLoading] = useState(false)
    const[phoneNo, setPhoneNo] = useState('')
    const[area, setArea] = useState('')
    const [type, setType] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [address, setAddress] = useState('')
    const [offer, setOffer] = useState(false)
    const [discountedPrice, setDiscountedPrice] = useState('')
    const [regularPrice, setRegularPrice] = useState('')
    const [attachment, setAttachment] = useState('')
    const [attachmentError, setAttachmentError] = useState(null)

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)



            // const res = await fetch(
            //     `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=a497572242474d8aa6f8ae4cb9813c3e`
            // )
            // const data = await res.json();
            // console.log(data)
            // const formatted_add = data.results[0].formatted
            // const lati = data.results[0].geometry.lat
            // const longi = data.results[0].geometry.lng
            // console.log(formatted_add,lati,longi)
 

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid,
            email:user.email
        }

        const uploadPath = `thumbnails/${user.uid}/${attachment.name}`
        const img = await projectStorage.ref(uploadPath).put(attachment)
        const imgUrl = await img.ref.getDownloadURL();

        const property = {
            type,
            area,
            bedrooms,
            bathrooms,
            // formatted_add,
            address,
            // lati,
            // longi,
            offer,
            phoneNo,
            discountedPrice,
            regularPrice,
            attachment:imgUrl,
            createdBy
        }
        await addDocument(property)
        if(!response.error){
            navigate('/')
        }
    }
    
    const handleAttachment = (e) => {
        setAttachment(null)
        let selected = e.target.files[0]
        console.log(selected)
        if (!selected) {
            setAttachmentError("Please select a File")
            return
        }
        if (!selected.type.includes("image")) {
            setAttachmentError("Selected file must be an image");
            return
        }
        if (selected > 1000000) {
            setAttachmentError("File size must be less than 100kb");
            return
        }
        
        setAttachmentError(null);
        setAttachment(selected);
        console.log("Attchmnent Updated")
      }

      useEffect(()=>{
        if(!user){
          navigate('/')
        }
      },[user])
      

      return (
        <>
            <div className='profile'>
                <header>
                    <p className='pageHeader'>Create a Listing</p>
                </header>
            </div>
            <main>
                <form className='listing-form' onSubmit={handleSubmit}>
                    <label>type</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
                    <br />

                    <label>bedrooms</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setBedrooms(e.target.value)}
                        value={bedrooms}
                    />
                    <br />

                    <label>Bathrooms</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setBathrooms(e.target.value)}
                        value={bathrooms}
                    />
                    <br />

                    <label>Enter Area in Square feets</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setArea(e.target.value)}
                        value={area}
                    />
                    <br />

                    <label>address</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                    <br />

                    <label>Phone # no</label>
                    <input
                    required
                        type="number"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        value={phoneNo}
                    />
                    <br />


                    <label>Image</label>
                    <input
                        className='attach'
                        type="file"
                        onChange={handleAttachment}
                    />
                    <br />
                    
                    <button className='btn' onClick={(e) => { setOffer(!offer); e.preventDefault() }}>Offer</button>
                    <br />

                    <label>Regular Price</label>
                    <input
                    required
                        type="text"
                        onChange={(e) => setRegularPrice(e.target.value)}
                        value={regularPrice}
                    />
                    <br />

                    {offer && (<>
                        <label> Price After Discount</label>
                        <input
                        required
                            type="text"
                            onChange={(e) => setDiscountedPrice(e.target.value)}
                            value={discountedPrice}
                        />
                    </>)}
                    {!loading &&
                    <button className='btn'>submit form</button>
                    }
                    {loading &&
                        <Spinner/>
                    }
                    {attachmentError && <div className='error'>{attachmentError}</div>}
                </form>
            </main>
        </>
    )

}
