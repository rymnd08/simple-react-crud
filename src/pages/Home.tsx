import Navbar from "../components/Navbar";
import Content from "../components/Content";
import useGetBooks, { Books } from "../hooks/useGetBooks";
import Search from "../components/SearchBook";
import { useState, FormEvent, useEffect } from "react";

export type SearchProps = {
  handleSubmit: (e: FormEvent) => void
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Home = () => {
    const [booksData, setBooksData] = useState<Books[]>([])
    const {data, isLoading} = useGetBooks()
    const [search , setSearch] = useState('')

    function handleSubmit(e: FormEvent){
      e.preventDefault()
      const pattern = new RegExp(search, 'i')
      const  filteredData = data.filter(book =>{
        return pattern.test(book.title) || pattern.test(book.description)
      })
      setBooksData(filteredData)
      console.log(filteredData)
    }

    useEffect(()=>{
      console.log(data)
      setBooksData(data)
    },[data])

    return ( 
        <>
          <Navbar />
          <div className="flex justify-center relative z-10 mt-[125px] h-screen">
            <div className="max-w-5xl grow mx-4 md:mx-0">
              <Search handleSubmit={handleSubmit} search={search} setSearch={setSearch} />
            {isLoading &&
              <span>Loading...</span>
            }
            {!isLoading &&  
              <Content booksData={booksData} />
            }
            {booksData.length === 0 && <div>No books found.</div>}

            </div>
          </div>
        </>
     );
}
 
export default Home;