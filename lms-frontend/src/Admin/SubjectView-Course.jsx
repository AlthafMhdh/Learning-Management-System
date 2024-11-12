import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBack, IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
       // navigate("/admin/subjects");
       navigate(-1);
    };

    return (
        <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
            <IoArrowBack size={27} />
        </label>
    );
};

// const ForwardButton = () => {
//     const navigate = useNavigate();

//     const forward = () => {
//         navigate("/change-subjectview");
//     };

//     return (
//         <button className="btn btn-success" onClick={forward}>
//             Add / Change Subjects
//         </button>
//     );
// };

const ForwardButton = ({ courseId, subjectIds }) => {
    const navigate = useNavigate();

    const forward = () => {
        const queryParams = new URLSearchParams();
        queryParams.append("courseId", courseId);
        subjectIds.forEach((id) => queryParams.append("subjectIds[]", id));

        navigate(`/admin/change-subjectview?${queryParams.toString()}`);
        console.log("CC: ",courseId);
    };

    return (
        <button className="btn btn-success" onClick={forward}>
            Add / Change Subjects
        </button>
    );
};

const SubjectView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [subjects, setSubjects] = useState([]);
    const history = useNavigate();
    const location = useLocation();

    const [courseData, setCourseData] = useState({
        
        courseId: "",
        courseName: "",
        level:"",
      });

    const searchParams = new URLSearchParams(location.search);
    const selectedCourseString = searchParams.get("selectedCourse");
    const selectedCourse = JSON.parse(decodeURIComponent(selectedCourseString));

    useEffect(() => {
        if (selectedCourse) {
            setCourseData({
              courseId: selectedCourse.courseId ||"",
              courseName: selectedCourse.courseName || "",
              level: selectedCourse.level || "",
              
            });
          }

        axios.get(`http://localhost:8083/api/v1/course/view/`+ courseId)
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
        }, [selectedCourse]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (!Array.isArray(subjects)) {
        return <div>Loading...</div>;
    }

    // const filteredData = subjects.filter((subject) =>
    //     Object.keys(subject).some((key) =>
    //         String(subject[key]).toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    // );

    // const displayData = searchTerm ? filteredData : subjects;

    // Pagination logic and rendering
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = subjects.slice(startIndex, endIndex);

    const {courseId, level, courseName} = courseData;

    return (
        <div>
            <section className="formheader1">
                <BackButton />
                <h4 style={{ paddingLeft: "100px" }}> {level} In {courseName} Subjects</h4>
            </section>

            <div className="table-responsive-sm" style={{ marginTop: '25px', marginLeft: '300px', width: '40%', height: '485px' }}>
                <table className="table">
                    <tbody>
                    {currentPageData.map((subject) => (
                        <tr key={subject.subjectId}>
                            <td>{subject.subjectCode}</td>
                            <td>{subject.subjectName}</td>

                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination2">
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <IoArrowBackSharp />
                </button>
                <span className="buttonpd">{currentPage}</span>
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= subjects.length}>
                    <IoArrowForward />
                </button>
            </div>

            {/* <div style={{ marginTop: '40px', marginLeft: '480px' }}>
                <ForwardButton />
            </div> */}
            <div style={{ marginTop: "40px", marginLeft: "480px" }}>
                <ForwardButton courseId={courseId} subjectIds={subjects.map((subject) => subject.subjectId)} />
            </div>
        </div>
    );
};

export default SubjectView;
