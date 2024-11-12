import { Component } from "react";
import axios from "axios";


class Settings extends Component{

    constructor(props) {
        super(props);
        this.state = {
            profileData:{
                password:""
            },
            current_password: "",
            new_password: "",
            conform_password: "",
          errors: {
            current_password: "",
            new_password: "",
            conform_password: "",
          }
        };        
    }

    componentDidMount(){

        const id = window.sessionStorage.getItem('id');
        const lecturerId = id;

        console.log("your id lecturer is", lecturerId);
        axios.get('http://localhost:8083/api/v1/lecturer/profile/'+ lecturerId) 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ profileData: response.data.data[0] });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching batchs data:', error);
            });
    }

    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { current_password, new_password, conform_password, profileData } = this.state;
        let errors = {};

        // Password validation
        if (profileData.password !== current_password) {
            errors.current_password = "Incorrect current password";
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(new_password)) {
            errors.new_password = "Password must have a minimum of 8 characters, at least one uppercase, one lowercase, one digit, and one special character";
        }
        if (new_password !== conform_password) {
            errors.conform_password = "Passwords does not match";
        }

        if (Object.keys(errors).length === 0) {
            // Submit form or update password
          //  console.log("Form submitted!");
            const id = window.sessionStorage.getItem('id');
            const  lecturerId = id;
            console.log("Id: ", lecturerId)

            const formData ={
               
                id: lecturerId,
                password: new_password
            };

        
            axios.put(`http://localhost:8083/api/v1/lecturer/updatepassword`, formData)
            .then(response => {
                // Handle successful password update
                console.log("Password updated successfully");
                alert("Password Updated successfully");
                // You might want to clear the form fields or show a success message here
            })
            .catch(error => {
                console.error('Error updating password:', error);
                // Handle error while updating password
            })
            .finally(() => {
                this.setState({
                    current_password: "",
                    new_password: "",
                    conform_password: ""
                });
            });
        } else {
            this.setState({ errors });
        }
    };

    render(){

        const { errors } = this.state;

        return(
            <div>
                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>Settings</h4>
                </section>
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div style={{marginTop:'30px',marginLeft:'250px', width:'55%'}}>
                                <div style={{textAlign :'center'}}>
                                    <h5>Change Password</h5>
                                </div>
                                
                                <div style={{marginTop:'25px'}}>
                                    <label>Current Password</label>
                                    <br/>
                                    {/* <input type="password" required/> */}
                                    <input type="password" name="current_password"  value={this.state.current_password} onChange={this.handleChange} required />
                                    {errors.current_password && <span style={{ color: "red" }}>{errors.current_password}</span>}                      

                                </div>
                                <div style={{marginTop:'15px'}}>
                                    <label>New Password</label>
                                    <br/>
                                    {/* <input type="password" required/> */} 
                                    <input type="password" name="new_password" value={this.state.new_password} onChange={this.handleChange} required />
                                    {errors.new_password && <span style={{ color: "red" }}>{errors.new_password}</span>}                    

                                </div>
                                <div style={{marginTop:'15px'}}>
                                    <label>Conform Password</label>
                                    <br/>
                                    {/* <input type="password" required/> */}
                                    <input type="password" name="conform_password" value={this.state.conform_password} onChange={this.handleChange} required />
                                    {errors.conform_password && <span style={{ color: "red" }}>{errors.conform_password}</span>}

                                </div>
                                <div style={{marginTop:'15px'}}>
                                    <input type="submit" value="Update Password" onClick={this.handleSubmit} style={{marginLeft:'100px'}} className="btn btn-outline-primary"/>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <div className="pass-box">
                                <div style={{paddingTop:'20px', marginLeft:'30px'}}>
                                    <b>Password should be</b>
                                    <div style={{marginLeft:'10px'}}>
                                        <div style={{paddingTop:'10px'}}>* Must have a minimum 8 characters.</div>
                                        <div style={{paddingTop:'10px'}}>* Must include atleast one Uppercase.</div>                                   
                                        <div style={{paddingTop:'10px'}}>* Must have a one lowercase.</div>
                                        <div style={{paddingTop:'10px'}}>* include atleast one digit.</div>
                                        <div style={{paddingTop:'10px'}}>* include atleast one special characters.</div>
                                        <div style={{paddingLeft:'20px'}}>eg - .!@#$%^&*()+-=_/?</div>      
                                        
                                    </div>

                                </div>
                        </div>

                    </div>

                </div>
                

            </div>
        )
    }

}

export default Settings;