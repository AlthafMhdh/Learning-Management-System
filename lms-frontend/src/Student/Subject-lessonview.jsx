import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import Modal from 'react-modal';
import { IoMdCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const BackButton = ({ navigate }) => {
  
  const handleGoBack = () => {
   // navigate("/student/courseview?selectedSubject=${encodeURIComponent(JSON.stringify({...subject }))}");
   // navigate("/student/courseview");
  // navigate("/student/courseview?selectedCourse=${encodeURIComponent(JSON.stringify({...course }))} ");
  };

  return (
    <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
      <IoArrowBack size={27} />
    </label>
  );
};

const SubjectLessonView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [assessments,setAssessments] = useState(null);

  const [subjectData, setSubjectData] = useState({
        
    subjectId: "",
    subjectName: "",
    subjectCode:"",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedSubjectString = searchParams.get("selectedSubject");
  const selectedSubject = JSON.parse(decodeURIComponent(selectedSubjectString));

  useEffect(() => {


    if (selectedSubject) {
        setSubjectData({
          subjectId: selectedSubject.subjectId ||"",
          subjectName: selectedSubject.subjectName || "",
          subjectCode: selectedSubject.subjectCode || "",
          
        });
      };
      const fetchLessons = async () => {
          try {
            const id = window.sessionStorage.getItem("id");
            const studentId = id;
            console.log("your id student is", studentId);
            const response = await axios.get(
              `http://localhost:8083/api/v1/subject/viewlessons/${selectedSubject.subjectId}`
            );
            if (Array.isArray(response.data.data)) {
              setLessons (response.data.data);
            } else {
              console.error("Invalid data format from the backend:", response.data);
            }
          } catch (error) {
            console.error("Error fetching courses data:", error);
          }
        };
    
        fetchLessons();      

        const fetchAssessment = async () => {
          try{
            const id = window.sessionStorage.getItem("id");
            const studentId = id;
            const response =  await axios.get('http://localhost:8083/api/v1/assignment/SubjectToDoForStudent/${studentId}/${subjectId}');
            if (Array.isArray(response.data.data)) {
              setAssessments (response.data.data);
            }
            else {
              console.error("Invalid data format from the backend:", response.data);
            }

          }
          catch (error) {
            console.error("Error fetching courses data:", error);
          }

        };
        fetchAssessment();


      } 
      , [selectedSubject]);
  
      const handleDownloadPdf = async () => {
        try {
          // Call the API endpoint to download the PDF file
          const response = await axios.get(
            `http://localhost:8083/api/v1/lesson/download/pdf/${selectedLesson.lessonId}`,
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
          link.setAttribute('download', `${selectedLesson.lessonName}.pdf`); // Set the filename
          document.body.appendChild(link);
      
          // Trigger the download
          link.click();
      
          // Remove the temporary anchor element
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error downloading PDF:", error);
        }
      };
      
  
      const handleViewPdf = async () => {
        try {
          // Fetch the PDF file from the server
          const response = await axios.get(
            `http://localhost:8083/api/v1/lesson/lesson/pdf/${selectedLesson.lessonId}`,
            {
              responseType: 'blob', // Specify response type as blob
            }
          );
      
          // Create a blob object from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' });
      
          // Create a URL for the blob object
          const url = window.URL.createObjectURL(blob);
      
          // Open the PDF file in a new window or modal
          window.open(url, '_blank');
        } catch (error) {
          console.error("Error viewing PDF:", error);
        }
      };
      
      

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = lessons.filter((lesson) =>
    Object.keys(lesson).some((key) =>
      String(lesson[key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleGoBack =() =>{
    navigate(-1);
}

  const displayData = searchTerm ? filteredData : lessons;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = displayData.slice(startIndex, endIndex);

  const {subjectId, subjectName, subjectCode} = subjectData;
  


  return (
    <div>
      <section className="formheader1">
        {/* <BackButton navigate={navigate} /> */}
        <button onClick={handleGoBack} style={{ paddingLeft: '25px', color: 'black', border: 'none', background: 'none', cursor: 'pointer' }}>
          <IoArrowBackSharp size={27} />
        </button>
        <h4 style={{ paddingLeft: "150px" }}>{subjectCode} - {subjectName} - Lessons</h4>
      </section>

      <div className="row">
        <div className="col-md-7">

          <div style={{ marginTop:'15px',marginLeft:'150px'}}>
                      <h5>Subject Resourses / Tutorials</h5>
                    </div>

                  <div className="table-responsive-sm" style={{marginTop:'25px',marginLeft:'180px',width:'60%', height:'500px'}}>
                    <table className="table">
                        <tbody>
                        {currentPageData.map((lesson) => (
                            <tr key={lesson.lessonId}>
                                <td></td>
                                <td>{lesson.lessonName}</td>
                                <td>
                                    <button className="btn btn-outline-secondary" onClick={() => openModal(lesson)}>
                                        View <FaArrowRightLong  style={{cursor:'pointer'}}/> 
                                    </button>                                  
                                </td>
                            </tr>                            
                          ))}  
                        </tbody>

                    </table>

                </div>

                <div className="pagination3">
                    <button className="buttonpd"
                        onClick={() => this.handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoArrowBackSharp />
                    </button>
                    <span className="buttonpd">{currentPage}</span>
                    <button  className="buttonpd"
                        onClick={() => this.handlePageChange(currentPage + 1)}
                        disabled={currentPage * itemsPerPage >= displayData.length}
                    >
                        <IoArrowForward />
                    </button>
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
              height: '300px',
              width: '35%',
              
            }
          }}
        >
          <div style={{paddingLeft:'25px', paddingTop:'20px',width:'100%', backgroundColor:'blue', borderRadius:'5px', display:'inline-flex',justifyContent: 'space-between' }}>
            <h4 style={{paddingBottom:'10px'}}>{selectedLesson && selectedLesson.lessonName}</h4>
            <label style={{paddingRight:'10px', cursor:'pointer'}}><IoMdCloseCircle size={30} onClick={closeModal}/></label>
          </div>
          <div style={{textAlign:'center', marginTop:'10px'}}>
            <h5>{selectedLesson && selectedLesson.contentName}</h5>
          </div>
          <div style={{marginTop:'40px',marginLeft:'50px', width:'80%', borderRadius:'5px', backgroundColor:'whitesmoke', height:'100px' }}>
                <div>
                  <button className="btn btn-link"  style={{marginTop:'25px'}} onClick={handleViewPdf} >
                     View PDF 
                  </button>
                  <br/>
                  <a download>
                    <button className="btn btn-link"onClick={handleDownloadPdf}>
                      Download PDF
                    </button>
                  </a>
                </div>
          </div>
        </Modal>


        </div>

        <div className="col-md-5">
          {/* Course Works / Assessments section */}

          <div className="courseworkview">
              <div style={{textAlign:'center'}}>
                  <h5 style={{paddingTop:'10px'}}>Course Works / Assessments</h5>
              </div>
              <div style={{marginTop:'35px',marginLeft:'50px', height:'100px', width:'80%', backgroundColor:'#ccc',textAlign:'center'}}>
                      {assessments && assessments.map(assessment => (
                        <div key={assessment.assignmentId}>{assessment.assignmentName}
                        
                        
                        
                        
                        
                        
                        </div>
                      ))}
                  <div style={{paddingTop:'25px'}}>
                      <b> Assessment Name</b>
                      {assessments && assessments.map(assessment => (
                        <div key={assessment.studentAssignmentId}>{assessment.assignmentName}</div>
                      ))}
                  </div>

                  </div>
                    <div style={{marginTop:'20px', marginLeft:'50px'}}>
                      <button className="btn btn-link">
                              Download Assessment
                      </button>
                      <div style={{marginTop:'15px'}}>
                            Submit Status : 
                      </div>
                      <div style={{marginTop:'15px'}}>
                            Submission Date & Time : 
                      </div>
                      <div style={{marginTop:'25px', marginLeft:'50px'}}>
                          <button className="btn btn-outline-primary">
                                View Assessment
                          </button>
                      </div>
                  </div>
                </div>

{/* <div className="courseworkview">
  <div style={{textAlign:'center'}}>
    <h5 style={{paddingTop:'10px'}}>Course Works / Assessments</h5>
  </div>
  <div style={{marginTop:'35px',marginLeft:'50px', width:'80%', backgroundColor:'#ccc'}}>
    {assessments && assessments.map(assessment => (
      <div key={assessment.studentAssignmentId} style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
        <div><b>Assessment Name:</b> {assessment.assignmentName}</div>
        <div><b>Submit Status:</b> {assessment.submitState}</div>
        <div><b>Submission Date & Time:</b> {assessment.submitDate}</div>
        <div style={{marginTop: '10px'}}>
          <button className="btn btn-link" 
         // onClick={() => downloadAssessment(assessment.filePath)}
          >
            Download Assessment
          </button>
          <button className="btn btn-outline-primary" 
        //  onClick={() => viewAssessment(assessment.assignmentId)}
          >
            View Assessment
          </button>
        </div>
      </div>
    ))}
  </div>
</div> */}


        </div>
      </div>

      {/* Modal */}
      {/* <Modal
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
            height: '300px',
            width: '35%',
          }
        }}
      >
        <div style={{paddingLeft:'25px', paddingTop:'20px',width:'100%', backgroundColor:'blue', borderRadius:'5px', display:'inline-flex',justifyContent: 'space-between' }}>
          <h4 style={{paddingBottom:'10px'}}>Lesson Name</h4>
          <label style={{paddingRight:'10px', cursor:'pointer'}}><IoMdCloseCircle size={30} onClick={closeModal}/></label>
        </div>
        <div style={{marginTop:'50px',marginLeft:'50px', width:'80%', borderRadius:'5px', backgroundColor:'whitesmoke', height:'100px' }}>
          <div>
            <button className="btn btn-link"  style={{marginTop:'25px'}}>
               View PDF 
            </button>
            <br/>
            <button className="btn btn-link">
              Download PDF
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default SubjectLessonView;
