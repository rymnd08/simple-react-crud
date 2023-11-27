
import { useState } from "react";
import { checkIfUserExist } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')
    const [showAlert, setShowAlert] = useState(false)
    const [alertValue, setAlertValue] = useState('')

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        checkIfUserExist(email, password)
            .then((user)=>{
                if(user.isExist){
                    setShowAlert(true)
                    setEmail('')
                    setPassword('')
                    setAlertValue('Login Successfully')

                    localStorage.setItem('user', JSON.stringify(user))

                    setTimeout(()=>{
                        setShowAlert(false)
                        navigate('/')
                    }, 2000)
                }else{
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 2000);
                    setAlertValue('No user found')
                }
            })
    }
    return ( 
        <div className="h-screen w-full flex items-center justify-center bg-indigo-500 relative">

            {/* Alert message */}
            {showAlert && 
                <div className="absolute top-0 w-[380px] bg-indigo-700 py-3 text-center text-white font-bold"> {alertValue} </div>
            }
            <div className="form-container rounded bg-white w-[380px] px-8 py-10 shadow-lg shadow-indigo-800">
                <h3 className="text-center text-slate-500 font-semibold text-xl mb-8">Login your account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-slate-500 font-semibold">Email</label>
                        <input type="text" 
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            placeholder="your email"
                            id="email"
                            value={email}
                            onChange={(e)=>setEmail((e.target.value))}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-slate-500 font-semibold">Password</label>
                        <input type={type}
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            placeholder="your password"
                            id="password"
                            value={password}
                            onChange={(e)=>setPassword((e.target.value))}
                        />
                        <div className="flex items-center gap-2 text-slate-500">
                            <label htmlFor="checkboxx" className="text-xssm">Show password</label>
                            <input type="checkbox" name="" id="checkboxx" onChange={()=>{
                                type==='password' ? setType('text') : setType('password')
                            }} />
                            
                        </div>
                    </div>
                        
                    <button
                        type="submit" 
                        className="w-full bg-indigo-600 py-3 rounded text-white font-semibold"
                    >Login</button>
                    <div className="mt-4 text-center">
                        <p className="text-slate-500">Create your account</p>
                        <small className="text-blue-500 underline text-center"><Link to="/register">Click here</Link></small>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Login;