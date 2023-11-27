import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom"

const MyBooks = () => {
    const navigate = useNavigate()
    
    return ( 
        <>
            <Navbar />
            <div className="flex justify-center relative z-20 mt-[125px] h-screen">
                <div className="max-w-5xl grow mx-4 md:mx-0">
                    <button 
                        className="py-1 px-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white" onClick={()=>navigate('/create')}>
                        <i className="bi bi-journal-plus"></i> Upload book
                    </button>
                </div>
          </div>
        </>
     );
}
 
export default MyBooks;