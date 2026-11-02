import React, { useState,useEffect } from 'react'
import { Navbar, SidenavA } from '../components/index.js'
import { AnalyticsCard } from '../adminComponents/index.js'
const AdminDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [security,setSecurity] = useState([])
  const [employee,setEmployee] = useState([])
  const [visitorsInside,setVisitorsInside] = useState([])
  const [approvedVisitors,setApprovedVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  
  const getAllUsers = async ()=>{
      setLoading(true)
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/user/getallusers`);
  
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
                  const res = await fetch(`${import.meta.env.VITE_API_URL}/visitordashboard/registrationform`);
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

      {loading && <div role="status" className="mx-auto flex min-h-40 items-center justify-center gap-3 text-sm font-semibold text-slate-500"><span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />Loading dashboard insights...</div>}
      <main className='mx-auto my-8 flex w-[min(94%,80rem)] flex-col gap-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10'>
         <div className="text-left">
           <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Administrator workspace</p>
           <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Analytics overview</h1>
           <p className="mt-2 text-sm text-slate-500">A real-time snapshot of your visitor operations.</p>
         </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <AnalyticsCard color="green" title="Employees" value={employee.length} />
          <AnalyticsCard color="red" title="Security Staff" value={security.length} />
        </div>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <AnalyticsCard color="yellow" title="Inside visitors" value={visitorsInside.length} />
          <AnalyticsCard color="blue" title="Upcoming visitors" value={approvedVisitors.length}/> 
        </div>        
      </main>

    </>

  )
}

export default AdminDashboard
