import React, { useState, useEffect } from "react";
import { IoArrowBack, IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/admin/assign-assessment");
    };
  
    return (
      <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
        <IoArrowBack size={27} />
      </label>
    );
};

const AssignStudentlist = () => {
    const [assessmentData, setAssessmentData] = useState({
        batchId: "",
        batchName: "",
        courseName: "",
        level:"",
        subjectName: "",
        assignmentName:"",
        submitDate:"",
      });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [allStudentsChecked, setAllStudentsChecked] = useState(false);
    const [selectedBatchAssessment, setSelectedBatchAssessment] = useState({});
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [batchStudents, setBatchStudents] = useState([]);
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedAssessmentString = searchParams.get("selectedAssessment");
    const selectedAssessment = JSON.parse(decodeURIComponent(selectedAssessmentString));

    useEffect(() => {
        if (selectedAssessment) {
          setAssessmentData({
            batchId: selectedAssessment.batchId ||"",
            batchName: selectedAssessment.batchName || "",
            courseName: selectedAssessment.courseName || "",
            level: selectedAssessment.level || "",
            subjectName: selectedAssessment.subjectName || "",
            assignmentName: selectedAssessment.assignmentName || "",
            
          });

            axios.get(`http://localhost:8083/api/v1/batch/batchStudents/` + selectedAssessment.batchId)
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



        }
      }, [selectedAssessment]);

    // const handleAllStudentsCheckboxChange = (event) => {
    //     const isChecked = event.target.checked;
    //     setAllStudentsChecked(isChecked);
    
    //     // Check/uncheck all student checkboxes
    //     const studentCheckboxes = document.querySelectorAll('input[name^="student"]');
    //     studentCheckboxes.forEach((checkbox) => {
    //         checkbox.checked = isChecked;
    //     });
    // };

    const handleAllStudentsCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setAllStudentsChecked(isChecked);
    
        // Check/uncheck all student checkboxes
        const studentCheckboxes = document.querySelectorAll('input[name^="student"]');
        studentCheckboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
        });
    
        // Update selected student IDs
        if (isChecked) {
            const allStudentIds = batchStudents.map(student => student.studentId);
            setSelectedStudentIds(allStudentIds);
        } else {
            setSelectedStudentIds([]);
        }
    };

    const handleCheckboxChange = (event) => {
        const studentId = event.target.value;
        setSelectedStudentIds(prevStudentIds => {
            if (prevStudentIds.includes(studentId)) {
                return prevStudentIds.filter(id => id !== studentId);
            } else {
                return [...prevStudentIds, studentId];
            }
        });
    };
    
    

    // const handleCheckboxChange = (event) => {
    //     const studentId = event.target.value;
    //     setSelectedStudentIds(prevStudentIds => {
    //         if (prevStudentIds.includes(studentId)) {
    //             return prevStudentIds.filter(id => id !== studentId);
    //         } else {
    //             return [...prevStudentIds, studentId];
    //         }
    //     });
    // };

    const handleAssignAssessment = () => {
        console.log("SID :", selectedStudentIds);
        // Send selected student IDs to backend along with batch ID
        axios.post('http://localhost:8083/api/v1/batch/addStudent/'+ assessmentData.batchId, {
            studentIds: selectedStudentIds,
            //submitDate
        })
        .then(response => {
            alert(response.data.data);
            console.log('Assignment successful:', response.data);
            // Handle success, such as showing a success message
        })
        .catch(error => {
            console.error('Error assigning assessment:', error);
            // Handle error, such as showing an error message
        });
    };
    

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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

    const { batchName, courseName,level, subjectName, assignmentName, submitDate } = assessmentData;

    return (
        <div>
            <section className="formheader1">
                <BackButton />
                <h4 style={{paddingLeft:"50px"}}> Student List of {batchName} </h4>
            </section>
            <div className="Assign-studentlist">
                <div style={{marginTop:'10px', marginLeft:'47px', display:'inline-flex'}}>
                    <input type="checkbox" style={{transform:'scale(1.3)'}} name="allstudent" value="all" onChange={handleAllStudentsCheckboxChange}/>  
                    <div style={{paddingLeft:'25px'}}>All Student</div>
                </div>
                <div className="table-responsive-sm" style={{width:'100%', height:'290px', marginTop:'-15px'}}>
                {/* height:'325px' */}
                    <table className="table">
                        <thead className="table-active">
                            {/* <tr>
                                <th></th>
                                <th>Student Id</th>
                                <th>Student Name</th>
                            </tr> */}
                        </thead>
                        <tbody>
                        {currentPageData.map((student) => (
                            <tr key={student.studentId}>
                                <td>
                                    <input type="checkbox" 
                                    style={{transform:'scale(1.3)'}} 
                                    value={student.studentId} 
                                    checked={selectedStudentIds.includes(student.studentId)}
                                    onChange={handleCheckboxChange} />
                                </td>
                                <td>{student.sid}</td>
                                <td>{student.studentName}</td>
                            </tr>
                            
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination1">
                    <button className="buttonpd" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <IoArrowBackSharp />
                    </button>
                    <span className="buttonpd">{currentPage}</span>
                    <button className="buttonpd" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= courses.length}>
                        <IoArrowForward />
                    </button>
                </div>
                <div className="Assign-studentlist-s">
                    <div style={{display:'inline-flex', marginTop:'5px', marginLeft:'25px'}}>
                        <div>
                            <input type="text" readOnly placeholder="Batch Name" value={batchName} style={{width:'150%'}}/>
                        </div>
                        <div style={{marginLeft:'150px'}}>
                            <input type="text" readOnly placeholder="Course Name" value={level+"In "+courseName} style={{width:'160%'}}/>
                        </div>                               
                    </div>
                    <div style={{display:'inline-flex', marginTop:'5px', marginLeft:'25px'}}>
                        <div>
                            <input type="text" readOnly placeholder="Subject Name" value={subjectName} style={{width:'150%'}}/>
                        </div>
                        <div style={{marginLeft:'150px'}}>
                            <input type="text" readOnly placeholder="Assessment Name" value={assignmentName} style={{width:'160%'}}/>
                        </div>                               
                    </div>
                    <div style={{display:'inline-flex', marginTop:'5px', marginLeft:'25px'}}>
                        <div>
                            {/* <input type="date" placeholder="Submission Date" value={submitDate} style={{width:'150%'}}/> */}
                            <label style={{width:'150%', paddingTop:'10px', paddingLeft:'150px'}}>
                                <b>Submission Date</b>
                            </label>
                        </div>
                        <div style={{marginLeft:'85px'}}>
                            <input type="date" value={submitDate} style={{width:'205%'}}/>
                        </div>                              
                    </div>
                    <div style={{marginLeft:'300px'}}>
                        <button className="btn btn-primary" onClick={handleAssignAssessment}>Assign Assessment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignStudentlist;
