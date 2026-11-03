import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Sidenav } from '../components/index.js'
import { AuthContext } from '../context/authcontext'

const RegistrationForm = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [employees, setEmployees] = useState([])
  const [submitting, setSubmitting] = useState(false)

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


  const getUsers = async () => {
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
    setSubmitting(true)

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
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (employees.length > 0 && !visitingEmployee) {
      setVisitingEmployee(employees[0].email);
    }
  }, [employees, visitingEmployee]);



  return (
    <>
      <div className="flex mb-6">
        <Sidenav isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} role="visitor" />
        <Navbar
          sidebarVisible={isSidebarVisible}
          setSidebarVisible={setIsSidebarVisible}
        />

      </div>
      <SuccessToast message={okmsg} />
      <ErrorToast message={error} />

      <form onSubmit={handleSubmit} encType="multipart/form-data" className='mx-auto mb-8 flex w-[min(94%,64rem)] flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10'>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">New visitor pass</p>
        <h1 className='mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900'>Visitor information</h1>
        <p className="mt-2 text-sm text-slate-500">Share a few details to send your visit request for approval.</p>
        <div className='mt-6 flex flex-col gap-5 sm:flex-row'>
          <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First name' className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none placeholder:text-slate-400 focus:bg-white' />
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last name' className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none placeholder:text-slate-400 focus:bg-white' />
        </div>

        <div className='mt-5 flex flex-col gap-5 sm:flex-row'>

          <input onChange={(e) => setMobile(e.target.value)} type="tel" placeholder='Mobile number' className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none placeholder:text-slate-400 focus:bg-white sm:w-1/2' />
          <div className="flex w-full flex-col gap-2 text-sm font-semibold text-slate-600 sm:w-1/2">
            <label htmlFor="employees">Visiting employee</label>

            <select value={visitingEmployee} name="employees" id="employees" onChange={(e) => setVisitingEmployee(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal text-slate-700 outline-none focus:bg-white">
              {
                employees.map((each) => (
                  <option key={each._id} value={each.email}>{each.name}</option>
                ))
              }
            </select>
          </div>
        </div>


        <input onChange={(e) => setReason(e.target.value)} type='text' placeholder='Reason for visit' className='mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none placeholder:text-slate-400 focus:bg-white' />
        <div className='mb-8 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Date" className='text-sm font-semibold text-slate-600'>Date of visit</label>
            <input onChange={(e) => setDate(e.target.value)} type="date" id="Date" className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Time" className='text-sm font-semibold text-slate-600'>Time of visit</label>
            <input onChange={(e) => setTime(e.target.value)} type="time" id="Time" className='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:bg-white' />

          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col">
            <label htmlFor="img" className="mb-2 text-sm font-semibold text-slate-600">Your photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="photo"
              id="img"
              className="max-w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 rounded-2xl border border-slate-200 object-cover shadow-sm"
            />
          )}
        </div>

        <div className='mt-4 flex items-center gap-3'>


          <button type="submit" disabled={submitting} className='mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 p-3.5 text-center font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70'>
            {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {submitting ? "Sending request..." : "Submit request"}
          </button>

        </div>





      </form>
    </>
  )
}

export default RegistrationForm
