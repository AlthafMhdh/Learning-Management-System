import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class NewCourse extends Component{

    initialState = {
        course_name:"",
        course_code:"",
        duration:"",
        level:"Certificate",


        errors:{
            course_name:"",
            course_code:"",
            duration:"",
            level:"",
        }
    }

    state = this.initialState;

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {course_name, course_code, duration,level}=this.state;
        const errors = {};

        //Form Validation methods
        if (!course_name) {
            errors.course_name="Course Name is Required.";
        }

        if (!course_code) {
            errors.course_code="Course code is Required.";
        }

        if (!duration) {
            errors.duration = "Course duration is required.";
        } 
        
        if (!level) {
            errors.level="Please select the course level.";
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
         //   let Course =this.state
          //  this.props.handleSubmit(Course);
          //  this.setState(this.initialState);
            const CourseData = {
                courseName: this.state.course_name,
                courseCode: this.state.course_code,
                duration: this.state.duration,
                level: this.state.level,
            };
        
        axios.post('http://localhost:8083/api/v1/course/create', CourseData)
                .then(response => {
                    console.log('Course added successfully');
                    // Optionally handle success (e.g., show a success message)
                   // alert("Course added successfully");
                   alert(response.data.data);
                })
                .catch(error => {
                    console.error('Failed to add Course', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add Course");
                })
                .finally(() => {
                    this.setState(this.initialState);
                });
        }    
    };

    render(){
        const { errors } = this.state;
        return(

            <div>
                    
                    <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Add New Course</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/Courses" ><IoArrowBack /> Back</Link>
                                
                            </div>
                            
                        </div>
                        <div>
                            <form className="pageform" handleSubmit={this.handleSubmit}>

                                <div class="row">
                                    <div className="col-md-2">

                                    </div>
                                    <div className="col-md-5">

                                        <label htmlFor="name">Course Name</label>
                                        <input type="text" name="course_name" id="name" value={this.state.course_name} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.course_name}</div>

                                        <label htmlFor="code" style={{paddingTop:"6px"}}>Course Code</label>
                                        <input type="text" name="course_code" id="code"value={this.state.course_code} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.course_code}</div>

                                        <label htmlFor="duration" >Duration</label>
                                        <input type="text" name="duration"  id="duration" value={this.state.duration} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.duration}</div>

                                        <label htmlFor="description" >Course Level</label>
                                        <br/>
                                        <select name="level" value={this.state.level} onChange={this.handleChange} style={{width:"100%", padding: "6px 10px", marginRight: "10px", boxSizing: "border-box", height:'38px', marginTop:'8px'}}>
                                                <option value="Certificate ">Certificate</option>
                                                <option value="Certificate ">Advanced Certificate</option>
                                                <option value="Diploma ">Diploma</option>
                                                <option value="Higher Natioanal Diploma">Higher Natioanal Diploma</option>
                                                <option value="Top-up">Top-up</option>
                                            </select>
                                        <div className="error-message">{errors.level}</div>

                                    </div>
                                    <div class="col-md-5">
                                    </div>
                                    
                                </div>
                                <input type="button" value="Add Course" style={{marginLeft:"350px",width:"20%", marginTop:"20px"}} onClick={this.submitform} /> 
    
                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default NewCourse;