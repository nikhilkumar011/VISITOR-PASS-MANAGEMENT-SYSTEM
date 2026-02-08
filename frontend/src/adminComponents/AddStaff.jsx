import React,{useState,useContext,useEffect} from 'react'
import { Navbar, SidenavA } from '../components/index.js'
import ApprovCard from './ApprovCard.jsx'

const AddStaff = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false)
    const [popup, setPopup] = useState("");
    const [error, setError] = useState("");
    const [ispwvisible, setIspwvisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [name,setName] = useState("");
    const [confirmpw,setConfirmPw] = useState("")


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
      const ErrorToast = ({message})=>{
        if (!message) return null;
          return (
              <div className="fixed top-5 right-5 z-50 animate-slide-in">
                  <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                      <span className="text-xl">❌</span>
                      <p className="font-medium">{message}</p>
                  </div>
              </div>
          );
      }

      const signup = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password || !name || !role) {
                setError("All Fields are Mandatory");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            if(password !== confirmpw){
              setError("Passwords Does not match");
              setTimeout(() => {
                setError("")
              }, 2000);
              return;
            }
            const res = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password, role: role, name:name })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
                setTimeout(() => {
                    setError("");
                }, 2000);
            }
            if (res.ok) {
                setPopup("Staff Signed in Successfully!")
                setTimeout(() => {
                    setPopup("")
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

      const showPassword = (e) => {
        setIspwvisible((prev) => !prev)
    }

  return (
    <>
    <div className="flex mb-6">
            <SidenavA isVisible={isSidebarVisible} role="visitor" />
            <Navbar
    
              setSidebarVisible={setIsSidebarVisible}
            />
    
          </div>
            <Toast message={popup} />
            <ErrorToast message={error}/>
        
        <div className='bg-white container text-center md:w-1/2 m-auto p-5 shadow-2xl rounded-2xl'>
               <h1 className='text-2xl font-bold text-gray-600'>Add Staff Member</h1>
               <form action="" className='mt-5 p-5' onSubmit={signup}>
                   <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' className='border p-3 rounded border-gray-500 w-full' />
                   <input onChange={(e) => setEmail(e.target.value)} type="email" className='border p-3 rounded border-gray-500 w-full my-5' placeholder='email'/>
                   <input onChange={(e) => setPassword(e.target.value)} type={ispwvisible ? "text" : "password"} 
                   
                   className='border p-3 rounded border-gray-500 w-full my-5' placeholder='password'/>
                   <input onChange={(e) => setConfirmPw(e.target.value)} type={ispwvisible ? "text" : "password"} 
                   
                   className='border p-3 rounded border-gray-500 w-full my-5' placeholder='confirm password'/>
                   <div className="showpassword flex gap-3 justify-center items-center">
                    <input
                        onChange={showPassword}
                        type="checkbox" name="" id="" className='size-4 cursor-pointer shadow' />
                    <p className='text-gray-600' >Show Password</p>
                </div>
                   <p className='text-gray-600 mt-5'>Select Staff's Role</p>
                   <select onChange={(e) => setRole(e.target.value)} name="" id="" className='border p-3 rounded border-gray-500 w-full mt-5'>
                    <option value="Employee">employee</option>
                    <option value="security">security</option>
                   </select>
                   <button type='submit' className='bg-green-600 text-white px-7 py-3 rounded mt-5 cursor-pointer hover:bg-green-700'>Sign Up staff</button>
               </form>
        </div>

    </>
  )
}

export default AddStaff
