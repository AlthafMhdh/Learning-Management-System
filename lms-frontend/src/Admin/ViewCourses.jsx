import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const ViewCourses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8083/api/v1/course/allcourse')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (!Array.isArray(courses)) {
        return <div>Loading...</div>;
    }

    const filteredData = courses.filter((course) =>
        Object.keys(course).some((key) =>
            String(course[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : courses;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = displayData.slice(startIndex, endIndex);

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}>Courses</h4>
            </section>

            <div className="pagetable">
                <div className="clk">
                    <div className="searchbar">
                        <input type="text" style={{ borderRadius: "15px" }} placeholder="🔍search..." value={searchTerm} onChange={handleSearch} />
                    </div>
                    <div className="button-add">
                        <Link className="btn btn-primary" to="/admin/newcourse" ><IoMdAdd /> New Course</Link>
                    </div>
                </div>
                <div className="table-responsive-sm">
                    <table className="table">
                        <thead className="table-active">
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Course Code</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((course) => (
                                <tr key={course.courseId}>
                                    <td>{course.courseId}</td>
                                    <td>{course.level} In {course.courseName}</td>
                                    <td>{course.courseCode}</td>
                                    <td>{course.duration}</td>
                                    <td>
                                        <div style={{ display: "inline-flex" }}>
                                            <div style={{ paddingLeft: "10px" }}>
                                                <Link 
                                                to={`/admin/subjectview?selectedCourse=${encodeURIComponent(JSON.stringify({...course }))}`}
                                                // to={{
                                                //     pathname: "/subjectview",
                                                //     state: { selectedCourse: course },
                                                // }}
                                                >
                                                    <button style={{ paddingLeft: "20px", paddingRight: "20px" }} className="btn btn-outline-success">View Subjects</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination">
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <IoArrowBackSharp />
                </button>
                <span className="buttonpd">{currentPage}</span>
                <button className="buttonpd"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= displayData.length}>
                    <IoArrowForward />
                </button>
            </div>
        </div>
    );
}

export default ViewCourses;
