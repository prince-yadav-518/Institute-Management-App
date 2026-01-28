import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import '../style/home.css'

const Home = () => {

  const[totalCourse,setTotalCourse]=useState(0);
  const[totalStudent,setTotalStudent]=useState(0);
  const[students,setStudents]=useState([]);
  const[fees,setFees]=useState([]);
  const[totalAmount,setTotalAmount]=useState(0)

  useEffect(()=>{
    getHomeDetails()
  },[])
  const getHomeDetails=()=>{
     const token = localStorage.getItem("token")
    axios.get("https://institute-management-app-backend-yvli.onrender.com/course/home/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    console.log(res.data)
    setTotalCourse(res.data.totalCourse)
    setTotalStudent(res.data.totalStudent)
    setStudents(res.data.students)
    setFees(res.data.fees)
    setTotalAmount(res.data.totalAmount)

    
   
    
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })

  }
  return (
    <div className='home-wrapper'>
      <div className="count-box-wrapper">
        <div className=" box box1">
          <h2>00{totalCourse}</h2>
          <p>Courses</p>
        </div>
        <div className="box box2">
          <h2>{totalStudent}</h2>
          <p>Students</p>

        </div>
        <div className="box box3">
          <h2>Rs {totalAmount}</h2>
          <p>Total Amount</p>
        </div>
      </div>
      <div className="list-container">
        <div className="table-container">
          {
            students.length>0
            ?
            <table>
          <thead>
            <tr>
              <th>Student's Pic</th>
              <th> Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>

          
          <tbody>
            
          
          {students.map((students)=>{
            return(
          <tr className='student-row'>
            <td><img className='student-profile-pic' src={students.imageUrl}/></td>
            <td> {students.fullName}</td>
            <td>{students.phone}</td>
            <td>{students.email}</td>
            
          </tr>
            )
            })}
        </tbody>
        </table>
        :
        
        <p style={{ textAlign: "center", marginTop: "20px" }}>No Students is Here</p>


          }
     
        

        </div>
        <div className="table-container">
          {
            fees.length>0?
             <table>
          <thead className='fee-heading'>
           <tr>
             <th>Student's Name</th>
            <th>Date and Time</th>
            <th>Amount</th>
            <th>Remark</th>
           </tr>
          </thead>
          <tbody>

           
            {
              fees.map((payment)=>{
                return(
                <tr key={payment._id}>
                  <td>{payment.fullName}</td>
                  <td>{payment.createdAt}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.remark}</td>

                </tr>
                )

              })
            }
          </tbody>
        </table>
        :
        <p>No Payment History is Here</p>
          }
        

        </div>

      </div>

    </div>
  )
}

export default Home