import { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const LessonLessonView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [lessons, setLessons] = useState([]);
    const location = useLocation();
    const [subjectData, setSubjectData] = useState({
        subjectName:"",
        subjectId:'',
        subjectCode:'',
      });

    const searchParams = new URLSearchParams(location.search);
    const selectedSubjectString = searchParams.get("selectedSubject");
    const selectedSubject = JSON.parse(decodeURIComponent(selectedSubjectString));

    useEffect(() => {

        if (selectedSubject) {
            setSubjectData({
              subjectName:selectedSubject.subjectName ||"",
              subjectId:selectedSubject.subjectId ||"",
              subjectCode:selectedSubject.subjectCode ||"",
              
            });

            const s = 2;

            axios.get(`http://localhost:8083/api/v1/subject/viewlessons/`+selectedSubject.subjectId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setLessons(response.data.data);
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching lessons data:', error);
            });
        }
    }, []);

    const handleDownloadPdf = async (lessonId, lessonName) => {
        try {
          // Call the API endpoint to download the PDF file
          const response = await axios.get(
            `http://localhost:8083/api/v1/lesson/download/pdf/${lessonId}`,
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
          link.setAttribute('download', `${lessonName}.pdf`); // Set the filename
          document.body.appendChild(link);
      
          // Trigger the download
          link.click();
      
          // Remove the temporary anchor element
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error downloading PDF:", error);
        }
      };
      
  
      const handleViewPdf = async (lessonId) => {
        try {
          // Fetch the PDF file from the server
          const response = await axios.get(
            `http://localhost:8083/api/v1/lesson/lesson/pdf/${lessonId}`,
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredData = lessons.filter((lesson) =>
        Object.keys(lesson).some((key) =>
            String(lesson[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const displayData = searchTerm ? filteredData : lessons;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentPageData = displayData.slice(startIndex, endIndex);

    const {subjectName, subjectId, subjectCode} = subjectData;

    return (
        <div>
            <section className="formheader">
                <h4 style={{ paddingLeft: "50px" }}> {subjectCode} - {subjectName}</h4>
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
                <div className="table-responsive-sm" style={{ widows: '80%' }}>
                    <table className="table">
                        <thead className="table-active">
                            <tr>
                                <th>#</th>
                                <th>Lesson Name</th>
                                <th>File Name</th>
                                <th>File Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((lesson, index) => (
                                <tr key={lesson.lessonId}>
                                    {/* <td>{lesson.lessonId}</td> */}
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{lesson.lessonName}</td>
                                    <td>{lesson.contentName}</td>
                                    <td>{lesson.contentType}</td>
                                    <td >
                                        <div style={{display:"inline-flex"}}>
                                            <div style={{ paddingLeft: "50px",paddingRight:'20px' }}>
                                                <a onClick={() => handleViewPdf(lesson.lessonId)} style={{ paddingLeft: "20px", paddingRight:'20px' }} className="btn btn-success">View</a>
                                            </div>
                                            <div style={{ paddingLeft: "10px" }}>
                                                <a onClick={() => handleDownloadPdf(lesson.lessonId, lesson.lessonName)} style={{ paddingRight: "20px" }} className="btn btn-danger">Download</a>
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

export default LessonLessonView;
