import Navbar from "../components/Navbar";
import Content from "../components/Content";
import useGetBooks from "../hooks/useGetBooks";
import Search from "../components/SearchBook";

const Home = () => {
    const {data, isLoading} = useGetBooks()

    return ( 
        <>
          <Navbar />
          <div className="flex justify-center relative z-10 mt-[125px] h-screen">
            <div className="max-w-5xl grow mx-4 md:mx-0">
              <Search />
            {isLoading &&
              <span>Loading...</span>
            }
            {!isLoading &&  
              <Content booksData={data} />
            }
            </div>
          </div>
        </>
     );
}
 
export default Home;