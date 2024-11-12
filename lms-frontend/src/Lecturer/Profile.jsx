import axios from "axios";
import { Component } from "react";
import maleImage from '../Asset/male.jpg';
import femaleImage from '../Asset/female.jpg';
import Modal from 'react-modal';
import { IoMdCloseCircle } from "react-icons/io";


class Profile extends Component{


    constructor(props) {
        super(props);
        this.state = {           
            profileData:{
                lecturerId:"",
                lecId:"",
                title:"",
                lecturerName:"",
                nic:"",
                email:"",
                address:"",
                dob:"",
                phoneNumber:"",
                profileImage:"",
                registredDate:"",
                qualification:"",
                experience:""

            },
            isUploadModalOpen: false,
            isUpdateModalOpen: false,
            selectedProfileImage: null,
            lecturerIdForUpload: null,
            uploadedImage: null,
            updatedProfile: {
                lecturerName: "",
                email: "",
                nic: "",
                dob: "",
                phoneNumber: "",
                address: "",
                qualification:"",
                experience:"",
            }, 
        };
        this.openUploadModal = this.openUploadModal.bind(this);
        this.closeUploadModal = this.closeUploadModal.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
    }

    openUploadModal(lecturerId, profileImage) {
        //const profileData = this.state;
        const base64Image = profileImage ? `data:image/jpeg;base64,${profileImage}` : null;

        let profileImageSrc = base64Image || 
        (this.state.profileData.title === "Mr" ? maleImage : this.state.profileData.title === "Miss" ? femaleImage : null);
        console.log("Profile image source:", profileImageSrc);
        this.setState({
            isUploadModalOpen: true,
            selectedProfileImage: profileImageSrc,
            lecturerIdForUpload: lecturerId,
        });
    }

    // openUploadModal() {
    //     this.setState({ isUploadModalOpen: true });
    // }

    closeUploadModal() {
        this.setState({ isUploadModalOpen: false  });
    }

    openUpdateModal() {
        //this.setState({ isUpdateModalOpen: true });
        const { lecturerName, email, nic, dob, phoneNumber, address,qualification, experience } = this.state.profileData;
        this.setState({
            isUpdateModalOpen: true,
            updatedProfile: {
                lecturerName,
                email,
                nic,
                dob,
                phoneNumber,
                address,
                qualification,
                experience
            }
        });
    }

    closeUpdateModal() {
        this.setState({ isUpdateModalOpen: false });
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

    handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
    
        reader.onloadend = () => {
          this.setState({
            selectedProfileImage: reader.result, // Store the uploaded image in state
            uploadedImage: file
          });
        };
    
        if (file) {
          reader.readAsDataURL(file); // Read the uploaded file as data URL
        }
    };

    uploadImageToDatabase = () => {
        
        const { lecturerId, profileImage } = this.state.profileData;
        const { selectedProfileImage, uploadedImage } = this.state;

        if (selectedProfileImage && selectedProfileImage !== profileImage) {

            const formData = new FormData();
            formData.append('imageFile', uploadedImage);
            console.log("Image : ",uploadedImage);
            
            axios.put('http://localhost:8083/api/v1/lecturer/upload/'+lecturerId, formData)
                .then(response => {
                console.log('Image uploaded successfully');
                alert("Profile Image uploaded successfully");
                // Update the profile image state with the uploaded image
                this.setState(prevState => ({
                    profileData: {
                        ...prevState.profileData,
                        profileImage: prevState.uploadedImage
                    }
                }));
                this.closeUploadModal();
                this.componentDidMount();
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                alert("Error uploading image")               
            });
        } else {
            this.closeUploadModal();
        }
    };
    
