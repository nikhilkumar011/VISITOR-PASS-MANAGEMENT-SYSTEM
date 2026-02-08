import React,{useState} from 'react'
import { Navbar, SidenavS } from '../components/index.js'
import SecurityQrScanner from "../securityComponents/SecurityQrScanner";

const SecurityDashboard = () => {
   const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  return (
    <>
    <div className="flex">
      <SidenavS isVisible={isSidebarVisible} role="security"/>
      <Navbar
        
        setSidebarVisible={setIsSidebarVisible}
      />
    </div>
    
    <SecurityQrScanner/>
    </>
  )
}

export default SecurityDashboard
