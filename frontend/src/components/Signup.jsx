import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUserCheck, faIdBadge, faShieldAlt, faClock } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {

    const [ispwvisible, setIspwvisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw,setConfirmPw] = useState("");
    const [name, setName] = useState("")
    const role = 'visitor'

    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const signup = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password || !name) {
                setError("All Fields are Mandatory");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            if(password !== confirmPw){
                setError("Passwords must be same");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            const res = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, password: password, role: role })
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
                navigate("/visitordashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showPassword = (e) => {
        setIspwvisible((prev) => !prev)
    }

    return (
        <div className='flex flex-col md:flex-row text-center justify-center'>
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

            <div className='bg-gray-100 p-3 w-120 shadow-2xl h-screen md:h-auto  md:mt-30 text-center rounded-r-2xl'>
                <h1 className='font-bold text-2xl text-green-600 font-sans p-10'>Create an Account</h1>
                <form action="" className='flex flex-col gap-5' onSubmit={signup}>
                    <div className="text flex gap-4 justify-center">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text" name="" id="name" placeholder='Full Name' className='peer w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />
                    </div>
                    <div className="email flex gap-4 justify-center">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" name="" id="email" placeholder='Email' className='peer w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />
                    </div>
                    <div className="password relative flex justify-center w-full m-auto">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="password" placeholder='Password' className='peer w-full  border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />
                        {ispwvisible ? <FontAwesomeIcon onClick={showPassword} icon={faEye} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' /> : <FontAwesomeIcon onClick={showPassword} icon={faEyeSlash} className='right-3 absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500' />}

                    </div>
                    <div className="password relative flex justify-center w-full m-auto">
                        <input
                            onChange={(e) => setConfirmPw(e.target.value)}
                            type={ispwvisible ? "text" : "password"}
                            name="" id="password" placeholder='Confirm Password' className='peer w-full  border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-600' />

                    </div>

                    <div className="submit p-7">
                        <button type="submit" className='bg-green-600 text-white px-5 py-2 text-lg rounded cursor-pointer hover:bg-green-700 shadow'>Sign Up</button>
                    </div>
                </form>
                {error && <p className='text-red-700 p-2'>{error}</p>}
                <h2 className='text-gray-600'>Already have an account? <Link to='/login' className='text-blue-900'>Login</Link></h2>
            </div>
        </div>
    )
}

export default Signup

