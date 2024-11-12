import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class ViewLessons extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            lessons:[]
        };
    }

    componentDidMount() {
       
        axios.get('http://localhost:8083/api/v1/lesson//alllessons') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ lessons: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching lessons data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render(){
        

        if (!Array.isArray(this.state.lessons)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.lessons.filter((lesson) =>
            Object.keys(lesson).some((key) =>
                String(lesson[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.lessons;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Lessons</h4>
                </section>

                <div className="pagetable">

                    <div className="clk">

                        <div className="searchbar">
                            <input type="text"style={{borderRadius:"15px"}}  placeholder= " 🔍search..." value={this.state.searchTerm}
                            onChange={this.handleSearch}/>

                        </div>
                        <div className="button-add">

                            <Link className="btn btn-primary" to="/admin/newlesson" ><IoMdAdd /> New Lesson</Link>
                        </div>
                        
                    </div>
                    <div className="table-responsive-sm">
                        <table className="table">
                            <thead className="table-active">
                                <tr>
                                    <th>#</th>
                                    <th>Lesson Name</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name </th>
                                    <th>Content Name</th>
                                    <th>Content Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentPageData.map((lesson)=>(    
                                <tr key={lesson.lessonId}>
                                    <td>{lesson.lessonId}</td>
                                    <td>{lesson.lessonName}</td>
                                    <td>{lesson.subjectCode}</td>
                                    <td>{lesson.subjectName}</td>
                                    <td>{lesson.contentName}</td>
                                    <td>{lesson.contentType}</td>
                                    <td>
                                        <div style={{display:"inline-flex"}}>
                                            <div style={{paddingLeft:"10px"}}>
                                                <button style={{paddingLeft:"20px", paddingRight:"20px"}} className="btn btn-success">View </button>
                                            </div>
                                            <div style={{paddingLeft:"10px"}}>
                                                <button className="btn btn-danger">Remove</button>
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

export default ViewLessons;