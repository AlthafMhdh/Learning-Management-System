import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../Student/SideBar";
import MyCourses from "../Student/Mycourses";
import ToDo from "../Student/ToDo";
import Profile from "../Student/Profile";
import Assessment from "../Student/Assessment";
import CourseView from "../Student/course";
import SubjectLessonView from "../Student/Subject-lessonview";
import CourseSubjectView from "../Student/Course-subjectview";
import { useAuth } from "../AuthContex";
import StudentDash from "../Student/Dashboard";
import Settings from "../Student/Settings";
import ViewAssessmentList from "../Student/ViewAssessmentList";



function StudentRouter (){

    const { Id,authenticated } = useAuth();

    return(

        <SideBar>
            <Routes>
                {authenticated ? (
                    <Route path="/" element={<StudentDash />} />
                ) : (
                    <Route path="/" element={<Navigate to="/studentlogin" />} />
                )}
                <Route path="/home" element={<StudentDash/>}/>
                <Route path="/mycourses" element={<MyCourses/>}/>
                <Route path="/pending-assessments" element={<ToDo/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/assessment" element={<Assessment/>}/>
                <Route path="/course" element={<CourseView/>}/>
                <Route path="/subjectview" element={<SubjectLessonView/>}/>
                <Route path="/courseview" element={<CourseSubjectView/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/batch-assessment" element={<ViewAssessmentList/>} />
                
            </Routes>
        </SideBar>

    )
}
export default StudentRouter;