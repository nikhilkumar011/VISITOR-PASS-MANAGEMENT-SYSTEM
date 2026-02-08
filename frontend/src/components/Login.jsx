import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUserCheck, faIdBadge, faShieldAlt, faClock } from '@fortawesome/free-solid-svg-icons'


const Login = () => {

    const [ispwvisible, setIspwvisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !role) {
            setError("All Fields are Mandatory");
            setTimeout(() => {
                setError("");
            }, 2000);
        }
        else {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email, password: password, role: role })
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.message);
                    setTimeout(() => {
                        setError("");
                    }, 2000);
                }
                if (res.ok) {
                    login(email, data.token, role);
                    if (role === "admin") navigate("/admindashboard");
                    if (role === "security") navigate("/securitydashboard");
                    if (role === "employee") navigate("/employeedashboard");
                    if (role === "visitor") navigate("/visitordashboard");

                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const showPassword = (e) => {
        setIspwvisible((prev) => !prev)
    }

    return (
        <div className='flex md:flex-row flex-col text-center justify-center'>
            <div className='bg-green-600 w-120 md:w-100 md:mt-30 text-center shadow-2xl rounded-none md:rounded-l-2xl'>
                <div className="flex flex-col justify-center h-full p-10 text-white gap-5">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                        <FontAwesomeIcon icon={faUserCheck} />
                        Visitor Pass System
                    </h1>

                    <p className="text-lg leading-relaxed">
                        Welcome to a smarter way to manage visitors.
                    </p>

                    <p className="text-sm text-green-100">
                        Register once, generate secure visitor passes, and enjoy a smooth,
                        hassle-free entry experience.
                    </p>

                    <div className="flex justify-center gap-6 text-2xl mt-4">
                        <FontAwesomeIcon icon={faIdBadge} />
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </div>

            </div>
            <div className='bg-gray-100 p-3 w-120 rounded-r-2xl shadow-2xl h-screen md:h-auto md:mt-30 text-center'>
                <h1 className='font-bold text-2xl text-green-600 font-sans p-10'>Login</h1>
                <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className="email flex gap-4 justify-center">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" name="" id="email" placeholder='Enter Your Email' className='peer w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />
                    </div>
                    <div className="password relative w-full m-auto flex gap-4 justify-center">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="password" placeholder='Enter the Password' className='peer w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />
                        {ispwvisible ? <FontAwesomeIcon onClick={showPassword} icon={faEye} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' /> : <FontAwesomeIcon onClick={showPassword} icon={faEyeSlash} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />}
                    </div>


                    <div className="flex flex-col gap-2 w-full m-auto">
                        <label htmlFor="role" className="text-sm font-medium text-gray-500">Loggin in as?</label>
                        <div className="relative">
                            <select id="role" name="role" onChange={(e) => setRole(e.target.value)} className="w-full appearance-none rounded-xl bg-white border border-gray-300 px-4 py-3 text-gray-700 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400">
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="visitor">Visitor</option>
                                <option value="security">Security</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>


                    <div className="submit p-7">
                        <button type="submit" className='bg-green-600 text-white px-5 py-2 text-lg rounded cursor-pointer hover:bg-green-700 shadow'>Login</button>
                    </div>
                </form>
                {error && <p className='text-red-700 p-2'>{error}</p>}
                <h2 className='text-gray-600'>Don't have an account? <Link to='/signup' className='text-blue-900'>Sign Up</Link></h2>
            </div>
        </div>
    )
}

export default Login
