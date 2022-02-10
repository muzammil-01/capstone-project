// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Explore from './pages/explore/Explore';
import Rent from './pages/rent/Rent'
import Sale from './pages/sale/Sale'
import Create from './pages/create/Create'
import Offer from './pages/offer/Offer'
import Profile from './pages/profile/Profile'
import Auction from './pages/auction/Auction'
import CreateAuction from './pages/auction/CreateAuction'
import PropertyDetails from './pages/propertyDetails/PropertyDetails';

function App() {
  const {authIsReady}= useAuthContext();
  return (
    <div className="App">
      {authIsReady && 
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Explore/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/rent' element={<Rent/>}/>
        <Route path='/Sale' element={<Sale/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/offer' element={<Offer/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/auction' element={<Auction/>}/>
        <Route path='/createauction' element={<CreateAuction/>}/>
        <Route path='/sale/:id' element={<PropertyDetails/>}/>
        <Route path='/rent/:id' element={<PropertyDetails/>}/>
        <Route path='/offer/:id' element={<PropertyDetails/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      }

    </div>
  );
}

export default App;
