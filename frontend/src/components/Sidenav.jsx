import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle ,faHouse,faPlus,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/authContext'
import {Link} from 'react-router-dom'

const Sidenav = ({ isVisible }) => {
    const {user,logout} = useContext(AuthContext);

    const LogOut = ()=>{
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
     <h3 className='text-lg font-sans mx-1'>( Visitor )</h3>

    <div className='flex flex-col gap-5 p-4 mt-4'>
     <Link
     to='/visitordashboard'
     className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faHouse} /> Raised Requests</Link>
     <Link
     to='/visitordashboard/registrationForm'
     className='border p-3 rounded cursor-pointer hover:bg-green-600 hover:text-white text-center'><FontAwesomeIcon icon={faPlus} /> Add a new Request</Link>
    </div> 

     <button 
     onClick={LogOut}
     className='bg-white text-red-600 p-2 rounded mt-105 w-full cursor-pointer border border-gray-600 hover:bg-red-600 hover:text-white shadow'>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
    </div>
  )
}

export default Sidenav
