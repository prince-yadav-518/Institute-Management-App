import React from 'react'
import '../style/dashboard.css'
import image from '../assets/image.png'
import { Link, useLocation } from 'react-router-dom'

const SideNav = () => {
    const location=useLocation();
  return (
    <div className='nav-container'>
        <div className="brand-container">
            <img className='profile-logo' src={image} alt="brand-logo" />
            <div>
                <h2 className='brand-name'>Management App</h2>
                <p className='brand-slogan'>Mange your App in easy way..</p>
            </div>
        </div>
        <div className='menu-container'>
            <Link to='/dashboard/home' className={location.pathname==='/dashboard/home'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-house-user"></i> Home</Link>
            <Link to='/dashboard/courses' className={location.pathname==='/dashboard/courses'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-book"></i>All Course</Link>
            <Link to='/dashboard/add-course' className={location.pathname==='/dashboard/add-course'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-plus"></i>Add Course</Link>
            <Link to='/dashboard/student' className={location.pathname==='/dashboard/student'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-user-group"></i>All Student</Link>
            <Link to='/dashboard/add-student' className={location.pathname==='/dashboard/add-student'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-user-plus"></i>Add Student</Link>
            <Link to='/dashboard/collect-fee' className={location.pathname==='/dashboard/collect-fee'?'menu-active-link':'menu-link'}> <i class="fa-solid fa-indian-rupee-sign"></i>Collect Fee</Link>
            <Link to='/dashboard/payment-history' className={location.pathname==='/dashboard/payment'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-list"></i>Payment History</Link>
            
        </div>
        <div className='contact-us'>
            <p>  Contact Developer</p>
            <p> <i class="fa-solid fa-phone"></i> 6388508518</p>
        </div>

        </div>
  )
}

export default SideNav