import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faIdCard } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({setSidebarVisible}) => {
  const [showSidebar,SetShowSidebar] = useState(true);

  const handleClick = ()=>{
    SetShowSidebar((prev)=>!prev)
    setSidebarVisible(showSidebar)
  }

  return (
    <header className='sticky top-0 z-30 flex h-[4.5rem] w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 text-emerald-800 shadow-sm backdrop-blur-xl md:px-8'>
      <h1 className='flex items-center gap-3 font-sans text-xl font-extrabold tracking-tight text-slate-900'>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-900/15"><FontAwesomeIcon icon={faIdCard} /></span>
        <span>VPMS<span className="ml-1 text-emerald-700">.</span></span>
      </h1>
      <button
        type="button"
        onClick={handleClick}
        aria-label={showSidebar ? "Open navigation menu" : "Close navigation menu"}
        aria-expanded={!showSidebar}
        className='flex h-10 w-10 items-center justify-center rounded-xl text-lg text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-emerald-600'
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  )
}

export default Navbar
