import { getBooks } from "../firebase"
import { useState, useEffect } from "react"

export type Books = {
    bookID: string
    userID: string
    title: string
    thumbNail: string
    bookFile: string
    description: string
    addedAt: number
    thumbNailURL: string
    bookFileURL: string
  }

const useGetBooks = () => {
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
    },[])

    return {data}

    }
 
export default useGetBooks;