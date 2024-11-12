import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const AssignAssessment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelected] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8083/api/v1/assignment/assigntobatch')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setAssessments(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching assessments data:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (!Array.isArray(assessments)) {
        return <div>Loading...</div>;
    }

    const filteredData = assessments.filter((assessment) =>
        Object.keys(assessment).some((key) =>
            String(assessment[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : assessments;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = displayData.slice(startIndex, endIndex);

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}> Assign Assessment</h4>
            </section>

            <div className="pagetable">
                <div className="clk">
                    <div className="searchbar">
                        <input
                            type="text"
                            style={{ borderRadius: "15px" }}
                            placeholder=" 🔍search..."
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
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Assessment Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((assessment) => (
                                <tr key={assessment.assignmentId}>
                                    <td>{assessment.batchCode}</td>
                                    <td>{assessment.batchName}</td>
                                    <td>{assessment.level + "In " + assessment.courseName}</td>
                                    <td>{assessment.subjectCode}</td>
                                    <td>{assessment.subjectName}</td>
                                    <td>{assessment.assignmentName}</td>
                                    <td>
                                        <div style={{ display: "inline-flex" }}>
                                            <div style={{ paddingLeft: "10px" }}>
                                                <Link
                                                    to={`/admin/assign-to-batch?selectedAssessment=${encodeURIComponent(JSON.stringify({...assessment }))}`}
                                                    
                                                >
                                                    <button
                                                        style={{ paddingLeft: "20px", paddingRight: "20px" }}
                                                        className="btn btn-info"
                                                    >
                                                        Assign
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

export default AssignAssessment;
