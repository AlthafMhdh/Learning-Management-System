import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const NewAssessment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8083/api/v1/batch/batch-newassignment')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setBatches(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching batches data:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddClick = (batch) => {
        setSelectedBatch(batch);
console.log("batch: ",batch)

    };
    

    if (!Array.isArray(batches)) {
        return <div>Loading...</div>;
    }

    const filteredData = batches.filter((batch) =>
        Object.keys(batch).some((key) =>
            String(batch[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : batches;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = displayData.slice(startIndex, endIndex);

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}> New Assessment</h4>
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
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Subject Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((batch) => (
                                <tr key={batch.batchId}>
                                    <td>{batch.batchCode}</td>
                                    <td>{batch.batchName}</td>
                                    <td>{batch.courseCode}</td>
                                    <td>
                                        {batch.level} In {batch.courseName}
                                    </td>
                                    <td>{batch.subjectName}</td>
                                    <td>
                                        <div
                                            style={{
                                                display: "inline-flex",
                                                marginBottom: "-5px",
                                                marginTop: "-5px",
                                            }}
                                        >
                                            <div style={{ paddingLeft: "10px" }}>
                                                <Link
                                                    to={`/admin/add-assessment?selectedBatch=${encodeURIComponent(JSON.stringify({...batch }))}`}
                                                    
                                                    onClick={() => handleAddClick(batch)}
                                                    
                                                >
                                                    <button
                                                        style={{
                                                            paddingLeft: "20px",
                                                            paddingRight: "20px",
                                                        }}
                                                        className="btn btn-primary"
                                                        onClick={() => handleAddClick(batch)}
                                                    >
                                                        Add
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

export default NewAssessment;
