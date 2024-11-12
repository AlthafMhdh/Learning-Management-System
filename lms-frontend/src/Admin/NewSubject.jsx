import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class NewSubject extends Component{


    constructor(props) {
        super(props);
        this.state = {
            subject_name:"",
            subject_code:"",
            course_name:"",
            credit:"",
            errors:{
                subject_name:"",
                subject_code:"",
                course_name:"",
                credit:"",
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
            })
            .finally(() => {
                this.setState(this.initialState);
            });
    }

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {subject_name, subject_code, credit}=this.state;
        const errors = {};

        //Form Validation methods
        if (!subject_name) {
            errors.subject_name="Subject Name is Required.";
        }

        if (!subject_code) {
            errors.subject_code="Subject code is Required.";
        }

        // if (!course_name) {
        //     errors.course_name = "Please select the Course Name.";
        // } 
        
        if (!credit) {
            errors.credit="Please select the subject credit.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }
    
    handleSubmit = (subject) => {
      // Your logic to handle the submitted subject data
      console.log("subject submitted:", subject);
    };
 
    submitform = ()=>{

        const isValid = this.validateform();
        if (isValid) {
         //   let subject =this.state
          //  this.props.handleSubmit(subject);
          //  this.setState(this.initialState);
            const subjectData = {
                subjectName: this.state.subject_name,
                subjectCode: this.state.subject_code,
             //   course: this.state.course_name,
                credit: this.state.credit,
            };
        
        axios.post('http://localhost:8083/api/v1/subject/create', subjectData)
                .then(response => {
                    console.log('subject added successfully');
                    // Optionally handle success (e.g., show a success message)
                   // alert("subject added successfully");
                   alert(response.data.data);
                })
                .catch(error => {
                    console.error('Failed to add subject', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add subject");
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
                        <h4 style={{paddingLeft:"50px"}}>Add New Subject</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/subjects" ><IoArrowBack /> Back</Link>
                                
                            </div>
                            
                        </div>
                        <div>
                            <form className="pageform" handleSubmit={this.handleSubmit}>

                                <div class="row">
                                    <div className="col-md-2">

                                    </div>
                                    <div className="col-md-5">

                                        <label htmlFor="name">Subject Name</label>
                                        <input type="text" name="subject_name" id="name" value={this.state.subject_name} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.subject_name}</div>

                                        <label htmlFor="code" style={{paddingTop:"6px"}}>Subject Code</label>
                                        <input type="text" name="subject_code" id="code"value={this.state.subject_code} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.subject_code}</div>

                                        {/* <label htmlFor="course_name" >Course Name</label>
                                        <select name="course_name" id="course_name" value={this.state.course_name} onChange={this.handleChange}>
                                            <option value="">Select Course</option>
                                            {this.state.courses.map((course) => (
                                            <option key={course.courseId} value= {course.courseId}>
                                               {course.level} In {course.courseName}
                                            </option> ))}
                                        </select>
                                        <div className="error-message">{errors.course_name}</div> */}

                                        <label htmlFor="description" >Subject credit</label>
                                        <br/>
                                        <select name="credit" value={this.state.credit} onChange={this.handleChange} style={{width:"100%", padding: "6px 10px", marginRight: "10px", boxSizing: "border-box", height:'38px', marginTop:'8px'}}>
                                                <option value="">--Select the Subject Credit Weight--</option>
                                                <option value="1">*</option>
                                                <option value="2">**</option>
                                                <option value="3">***</option>
                                                <option value="4">****</option>
                                                <option value="5">*****</option>
                                            </select>
                                        <div className="error-message">{errors.credit}</div>

                                    </div>
                                    <div class="col-md-5">
                                    </div>
                                    
                                </div>
                                <input type="button" value="Add Subject" style={{marginLeft:"350px",width:"20%", marginTop:"20px"}} onClick={this.submitform} /> 
    
                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default NewSubject;