import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Paymenthistory = () => {
  const[paymentList,setPaymentList]=useState([]);


   useEffect(()=>{
    getPaymentHistorydata();
   },[])




   const getPaymentHistorydata=()=>{
const token = localStorage.getItem("token")

    axios.get("http://localhost:3000/fee/payment-history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res=>{
    
    
    setPaymentList(res.data.PaymentHistory.reverse())
    
    console.log(res.data)
    // setCourses(res.data.courses);
    // setStudentsList(res.data.students)
    
    })
   .catch(err=>{
      console.log(err)
      toast.error('something is wrong...')
    })
}
  return (
    <div className='payment-history-wrapper'>
      
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
              paymentList.map((payment)=>{
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
        
      
    </div>
  )
}

export default Paymenthistory