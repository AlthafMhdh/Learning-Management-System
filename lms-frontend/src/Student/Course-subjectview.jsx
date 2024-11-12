import { useState, useEffect } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/student/mycourses");
    };
  
    return (
      <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
        <IoArrowBack size={27} />
      </label>
    );
};

const CourseSubjectView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [courseData, setCourseData] = useState({
        batchId: "",
        courseId: "",
        courseName: "",
        courseLevel:"",
      });

      const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCourseString = searchParams.get("selectedCourse");
    const selectedCourse = JSON.parse(decodeURIComponent(selectedCourseString));

    // useEffect(() => {
    //     const id = window.sessionStorage.getItem('id');
    //     const studentId = id;
    //     console.log("your id student is", studentId);
    // }, []);

    useEffect(() => {
        if (selectedCourse) {
            setCourseData({
                batchId: selectedCourse.batchId ||"",
                courseId: selectedCourse.courseId ||"",
                courseName: selectedCourse.courseName || "",
                level: selectedCourse.courseLevel || "",
            });

            const id = window.sessionStorage.getItem('id');
            const studentId = id;
            console.log("your id student is", studentId);

            console.log ("CourseId : ", selectedCourse.courseId);
            axios.get(`http://localhost:8083/api/v1/course/view/`+courseId)
                .then((response) => {
                    if (Array.isArray(response.data.data)) {
                        setSubjects(response.data.data);
                    } else {
                        console.error("Invalid data format for subjects:", response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching subjects:", error);
                });

        }
    }, [selectedCourse]);
    

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderCreditAsterisks = (credit) => {
        return '*'.repeat(credit);
    };

    // const handleViewSubject = () => {
    //     // Navigate to the /subjectview page
    //     const navigate = useNavigate;
    //     navigate("/student/subjectview");
    // };

    const filteredData = subjects.filter((subject) =>
        Object.keys(subject).some((key) =>
            String(subject[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : subjects;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = displayData.slice(startIndex, endIndex);

    // const {courseId, courseLevel, courseName} = selectedCourse || {};
    const {courseId, courseLevel, courseName} = courseData;

    return (
        <div>
            <section className="formheader1">
                <BackButton />
                <h4 style={{ paddingLeft: "150px" }}>Subjects of {courseLevel} In {courseName} </h4>
            </section>
            <div className="table-responsive-sm" style={{ marginTop: '25px', marginLeft: '200px', width: '60%', height: '535px' }}>
                <table className="table">
                    <thead>
                        <tr className="table-active">
                            <th>Subject Code</th>
                            <th>Subjct Name</th>
                            <th>Credit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((subject) => (
                            <tr key={subject.subjectId}>
                                <td>{subject.subjectCode}</td>
                                <td>{subject.subjectName}</td>
                                <td>{renderCreditAsterisks(subject.credit)}</td>
                                <td>
                                    <Link 
                                       // to={'/student/subjectview?selectedSubject=${encodeURIComponent(JSON.stringify({...subject }))}'}
                                        to={`/student/subjectview?selectedSubject=${encodeURIComponent(JSON.stringify({...subject }))}`}
                                    >
                                        <button className="btn btn-outline-secondary">
                                            View <FaArrowRightLong style={{ cursor: 'pointer' }} />
                                        </button>                                   
                                    </Link>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination3">
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <IoArrowBack />
                </button>
                <span className="buttonpd">{currentPage}</span>
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= displayData.length}
                >
                    <IoArrowForward />
                </button>
            </div>
        </div>
    );
};

export default CourseSubjectView;
