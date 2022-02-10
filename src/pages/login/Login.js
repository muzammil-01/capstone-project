import './Login.css'
import {Link} from 'react-router-dom'
import { useState, useEffect  } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isPending, error} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }
  const {user} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
   if(user){
      navigate('/')
    }
    },[user]);

  return (
    <>
      <h1 className='log'>Login</h1>
    <form onSubmit={handleSubmit} className="auth-form">

      <input
       required 
       type="email" 
       placeholder='Email' 
       onChange={(e) => setEmail(e.target.value)} 
       value={email}
       />
      <input 
      required 
      type="password" 
      placeholder='Password' 
      onChange={(e) => setPassword(e.target.value)} 
      value={password}
      />

     {!isPending && <button className="btn">Log in</button>}
      {isPending && <Spinner/>}

      <p>Do not Have Account? <br/>
      <Link to='/signup'>Sign up</Link>
      </p>

      {error && <div className='error'>{error}</div>}
      
    </form>
      </>
  );
}
