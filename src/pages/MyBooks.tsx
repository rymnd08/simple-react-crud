import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import { getBooks } from "../firebase";
import Content from "../components/Content";

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
            <div className="flex justify-center relative z-20 mt-[140px] h-screen">
                <div className="max-w-5xl grow mx-4 md:mx-0 ">
                    <button 
                        className="py-1 px-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white mb-4 sticky top-32 z-40 bg-opacity-90" onClick={()=>navigate('/create')}>
                        <i className="bi bi-journal-plus"></i> Upload book
                    </button>
    
                    <Content booksData={data} />
                    {data.length ==0  && 
                        <div className="text-indigo-700">
                            <h3 className="text-2xl">No books uploaded 😞</h3>
                        </div>
                    }

                </div>
          </div>
        </>
     );
}
 
export default MyBooks;