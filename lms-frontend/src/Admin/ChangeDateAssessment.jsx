import '../App.css';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';

const ChangeDateAssignment = () => {

    const [assignmentData, setAssessmentData] = useState({
        assignmentId : "",
        assignmentName : "",
        batchCode : "",
        batchName : "",
        courseCode : "",
        level : "",
        courseName : "",
        subjectName : "",
        issuedDate : "",
        submissionDate : "",
        submitDate : ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedAssessmentString = searchParams.get("selectedAssessment");
    const selectedAssessment = JSON.parse(decodeURIComponent(selectedAssessmentString));

    useEffect(()=> {
        if (selectedAssessment) {
            setAssessmentData({
                assignmentId : selectedAssessment.assignmentId ||"",
                assignmentName : selectedAssessment.assignmentName ||"",
                batchCode : selectedAssessment.batchCode ||"",
                batchName : selectedAssessment.batchName ||"",
                courseCode : selectedAssessment.courseCode ||"",
                level : selectedAssessment.level ||"",
                courseName : selectedAssessment.courseName ||"",
                subjectName : selectedAssessment.subjectName ||"",
                issuedDate : selectedAssessment.issuedDate ||"",
                submissionDate : selectedAssessment.submissionDate ||"",
                submitDate : selectedAssessment.submissionDate ||"",
            });
        }
    },[]);

    const handleDateChange = (event) => {
        setAssessmentData({ ...assignmentData, submitDate: event.target.value });
    };

    const formatDateToLocalString = (date) => {
        const padZero = (num) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        const seconds = padZero(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleSubmit = () => {
        
        const UpdatedDate = assignmentData.submitDate;

        const date = new Date(assignmentData.submitDate);
        const formattedDate = formatDateToLocalString(date);
       // const formattedDate = new Date(assignmentData.submitDate).toISOString().slice(0, 19).replace('T', ' ');

        axios.put(`http://localhost:8083/api/v1/assignment/updateAssignmentDate/${assignmentData.assignmentId}/${formattedDate}`)
              .then(response => {
                  //  alert(response.data.data);
                  alert("Assignment Submission Date Updated Successfully.");
                  setAssessmentData(prevData => ({
                    ...prevData,
                    submissionDate: formattedDate,
                    submitDate : UpdatedDate
                }));
                })
                .catch(error => {
                    console.error('Failed to update Submission Date', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to update Submission Date.");
                });
    }

    return(
        <div>
            <section className="formheader">
                <h4 style={{paddingLeft:"50px"}}>Change Assignment Submission Date</h4>
            </section>

            <div className="pagetable">
                <div className="clk">
                    <div className="button-return">
                        <Link className="btn btn-success " to="/admin/all-assessment" ><IoArrowBack /> Back</Link>
                                    
                    </div>
                                
                </div>

                <div>
                    <div className='row'>
                        <div className='col-md-3'>

                        </div>
                        <div className='col-md-2'>
                            <div style={{paddingTop:'25px'}}>
                                <b>Batch Name </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b>Course Name </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b>Subject Name </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b>Assessment Name </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b>Issued Date </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b>Submission Date </b>
                            </div>
                        </div>

                        <div className='col-md-1'>
                            <div style={{paddingTop:'25px'}}>
                                <b> : </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> : </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> : </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> : </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> : </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> : </b>
                            </div>
                        </div>

                        <div className='col-md-5'>

                            <div style={{paddingTop:'25px'}}>
                                <b> {assignmentData.batchName} </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> {assignmentData.courseCode} In {assignmentData.courseName} </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> {assignmentData.subjectName} </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> {assignmentData.assignmentName} </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                                <b> {assignmentData.issuedDate} </b>
                            </div>

                            <div style={{paddingTop:'15px'}}>
                            {/* {new Date(assignmentData.submissionDate).toLocaleString('en-GB', {dateStyle:'short', timeStyle:'short'})} */}
                                <b> {assignmentData.submissionDate} </b>
                            </div>
                            
                        </div>

                    </div>

                    <div style={{paddingTop:'80px', paddingLeft:'350px'}}>
                        <div>
                            <input type='datetime-local' value={assignmentData.submitDate} onChange={handleDateChange} style={{width:'40%', height:'40px', textAlign:'center'}}/>
                        </div>

                        <div style={{paddingTop:'25px', paddingLeft:'80px'}}>
                            <input type='button' className='btn btn-success' value={'Change Submission Date'} onClick={handleSubmit}/>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ChangeDateAssignment;