    revertToPreviousImage = () => {
        // Revert back to the previous profile image
        this.setState({
            selectedProfileImage: null 
        });
        this.closeUploadModal();
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
          updatedProfile: {
            ...prevState.updatedProfile,
            [name]: value,
          },
        }));
    };    
    
    handleUpdateProfile = () => {
        const updatedProfileData = this.state.updatedProfile;
        const { lecturerId } = this.state.profileData;


    axios.put('http://localhost:8083/api/v1/lecturer/update/'+ lecturerId, updatedProfileData)
        .then(response => {
            console.log('Profile updated successfully');
            alert("Profile updated successfully");
            this.closeUpdateModal();
            this.componentDidMount();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert("Error updating profile")
        });
    };

      formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
        let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
    };

    render(){

        const {
            lecturerId,
            lecId,
            title,
            lecturerName,
            nic,
            email,
            address,
            dob,
            phoneNumber,
            profileImage,
            registredDate,
            qualification,
            experience

        } = this.state.profileData;


        const base64Image = profileImage ? `data:image/jpeg;base64,${profileImage}` : null;

        let profileImageSrc = base64Image || 
        (title === "Mr" ? maleImage : title === "Miss" ? femaleImage : null);


        return(
            <div>
                <section className="formheader">
                        <h4 style={{paddingLeft:"50px"}}>My Profile</h4>
                </section>
                <div className="profile" style={{marginLeft:"570px"}}>
                     <img src={profileImageSrc} alt="Profile" />

                </div>
                <div className="profiledetails">
                    <div className="row" style={{marginTop:'50px'}}>
                        <div className="col-md-1">

                        </div>
                        <div className="col-md-5">

                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>lecturer Id</th>
                                        <td>:</td>
                                        <td>{lecId}</td>
                                    </tr>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>:</td>
                                        <td>{title}. {lecturerName}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of Birth </th>
                                        <td>:</td>
                                        <td>{new Date(dob).toLocaleDateString('en-GB')}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>:</td>
                                        <td>{address} </td>
                                    </tr>
                                    <tr>
                                        <th>Registered Date</th>
                                        <td>:</td>
                                        <td>{new Date(registredDate).toLocaleDateString('en-GB')}</td>
                                    </tr>

                                </tbody>
                                

                            </table>
                        </div>

                        <div className="col-md-5">

                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <td>:</td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <th>NIC</th>
                                        <td>:</td>
                                        <td>{nic}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone Number</th>
                                        <td>:</td>
                                        <td>{phoneNumber} </td>
                                    </tr>
                                    <tr>
                                        <th>Qualification</th>
                                        <td>:</td>
                                        <td>{qualification} </td>
                                    </tr>
                                    <tr>
                                        <th>Experience</th>
                                        <td>:</td>
                                        <td>{experience} </td>
                                    </tr>

                                </tbody>
                                

                            </table>
                        </div>

                            <div style={{display:"inline-flex"}}>
                                <div style={{marginLeft:"450px", marginTop:"50px"}}>
                                    {/* <button className="btn btn-primary" onClick={this.openUploadModal(lecturerId, profileImageSrc)}>Upload Profile Image</button> */}
                                    <button className="btn btn-primary" onClick={() => this.openUploadModal(lecturerId, profileImage)}>Upload Profile Image</button>


                                    <Modal
                                        isOpen={this.state.isUploadModalOpen}
                                        // onRequestClose={this.closeUploadModal}
                                        onRequestClose={this.revertToPreviousImage}
                                        overlayClassName="overlay"
                                        style={{
                                          content: {
                                            top: '50%',
                                            left: '50%',
                                            right: 'auto',
                                            bottom: 'auto',
                                            marginRight: '-50%',
                                            transform: 'translate(-50%, -50%)',
                                            height: '450px',
                                            width: '30%',
                                            marginLeft:'50px',
                                            
                                          }
                                        }}                                    
                                    >
                                        <div style={{width:'100%' , display:'inline-flex'}}>
                                            <h4 style={{marginLeft:'80px'}}>Upload Profile Image</h4>
                                            <label style={{paddingLeft:'85px',cursor:'pointer'}}><IoMdCloseCircle size={20} onClick={this.revertToPreviousImage}
                                            // onClick={this.closeUploadModal}
                                            /></label>
                                        </div>
                                        <div>

                                            <div>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={this.handleImageChange}
                                                />
                                                <label htmlFor="fileInput" className="profile1" style={{ cursor:'pointer' }}>
                                                    <img src={this.state.selectedProfileImage} alt="Profile" />
                                                    {/* <img src={this.state.selectedProfileImage || maleImage} alt="Profile" /> */}

                                                </label>
                                            </div>

                                            

                                            <div style={{marginTop:"30px", marginLeft:"150px"}}>
                                                <button className="btn btn-primary" onClick={this.uploadImageToDatabase}>Upload Image</button>
                                            </div>

                                        </div>

                                    </Modal>
                                    

                                </div>
                                
                                <div style={{marginLeft:"40px",marginTop:'50px'}}>
                                    <button className="btn btn-primary" onClick={this.openUpdateModal}>Update Profile</button>

                                    <Modal
                                        isOpen={this.state.isUpdateModalOpen}
                                        onRequestClose={this.closeUpdateModal}
                                        overlayClassName="overlay"
                                        style={{
                                          content: {
                                            top: '50%',
                                            left: '50%',
                                            right: 'auto',
                                            bottom: 'auto',
                                            marginRight: '-50%',
                                            transform: 'translate(-50%, -50%)',
                                            height: '640px',
                                            width: '40%',
                                            marginLeft:'50px',
                                            
                                          }
                                        }}                                    
                                    >
                                        <div style={{width:'100%' , display:'inline-flex'}}>
                                            <h4 style={{marginLeft:'160px'}}>Update Profile Details</h4>
                                            <label style={{paddingLeft:'150px',cursor:'pointer'}}><IoMdCloseCircle size={20} onClick={this.closeUpdateModal}/></label>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-1">

                                            </div>
                                            <div className="col-md-10">
                                                <table className="table table-sm">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Full Name</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="lecturerName"
                                                                    value={this.state.updatedProfile.lecturerName}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Email</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="email"
                                                                    // value={email}
                                                                    value={this.state.updatedProfile.email}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>NIC</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="nic"
                                                                    value={this.state.updatedProfile.nic}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Date of Birth</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="date" 
                                                                    className="form-control form-control-sm" 
                                                                    name="dob"
                                                                    value={this.formatDate(this.state.updatedProfile.dob)}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Phone Number</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="phoneNumber"
                                                                    value={this.state.updatedProfile.phoneNumber}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Address</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="address"
                                                                    value={this.state.updatedProfile.address}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                            <tr>
                                                            <td style={{paddingTop:'15px'}}>Qualification</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="phoneNumber"
                                                                    value={this.state.updatedProfile.qualification}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{paddingTop:'15px'}}>Experience</td>
                                                            <td style={{paddingTop:'15px'}}>:</td>
                                                            <td>
                                                                <input type="text" 
                                                                    className="form-control form-control-sm" 
                                                                    name="address"
                                                                    value={this.state.updatedProfile.experience}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                        <div style={{marginTop:'20px', marginLeft:'240px'}}>
                                            <button className="btn btn-success" style={{ paddingLeft:'20px', paddingRight:'20px'}} onClick={this.handleUpdateProfile}>Update</button>
                                        </div>

                                    </Modal>
                                </div>
                                
                            </div>
                            

                        
                        

                        

                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Profile;