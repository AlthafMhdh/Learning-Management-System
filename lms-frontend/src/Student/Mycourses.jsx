import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const id = window.sessionStorage.getItem("id");
        const studentId = id;
        console.log("your id student is", studentId);
        const response = await axios.get(
          `http://localhost:8083/api/v1/batch/mycourses/${studentId}`
        );
        if (Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else {
          console.error("Invalid data format from the backend:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchCourses();
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
        <h4 style={{ paddingLeft: "50px" }}>My Courses</h4>
      </section>

      <div className="pagetable">
        <div className="clk">
          <div className="searchbar">
            <input
              type="text"
              style={{ borderRadius: "15px" }}
              placeholder="🔍search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="table-responsive-sm">
          <table className="table">
            <thead className="table-active">
              <tr>
                <th>Batch Code</th>
                <th>Batch Name</th>
                <th>Course Name</th>
                <th>Batch Start</th>
                <th>Batch End</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentPageData.map((course) => (
                <tr key={course.batchId}>
                  <td>{course.batchCode}</td>
                  <td>{course.batchName}</td>
                  <td>
                    {course.courseLevel} In {course.courseName}
                  </td>
                  <td>{new Date(course.startDate).toLocaleDateString("en-GB")}</td>
                  <td>{new Date(course.endDate).toLocaleDateString("en-GB")}</td>
                  <td>
                    <div style={{ display: "inline-flex" }}>
                      <div style={{ paddingLeft: "10px" }}>
                        <Link to={`/student/courseview?selectedCourse=${encodeURIComponent(JSON.stringify({...course }))}`}>
                          <button
                            style={{ paddingLeft: "20px", paddingRight: "20px" }}
                            className="btn btn-success"
                          >
                            View
                          </button>
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
        <button
          className="buttonpd"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoArrowBackSharp />
        </button>
        <span className="buttonpd">{currentPage}</span>
        <button
          className="buttonpd"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= displayData.length}
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
};

export default MyCourses;
