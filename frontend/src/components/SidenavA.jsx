import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faRightFromBracket,faChartArea,faAddressBook,faLock,faDoorOpen,faPersonCircleCheck,faPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/authcontext'
import {Link} from 'react-router-dom'

const SidenavA = ({ isVisible, onClose }) => {
  const { user, logout } = useContext(AuthContext);

  const LogOut = () => {
    logout();
  }

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 flex h-dvh max-h-dvh min-h-0 w-[min(18rem,88vw)] flex-col overflow-hidden border-r border-slate-200 p-4
        bg-white text-slate-700 shadow-2xl shadow-slate-900/10 sm:p-5
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="mb-5 rounded-2xl bg-slate-50 p-4">
        <h1 className='truncate text-sm font-bold text-slate-900'><FontAwesomeIcon icon={faUserCircle} className="mr-2 text-emerald-700" />{user}</h1>
        <h3 className='mt-1 pl-6 text-xs font-semibold uppercase tracking-widest text-slate-400'>Administrator</h3>
      </div>


      <nav className='mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-1'>
        <Link
          onClick={onClose}
          to='/admindashboard'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faChartArea} className="mr-3 w-4" />Analytics</Link>
         <Link
          onClick={onClose}
          to='/admindashboard/addstaff'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faPlus} className="mr-3 w-4" />Add staff</Link>
        <Link
          onClick={onClose}
          to='/admindashboard/employees'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faAddressBook} className="mr-3 w-4" />Employees</Link>
          <Link
          onClick={onClose}
          to='/admindashboard/security'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faLock} className="mr-3 w-4" />Security</Link>
          <Link
          onClick={onClose}
          to='/admindashboard/visitorsinside'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faDoorOpen} className="mr-3 w-4" />Visitors inside</Link>
          <Link
          onClick={onClose}
          to='/admindashboard/approvedvisitors'
          className='rounded-xl border border-transparent p-3 text-left font-medium text-slate-600 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800'><FontAwesomeIcon icon={faPersonCircleCheck} className="mr-3 w-4" />Approved visitors</Link>
      </nav>


      <button
        onClick={LogOut}
        className='mt-3 w-full shrink-0 cursor-pointer rounded-xl border border-rose-100 bg-white p-3 font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 dark:border-rose-900/70 dark:bg-slate-900 dark:text-rose-300 dark:hover:bg-rose-950/40'>Logout <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" /></button>
    </div>
  )
}

export default SidenavA
