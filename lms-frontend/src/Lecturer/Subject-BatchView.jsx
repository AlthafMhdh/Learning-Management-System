import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const BatchSubjectView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [subjects, setSubjects] = useState([]);
    const location = useLocation();

    const [BatchData, setBatchData] = useState({
        batchId: "",
        batchName: "",
        subjectName:"",
        subjectId:'',
      });

    const searchParams = new URLSearchParams(location.search);
    const selectedBatchString = searchParams.get("selectedBatch");
    const selectedBatch = JSON.parse(decodeURIComponent(selectedBatchString));

    useEffect(() => {

        if (selectedBatch) {
            setBatchData({
              batchId: selectedBatch.batchId ||"",
              batchName: selectedBatch.batchName || "",
              subjectName:selectedBatch.subjectName ||"",
              subjectId:selectedBatch.subjectId ||"",
              
            });
        

            // axios.get('http://localhost:8083/api/v1/assignment/BatchStudentAssessment/${batchId}/${subjectId}') 
            axios.get('http://localhost:8083/api/v1/assignment/BatchStudentAssessment/'+selectedBatch.batchId+'/'+selectedBatch.subjectId) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setSubjects(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching Subjects data:', error);
            });
        }
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount in class components

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (!Array.isArray(subjects)) {
        return <div>Loading...</div>;
    }

    const filteredData = subjects.filter((subject) =>
        Object.keys(subject).some((key) =>
            String(subject[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : subjects;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = displayData.slice(startIndex, endIndex);

    const {batchId, batchName, subjectName} = BatchData;

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}> {subjectName} View Of {batchName}</h4>
            </section>
            <div className="pagetable">
                <div className="clk">
                    <div className="searchbar">
                        <input type="text" style={{ borderRadius: "15px" }} placeholder=" 🔍search..." value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>
                <div className="table-responsive-sm">
                    <table className="table">
                        <thead className="table-active">
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Assessment Name</th>
                                <th>Status</th>
                                <th>Result</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentPageData.map((subject, index) => (
                                <tr key={index}>
                                    <td>{subject.sid}</td>
                                    <td>{subject.studentName}</td>
                                    <td>{subject.assessmentName}</td>
                                    <td>{subject.status}</td>
                                    <td>{subject.result}</td>
                                    <td>
                                        <Link className="btn btn-primary" 
                                        to={`/lecturer/updateresult?selectedSubject=${encodeURIComponent(JSON.stringify({...subject,subjectName }))}`}
                                        >
                                            View
                                        
                                        </Link>
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
        </div>
    );
};

export default BatchSubjectView;
