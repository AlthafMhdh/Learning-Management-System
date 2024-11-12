import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            students:0,
            lecturers:0,
            courses:0,
            suspentstudents:0,
            suspentlecturers:0,
            subjects:0,
            batches:0,
            lessons:0

        };
    }

    componentDidMount() {

        const id = window.sessionStorage.getItem('id');

        const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');

        this.setState({isLoggedIn: isLoggedIn})

        // Fetch data from the backend when the component mounts
        axios.get('http://localhost:8083/api/v1/student/count')
            .then(response => {
                this.setState({ students: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });

        axios.get('http://localhost:8083/api/v1/lecturer/count')
            .then(response => {
                this.setState({ lecturers: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching lecturers data:', error);
            });

        axios.get('http://localhost:8083/api/v1/course/count')
            .then(response => {
                this.setState({ courses: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });
            
        axios.get('http://localhost:8083/api/v1/student/suspent-count')
            .then(response => {
                this.setState({ suspentstudents: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });

        axios.get('http://localhost:8083/api/v1/lecturer/suspent-count')
            .then(response => {
                this.setState({ suspentlecturers: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching lecturers data:', error);
            });

        axios.get('http://localhost:8083/api/v1/subject/count')
            .then(response => {
                this.setState({ subjects: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });

        axios.get('http://localhost:8083/api/v1/batch/count')
            .then(response => {
                this.setState({ batches: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });

        axios.get('http://localhost:8083/api/v1/lesson/count')
            .then(response => {
                this.setState({ lessons: response.data.data });
            })
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });
    
    }


    render() {

        return(
            <div>

                <div class="row" style={{marginTop:"50px"}}>
                    <div class="col-md-4">
                        <div className="button-box shadow">
                            
                            <div>
                                <h4>0{this.state.courses}</h4>
                            </div>
                            
                            <Link to="/admin/courses" style={{textDecoration:"none"}}>
                                <h5>Courses</h5>
                            </Link> 
                            
                        </div>

                        <div className="button-box shadow">
                            
                            <div>
                                <h4>0{this.state.subjects}</h4>
                            </div>
                            <Link to="/admin/subjects" style={{textDecoration:"none"}}>
                                <h5>Subjects</h5>
                            </Link> 
                            
                        </div>
                        <div className="button-box shadow">
                            
                            <div>
                                <h4>0{this.state.batches}</h4>
                            </div>
                            <Link to="/admin/batches" style={{textDecoration:"none"}}>
                                <h5>Batches</h5>
                            </Link> 
                            
                        </div>
                    </div>  

                <div class="col-md-4">
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.students}</h4>
                        </div>
                        
                        <Link to="/admin/students" style={{textDecoration:"none"}}>
                            <h5>Active Students</h5>
                        </Link> 
                        
                    </div>

                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.suspentstudents}</h4>
                        </div>
                        
                        <Link to="/admin/suspended-students" style={{textDecoration:"none"}}>
                            <h5>Suspended Students</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                    <div>
                            <h4>0{this.state.lessons}</h4>
                        </div>
                        <Link to="/admin/viewlessons" style={{textDecoration:"none"}}>
                            <h5>Lessons</h5>
                        </Link> 
                        
                    </div>
                    
                
                </div> 
            
                <div class="col-md-4">
                
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.lecturers}</h4>
                        </div>
                        
                        <Link to="/admin/lecturers" style={{textDecoration:"none"}}>
                            <h5>Active Lecturers</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        <div>
                            <h4>0{this.state.suspentlecturers}</h4>
                        </div>

                        <Link to="/admin/removed-lecturers" style={{textDecoration:"none"}}>
                            <h5>Removed / Deleted<br/> Lecturers</h5>
                        </Link> 
                        
                    </div>
                    <div className="button-box shadow">
                        
                        <br/>
                        <Link to="/admin/assignlecturer" style={{textDecoration:"none"}}>
                            <h5>Assign Lecturer</h5>
                        </Link> 
                        
                    </div>
                </div>
            </div>

            </div>
        )
    }
}

export default Dashboard;