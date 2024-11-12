import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class StudentDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            profileData: {
                title: "",
                studentName: "",
            },
            courseData: [],
        };
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem("id");
        const studentId = id;

        console.log("your id student is", studentId);
        const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        this.setState({ isLoggedIn: isLoggedIn });

        console.log("Student Id: ", studentId);
        axios.get("http://localhost:8083/api/v1/student/profile/" + studentId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ profileData: response.data.data[0] });
                } else {
                    console.error("Invalid data format from the backend:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching batchs data:", error);
            });

        axios.get("http://localhost:8083/api/v1/batch/mycourses/" +studentId)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ courseData: response.data.data });
                } else {
                    console.error("Invalid data format from the backend:", response.data);
                }
            });
    }

    render() {
        const { title, studentName } = this.state.profileData;
        const { courseData } = this.state;

        return (
            <div>
                <h1 style={{ textAlign: "center", marginTop: "5px" }}>Welcome Back, {title}. {studentName} </h1>

                {/* <div style={{ marginTop: "15px" }}>
                    <h4>My Courses</h4>
                </div> */}

                {/* Mapping over courseData to dynamically render course cards */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                    {courseData.map((course, index) => (
                        <div key={index} style={{ width: "300px", height: "200px", boxSizing: "border-box", borderRadius: "5px", backgroundColor: "#ccc", marginTop: "20px", position: "relative" }}>
                            <div style={{ paddingLeft: "25px", paddingTop: "25px" }}>
                                <b>{course.batchName}</b>
                            </div>
                            <div style={{ paddingLeft: "25px", paddingTop: "25px" }}>
                                <b>{course.courseLevel} In {course.courseName}</b>
                            </div>
                            <div style={{ position: "absolute", bottom: "10px", left: "35px", width:'75%' }}>
                                <Link
                                   to={`/student/batch-assessment?batchId=${course.batchId}&batchName=${course.batchName}`}
                                    // to={`/student/batch-assessment?selectedCourse=${encodeURIComponent(JSON.stringify({...course }))}`}
                                    // to={{
                                    //     pathname: `/student/batch-assessment`,
                                    //     search: `?selectedCourse=${encodeURIComponent(JSON.stringify({...course}))}`,
                                    //     state: { courseData: course } // You can also pass data through state if needed
                                    // }}
                                >
                                    <button className="btn btn-success" style={{ width: "100%", color: "black", height: "40px" }}>
                                        <b style={{ fontSize: "15px" }}>View</b>
                                    </button>
                                </Link>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default StudentDash;
