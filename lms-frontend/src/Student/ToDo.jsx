import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class ToDo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            ToDos:[]
        };
    }

    componentDidMount() {

            const id = window.sessionStorage.getItem('id');
            const studentId = id;
    
            console.log("your id student is", studentId);
       
        axios.get('http://localhost:8083/api/v1/assignment/ToDo/'+ studentId) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ ToDos: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching ToDos data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render(){

        if (!Array.isArray(this.state.ToDos)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.ToDos.filter((ToDo) =>
            Object.keys(ToDo).some((key) =>
                String(ToDo[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.ToDos;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Pending/To Do Assessments</h4>
                </section>

                <div className="pagetable">

                    <div className="clk">

                        <div className="searchbar">
                            <input type="text"style={{borderRadius:"15px"}}  placeholder= " 🔍search..." value={this.state.searchTerm}
                            onChange={this.handleSearch}/>

                        </div>
                        
                    </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>Batch Name</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Assessment</th>
                                    <th>Issued Date</th>
                                    <th>Submission Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentPageData.map((ToDo)=>(    
                                <tr key={ToDo.studentAssignmentId}>
                                    <td>{ToDo.batchName}</td>
                                    <td>{ToDo.subjectCode}</td>
                                    <td>{ToDo.subjectName}</td>
                                    <td>{ToDo.assignmentName}</td>
                                    <td>{new Date(ToDo.issuedDate).toLocaleDateString("en-GB")}</td>
                                    <td>{new Date(ToDo.submissionDate).toLocaleDateString("en-GB")}</td>
                                    <td>
                                        <Link
                                        to={`/student/assessment?selectedAssessment=${encodeURIComponent(JSON.stringify({...ToDo }))}`} 
                                       // to="/student/assessment"
                                       >
                                        Open
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        

                        
                    </div>
                        

                </div>

                <div className="pagination">
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

            </div>
        )
    }

}

export default ToDo;