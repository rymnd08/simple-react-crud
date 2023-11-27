import Navbar from "../components/Navbar";
import Content from "../components/Content";
import { useState, useEffect } from "react";
import { getBooks } from "../firebase";

type Books = {
  addedAt: number
  bookFile: string
  description: string
  thumbNail: string
  title: string
  userID: string
}

const Home = () => {
  const [data, setData] = useState<Books[]>([])

  async function getAllBooks(){
      const tempArr : any = []
      const books = await getBooks()
      books.forEach(doc =>{
          tempArr.push({...doc.data(), bookID: doc.id})
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