import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUserCheck, faIdBadge, faShieldAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Signup = () => {

    const [ispwvisible, setIspwvisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw,setConfirmPw] = useState("");
    const [name, setName] = useState("")
    const role = 'visitor'
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const signup = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (!email || !password || !name) {
                setError("All Fields are Mandatory");
                setLoading(false);
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            if(password !== confirmPw){
                setError("Passwords must be same");
                setLoading(false);
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, password: password, role: role })
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
                navigate("/visitordashboard");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const showPassword = () => {
        setIspwvisible((prev) => !prev)
    }

    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center md:flex-row md:py-8'>
            <div className="fixed right-4 top-4 z-20"><ThemeToggle compact /></div>
            <div className='w-full max-w-lg overflow-hidden rounded-t-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-center shadow-2xl md:min-h-[42rem] md:rounded-l-3xl md:rounded-tr-none'>
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

            <div className='w-full max-w-lg rounded-b-3xl border border-slate-200 bg-white p-6 text-center shadow-2xl md:min-h-[42rem] md:rounded-bl-none md:rounded-r-3xl md:p-10'>
                <h1 className='p-5 font-sans text-3xl font-bold tracking-tight text-slate-900'>Create your account</h1>
                <p className="mb-7 text-sm text-slate-500">A few details and you’re ready to request a pass.</p>
                <form className='flex flex-col gap-4' onSubmit={signup}>
                    <div className="text flex gap-4 justify-center">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text" name="" id="name" placeholder='Full name' className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />
                    </div>
                    <div className="email flex gap-4 justify-center">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" name="" id="email" placeholder='Email address' className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />
                    </div>
                    <div className="password relative flex justify-center w-full m-auto">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="password" placeholder='Password' className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />
                        {ispwvisible ? <FontAwesomeIcon onClick={showPassword} icon={faEye} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' /> : <FontAwesomeIcon onClick={showPassword} icon={faEyeSlash} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />}

                    </div>
                    <div className="password relative flex justify-center w-full m-auto">
                        <input
                            onChange={(e) => setConfirmPw(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="confirm-password" placeholder='Confirm password' className='peer w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10' />

                    </div>

                    <div className="submit pt-3">
                        <button type="submit" disabled={loading} className='flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-lg font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70'>
                            {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </div>
                </form>
                {error && <p role="alert" className='animate-slide-in rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700'>{error}</p>}
                <h2 className='mt-5 text-sm text-slate-500'>Already have an account? <Link to='/login' className='font-semibold text-emerald-700 hover:text-emerald-800'>Sign in</Link></h2>
            </div>
        </div>
    )
}

export default Signup
