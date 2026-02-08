import React, { useState,useEffect } from 'react'
import { Navbar, SidenavA } from '../components/index.js'
import { AnalyticsCard } from '../adminComponents/index.js'
const adminDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [security,setSecurity] = useState([])
  const [employee,setEmployee] = useState([])
  const [visitorsInside,setVisitorsInside] = useState([])
  const [approvedVisitors,setApprovedVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  
  const getAllUsers = async ()=>{
      setLoading(true)
        try {
          const res = await fetch("http://localhost:3000/user/getallusers");
  
          const data = await res.json();
  
          if(res.ok){
             setEmployee(data.filter((each)=>each.role === "employee"))
             setSecurity(data.filter((each)=>each.role === "security"))  
          }
        } catch (error) {
          console.log(error)
        } finally{
          setLoading(false)
          
        }
    }  

  
    useEffect(()=>{getAllUsers()},[])
    const getAllVisitors = async () => {
              setLoading(true);
              try {
                  const res = await fetch("http://localhost:3000/visitordashboard/registrationform");
                  const data = await res.json();
      
                  if (res.ok) {
                      setApprovedVisitors(data.filter((each) => each.approvedStatus === "Approved").filter((each)=>each.checkedIn === false));
                      setVisitorsInside(data.filter((each) => each.checkedIn === true))
                  }
              } catch (err) {
                  console.log(err);
              } finally {
                  setLoading(false);
              }
          };
      
          useEffect(() => {
              getAllVisitors();
          }, []);

  return (
    <>
      <div className="flex">
        <SidenavA isVisible={isSidebarVisible} role="admin" />
        <Navbar

          setSidebarVisible={setIsSidebarVisible}
        />
      </div>

      <div className='flex flex-col bg-white text-center gap-10 p-10 mt-10 rounded-2xl shadow-2xl md:w-[80%] m-auto'>
         <h1 className="text-center text-5xl font-extrabold tracking-tight 
                   bg-gradient-to-r from-indigo-500 to-purple-600 
                   bg-clip-text text-transparent mb-12">
      Analytics Overview
    </h1>
        <div className='flex flex-col md:flex-row justify-around gap-10'>
          <AnalyticsCard color="green" title="Employees" value={employee.length} />
          <AnalyticsCard color="red" title="Security Staff" value={security.length} />
        </div>
        <div className='flex flex-col md:flex-row justify-around gap-10'>
          <AnalyticsCard color="yellow" title="Inside visitors" value={visitorsInside.length} />
          <AnalyticsCard color="blue" title="Upcoming visitors" value={approvedVisitors.length}/> 
        </div>        
      </div>

    </>

  )
}

export default adminDashboard
