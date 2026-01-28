import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Addcourses = () => {
  const[courseName,setCourseName]=useState('');
  const[description,setDescription]=useState('');
  const[price,setPrice]=useState('');
  const[startingDate,setStartingDate]=useState('');
  const[endDate,setEndDate]=useState('');
  const[image,setImage]=useState(null);

  const[imageUrl,setImageUrl]=useState('');
  const[isLoading,setLoading]=useState('');

  const navigate=useNavigate();
  const location=useLocation()

  useEffect(()=>{

    if(location.state )
    {
      console.log(location.state.courses)
      setCourseName(location.state.courses.courseName)
      setDescription(location.state.courses.description)
      setPrice(location.state.courses.price)
      setStartingDate(location.state.courses.startingDate)
      setEndDate(location.state.courses.endDate)
      setImageUrl(location.state.courses.imageUrl)

    }
    else
    {
      setCourseName('')
      setDescription('')
      setPrice('')
      setStartingDate('')
      setEndDate('')
      setImageUrl('')
    }
    
  },[location.state])

  const submitHandler=(e)=>{
    e.preventDefault()
    setLoading(true)
   const formdata= new FormData();
   formdata.append('courseName',courseName);
   formdata.append('description',description);
   formdata.append('price',price);
   formdata.append('startingDate',startingDate);
   formdata.append('endDate',endDate);
   if(image)
   {
    formdata.append('image',image);

   }
   if(location.state)
   {
    axios.put('https://institute-management-app-backend-yvli.onrender.com/course/'+location.state.courses._id,formdata,{
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
   })
   .then(res=>{
    setLoading(false)
    console.log(res.data.courses);
    toast.success('course updated.....')
    navigate('/dashboard/course-detail/'+location.state.courses._id)
    
   })
   .catch(err=>{
    setLoading(false)
    console.log(err);
    toast.error('somthing is wrong....')
   })

  }
  else
  {
     axios.post('https://institute-management-app-backend-yvli.onrender.com/course/add-course',formdata,{
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
   })
   .then(res=>{
    setLoading(false)
    console.log(res.data.courses);
    toast.success('New course Added.....')
    navigate('/dashboard/courses')
    
   })
   .catch(err=>{
    setLoading(false)
    console.log(err);
    toast.error('somthing is wrong....')
   })

    
  }
   
  

  
  }

  const fileHandler = (e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>{location.state ?'Edit Course':'Add New Course'}</h1>
        <input  value={courseName} required onChange={e=>{setCourseName(e.target.value)}} placeholder="Course Name" type="text" />
        <input value={description} required onChange={e=>{setDescription(e.target.value)}}  placeholder="Description" type="text" />
        <input value={price} required onChange={e=>{setPrice(e.target.value)}}  placeholder="Price" type="number" />
        <input value={startingDate } required onChange={e=>{setStartingDate(e.target.value)}}  placeholder="starting Date (DD-MM-YY)" type="text" />
        <input value={endDate} required onChange={e=>{setEndDate(e.target.value)}}  placeholder="End Date (DD-MM-YY)" type="text" />
        <input required={!location.state} onChange={fileHandler}   type="file" />
        {imageUrl && <img  className='your-logo'alt='Your Logo' src={imageUrl}/>}
        <button  className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
      </form>
    </div>
  )
}

export default Addcourses