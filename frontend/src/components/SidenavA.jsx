import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faRightFromBracket,faChartArea,faAddressBook,faLock,faDoorOpen,faPersonCircleCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/authContext'
import {Link} from 'react-router-dom'

const SidenavA = ({ isVisible }) => {
  const { user, logout } = useContext(AuthContext);

  const LogOut = () => {
    logout();
  }

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-80 p-5 z-50
        bg-white text-gray-600 shadow border border-gray-600
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <h1 className='text-lg font-sans'>  <FontAwesomeIcon icon={faUserCircle} /> {user} </h1>
      <h3 className='text-lg font-sans mx-1'>( Admin )</h3>


      <div className='flex flex-col gap-5 p-4 mt-4'>
        <Link
          to='/admindashboard'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faChartArea} /> Analytics</Link>
         <Link
          to='/admindashboard/addstaff'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faPlus} /> Add Staff</Link>  
        <Link
          to='/admindashboard/employees'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faAddressBook} /> Employees</Link>
          <Link
          to='/admindashboard/security'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faLock} /> Security</Link>
          <Link
          to='/admindashboard/visitorsinside'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faDoorOpen} /> Visitors Inside</Link>
          <Link
          to='/admindashboard/approvedvisitors'
          className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faPersonCircleCheck} /> Approved Visitors</Link>
      </div>


      <button
        onClick={LogOut}
        className='bg-white text-red-600 p-2 rounded mt-35 w-full cursor-pointer border border-gray-600 hover:bg-red-600 hover:text-white shadow'>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
    </div>
  )
}

export default SidenavA
