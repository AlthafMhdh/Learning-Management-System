import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class AssignLecturer extends Component{


    constructor(props) {
        super(props);
        this.state = {
            batch_name:null,
            subject_name:null,
            lecturer_name:null,
            errors:{
                batch_name:"",
                subject_name:"",
                lecturer_name:"",
            },
          batches: [],
          subjects:[],
          lecturers:[],
        };
    }

    componentDidMount() {
        // Fetch batch names from backend
        axios.get('http://localhost:8083/api/v1/batch/allbatches')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ batches: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching batches data:', error);
            });

        axios.get('http://localhost:8083/api/v1/lecturer/alllecturer') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ lecturers: response.data.data });
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
    
    handleBatchChange = (event) => {
        const batchId = event.target.value;
        this.setState({batch_name: batchId});
        // Fetch subjects associated with the selected batch from backend
        axios.get(`http://localhost:8083/api/v1/subject/batch/${batchId}`)
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
    };

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {subject_name, batch_name, lecturer_name}=this.state;
        const errors = {};

        //Form Validation methods
        if (!batch_name) {
            errors.batch_name="Please select the batch.";
        }

        if (!subject_name) {
            errors.subject_name="Please select the subject.";
        }
        if (!batch_name && !subject_name){
            errors.subject_name = "Please select the batch first."
        }
        
        if (!lecturer_name) {
            errors.lecturer_name="Please select the lecturer.";
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

                batchId:this.state.batch_name,
                subjectId: this.state.subject_name,
                lecturerId: this.state.lecturer_name
                
            };
        
        axios.post('http://localhost:8083/api/v1/batch/assignlecturer', subjectData)
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
                        <h4 style={{paddingLeft:"50px"}}>Assign Lecturers to Batch</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/dashboard" ><IoArrowBack /> Back</Link>
                                
                            </div>
                            
                        </div>
                        <div>
                            <form className="pageform" handleSubmit={this.handleSubmit}>

                                <div class="row">
                                    <div className="col-md-2">

                                    </div>
                                    <div className="col-md-5">

                                        <label htmlFor="name">Batch Name</label>
                                        <select name="batch_name" onChange={this.handleBatchChange} value={this.state.batch_name}>
                                            <option value="">Select Batch</option>
                                            {this.state.batches.map(batch => (
                                                <option key={batch.batchId} value={batch.batchId}>{batch.batchName}</option>
                                            ))}
                                        </select>
                                        <div className="error-message">{errors.batch_name}</div>

                                        <br/>
                                        <label htmlFor="code" style={{paddingTop:"6px"}}>Subject Name</label>
                                        <select name="subject_name" onChange={this.handleChange} value={this.state.subject_name}>
                                            <option value="">Select Subject</option>
                                            {this.state.subjects.map(subject => (
                                                <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>
                                            ))}
                                        </select>
                                        <div className="error-message">{errors.subject_name}</div>
                                        <br/>

                                        <label htmlFor="description" >Lecturer Name</label>
                                        <br/>
                                        <select name="lecturer_name" onChange={this.handleChange} value={this.state.lecturer_name}>
                                            <option value="">Select Lecturer</option>
                                            {this.state.lecturers.map(lecturer => (
                                                <option key={lecturer.lecturerId} value={lecturer.lecturerId}>{lecturer.lecturerName}</option>
                                            ))}
                                        </select>
                                        <div className="error-message">{errors.lecturer_name}</div>

                                    </div>
                                    <div class="col-md-5">
                                    </div>
                                    
                                </div>
                                <input type="button" value="Assign" style={{marginLeft:"350px",width:"20%", marginTop:"20px"}} onClick={this.submitform} /> 
    
                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default AssignLecturer;