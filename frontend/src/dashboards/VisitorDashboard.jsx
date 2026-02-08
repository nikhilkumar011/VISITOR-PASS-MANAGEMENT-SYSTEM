import React, { useState, useEffect, useContext } from 'react'
import { Navbar, Sidenav } from '../components/index.js'
import { RaisedRequests,VisitorDetailsBox } from '../visitorComponents/index.js'
import { AuthContext } from '../context/authContext'



const VisitorDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [visitors, SetVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext);
  const [popup, setPopup] = useState("")
  const [searchBarText,setSearchBarText] = useState("")
  const [selectedVisitor, setSelectedVisitor] = useState(null);


  const handleDelete = (id) => {
    SetVisitors((prev) => prev.filter((each) => each._id !== id));
    setPopup("Request deleted successfully")
    setTimeout(() => {
      setPopup("")
    }, 2000);
  };

  const Toast = ({ message }) => {
    if (!message) return null;
    return (
      <div className="fixed top-5 right-5 z-50 animate-slide-in">
        <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    );
  }
  const getAllVisitors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/visitordashboard/registrationform");
      const data = await res.json();

      if (res.ok) {
        SetVisitors(data);
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

  return (<>
    <div className="flex">
      <Sidenav isVisible={isSidebarVisible} role="visitor" />
      <Navbar

        setSidebarVisible={setIsSidebarVisible} search={setSearchBarText}
      />

    </div>

    <Toast message={popup} />
    {loading && <p style={{ color: "blue" }}>Loading...</p>}

    {!loading && visitors.filter(each => each.email === user).length === 0 && (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-600">
          Your Raised Requests will appear here
        </p>
        <p className="mt-3 text-lg text-gray-500 font-light">
          You haven’t raised any visitor requests yet
        </p>
      </div>
    )}
    {!loading && visitors.filter(each => each.email === user).length !== 0 && (
      <div className="overflow-x-auto w-full">
    <table className='bg-white md:w-[95%] border-separate border-spacing-y-4 text-center m-auto my-5 p-6 rounded-2xl shadow-2xl'>
            <input onChange={(e)=>setSearchBarText(e.target.value)} type="text" className=' outline outline-gray-400 rounded text-gray-600 md:w-full py-2 px-2' placeholder='search'/>
      
      <tr>
        <th>
              Photo
        </th>
        <th>
             Name
        </th>
        <th className='hidden md:table-cell'>
             Visiting Employee
        </th>
        <th className='hidden md:table-cell'>
           Reason for visit
        </th>
        <th className='hidden md:table-cell'>
          Date of visit
        </th>
        <th className='hidden md:table-cell'>
          Time of Visit
        </th>
        <th>
          Approval Status
        </th>
        <th>
          Action
        </th>
      </tr>
      
    {
      visitors.filter((each) => each.email === user).filter((each)=>(each.firstname + each.lastname).toLowerCase().includes(searchBarText.toLowerCase()))
        .map((each) => (
          <RaisedRequests visitor={each} key={each._id} onDelete={handleDelete} onRowClick={setSelectedVisitor} />
        ))
    }
     </table></div>)}
    {selectedVisitor && (
        <VisitorDetailsBox
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
        />
      )}
  </>
  )
}

export default VisitorDashboard
