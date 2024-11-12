import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Admin/AdminLogin";
import LecturerLogin from "../Lecturer/LecturerLogin";
import Studentlogin from "../Main/Studentlogin";
import Index from "../Main/Index";



function MainRouter() {


    return(

    
            <Routes>
                <Route path="/adminlogin" element={<AdminLogin/>}/>
                <Route path="/lecturerlogin" element={<LecturerLogin/>}/>
                <Route path="/studentlogin" element={<Studentlogin/>}/>
                <Route path="" element={<Index/>}/>
            </Routes>


    )
    
}
export default MainRouter;