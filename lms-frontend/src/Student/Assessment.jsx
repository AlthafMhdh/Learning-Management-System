import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import Modal from 'react-modal';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/student/pending-assessments");
  };

  return (
    <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
      <IoArrowBack size={27} />
    </label>
  );
};

const Assessment = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    batchId:"",    
    subjectId: "",
    subjectName: "",
    assessmentId:"",
    assessmentName:"",
    issuedDate:"",
    submitDate:"",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedAssessmentString = searchParams.get("selectedAssessment");
  const selectedAssessment = JSON.parse(decodeURIComponent(selectedAssessmentString));


  useEffect(() => {

    if (selectedAssessment) {
    setAssessmentData({
      studentAssignmentId: selectedAssessment.studentAssignmentId ||"",
      batchId: selectedAssessment.batchId ||"",
      subjectId: selectedAssessment.subjectId ||"",
      subjectName: selectedAssessment.subjectName || "",
      assessmentId: selectedAssessment.assignmentId || "",
      assessmentName: selectedAssessment.assignmentName ||"",
      issuedDate: selectedAssessment.issuedDate || "",
      submitDate: selectedAssessment.submissionDate || "",
      
    });

    // const fetchLessons = async () => {
    //   try {
    //     const id = window.sessionStorage.getItem("id");
    //     const studentId = id;
    //     console.log("your id student is", studentId);
    //     const response = await axios.get(
    //       `http://localhost:8083/api/v1/subject/viewlessons/${subjectId}`
    //     );
    //     if (Array.isArray(response.data.data)) {
    //       setLessons (response.data.data);
    //     } else {
    //       console.error("Invalid data format from the backend:", response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching courses data:", error);
    //   }
    // };

    // fetchLessons();



  }
}, [selectedAssessment]
);

const handleDownload = async () => {
  try {
    // Call the API endpoint to download the PDF file
    const response = await axios.get(
      `http://localhost:8083/api/v1/assignment/Assignment/${selectedAssessment.assignmentId}`,
      {
        responseType: 'blob', // Specify response type as blob
      }
    );

    // Create a blob object from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Create a URL for the blob object
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to initiate the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedAssessment.assignmentName}.pdf`); // Set the filename
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the temporary anchor element
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const openSuccessModal = () => {
  //   closeModal();
  //   setSuccessModalIsOpen(true);
  // };

  const openSuccessModal = async () => {
    setUploadClicked(true);
     // Close the upload modal

    if (!file) {
      return;
    }
    closeModal();

    try {

      const formData = new FormData();
      formData.append('docFile', file); // Append the uploaded file  studentAssignmentId
      formData.append('studentAssignmentId', assessmentData.studentAssignmentId);
      // formData.append('subjectId', assessmentData.subjectId);
      // formData.append('subjectId', assessmentData.subjectId);
      // formData.append('assignmentId', assessmentData.assessmentId);
      // formData.append('studentId', window.sessionStorage.getItem('id'));

      // Send the assessment data along with the file to the backend
      const response = await axios.post('http://localhost:8083/api/v1/assignment/studentSubmission', formData);
      if (response.data.code===200) {
    //  if (response.status === 200) {
        setSuccessModalIsOpen(true); // Open the success modal upon successful submission
      } else {
        console.error('Error uploading assessment');
      }
    } catch (error) {
      console.error('Error uploading assessment:', error);
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    navigate("/student/pending-assessments");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };

  useEffect(() => {
    const id = window.sessionStorage.getItem('id');
    console.log("your id student is", id);
  }, []);

  const { batchId, subjectId, subjectName, assessmentId, assessmentName, issuedDate, submitDate} = assessmentData;

  return (
    <div>
      <section className="formheader1">
        <BackButton />
        <h4 style={{ paddingLeft: "50px" }}> Assessments</h4>
      </section>

      <div className="Assessment-details">
          <div style={{ marginTop:"20px", marginLeft:"75px"}}>
              <h6>Assessment Name : {assessmentName}</h6>
          </div>
          <div style={{ marginTop:"20px", marginLeft:"75px"}}>
              {/* <h6>Issued Date : {issuedDate}</h6> */}
              <h6>Issued Date : {new Date(issuedDate).toLocaleDateString("en-GB")} {new Date(issuedDate).toLocaleTimeString([], {hour12: false})}</h6>
          </div>
          <div style={{ marginTop:"20px", marginLeft:"75px"}}>
              <h6>Resourses</h6>
              <div style={{display: "inline-flex"}}>
                  <ul style={{marginLeft:"15px"}}>
                    <Link onClick={handleDownload}>
                      Download Assignment
                    </Link>
                  </ul>
              </div>
          </div>
          <div style={{ marginTop:"20px", marginLeft:"75px", width:"90%", height:"50px", backgroundColor:"red", borderRadius:"8px"}}>
              <h5 style={{marginLeft:"15px",paddingTop:"12px"}}>Submission Deadline : {new Date(submitDate).toLocaleDateString("en-GB")} {new Date(submitDate).toLocaleTimeString([], {hour12: false})}</h5>
          </div>
      </div>

      <div className="Assessment-submit">
        <div style={{ marginTop:"20px", marginLeft:"75px"}}>
              <h5> Submit your Assessment </h5>
          </div>
          <div style={{ marginTop:"20px", marginLeft:"75px"}}>
              <h6> Status :  Not Submitted </h6>
          </div>
          <div style={{ marginTop:"20px", marginLeft:"100px"}}>
              <button className="btn btn-success" style={{width:"13%"}} onClick={openModal}> Submit </button>
          </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="overlay"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '350px',
            width: '50%',
          }
        }}
      >
        <div style={{paddingLeft:'25px', paddingTop:'20px',width:'100%', backgroundColor:'blue', borderRadius:'5px', display:'inline-flex'}}>
          <h4 style={{paddingBottom:'10px'}}>Upload Assessment</h4>
          <label style={{paddingLeft:'430px'}}><IoMdCloseCircle size={30} onClick={closeModal}/></label>
        </div>
        
        <div style={{paddingLeft:'25px', paddingTop:'40px'}}>
            <p>Select pdf file to uplaod</p>
            <div style={{paddingTop:'15px'}}>
              <input type="file" onChange={handleFileChange}  />                
            </div>
            {uploadClicked &&  file === null && <p style={{color: 'red'}}>Please select a file to upload.</p>}
            <div style={{paddingTop:'35px'}}>
              <input type="submit" className="btn btn-success" value="Upload Assessment" onClick={openSuccessModal} />
            </div>
        </div>
      </Modal>

      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        overlayClassName="overlay"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '350px',
            width: '30%',
          }
        }}
      >
        <div style={{paddingLeft:'25px', paddingTop:'10px',width:'100%', backgroundColor:'green', borderRadius:'5px', display:'inline-flex'}}>
          <h5 style={{paddingBottom:'0px'}}>Success!</h5>
        </div>
        <div className='modals'> </div>
        <div style={{paddingLeft:'75px', paddingTop:'10px'}}>
          <p><b>Assessment submitted successfully!</b></p>
          <div style={{paddingLeft:"90px"}}>
            <button style={{paddingLeft:"20px", paddingRight:"20px"}} className="btn btn-success" onClick={closeSuccessModal}>Okay</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Assessment;
