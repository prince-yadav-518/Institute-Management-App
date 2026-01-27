import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Addstudent = () => {
  const[fullName,setFullName]=useState('');
  const[phone,setPhone]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[courseId,setCourseId]=useState('');
  
  const[image,setImage]=useState(null);

  const[imageUrl,setImageUrl]=useState('');
  const[isLoading,setLoading]=useState('');

  // const[courseList,setCourseList]=useState([])

  const navigate=useNavigate();
   const location=useLocation()


  const [courseList,setCourseList]=useState([]);
 
  useEffect(()=>{
    getCourses()
    if(location.state)
    {
      setFullName(location.state.student.fullName)
      setPhone(location.state.student.phone)
      setEmail(location.state.student.email)
      setAddress(location.state.student.address)
      setCourseId(location.state.student.courseId)
      setImageUrl(location.state.student.imageUrl)
    }
    else{
      setFullName('')
      setPhone('')
      setEmail('')
      setAddress('')
      setCourseId('')
      setImageUrl('')

    }
  },[location])

  const getCourses=()=>{
const token = localStorage.getItem("token")

    axios.get("http://localhost:3000/course/all-course", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    setCourseList(res.data.courses)
    })
   .catch(err=>{
      console.log("ERROR:", err.response?.data || err.message)
      toast.error('something is wrong...')
    })
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    setLoading(true)
   const formdata= new FormData();
   formdata.append('fullName',fullName);
   formdata.append('phone',phone);
   formdata.append('email',email);
   formdata.append('address',address);
   formdata.append('courseId',courseId);
   if(image)
   {
    formdata.append('image',image);
   }
   
   if(location.state)
   {
    axios.put('http://localhost:3000/student/'+location.state.student._id,formdata,{
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
   })
   .then(res=>{
    setLoading(false)
    console.log(res.data);
    // setCourseList(res.data.courses)
    toast.success('Student Detail Updated.....')
    navigate('/dashboard/student-detail/'+location.state.student._id)
    
   })
   .catch(err=>{
    setLoading(false)
    console.log(err);
    toast.error('somthing is wrong....')
   })
   }
   else{
    axios.post('http://localhost:3000/student/add-student',formdata,{
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
   })
   .then(res=>{
    setLoading(false)
    console.log(res.data);
    // setCourseList(res.data.courses)
    toast.success('New student Added.....')
    navigate('/dashboard/student')
    
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
        <h1>{location.state ? 'Edit Student detail':'Add New Student'}</h1>
        <input required value={fullName} onChange={e=>{setFullName(e.target.value)}} placeholder="Full Name" type="text" />
        <input required value={phone} onChange={e=>{setPhone(e.target.value)}}  placeholder="Phone" type="text" />
        <input required value={email} onChange={e=>{setEmail(e.target.value)}}  placeholder="Email" type="email" />
        <input required value={address} onChange={e=>{setAddress(e.target.value)}}  placeholder="address" type="text" />
        <select disabled={location.state} value={courseId}  onChange={e=>{setCourseId(e.target.value)}} >
          <option value="">Select Course</option>
          {
            courseList.map(course => (
            <option key={course._id} value={course._id}>
            {course.courseName}
          </option>
  ))
}

        </select>
        
        <input required={!location.state} onChange={fileHandler}   type="file" />
        {imageUrl && <img  className='your-logo'alt='Your Logo' src={imageUrl}/>}
        <button  className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
      </form>
    </div>
  )
}

export default Addstudent