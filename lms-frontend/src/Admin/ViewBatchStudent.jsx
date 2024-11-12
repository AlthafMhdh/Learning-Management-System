import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";

const ViewBatchStudent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [batchStudents, setBatchStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [removeResponseModalVisible, setRemoveResponseModalVisible] = useState(false);
    const [removeResponse, setRemoveResponse] = useState("");

    const location = useLocation();
        const batchId = new URLSearchParams(location.search).get('batchId');
        const batchName = new URLSearchParams(location.search).get('batchName');
        console.log("batchId: ", batchId);
        console.log("batchName: ", batchName);

        useEffect(() => {
            const bid = batchId;
            console.log("batch: ", bid);
        
            axios.get(`http://localhost:8083/api/v1/batch/batchStudents/` + bid)
                .then(response => {
                    if (Array.isArray(response.data.data)) {
                        setBatchStudents(response.data.data);
                        console.log("Students: ", setBatchStudents);
                    } else {
                        console.error('Invalid data format from the backend:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching students data:', error);
                });
        }, []);


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRemoveConfirmation = (studentId) => {
        setSelectedStudent(studentId);
        setConfirmationModalVisible(true);
    };

    const handleRemoveStudent = () => {
        
        axios.delete(`http://localhost:8083/api/v1/batch/removestudent/`+batchId +'/'+selectedStudent)
            .then(response => {
                setRemoveResponse(response.data.data); // Assuming backend sends a message
                setRemoveResponseModalVisible(true);
                // Fetch updated batch students after removal
                axios.get(`http://localhost:8083/api/v1/batch/batchStudents/`+batchId)
                    .then(response => {
                        if (Array.isArray(response.data.data)) {
                            setBatchStudents(response.data.data);
                        } else {
                            console.error('Invalid data format from the backend:', response.data);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching updated students data:', error);
                    });
            })
            .catch(error => {
                console.error('Error removing student from batch:', error);
            });
        setConfirmationModalVisible(false);
    };

    const filteredData = batchStudents.filter((student) =>
        Object.keys(student).some((key) =>
            String(student[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : batchStudents;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = displayData.slice(startIndex, endIndex);

    return (
        <div>
            <section className="formheader" style={{ display: "inline-flex" }}>
                <Link to="/admin/batches" style={{ paddingLeft: '25px', color: 'black' }}>
                    <IoArrowBackSharp size={27} />
                </Link>
                <h4 style={{ paddingLeft: "50px" }}> Students of {batchName}</h4>
            </section>

            <div className="pagetable1">
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
                    <div className="button-batchadd">
                            <Link className="btn btn-outline-primary"
                                to={`/admin/addstudent-batch?batchId=${batchId}&batchName=${batchName}&studentIds=${batchStudents.map(student => student.studentId).join(',')}`}
                            >
                                Add Student
                            </Link>
                            {/* <Link className="btn btn-outline-primary" to={`/admin/addstudent-batch?batchId=${batchId}&batchName=${batchName}`} > Add Student</Link> */}
                            {/* <Link to={`/assign-studentlist/${batchId}`}>Go to AssignStudentlist</Link> */}

                        </div>
                </div>
                <div className="table-responsive-sm">
                    <table className="table">
                        <thead className="table-active">
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>NIC</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((student) => (
                                <tr key={student.studentId}>
                                    <td>{student.sid}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.nic}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <div style={{ display: "inline-flex" }}>
                                            <div style={{ paddingLeft: "10px" }}>
                                                <button className="btn btn-danger" onClick={() => handleRemoveConfirmation(student.studentId)}>Remove</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
                </div>
            </div>
            <div className="pagination4">
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

            {confirmationModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to remove this student from the batch?</p>
                        <button onClick={handleRemoveStudent}>Yes</button>
                        <button onClick={() => setConfirmationModalVisible(false)}>No</button>
                    </div>
                </div>
            )}

            {/* Response Modal */}
            {removeResponseModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{removeResponse}</p>
                        <button onClick={() => setRemoveResponseModalVisible(false)}>Okay</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ViewBatchStudent;
