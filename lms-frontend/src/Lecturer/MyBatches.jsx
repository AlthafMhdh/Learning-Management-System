import { Component } from "react";
import axios from "axios";
import { IoArrowBackSharp,IoArrowForward } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


class MyBatches extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 8,
            searchTerm: "",
            Batches:[]
        };
    }

    componentDidMount() {

        const id = window.sessionStorage.getItem('id');
        const lecturerId = id;
       
        axios.get('http://localhost:8083/api/v1/lecturer/mybatches/'+lecturerId) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ Batches: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching Batches data:', error);
            });
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render(){

        if (!Array.isArray(this.state.Batches)) {
        return <div>Loading...</div>;
        }

        const filteredData = this.state.Batches.filter((Batch) =>
            Object.keys(Batch).some((key) =>
                String(Batch[key]).toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        );

        const displayData = this.state.searchTerm ? filteredData : this.state.Batches;

        const { currentPage, itemsPerPage } = this.state;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageData = displayData.slice(startIndex, endIndex);

        return(
            <div>

                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}> My Lecturing Batches</h4>
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
                                    <th>Batch Name</th>
                                    <th>Course Name</th>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                            {currentPageData.map((Batch)=>(    
                                <tr key={Batch.batchId}>
                                    <td>{Batch.batchCode}</td>
                                    <td>{Batch.batchName}</td>
                                    <td>{Batch.level} In {Batch.courseName}</td>
                                    <td>{Batch.subjectCode}</td>
                                    <td>{Batch.subjectName}</td>
                                    <td>
                                        <Link className="btn btn-primary" 
                                      //  to="/lecturer/subjectview"
                                        to={`/lecturer/subjectview?selectedBatch=${encodeURIComponent(JSON.stringify({...Batch }))}`}
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

export default MyBatches;