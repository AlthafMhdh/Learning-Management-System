import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Batches() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [batchs, setBatchs] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8083/api/v1/batch/allbatches')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setBatchs(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching batchs data:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        if (selectedBatch) {
            console.log("Selected batch data:", selectedBatch);
            setSelectedBatch(null);
        }
        setCurrentPage(newPage);
    };

    const handleViewStudent = (batchId, batchName) => {
        setSelectedBatch({ batchId, batchName });
        navigate({
            pathname: "/admin/view-batch-student",
            state: {
                batchId: batchId,
                batchName: batchName
            }
        });
    };

    const filteredData = batchs.filter((batch) =>
        Object.keys(batch).some((key) =>
            String(batch[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : batchs;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = displayData.slice(startIndex, endIndex);

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}>Batches</h4>
            </section>
            <div className="pagetable">
                <div className="clk">
                    <div className="searchbar">
                        <input type="text" style={{ borderRadius: "15px" }} placeholder=" 🔍search..." value={searchTerm} onChange={handleSearch} />
                    </div>
                    <div className="button-add">
                        <Link className="btn btn-primary" to="/admin/newbatch" ><IoMdAdd /> New Batch</Link>
                    </div>
                </div>
                <div className="table-responsive-sm">
                    <table className="table">
                        <thead className="table-active">
                            <tr>
                                <th>Batch Code</th>
                                <th>Batch Name</th>
                                <th>Course Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Student</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((batch) => (
                                <tr key={batch.batchId}>
                                    <td>{batch.batchCode}</td>
                                    <td>{batch.batchName}</td>
                                    <td>{batch.courseLevel} in {batch.courseName}</td>
                                    <td>{new Date(batch.startDate).toLocaleDateString('en-GB')}</td>
                                    <td>{new Date(batch.endDate).toLocaleDateString('en-GB')}</td>
                                    <td>{batch.students}</td>
                                    <td>
                                        <div style={{ display: "inline-flex" }}>
                                            <div style={{ paddingLeft: "10px" }}>
                                                <Link
                                                    className="btn btn-outline-primary"
                                                    // onClick={() => handleViewStudent(batch.batchId, batch.batchName)}
                                                    to={`/admin/view-batch-student?batchId=${batch.batchId}&batchName=${batch.batchName}`}
                                                >
                                                    View Student
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
                <button className="buttonpd" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <IoArrowBackSharp />
                </button>
                <span className="buttonpd">{currentPage}</span>
                <button className="buttonpd" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= displayData.length}>
                    <IoArrowForward />
                </button>
            </div>
            {selectedBatch && (
                <div className="selected-batch-info">
                    Selected Batch: {selectedBatch.batchName}
                </div>
            )}
        </div>
    );
}

export default Batches;
