import React, { useState } from 'react'
import '../style/signup.css'
import Image from '../assets/image.png'
import axios from 'axios'
import {toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  
  const [email,setEmail] = useState('');
  
  const [password,setPassword] = useState('');
 
  const [isLoading,setLoading]=useState(false)

  const navigate=useNavigate();

  const submitHandler=(event)=>{
    setLoading(true);
    event.preventDefault();
    

    axios.post('http://localhost:3000/user/login',{email:email,password:password})
    .then(res=>{
      setLoading(false);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('fullName',res.data.fullName)
      localStorage.setItem('imageUrl',res.data.imageUrl)
      localStorage.setItem('imageId',res.data.imageId)
      localStorage.setItem('email',res.data.email)
      toast.success(' You Are Successfully Login')
      navigate('/dashboard')
      console.log(res)
    })
    .catch(err=>{
      toast.error('something is wrong..' )
      setLoading(false);

      console.log(err)
    })

  }

  
  
  return (
    <div className='signup-wrapper'>
      <div className="signup-box">
        <div className="signup-left">
          <img src={Image} alt='logo'/>
          <h1 className='signup-left-heading'>Institute Management App</h1>
          <p className='signup-left-para'>Manage Your All data in Easy Way....</p>
        </div>
        <div className="signup-right">
          
          
          <form onSubmit={submitHandler} className='form'> 
            <h1>Login With Your Account</h1>
            <input required  onChange={e=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            
            <input required  onChange={e=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            
          
            <button type='submit'>{isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>
            <Link className='link' to='/signup'>Create Your account</Link>
            </form>
         
        </div>

    </div>
    </div>
    
  )
}

export default Signup