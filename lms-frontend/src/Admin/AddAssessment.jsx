import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin/assessment");
  };

  return (
    <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
      <IoArrowBack size={27} />
    </label>
  );
};

const AddAssessment = () => {
  const [batchData, setBatchData] = useState({
    batchCode: "",
    batchName: "",
    courseName: "",
    level:"",
    subjectName: "",
    batchId:"",
    courseId:"",
    subjectId:"",
  });

  const [fileName, setFileName] = useState(null);
  
  const [assessmentName, setAssessmentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const selectedBatchString = searchParams.get("selectedBatch");
const selectedBatch = JSON.parse(decodeURIComponent(selectedBatchString));


  useEffect(() => {
    if (selectedBatch) {
      setBatchData({
        batchId: selectedBatch.batchId ||"",
        courseId: selectedBatch.courseId ||"",
        subjectId: selectedBatch.subjectId ||"",
        batchCode: selectedBatch.batchCode || "",
        batchName: selectedBatch.batchName || "",
        courseName: selectedBatch.courseName || "",
        level: selectedBatch.level || "",
        subjectName: selectedBatch.subjectName || "",
        
      });
    }
  }, [selectedBatch]);

  const handleUpload = () => {
    console.log("aass: ",assessmentName);
    console.log("file: ",fileName);
    console.log("BID: ",batchData.batchId);
    console.log("SID: ",batchData.subjectId);
    console.log("CID: ",batchData.courseId);

    if (!assessmentName && !fileName) {
        setErrorMessage("Assessment name and file are required.");
        return;
      } else if (!assessmentName) {
        setErrorMessage("Assessment name is required.");
        return;
      } else if (!fileName) {
        setErrorMessage("Please upload the file.");
        return;
      }
      setErrorMessage("");

      const formData = new FormData();
            formData.append('docFile', fileName); // Append the file to formData
            formData.append(' batchId', batchData.batchId);
            formData.append('subjectId', batchData.subjectId);
            formData.append('courseId', batchData.courseId);
            formData.append('assessmentName', assessmentName);

    axios.post('http://localhost:8083/api/v1/assignment/new-assessment', formData)
    .then(response => {
      alert(response.data.data);
      console.log("Assessment uploaded successfully:", response.data);
      navigate(-1);
    })
    .catch(error => {
      // Handle error
      console.error('Error uploading assessment:', error);
    });
  };

  const { batchCode, batchName, courseName,level, subjectName } = batchData;

  return (
    
    <div>
      <section className="formheader1">
        <BackButton />
        <h4 style={{ paddingLeft: "50px" }}> Add New Assessment</h4>
      </section>

      <div className="Assessment-add">
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "inline-flex", marginLeft: "150px" }}>
            <label style={{ width: "100%", paddingTop: "15px" }}>Batch Code</label>
            <div style={{ width: "150%", marginLeft: "46px" }}>
              <input type="text" readOnly name="batch-code" value={batchCode} style={{ width: "210%", marginLeft: "0px", paddingLeft: "10px" }} />
            </div>
          </div>
          <br />
          <div style={{ display: "inline-flex", marginLeft: "150px" }}>
            <label style={{ width: "100%", paddingTop: "15px" }}>Batch Name</label>
            <div style={{ width: "150%", marginLeft: "46px" }}>
              <input type="text" readOnly name="batch-name" value={batchName} style={{ width: "205%", marginLeft: "0px", paddingLeft: "10px" }} />
            </div>
          </div>
          <br />
          <div style={{ display: "inline-flex", marginLeft: "150px" }}>
            <label style={{ width: "100%", paddingTop: "15px" }}>Course Name</label>
            <div style={{ width: "150%", marginLeft: "45px" }}>
              <input type="text" readOnly name="subject-code" value={level+"In " +courseName} style={{ width: "197%", marginLeft: "0px", paddingLeft: "10px" }} />
            </div>
          </div>
          <br />
          <div style={{ display: "inline-flex", marginLeft: "150px" }}>
            <label style={{ width: "100%", paddingTop: "15px" }}>Subject Name</label>
            <div style={{ width: "150%", marginLeft: "43px" }}>
              <input type="text" readOnly name="subject-name" value={subjectName} style={{ width: "195%", marginLeft: "0px", paddingLeft: "10px" }} />
            </div>
          </div>
          <br />
          <div style={{ display: "inline-flex", marginLeft: "150px" }}>
            <label style={{ width: "100%", paddingTop: "15px" }}>Assessment Name</label>
            <div style={{ width: "150%", marginLeft: "31px" }}>
              <input type="text" name="assignment" style={{ width: "178%", marginLeft: "0px", paddingLeft: "10px" }} value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="new-assign-add">
          <div style={{ paddingTop: "30px", paddingLeft: "50px", color: "blue" }}>
            <input type="file" onChange={(e) => setFileName(e.target.files[0])}/>
          </div>
          {errorMessage && <div style={{ color: "red", marginTop: "0px", marginLeft: "50px" }}>{errorMessage}</div>}
          <div style={{ paddingTop: "20px", paddingLeft: "320px" }}>
            <button className="btn btn-primary" onClick={handleUpload}>Upload Assessment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssessment;
