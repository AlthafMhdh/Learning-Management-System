import { Component } from "react";
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import React, { useState, useEffect, useRef } from 'react';



class NewLecturer extends Component{

    initialState = {
        name:"",
        address:"",
        email:"",
        dob:"",
        nic:"",
        number:"",
        qualification:"",
        experience:"",


        errors:{
            name:"",
            address:"",
            email:"",
            dob:"",
            nic:"",
            number:"",
            qualification:"",
            experience:"",
        }
    }

    state = this.initialState;

    

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    validateform =()=>{
        const {name, address, email,dob,nic,number,qualification,experience}=this.state;
        const errors = {};

        //Form Validation methods
        if (!name) {
            errors.name="Lecturer Name is Required.";
        }

        if (!address) {
            errors.address="Address is Required.";
        }

        if (!email) {
            errors.email = "Email address is required.";
        } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format. Please enter a valid email address.";
        }  
           
        if (!dob) {
            errors.dob="Date of Birth is Required.";
        }

        if (!nic) {
            errors.nic="NIC is Required.";
        }

        if (!number) {
            errors.number="Phonenumber is Required.";
        }
        if (!qualification) {
            errors.qualification="Lecturers qualification is Required.";
        }

        if (!experience) {
            errors.experience="Lecturers experience is Required.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }

    // Where you use LecturerForm
    
    handleSubmit = (Lecturer) => {
      // Your logic to handle the submitted Lecturer data
      console.log("Lecturer submitted:", Lecturer);
    };

  
    submitform = ()=>{

        const isValid = this.validateform();
        if (isValid) {
         //   let Lecturer =this.state
          //  this.props.handleSubmit(Lecturer);
          //  this.setState(this.initialState);
            const LecturerData = {
                title: this.state.title,
                lecturerName: this.state.name,
                address: this.state.address,
                email: this.state.email,
                dob: this.state.dob,
                nic: this.state.nic,
                phoneNumber: this.state.number,
                qualification: this.state.qualification,
                experience: this.state.experience,
            };
        
        axios.post('http://localhost:8083/api/v1/lecturer/save', LecturerData)
                .then(response => {
                    console.log('Lecturer added successfully');
                   alert(response.data.data);
                })
                .catch(error => {
                    console.error('Failed to add Lecturer', error);
                    alert("Failed to add Lecturer");
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
                        <h4 style={{paddingLeft:"50px"}}>Add New Lecturer</h4>
                    </section>
                    
                    <div className="pagetable">

                        <div className="clk">
                            <div className="button-return">
                                <Link className="btn btn-success " to="/admin/lecturers" ><IoArrowBack /> Back</Link>
                                
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
                                            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange}/>
                                        </div>
                                        
                                        {/* <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange}/> */}
                                        <div className="error-message">{errors.name}</div>

                                        <label htmlFor="address" style={{paddingTop:"6px"}}>Address</label>
                                        <input type="text" name="address" id="address"value={this.state.address} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.address}</div>

                                        <label htmlFor="email" >Email</label>
                                        <input type="email" name="email"  id="email" value={this.state.email} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.email}</div>

                                        <label htmlFor="qualification" >Qualification</label>
                                        <input type="text" name="qualification"  id="qualification" value={this.state.qualification} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.qualification}</div>

                                    </div>
                                    <div class="col-md-5">

                                        <label htmlFor="dob">Date of Birth</label>
                                        <input type="date" name="dob" id="dob" value={this.state.dob} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.dob}</div>

                                        <label htmlFor="nic" style={{paddingTop:"8px"}}>NIC</label>
                                        <input type="text" name="nic" id="nic" value={this.state.nic} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.nic}</div>

                                        <label htmlFor="number" >Phone Number</label>
                                        <input type="text" name="number" id="number" value={this.state.number} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.number}</div>

                                        <label htmlFor="experience" >Experience</label>
                                        <input type="text" name="experience"  id="experience" value={this.state.experience} onChange={this.handleChange}/>
                                        <div className="error-message">{errors.experience}</div>

                                    </div>
                                    

                                </div>
                                <input type="button" value="Add Lecturer" style={{marginLeft:"400px",width:"20%"}} onClick={this.submitform} /> 
    

                        </form>   

                    </div>
                </div>
                    
                
            </div>
        )
    }
}
export default NewLecturer;