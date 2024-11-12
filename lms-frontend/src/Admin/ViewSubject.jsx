import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class ViewSubjects extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            subjects:[]
        };
    }

    componentDidMount() {
       
        axios.get('http://localhost:8083/api/v1/subject/allsubjects') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ subjects: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching subjects data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    renderStars(credit) {
        let stars = '';
        for (let i = 0; i < credit; i++) {
            stars += '*';
        }
        return stars;
    }

    render(){
        

        if (!Array.isArray(this.state.subjects)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.subjects.filter((subject) =>
            Object.keys(subject).some((key) =>
                String(subject[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.subjects;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Subjects</h4>
                </section>

                <div className="pagetable">

                    <div className="clk">

                        <div className="searchbar">
                            <input type="text"style={{borderRadius:"15px"}}  placeholder= " 🔍search..." value={this.state.searchTerm}
                            onChange={this.handleSearch}/>

                        </div>
                        <div className="button-add">

                            <Link className="btn btn-primary" to="/admin/newsubject" ><IoMdAdd /> New subject</Link>
                        </div>
                        
                    </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>#</th>
                                    <th>subject Name</th>
                                    <th>subject Code</th>
                                    <th>Credit </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentPageData.map((subject)=>(    
                                <tr key={subject.subjectId}>
                                    <td>{subject.subjectId}</td>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.subjectCode}</td>
                                    <td>{this.renderStars(subject.credit)}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            <div style={{paddingLeft:"10px"}}>
                                                <button style={{paddingLeft:"20px", paddingRight:"20px"}} className="btn btn-success">Edit </button>
                                            </div>
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-danger">Delete</button>
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

export default ViewSubjects;