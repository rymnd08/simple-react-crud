import Navbar from "../components/Navbar";
import Content from "../components/Content";

const Home = () => {

  const user = JSON.parse(localStorage.getItem('user')!)

    return ( 
        <>
          <Navbar />
          <div className="flex justify-center relative z-20 mt-[125px] h-screen">
            <div className="max-w-5xl grow mx-4 md:mx-0">
            <Content  />
            </div>
          </div>
        </>
     );
}
 
export default Home;