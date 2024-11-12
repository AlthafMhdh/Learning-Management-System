import { Navigate, Route, Routes } from "react-router-dom";
import SideB from "../Lecturer/SideB";
import BatchSubjectView from "../Lecturer/Subject-BatchView";
import MyBatches from "../Lecturer/MyBatches";
import MySubjects from "../Lecturer/MySubjects";
import SubjectLessonView from "../Student/Subject-lessonview";
import Profile from "../Lecturer/Profile";
import Settings from "../Lecturer/Settings";
import { useAuth } from "../AuthContex";
import LecturerDash from "../Lecturer/Dashboard";
import LessonLessonView from "../Lecturer/Subject-LessonView";
import UpadateResults from "../Lecturer/UpdateMarks";



function LecturerRouter() {

    const { Id,authenticated } = useAuth();

    return(

        <SideB>
            <Routes>
                {authenticated ? (
                    <Route path="/" element={<LecturerDash />} />
                ) : (
                    <Route path="/" element={<Navigate to="/lecturerlogin" />} />
                )}
                <Route path="/home" element={<LecturerDash/>}/>
                <Route path="/mysubjects" element={<MySubjects/>}/>
                <Route path="/lessonview" element={<LessonLessonView/>}/>
                <Route path="/mybatches" element={<MyBatches/>}/>
                <Route path="/subjectview" element={<BatchSubjectView/>}/>               
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/updateresult" element={<UpadateResults/>}/>
                
            </Routes>
        </SideB>

    )
    
}
export default LecturerRouter;