import { Navigate, Route, Routes } from "react-router-dom";
import SideView from "../Admin/SideView";
import ViewStudent from "../Admin/ViewStudent";
import ViewLecturer from "../Admin/ViewLecturer";
import NewStudent from "../Admin/NewStudent";
import NewLecturer from "../Admin/AddLectuter";
import ViewCourses from "../Admin/ViewCourses";
import NewCourse from "../Admin/NewCourses";
import NewAssessment from "../Admin/NewAssessments";
import AddAssessment from "../Admin/AddAssessment";
import AssignAssessment from "../Admin/AssignAssessment";
import AssignStudentlist from "../Admin/Assign-Stidentlist";
import SuspendedStudent from "../Admin/SuspendedStudent";
import Dashboard from "../Admin/Dashboard";
import Batches from "../Admin/Batches";
import NewBatch from "../Admin/NewBatch";
import NewSubject from "../Admin/NewSubject";
import ViewSubjects from "../Admin/ViewSubject";
import SubjectView from "../Admin/SubjectView-Course";
import ChangeSubjectView from "../Admin/SubjectView-Change";
import ViewRemovedLecturers from "../Admin/ViewRemovedLecturers";
import AddStudentforBatch from "../Admin/AddStudent-Batch";
import ViewBatchStudent from "../Admin/ViewBatchStudent";
import ViewLessons from "../Admin/ViewLessons";
import NewLesson from "../Admin/NewLesson";
import { useAuth } from "../AuthContex";
import AssignLecturer from "../Admin/AssignLecturer";
import AllAssessment from "../Admin/AllAssessment";
import ChangeDateAssignment from "../Admin/ChangeDateAssessment";


function AdminRouter (){

    const { Id,authenticated } = useAuth();

    return(

        <SideView>
            <Routes>
                {authenticated ? (
                    <Route path="/" element={<Dashboard />} />
                ) : (
                    <Route path="/" element={<Navigate to="/adminlogin" />} />
                )}
                <Route path="/students" element={<ViewStudent/>}/>
                <Route path="/lecturers" element={<ViewLecturer/>}/>
                <Route path="/newstudent" element={<NewStudent/>}/>
                <Route path="/newlecturer" element={<NewLecturer/>}/>
                <Route path="/courses" element={<ViewCourses/>}/>
                <Route path="/newcourse" element={<NewCourse/>}/>
                <Route path="/assessment" element={<NewAssessment/>}/>
                <Route path="/add-assessment" element={<AddAssessment/>}/>
                <Route path="/assign-assessment" element={<AssignAssessment/>}/>
                <Route path="/assign-to-batch" element={<AssignStudentlist/>}/>
                <Route path="/suspended-students" element={<SuspendedStudent/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/batches" element={<Batches/>}/>
                <Route path="/newbatch" element={<NewBatch/>}/>
                <Route path="/newsubject" element={<NewSubject/>}/>
                <Route path="/subjects" element={<ViewSubjects/>}/>
                <Route path="/subjectview" element={<SubjectView/>}/>
                <Route path="/change-subjectview" element={<ChangeSubjectView/>}/>
                <Route path="/removed-lecturers" element={<ViewRemovedLecturers/>}/>
                <Route path="/addstudent-batch" element={<AddStudentforBatch/>}/>
                <Route path="/view-batch-student" element={<ViewBatchStudent/>}/>
                <Route path="/viewlessons" element={<ViewLessons/>}/>
                <Route path="/newlesson" element={<NewLesson/>}/>
                <Route path="/assignlecturer" element={<AssignLecturer/>}/>
                <Route path="/all-assessment" element={<AllAssessment/>}/>
                <Route path="/assessment-view" element={<ChangeDateAssignment/>}/>
            </Routes>

        </SideView>

    );
}

export default AdminRouter;