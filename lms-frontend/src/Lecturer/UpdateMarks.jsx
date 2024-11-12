import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

const UpadateResults = () =>{
    const location = useLocation();
    const navigate = useNavigate();

    const [AssessmentData, setAssessmentData] = useState({
        assessmentId: "",
        assessmentName: "",
        subjectName:"",
        studentId:'',
        sid:'',
        studentName:'',
        result:'',
        status:'',
        filePath:'',
      });
      const [updatedResult, setUpdatedResult] = useState("");
      const [error,setError] = useState("");
      const [resultAdded, setResultAdded] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const selectedSubjectString = searchParams.get("selectedSubject");
    const selectedSubject = JSON.parse(decodeURIComponent(selectedSubjectString));

    useEffect(() => {

        if (selectedSubject) {
            setAssessmentData({
                assessmentId: selectedSubject.assessmentId ||"",
                assessmentName: selectedSubject.assessmentName || "",
              subjectName:selectedSubject.subjectName ||"",
              studentId:selectedSubject.studentId ||"",
              sid:selectedSubject.sid ||"",
              studentName:selectedSubject.studentName ||"",
              result:selectedSubject.result ||"",
              status:selectedSubject.status ||"",
              filePath:selectedSubject.filePath ||"",
              
            });

            console.log("filepath: ", filePath);

        }
    }, []);


    // const handleResultChange = (e) => {
    //     let value = e.target.value;
    
    //     // Remove all non-numeric characters
    //     value = value.replace(/\D/g, "");
    
    //     // Ensure the input is within the range of 0-100
    //     const intValue = parseInt(value);
    //     if (value !== "" && (intValue < 0 || intValue > 100)) {
    //         // If the value is outside the range, set the error state
    //         setError("Please enter marks in the range of 0-100.");
    //     } else {
    //         // If the value is within the range, clear the error state
    //         setError("");
    //     }
    
    //     setUpdatedResult(value);
    // };

    const handleResultChange = (e) => {
        let value = e.target.value;
    
        // Remove all non-numeric characters
        value = value.replace(/\D/g, "");
    
        // Ensure the input is within the range of 0-100
        const intValue = parseInt(value);
        if (value !== "" && (intValue < 0 || intValue > 100)) {
            // If the value is outside the range, set the error state
            setError("Please enter marks in the range of 0-100.");
            setResultAdded(false);
        } else {
            // If the value is within the range, clear the error state
            setError("");
            setResultAdded(true);
        }
    
        setUpdatedResult(value);
    };
    
    const handleUpdateResult = () => {
        if (!resultAdded) {
            setError("Please add the marks first.");
        } else {
            // Send the updated result to the backend
            const updatedAssessmentData = { assignmentId:selectedSubject.assessmentId, result: updatedResult };
    
            // Example of sending data to backend using Axios
            axios.put('http://localhost:8083/api/v1/assignment/updatemarks/'+ selectedSubject.assessmentId+'/'+updatedResult )
                .then((response) => {
                    alert(response.data.data);
                    console.log("Result updated successfully:", response.data);
                    navigate(-1);
                    // Optionally, you can redirect or show a success message here
                })
                .catch((error) => {
                    console.error("Error updating result:", error);
                    // Handle error
                });
        }
    };

    const handleGoBack =() =>{
        navigate(-1);
    }

    const handleViewAssignment = async () => {
        try {
            console.log("assId : ", selectedSubject.assessmentId);
            const response = await axios.get(
                `http://localhost:8083/api/v1/assignment/StudentAssignment/${selectedSubject.assessmentId}`,
                {
                  responseType: 'blob', // Specify response type as blob
                }
              );

              const blob = new Blob([response.data], { type: 'application/pdf' });
      
            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);
      
            // Open the PDF file in a new window or modal
            window.open(url, '_blank');
        }
        catch (error) {
            console.error("Error viewing PDF:", error);
        }
    };
    

    // const handleUpdateResult = () => {
    //     // Send the updated result to the backend
    //     const updatedAssessmentData = { assignmentId:selectedSubject.assessmentId, result: updatedResult };

    //     // Example of sending data to backend using Axios
    //     axios.post("/api/updateResult", updatedAssessmentData)
    //         .then((response) => {
    //             console.log("Result updated successfully:", response.data);
    //             // Optionally, you can redirect or show a success message here
    //         })
    //         .catch((error) => {
    //             console.error("Error updating result:", error);
    //             // Handle error
    //         });
    // };

    const {assessmentName, sid ,studentName, subjectName, result, filePath, status} = AssessmentData;
    
    return(
        <div>

            <section className="formheader" style={{ display: "inline-flex" }}>
                {/* <Link to="" style={{ paddingLeft: '25px', color: 'black' }}>
                    <IoArrowBackSharp size={27} />
                </Link> */}
                <button onClick={handleGoBack} style={{ paddingLeft: '25px', color: 'black', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <IoArrowBackSharp size={27} />
                </button>
                <h4 style={{ paddingLeft: "50px" }}> Update Results</h4>
            </section>

            <div className="update-view">

                <div style={{paddingTop:'25px', textAlign:'center'}}>
                    <h5><b>{subjectName}</b></h5>
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'20px'}}>
                    <b>Assignment Name : {assessmentName}</b>
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'15px'}}>
                    <b>Student Id : {sid}</b>
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'15px'}}>
                    <b>Student Name : {studentName}</b>
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'15px'}}>
                    <b>Submit Status : {status}</b>
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'15px'}}>
                    <b>Result : {result}</b>
                </div>

                <div style={{paddingLeft:'150px', paddingTop:'20px'}}>
                    
                    <a 
                        className="btn btn-outline-primary" 
                        onClick={handleViewAssignment}
                    >
                        View Assignment
                    </a>

                </div>


                <div style={{paddingLeft:'150px', paddingTop:'40px'}}>

                    <label><b>Add Marks</b></label>
                    <br/>
                    <input type="text" value={updatedResult} onChange={handleResultChange} style={{width:'60%'}}/>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div style={{paddingLeft:'130px'}}>
                        <input type="button" className="btn btn-success" onClick={handleUpdateResult} value="Update Result"/>

                    </div>
                </div>

        
            </div>

        </div>
    )
}

export default UpadateResults;