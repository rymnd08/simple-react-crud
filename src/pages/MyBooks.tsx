import Navbar from "../components/Navbar";
import {useLocation, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import { getBooks } from "../firebase";

export type Books = {
  bookID: string
  userID: string
  title: string
  thumbNail: string
  bookFile: string
  description: string
  addedAt: number
}

const MyBooks = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user')!)
    const [data, setData] = useState<Books[]>([])

    async function getAllBooks(){
        const tempArr: Books[] =  []
        const books = await getBooks()
        books.forEach(doc =>{
            tempArr.push({...doc.data(), bookID: doc.id} as Books)

        })
        const arr = tempArr.filter(element =>{
            return element.userID == user.id
        })
        setData(arr)
    }
  
    useEffect(()=>{
        getAllBooks()
    },[])
    
    return ( 
        <>
            <Navbar />
            <div className="flex justify-center relative z-20 mt-[125px] h-screen">
                <div className="max-w-5xl grow mx-4 md:mx-0">
                    <button 
                        className="py-1 px-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white " onClick={()=>navigate('/create')}>
                        <i className="bi bi-journal-plus"></i> Upload book
                    </button>
    
                        <table>
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>User ID</th>
                                    <th>Book Title</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((book)=>(
                                <tr key={book.bookID}>
                                    <td>{book.bookID}</td>
                                    <td>{book.userID}</td>
                                    <td>{book.title}</td>
                                    <td>{book.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                </div>
          </div>
        </>
     );
}
 
export default MyBooks;