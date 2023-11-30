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
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    async function getAllBooks(){
        try {
            setIsLoading(true)
            const tempArr: Books[] =  []
            const books = await getBooks()
            books.forEach(doc =>{
                tempArr.push({...doc.data(), bookID: doc.id} as Books)
    
            })
            setData(tempArr)
            setIsLoading(false)
        } catch (err) {
            setError('Error: '+ err)
        }
    }

    useEffect(()=>{
        getAllBooks()
    },[])

    return {data, error, isLoading}

    }
 
export default useGetBooks;