import { useState } from "react";
import { addToFireStore } from "../firebase";
const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')

    function handleSubmit(e: any){
        e.preventDefault()
        addToFireStore('users', {email, password, addedAt: Date.now()})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return ( 
        <div className="h-screen w-full flex items-center justify-center bg-indigo-500">
            <div className="form-container rounded bg-white w-[380px] px-8 py-10">
                <h3 className="text-center text-slate-500 font-semibold text-xl mb-8">Create your account</h3>
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
                    >Create Account</button>
                </form>
            </div>
        </div>
     );
}
 
export default Register;