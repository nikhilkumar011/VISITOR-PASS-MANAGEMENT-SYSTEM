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
    const [loading,setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password || !role) {
            setError("All Fields are Mandatory");
            setLoading(false);
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
                    setLoading(false);
                    setTimeout(() => {
                        setError("");
                    }, 2000);
                }
                if (res.ok) {
                    setLoading(false);
                    login(email, data.token, role);
                    if (role === "admin") navigate("/admindashboard");
                    if (role === "security") navigate("/securitydashboard");
                    if (role === "employee") navigate("/employeedashboard");
                    if (role === "visitor") navigate("/visitordashboard");

                }
                console.log(data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    const showPassword = () => {
        setIspwvisible((prev) => !prev)
    }


    return (
       
        <div className='flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center md:flex-row'>
            <div className='w-full max-w-lg overflow-hidden rounded-t-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-center shadow-2xl md:min-h-[38rem] md:rounded-l-3xl md:rounded-tr-none'>
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
            <div className='w-full max-w-lg rounded-b-3xl border border-slate-200 bg-white p-6 text-center shadow-2xl md:min-h-[38rem] md:rounded-bl-none md:rounded-r-3xl md:p-10'>
                <h1 className='p-5 font-sans text-3xl font-bold tracking-tight text-slate-900'>Welcome back</h1>
                <p className="mb-7 text-sm text-slate-500">Sign in to continue to your visitor portal.</p>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className="email flex gap-4 justify-center">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" name="" id="email" placeholder='Enter your email' className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />
                    </div>
                    <div className="password relative w-full m-auto flex gap-4 justify-center">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="password" placeholder='Enter the Password'                             className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />
                        {ispwvisible ? <FontAwesomeIcon onClick={showPassword} icon={faEye} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' /> : <FontAwesomeIcon onClick={showPassword} icon={faEyeSlash} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />}
                    </div>


                    <div className="flex flex-col gap-2 w-full m-auto">
                        <label htmlFor="role" className="text-left text-sm font-semibold text-slate-600">Logging in as</label>
                        <div className="relative">
                            <select id="role" name="role" onChange={(e) => setRole(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
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


                    <div className="submit pt-3">
                        <button type="submit" disabled={loading} className='flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-lg font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70'>
                            {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
                {error && <p role="alert" className='animate-slide-in rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700'>{error}</p>}
                <h2 className='mt-5 text-sm text-slate-500'>Don't have an account? <Link to='/signup' className='font-semibold text-emerald-700 hover:text-emerald-800'>Sign up</Link></h2>
            </div>
        </div>
    )
}

export default Login
