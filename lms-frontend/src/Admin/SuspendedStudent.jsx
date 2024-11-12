import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const BackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/admin/dashboard");
    };
  
    return (
      <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
        <IoArrowBack size={27} />
      </label>
    );
  };

class SuspendedStudent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            students:[]
        };
    }

    componentDidMount() {

        axios.get('http://localhost:8083/api/v1/student/allsuspendedstudents') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ students: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching students data:', error);
            });
       
    }

    activeStudent = (studentId) => {
        
        axios.put("http://localhost:8083/api/v1/student/active/" + studentId)
            .then(response => {
                alert(response.data.data);
                console.log('Student activeted successfully');
                this.componentDidMount();
            })
            .catch(error => {
                // Handle error if needed
                console.error('Error active student:', error);
            });
    };
    


    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

        if (!Array.isArray(this.state.students)) {
         return <div>Loading...</div>;
        }

        const filteredData = this.state.students.filter((student) =>
            Object.keys(student).some((key) =>
                String(student[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.students;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader1">
                    <BackButton />
                    <h4 style={{paddingLeft:"50px"}}>Suspended Students</h4>
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
                                    <th>#</th>
                                    <th>Student Name</th>
                                    <th>NIC</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Registed Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentPageData.map((student)=>(
                                <tr key={student.studentId}>
                                    <td>{student.sid}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.nic}</td>
                                    <td>{new Date(student.dob).toLocaleDateString('en-GB')}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phoneNumber}</td>
                                    <td>{student.address}</td>
                                    <td>{new Date(student.registredDate).toLocaleDateString('en-GB')}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-primary" onClick={() => this.activeStudent(student.studentId)} >Active</button>
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

export default SuspendedStudent;