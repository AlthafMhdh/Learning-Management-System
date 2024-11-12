import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class NewBatch extends Component{

    constructor(props) {
        super(props);
        this.state = {
          course_name: "",
          startdate: "",
          errors: {
            course_name: "",
            startdate: "",
          },
          courses: [],
        };
    }

    componentDidMount() {
       
        axios.get('http://localhost:8083/api/v1/course/allcourse') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ courses: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });
    }

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {course_name, startdate}=this.state;
        const errors = {};

        //Form Validation methods
        if (!course_name) {
            errors.course_name="Course Name is Required.";
        }

        if (!startdate) {
            errors.startdate="Course code is Required.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }
    
    handleSubmit = (Course) => {
      // Your logic to handle the submitted Course data
      console.log("Course submitted:", Course);
    };
 
    submitform = ()=>{

        const isValid = this.validateform();
        if (isValid) {
            const BatchData = {
                course: this.state.course_name,
                startDate: this.state.startdate,
            };
        
        axios.post('http://localhost:8083/api/v1/batch/new', BatchData)
                .then(response => {
                    alert(response.data.data);
                })
                .catch(error => {
                    console.error('Failed to add Batch', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add Batch");
                })
                .finally(() => {
                    this.setState({
                        course_name: "",
                        startdate: "",
                      });
                });
        }    
    };

    render(){
        const { errors } = this.state;
        return(

            <div>
                    
                    <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Add New Batch</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/batches" ><IoArrowBack /> Back</Link>
                                
                            </div>
                            
                        </div>
                        <div>
                            <form className="pageform" handleSubmit={this.handleSubmit}>

                                <div class="row">
                                    <div className="col-md-2">

                                    </div>
                                    <div className="col-md-5" style={{ marginTop:"40px"}}>

                                        <label htmlFor="name">Course Name</label>
                                        <select name="course_name" id="course_name" value={this.state.course_name} onChange={this.handleChange}>
                                            <option value="">Select Course</option>
                                            {this.state.courses.map((course) => (
                                            <option key={course.courseId} value={course.courseId}>
                                               {course.level} In {course.courseName}
                                            </option> ))}
                                        </select>
                                        <div className="error-message">{errors.course_name}</div>

                                        <label htmlFor="st_date" style={{paddingTop:"6px"}}>Start Date</label>
                                        <input type="date" name="startdate" id="st_date"value={this.state.startdate} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.startdate}</div>

                                    </div>
                                    <div class="col-md-5">
                                    </div>
                                    
                                </div>
                                <input type="button" value="Add Batch" style={{marginLeft:"350px",width:"20%", marginTop:"40px"}} onClick={this.submitform} /> 
    
                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default NewBatch;