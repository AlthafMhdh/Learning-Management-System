import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class NewStudent extends Component{

    initialState = {
        title:"Mr",
        Student_name:"",
        Student_address:"",
        Student_email:"",
        Student_dob:"",
        Student_nic:"",
        Student_number:"",

        errors:{
            title:"",
            Student_name:"",
            Student_address:"",
            Student_email:"",
            Student_dob:"",
            Student_nic:"",
            Student_number:"",
        }
    }

    state = this.initialState;

    

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {Student_name, Student_address, Student_email,Student_dob,Student_nic,Student_number}=this.state;
        const errors = {};

        //Form Validation methods
        if (!Student_name) {
            errors.Student_name="Student Name is Required.";
        }

        if (!Student_address) {
            errors.Student_address="Address is Required.";
        }

        if (!Student_email) {
            errors.Student_email = "Email address is required.";
        } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Student_email)) {
            errors.Student_email = "Invalid email format. Please enter a valid email address.";
        }  
           
        if (!Student_dob) {
            errors.Student_dob="Date of Birth is Required.";
        }

        if (!Student_nic) {
            errors.Student_nic="NIC is Required.";
        }

        if (!Student_number) {
            errors.Student_number="Phonenumber is Required.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }

    // Where you use StudentForm
    
    handleSubmit = (Student) => {
      // Your logic to handle the submitted Student data
      console.log("Student submitted:", Student);
    };

  
    submitform = ()=>{

        const isValid = this.validateform();
        if (isValid) {
         //   let Student =this.state
          //  this.props.handleSubmit(Student);
          //  this.setState(this.initialState);
            const StudentData = {
                title: this.state.title,
                studentName: this.state.Student_name,
                address: this.state.Student_address,
                email: this.state.Student_email,
                dob: this.state.Student_dob,
                nic: this.state.Student_nic,
                phoneNumber: this.state.Student_number,
            };
        
        axios.post('http://localhost:8083/api/v1/student/save', StudentData)
                .then(response => {
                    console.log('Student added successfully');
                    // Optionally handle success (e.g., show a success message)
                    alert("Student added successfully");
                   //alert(response.data.data);
                })
                .catch(error => {
                    console.error('Failed to add Student', error);
                    // Optionally handle failure (e.g., show an error message)
                    alert("Failed to add Student");
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
                        <h4 style={{paddingLeft:"50px"}}>Add New Student</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/students" ><IoArrowBack /> Back</Link>
                                
                            </div>
                            
                        </div>
                        <div>
                            <form className="pageform" handleSubmit={this.handleSubmit}>

                                <div class="row">
                                    <div class="col-md-5">

                                        <label htmlFor="name">Name</label>
                                        <div style={{display: 'flex'}}>
                                            <select name="title" value={this.state.title} onChange={this.handleChange} style={{width:"20%", padding: "6px 10px", marginRight: "10px", boxSizing: "border-box", height:'38px', marginTop:'8px'}}>
                                                <option value="Mr ">Mr</option>
                                                <option value="Miss ">Miss</option>
                                            </select>
                                            <input type="text" name="Student_name" id="name" value={this.state.Student_name} onChange={this.handleChange}/>
                                        </div>
                                        {/* <input type="text" name="Student_name" id="name" value={this.state.Student_name} onChange={this.handleChange}/> */}
                                        <div className="error-message">{errors.Student_name}</div>

                                        <label htmlFor="address" style={{paddingTop:"6px"}}>Address</label>
                                        <input type="text" name="Student_address" id="address"value={this.state.Student_address} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.Student_address}</div>

                                        <label htmlFor="email" style={{paddingTop:"6px"}}>Email</label>
                                        <input type="email" name="Student_email" style={{paddingTop:"6px"}} id="email" value={this.state.Student_email} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.Student_email}</div>

                                    </div>
                                    <div class="col-md-5">

                                        <label htmlFor="dob">Date of Birth</label>
                                        <input type="date" name="Student_dob" id="dob" value={this.state.Student_dob} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.Student_dob}</div>

                                        <label htmlFor="nic" style={{paddingTop:"8px"}}>NIC</label>
                                        <input type="text" name="Student_nic" id="nic" value={this.state.Student_nic} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.Student_nic}</div>

                                        <label htmlFor="number" style={{paddingTop:"6px"}}>Phone Number</label>
                                        <input type="text" name="Student_number" id="number" value={this.state.Student_number} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.Student_number}</div>

                                    </div>
                                    

                                </div>
                                <br/>
                                <br/>
                                <input type="button" value="Add Student" style={{marginLeft:"400px",width:"20%"}} onClick={this.submitform} /> 
    

                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default NewStudent;