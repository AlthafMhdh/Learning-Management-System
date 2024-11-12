import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBack, IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = ({ batchId, batchName }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/admin/view-batch-student?batchId=${batchId}&batchName=${batchName}`);
  };

  return (
    <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
      <IoArrowBack size={27} />
    </label>
  );
};

const AddStudentforBatch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [batchId, setBatchId] = useState(null);
  const [batchName, setBatchName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const batchId = new URLSearchParams(location.search).get("batchId");
    const batchName = new URLSearchParams(location.search).get("batchName");
    setBatchId(batchId);
    setBatchName(batchName);
    
    const studentIds = new URLSearchParams(location.search).get("studentIds");
    setSelectedStudents(studentIds ? studentIds.split(",") : []);

    axios
      .get("http://localhost:8083/api/v1/student/allstudent")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setStudents(response.data.data);
        } else {
          console.error("Invalid data format from the backend:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, [location.search]);

  const handleCheckboxChange = (event) => {
    const studentId = event.target.value;
    if (event.target.checked) {
      setSelectedStudents((prevSelectedStudents) => [...prevSelectedStudents, studentId]);
    } else {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((id) => id !== studentId)
      );
    }
  };

  // useEffect(() => {
  //   // Pre-select checkboxes when component mounts
  //   setSelectedStudents((prevSelectedStudents) => {
  //     const newSelectedStudents = [...prevSelectedStudents];
  //     students.forEach((student) => {
  //       if (newSelectedStudents.indexOf(student.studentId) === -1) {
  //         newSelectedStudents.push(student.studentId);
  //       }
  //     });
  //     return newSelectedStudents;
  //   });
  // }, [students]);

  // const handleCheckboxChange = (event) => {
  //   const studentId = event.target.value;
  //   if (event.target.checked) {
  //     setSelectedStudents((prevSelectedStudents) => [
  //       ...prevSelectedStudents,
  //       studentId,
  //     ]);
  //   } else {
  //     setSelectedStudents((prevSelectedStudents) =>
  //       prevSelectedStudents.filter((id) => id !== studentId)
  //     );
  //   }
  // };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = () => {
    // Send selected students and batch ID to the 
    console.log("Students: ",selectedStudents)
    axios
      .post("http://localhost:8083/api/v1/batch/addStudent/"+ batchId, {
    
        studentIds: selectedStudents,
      })
      .then((response) => {
        alert(response.data.data);
        // Handle success
        console.log("Students added to batch:", response.data);
        // Redirect to view-batch-student page
        navigate(`/admin/view-batch-student?batchId=${batchId}&batchName=${batchName}`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding students to batch:", error);
      });
  };

  const filteredData = students.filter((student) =>
  Object.values(student).some((value) =>
    typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <section className="formheader1">
        <BackButton batchId={batchId} batchName={batchName} />
        <h4 style={{ paddingLeft: "50px" }}> Add Student For {batchName}</h4>
      </section>

      <div className="Assign-studentlist">
        <div className="searchbar2">
          <input
            type="text"
            style={{ borderRadius: "15px" }}
            placeholder=" 🔍search students..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div
          className="table-responsive-sm"
          style={{ width: "100%", height: "445px", marginTop: "-15px" }}
        >
          <table className="table">
            <thead className="table-active">
              <tr>
                <th></th>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>NIC</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {currentPageData.map((student) => (
                <tr key={student.studentId}>
                  <td>
                    <input
                      type="checkbox"
                      style={{ transform: "scale(1.3)" }}
                      value={student.studentId}
                      onChange={handleCheckboxChange}
                      checked={selectedStudents.includes(student.studentId)}
                    />
                  </td>
                  <td>{student.sid}</td>
                  <td>{student.studentName}</td>
                  <td>{student.nic}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination1">
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
            disabled={endIndex >= filteredData.length}
          >
            <IoArrowForward />
          </button>
        </div>

        <div style={{ marginLeft: "350px", marginTop: "38px" }}>
          <button
            className="btn btn-success"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            onClick={handleSubmit}
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentforBatch;
