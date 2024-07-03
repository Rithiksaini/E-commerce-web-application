import Header from "./Header"
import Footer from "./Footer"
import {Outlet} from "react-router-dom"
export default function AdminMaster(){
    return(
        <>
        <div style={{minHeight:"4vh"}}>   <Header/></div>
   
        <div style={{minHeight:"78vh"}}>
            <Outlet/>
        </div>
        <Footer/>
        </>
        
    )
}