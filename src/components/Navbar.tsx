import { Link, useLocation, useNavigate, } from "react-router-dom";
import { useState } from "react";

type User = {
    id: string
    email: string
}

const Navbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user')!))
    const location = useLocation()

    function logOut(){
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }
    
    return ( 
        <div className="grid grid-cols-3 place-items-center bg-indigo-700 text-white  fixed top-0 w-full z-30 whitespace-nowrap bg-opacity-95 py-8">
            <div className="flex items-center gap-2">
                <img className="w-16" src="https://www.freepnglogos.com/uploads/book-png/red-thick-book-png-clipart-30.png" alt="" />
                <Link to={'/'} className="hidden md:inline-block">findBooks.ph</Link>
            </div>
            <div className="flex">
                <Link to="/" className={`hover:bg-black px-3 ${location.pathname === '/' ? 'bg-black': ''}`}>Home</Link>
                <Link to={!user ? '/login?false' : '/my-books'} className={`hover:bg-black px-3 ${location.pathname === '/my-books' ? 'bg-black': ''}`}>My books</Link>
            </div>
            {!user && 
            <div className="flex">
                <Link to="/login" className="hover:bg-black px-3">Sign in</Link>
                <Link to="/register" className="hover:bg-black px-3">Sign up</Link>
            </div>
            }
            {user && 
                <button className="hover:bg-black px-3" onClick={logOut}>Sign out <i className="bi bi-box-arrow-right text-sm"></i></button>
            }

        </div>
     );
}
 
export default Navbar;