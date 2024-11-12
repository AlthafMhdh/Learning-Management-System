import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class ViewLecturer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 6,
            searchTerm: "",
            lecturers:[]
        };
    }

    componentDidMount() {
       
        axios.get('http://localhost:8083/api/v1/lecturer/alllecturer') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ lecturers: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching lecturers data:', error);
            });
    }

    suspendLecturer = (lecturerId) => {
        
        axios.put("http://localhost:8083/api/v1/lecturer/suspend/" + lecturerId)
            .then(response => {
                alert(response.data.data);
                console.log('Lecturer suspended successfully');
                this.componentDidMount();
            })
            .catch(error => {
                // Handle error if needed
                console.error('Error suspending lecturer:', error);
            });
    };


    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };


    render(){

        if (!Array.isArray(this.state.lecturers)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.lecturers.filter((lecturer) =>
            Object.keys(lecturer).some((key) =>
                String(lecturer[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.lecturers;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Lecturers</h4>
                </section>

                <div className="pagetable">

                    <div className="clk">

                        <div className="searchbar">
                            <input type="text"style={{borderRadius:"15px"}}  placeholder= " 🔍search..." value={this.state.searchTerm}
                            onChange={this.handleSearch}/>

                        </div>
                        <div className="button-add">

                            <Link className="btn btn-primary" to="/admin/newlecturer" ><IoMdPersonAdd /> New Lecturer</Link>
                        </div>
                        
                    </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>#</th>
                                    <th>lecturer Name</th>
                                    <th>NIC</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Qualification</th>
                                    <th>Experience</th>
                                    <th>Registed Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentPageData.map((lecturer)=>(    
                                <tr key={lecturer.lecturerId}>
                                    <td>{lecturer.lecId}</td>
                                    <td>{lecturer.lecturerName}</td>
                                    <td>{lecturer.nic}</td>
                                    <td>{new Date(lecturer.dob).toLocaleDateString('en-GB')}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.phoneNumber}</td>
                                    <td>{lecturer.address}</td>
                                    <td>{lecturer.qualification}</td>
                                    <td>{lecturer.experience}</td>
                                    <td>{new Date(lecturer.registredDate).toLocaleDateString('en-GB')}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-danger" onClick={() => this.suspendLecturer(lecturer.lecturerId)}>Remove</button>
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

export default ViewLecturer;