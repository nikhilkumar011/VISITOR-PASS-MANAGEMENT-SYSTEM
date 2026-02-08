import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faIdCard } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({setSidebarVisible,search}) => {
  const [showSidebar,SetShowSidebar] = useState(true);

  const handleClick = ()=>{
    SetShowSidebar((prev)=>!prev)
    setSidebarVisible(showSidebar)
  }

  return (
    <div className='bg-white p-5 text-green-600 flex justify-between w-4xl md:w-full shadow h-20'>
      <h1 className='text-2xl font-bold font-sans'><FontAwesomeIcon icon={faIdCard} /> VPMS</h1>
      <h1
      onClick={handleClick}
      className='cursor-pointer text-2xl'>
        <FontAwesomeIcon icon={faBars} />
      </h1>
    </div>
  )
}

export default Navbar
