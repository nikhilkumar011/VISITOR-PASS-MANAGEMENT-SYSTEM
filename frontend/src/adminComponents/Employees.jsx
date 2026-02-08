import React,{useState,useContext,useEffect} from 'react'
import { Navbar, SidenavA } from '../components/index.js'
import EmpCard from './EmpCard'

const Employees = () => {
 const [isSidebarVisible, setIsSidebarVisible] = useState(false)
          const [users,SetUsers] = useState([])
          const [loading, setLoading] = useState(false)
          const [popup,setPopup] = useState("");
          const [searchBarText,setSearchBarText] = useState("")
   
  const handleDelete = (id) => {
    SetUsers((prev) => prev.filter((each) => each._id !== id));
    setPopup("Deleted successfully")
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

  const getAllUsers = async ()=>{
    setLoading(true)
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/getallusers`);

        const data = await res.json();

        if(res.ok){
            SetUsers(data)
           
        }
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
        
      }
  }        

  useEffect(()=>{getAllUsers()},[])
  return (
    <>
     <div className="flex mb-6">
        <SidenavA isVisible={isSidebarVisible} role="visitor" />
        <Navbar

          setSidebarVisible={setIsSidebarVisible} search={setSearchBarText}
        />

      </div>
      <Toast message={popup} />
      {loading && <p style={{ color: "blue" }}>Loading...</p>}

      {!loading && users.filter(each => each.role === 'employee').length === 0 && (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-600">
          All employees will appear here
        </p>
        <p className="mt-3 text-lg text-gray-500 font-light">
          No employees in the database currently
        </p>
      </div>
    )}
    
    {!loading && users.filter(each => each.role === 'employee').length !== 0 && (
            <div className="overflow-x-auto w-full">

    <table  className='bg-white w-[95%] border-separate border-spacing-y-4 text-center m-auto my-5 p-6 rounded-2xl shadow-2xl'>
                       <input onChange={(e)=>setSearchBarText(e.target.value)} type="text" className=' outline outline-gray-400 rounded text-gray-600 w-full py-2 px-2' placeholder='search'/>

      <tr>
      
      <th>
        Name
      </th>
      <th>
        Email
      </th>
      <th>
        Action
      </th>
      </tr>
    

    {
      users.filter((each) => each.role === 'employee').filter((each)=>(each.email).toLowerCase().includes(searchBarText.toLowerCase()))
        .map((each) => (
          <EmpCard user={each} key={each._id}  onDelete={handleDelete}/>
        ))
    }
    </table></div>)}
    </>
  )
}

export default Employees
