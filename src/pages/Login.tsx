
import { useEffect, useState } from "react";
import { getUsers } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

type User = {
    email: string
    id: string
}

const Login = () => {
    const location = useLocation()

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')
    const [showAlert, setShowAlert] = useState(false)
    const [alertValue, setAlertValue] = useState('')

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        try {
            const snapshot = await getUsers()
            let isExist = false
            let user: User | {} = {}
            snapshot.forEach(doc =>{
                if(doc.data().email === email && doc.data().password === password){
                    isExist = true
                    user = {email: doc.data().email, id: doc.id} as User
                }
            })
            if(isExist){
                setEmail('')
                setPassword('')
                setAlertValue('User login successfully')
                setShowAlert(true)
                localStorage.setItem('user', JSON.stringify(user))
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }else{
                setAlertValue('No user found')
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 2000);
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const search = location.search.replace('?','')
        if(search==='false'){
            setAlertValue('Must login to continue')
            setShowAlert(true)
        }
    },[])
    return ( 
        <div className="h-screen w-full flex items-center justify-center bg-indigo-500 relative">

            {/* Alert message */}
            {showAlert && 
                <div className="absolute top-0 w-[380px] bg-indigo-700 py-3 text-center text-white font-bold"> {alertValue} </div>
            }
            <div className="form-container rounded bg-white w-[380px] px-8 py-10 shadow-lg shadow-indigo-800 relative">
                <button onClick={()=> navigate('/')} type="button" className="absolute top-0 right-0 m-2 text-2xl"><i className="bi bi-x"></i></button>
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