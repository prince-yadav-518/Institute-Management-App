import React from 'react'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { ToastContainer } from 'react-toastify';
import Home from './components/home'
import Courses from './components/courses'
import Addcourses from './components/Addcourses'
import Student from './components/student'
import Addstudent from './components/Addstudent'
import Collectfee from './components/collectfee'
import PaymentHistory from './components/paymenthistory'
import CourseDetail from'./components/CourseDetail'
import StudentDetail from './components/StudentDetail'

const App = () => {
  const myRouter = createBrowserRouter([
    {path:'dashboard',element:<Dashboard/>},
    {path:'/',element:<Login/>},
    {path:'login',element:<Login/>},
    {path:'signup',element:<Signup/>},
    {path:'dashboard',element:<Dashboard/>,children:[
      {index:true,element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'courses',element:<Courses/>},
      {path:'add-course',element:<Addcourses/>},
      {path:'Student',element:<Student/>},
      {path:'add-student',element:<Addstudent/>},
      {path:'collect-fee',element:<Collectfee/>},
      {path:'payment-history',element:<PaymentHistory/>},
      {path:'course-detail/:id',element:<CourseDetail/>},
     { path:'updated-course/:id',element:<Addcourses/>}, { path:'updated-student/:id',element:<Addstudent/>},
     {path:'student-detail/:id',element:<StudentDetail/>}

    ]}

  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
      <ToastContainer />
    </>
  )
}

export default App