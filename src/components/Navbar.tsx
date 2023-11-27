import { Link, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate()
    const [isLoginLink, setIsLoginLink] = useState(true)
    const user = useState(JSON.stringify(localStorage.getItem('user')))
    const location = useLocation()

    const isLinkActive = (pathname: string) => {
        return location.pathname === pathname;
      }

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
        <div className="w-full flex justify-center pt-10 pb-3 fixed top-0 z-30 bg-white text-dark">
            <div className="max-w-5xl grow">
                {/* Navbar */}
                <div className="flex justify-between items-center bg-indigo-50 px-6 py-3 mx-4 md:mx-0 border-x-2 border-x-indigo-500 grow rounded-full shadow-md shadow-indigo-500 hover:bg-indigo-200 transition ease duration-500 ">
                    <h3 className="hover:bg-white px-3 rounded-full py-1 ">
                        <Link to="/" className={isLinkActive('/') ? "border-b-2 border-b-indigo-500" : ""}>Home</Link>
                    </h3>
                    <ul className="flex">
                        <li className="hover:bg-white px-3 rounded-full py-1"><Link to="/someLink" className={isLinkActive('/asdf') ? "border-b-2 border-b-indigo-500" : ""}>Some Link</Link></li>
                        <li className="hover:bg-white px-3 rounded-full py-1"><Link to="/someLink" className={isLinkActive('/fdsa') ? "border-b-2 border-b-indigo-500" : ""}>Some Link</Link></li>
                        <li className="hover:bg-white px-3 rounded-full py-1"><Link to="/my-books" className={isLinkActive('/my-books') ? "border-b-2 border-b-indigo-500" : ""}>My Books</Link></li>
                        {isLoginLink && <li className="hover:bg-white px-3 rounded-full py-1"><button onClick={handleLogOut}>Logout</button></li>}
                        {!isLoginLink && <li className="hover:bg-white px-3 rounded-full py-1"><Link to="/login">Login</Link></li>}
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;