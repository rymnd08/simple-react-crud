import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { addToFireStore } from "../firebase";
addToFireStore

const Home = () => {
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')!)
        console.log(user)
    },[])

    return ( 
        <>
          <Navbar />
        </>
     );
}
 
export default Home;