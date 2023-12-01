import { FormEvent, useState } from "react";

const SearchBook = () => {
    const [search , setSearch] = useState('')

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        alert(search)
    }

    return ( 
        <div className="border mb-4  border-indigo-300 ">
           <form onSubmit={handleSubmit} className="flex items-center">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}  className="outline-none w-full mx-3 my-2"/>
            <button type="submit" className="py-1 px-3"><i className="bi bi-search text-md"></i></button>
           </form>
        </div>
     );
}
 
export default SearchBook;