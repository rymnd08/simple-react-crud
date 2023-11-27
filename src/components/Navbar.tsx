import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate()
    const [isLoginLink, setIsLoginLink] = useState(true)
    const user = useState(JSON.stringify(localStorage.getItem('user')))

    function handleLogOut(){
        localStorage.clear()
        setIsLoginLink(false)
    }
    
    useEffect(()=>{
        if(!isLoginLink){
            setTimeout(()=> {
                navigate('/login')
            }, 500)
        }
    },[isLoginLink])

    return ( 
        <div className="w-full h-48 font-semibold text-dark border  flex items-center">
            <div className="max-w-5xl  mx-auto flex justify-between items-center px-4 md:px-0 border grow">
                <h3>
                    Brand Name
                </h3>
                <ul className="flex py-4 gap-4">
                    <li><Link to="/someLink">Some Link</Link></li>
                    <li><Link to="/someLink">Some Link</Link></li>
                    {isLoginLink && <li><button onClick={handleLogOut}>Logout</button></li>}
                    {!isLoginLink && <li><Link to="/login">Login</Link></li>}
                </ul>
            </div>
        </div>
     );
}
 


export default Navbar;