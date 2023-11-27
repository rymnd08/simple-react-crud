import Navbar from "../components/Navbar";
import Content from "../components/Content";
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

const Home = () => {
  const [data, setData] = useState<Books[]>([])

  async function getAllBooks(){
      const tempArr: Books[] =  []
      const books = await getBooks()
      books.forEach(doc =>{
          tempArr.push({...doc.data(), bookID: doc.id} as Books)
      })
      setData(tempArr)
  }
  
  useEffect(()=>{
      getAllBooks()
      console.log(data)
  },[])

    return ( 
        <>
          <Navbar />
          <div className="flex justify-center relative z-20 mt-[125px] h-screen">
            <div className="max-w-5xl grow mx-4 md:mx-0">
            <Content booksData={data} />
            </div>
          </div>
        </>
     );
}
 
export default Home;