import Navbar from "../components/Navbar";
import Content from "../components/Content";
import useGetBooks from "../hooks/useGetBooks";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
    const user = JSON.parse(localStorage.getItem('user')!)
    const navigate = useNavigate()
    const {data} = useGetBooks()
    const items = data.filter(book =>{
        return book.userID === user.id
    })
    
    return ( 
        <>
            <Navbar />
            <div className="flex justify-center relative z-20 mt-[140px] h-screen">
                <div className="max-w-5xl grow mx-4 md:mx-0 ">
                    
                    <button 
                        className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white mb-4 sticky top-32 z-40 bg-opacity-90" onClick={()=>navigate('/create')}>
                        <i className="bi bi-journal-plus"></i> Upload book
                    </button>
    
                    <Content booksData={items} />
                    {items.length ==0  && 
                        <div className="text-indigo-700">
                            <h3 className="text-2xl">No books uploaded 😞</h3>
                        </div>}

                </div>
          </div>
        </>
     );
}
 
export default MyBooks;