import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faRightFromBracket,faChartArea,faAddressBook,faLock,faDoorOpen,faPersonCircleCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/authcontext'
import {Link} from 'react-router-dom'

const SidenavA = ({ isVisible }) => {
  const { user, logout } = useContext(AuthContext);

  const LogOut = () => {
    logout();
  }

  return (
    <div
      className={`
        fixed top-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 p-5
        bg-white text-slate-700 shadow-2xl shadow-slate-900/10
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="mb-5 rounded-2xl bg-slate-50 p-4">
        <h1 className='truncate text-sm font-bold text-slate-900'><FontAwesomeIcon icon={faUserCircle} className="mr-2 text-emerald-700" />{user}</h1>
        <h3 className='mt-1 pl-6 text-xs font-semibold uppercase tracking-widest text-slate-400'>Administrator</h3>
      </div>


      <div className='flex flex-col gap-5 p-4 mt-4'>
        <Link
          to='/admindashboard'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faChartArea} className="mr-3 w-4" />Analytics</Link>
         <Link
          to='/admindashboard/addstaff'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faPlus} className="mr-3 w-4" />Add staff</Link>
        <Link
          to='/admindashboard/employees'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faAddressBook} className="mr-3 w-4" />Employees</Link>
          <Link
          to='/admindashboard/security'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faLock} className="mr-3 w-4" />Security</Link>
          <Link
          to='/admindashboard/visitorsinside'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faDoorOpen} className="mr-3 w-4" />Visitors inside</Link>
          <Link
          to='/admindashboard/approvedvisitors'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faPersonCircleCheck} className="mr-3 w-4" />Approved visitors</Link>
      </div>


      <button
        onClick={LogOut}
        className='mt-auto w-full cursor-pointer rounded-xl border border-rose-100 bg-white p-3 font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50'>Logout <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" /></button>
    </div>
  )
}

export default SidenavA
