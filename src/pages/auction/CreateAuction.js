import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore.js';
import { projectStorage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';


export default function CreateAuction() {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { addDocument, response } = useFirestore('auctions');
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingPrice, setStartingPrice] = useState(0)
  const [duration, setDuration] = useState(0)
  const [attachment, setAttachment] = useState('')
  const [attachmentError, setAttachmentError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const uploadPath = `auctionimages/${user.uid}/${attachment.name}`
    const img = await projectStorage.ref(uploadPath).put(attachment)
    const imgUrl = await img.ref.getDownloadURL();



    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    const newAuction = {
      title,
      description,
      startingPrice,
      duration,
      attachment: imgUrl,
      createdBy
    }
    await addDocument(newAuction)
    if (!response.error) {
      navigate('/auction')
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
      alert('please login first')
      navigate('/login')
    }
  })

  return (
    
    <div>
      <form className='listing-form' onSubmit={handleSubmit}>
        <h1>Auction Form</h1>
        <label>Item title</label>
        <input
          required
          onChange={(e) => setTitle(e.target.value)}
          type="text" />

        <label>Item Description</label>
        <input
          required
          onChange={(e) => setDescription(e.target.value)}
          type="text" />

        <label>Starting Price</label>
        <input
          required
          onChange={(e) => setStartingPrice(e.target.value)}
          type="number" />

        <label>Auction duration in hours</label>
        <input
          required
          onChange={(e) => setDuration(e.target.value)}
          type="number" />
        <br />
        <br />

        <label>Image</label>
        <input
          type="file"
          onChange={handleAttachment} />

        {!loading &&
          <button className='btn'>submit form</button>
        }
        {loading &&
          <Spinner />
        }
      </form>
    </div>
  );

}