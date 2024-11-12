import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class MySubjects extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            Subjects:[]
        };
    }

    componentDidMount() {

        const id = window.sessionStorage.getItem('id');
        const lecturerId = id;
       
        axios.get('http://localhost:8083/api/v1/lecturer/mysubjects/'+lecturerId ) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ Subjects: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching Subjects data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render(){

        if (!Array.isArray(this.state.Subjects)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.Subjects.filter((Subject) =>
            Object.keys(Subject).some((key) =>
                String(Subject[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const renderStars =(credit) => {
            let stars = '';
            for (let i = 0; i < credit; i++) {
                stars += '*';
            }
            return stars;
        }

        const displayData = this.state.searchTerm ? filteredData : this.state.Subjects;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}> My Lecturing Subjects</h4>
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
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Course Name</th>
                                    <th>Credit</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                              
                                <tr>
                                    <td>1</td>
                                    <td>IntHRM</td>
                                    <td>Introduction to HRM</td>
                                    <td>**</td>
                                    <td><Link className="btn btn-primary" to="/lecturer/lessonview">View</Link></td>
                                </tr>
                            
                            </tbody> */}
                            <tbody>
                            {currentPageData.map((Subject)=>(    
                                <tr key={Subject.subjectId}>
                                    <td>{Subject.subjectId}</td>
                                    <td>{Subject.subjectCode}</td>
                                    <td>{Subject.subjectName}</td>
                                    <td>{Subject.level} In {Subject.courseName}</td>
                                    {/* <td>{Subject.credit}</td> */}
                                    <td>{renderStars(Subject.credit)}</td>
                                    <td>
                                        <Link className="btn btn-primary" 
                                     //   to="/lecturer/lessonview"
                                        to={`/lecturer/lessonview?selectedSubject=${encodeURIComponent(JSON.stringify({...Subject }))}`}
                                        >
                                            View
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

export default MySubjects;