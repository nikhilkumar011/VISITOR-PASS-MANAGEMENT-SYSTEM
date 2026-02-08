import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Sidenav } from '../components/index.js'
import { AuthContext } from '../context/authContext'

const RegistrationForm = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [employees, setEmployees] = useState([])

  const SuccessToast = ({ message }) => {
    if (!message) return null;

    return (
      <div className="fixed top-5 right-5 z-50 animate-slide-in">
        <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    );
  };

  const ErrorToast = ({ message }) => {
    if (!message) return null;
    return (
      <div className="fixed top-5 right-5 z-50 animate-slide-in">
        <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="text-xl">❌</span>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    )
  }


  const getUsers = async (req, res) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/getallusers`)
      const data = await res.json();

      if (res.ok) {
        setEmployees(data.filter((each) => each.role === 'employee'))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { user } = useContext(AuthContext);

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')

  const [error, setError] = useState("");
  const [okmsg, setOkMsg] = useState("");
  const [visitingEmployee, setVisitingEmployee] = useState()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("firstname", firstname)
      formData.append("lastname", lastname)
      formData.append("email", user)
      formData.append("mobile", mobile)
      formData.append("reason", reason)
      formData.append("date", date)
      formData.append("time", time)
      formData.append("photo", photo)
      formData.append('visitingEmployee', visitingEmployee)

      let res = await fetch(`${import.meta.env.VITE_API_URL}/visitordashboard/registrationform`, {
        method: "POST",
        body: formData
      })

      const data = await res.json();

      if (!res.ok) {
        setError(data.error)
        setTimeout(() => {
          setError("")
        }, 2000);
      }
      if (res.ok) {
        setOkMsg("Request raised successfully")
        setTimeout(() => {
          setOkMsg("")
        }, 2000);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (employees.length > 0 && !visitingEmployee) {
      setVisitingEmployee(employees[0].email);
    }
  }, [employees]);



  return (
    <>
      <div className="flex mb-6">
        <Sidenav isVisible={isSidebarVisible} role="visitor" />
        <Navbar

          setSidebarVisible={setIsSidebarVisible}
        />

      </div>
      <SuccessToast message={okmsg} />
      <ErrorToast message={error} />

      <form onSubmit={handleSubmit} encType="multipart/form-data" className='bg-white min-h-full md:min-h-[75vh] max-h-full md:max-h-screen mb-2 flex flex-col w-full md:w-[80%] m-auto shadow-2xl p-10 rounded-2xl'>
        <h1 className='text-2xl text-gray-700 font-bold font-sans'>Visitor's Information</h1>
        <div className='flex flex-col md:flex-row gap-5 mt-5 p-2'>
          <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' className='w-full md:w-1/2 p-2 mt-3 border-b border-gray-400 outline-none' />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' className='w-full md:w-1/2 p-2 mt-3 border-b outline-none border-gray-400' /></div>

        <div className='flex flex-col md:flex-row gap-5 mt-5 p-2'>

          <input onChange={(e) => setMobile(e.target.value)} type="number" placeholder='Mobile Number' className='w-full md:w-1/2 p-2 mt-3 border-b border-gray-400 outline-none' />
          <div className="role text-gray-600 rounded-lg flex items-center">
            <label htmlFor="employees">To whom are you visiting:</label>

            <select value={visitingEmployee} name="employees" id="employees" onChange={(e) => setVisitingEmployee(e.target.value)}>
              {
                employees.map((each) => (
                  <option key={each._id} value={each.email}>{each.name}</option>
                ))
              }
            </select>
          </div>
        </div>


        <input onChange={(e) => setReason(e.target.value)} type='text' name="" id="" placeholder='Reason For visit' className='border-b outline-none w-[99%] flex justify-center m-auto mt-5  p-2 border-gray-400 ' />
        <div className='flex flex-col md:flex-row justify-between gap-3 mb-15'>
          <div className='flex gap-3 mt-4 items-center'>
            <label htmlFor="Date" className='text-gray-700 flex items-center justify-center mt-1'>Date of visit :</label>
            <input onChange={(e) => setDate(e.target.value)} type="date" name="" id="Date" className='w-50 md:w-100 p-2 mt-3 border-b outline-none border-gray-400' />
          </div>
          <div className='flex gap-3 mt-4 items-center'>
            <label htmlFor="Time" className='text-gray-700 flex items-center justify-center mt-1'>Time of visit :</label>
            <input onChange={(e) => setTime(e.target.value)} type="time" name="" id="Time" className='w-50 md:w-100 p-2 mt-3 border-b outline-none border-gray-400' />

          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col">
            <label htmlFor="img" className="text-gray-700 font-medium mb-2">Your Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="photo"
              id="img"
              className="p-2 border-b border-gray-400 outline-none cursor-pointer"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        <div className='flex gap-3 mt-4 items-center'>


          <button type="submit" className='flex p-3 text-white bg-green-600 rounded-2xl w-full mt-5 justify-center text-center cursor-pointer hover:bg-green-800'>Submit</button>

        </div>





      </form>
    </>
  )
}

export default RegistrationForm
