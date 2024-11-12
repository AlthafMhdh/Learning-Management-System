import React, { Component, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/admin/viewlessons");
    };
  
    return (
      <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
        <IoArrowBack size={27} />
      </label>
    );
  };

class NewLesson extends Component{

    constructor(props) {
        super(props);
        this.state = {
            lesson_name: "",
            subject_name: "",
            content_type: "",
            content_name: "",
            fileName: null,
          errors: {
            lesson_name: "",
            subject_name: "",
            content_type: "",
            content_name: "",
            fileName:"",
          },
          subjects:[]
        };
        this.fileInputRef = React.createRef();
        
    }
    
    handleChange =(event)=>{
        const {name,value} =event.target;
        this.setState({[name]:value});
    };

    componentDidMount() {
       
        axios.get('http://localhost:8083/api/v1/subject/allsubjects') 
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    this.setState({ subjects: response.data.data });
                } else {
                    console.error('Invalid data format from the backend:', response.data);
                }
            })
        
            .catch(error => {
                console.error('Error fetching courses data:', error);
            });
    }

    validateform =()=>{
        const {lesson_name, subject_name, content_name,content_type, fileName}=this.state;
        const errors = {};

        //Form Validation methods
        if (!lesson_name) {
            errors.lesson_name="Lesson Name is Required.";
        }

        if (!subject_name) {
            errors.subject_name="Please select the Subject Name.";
        }

        if (!content_name) {
            errors.content_name="Content Name is Required.";
        }

        if (!content_type) {
            errors.content_type = "Please select the Content Type.";
        } 
        
        if (!fileName) {
            errors.fileName="Please choose the content file.";
        }

        // Check if there are any errors
        const isValid = Object.values(errors).every((error) => error === "");

        this.setState({ errors });
        return isValid;

    }

    handleSubmit = (Lesson) => {
        console.log("New Lesson submitted:", Lesson);
    };
   
    submitform = ()=>{
        
        const isValid = this.validateform();
        if (isValid) {
            // const LessonData = {

            //     lessonName : this.state.lesson_name,
            //     subjectid : this.state.subject_name,
            //     contentName : this.state.content_name,
            //     contentType : this.state.content_type,
            //     filepath : this.state.fileName
                  
            //   };

            const formData = new FormData();
            formData.append('docFile', this.state.fileName); // Append the file to formData
            formData.append('lessonName', this.state.lesson_name);
            formData.append('subjectId', this.state.subject_name);
            formData.append('contentName', this.state.content_name);
            formData.append('contentType', this.state.content_type);
          
          axios.post('http://localhost:8083/api/v1/lesson/save', formData)
                  .then(response => {
                      alert(response.data.data);
                  })
                  .catch(error => {
                      console.error('Failed to add Lesson', error);
                      // Optionally handle failure (e.g., show an error message)
                      alert("Failed to add Lesson");
                  })
                  .finally(() => {
                      this.setState({
                          lesson_name: "",
                          subject_name: "",
                          content_name: "",
                          content_type: "",
                          fileName: "",
                        });
                        if (this.fileInputRef.current) {
                            this.fileInputRef.current.value = "";
                        }
                  });
          }    
      };


    render(){

        const { errors } = this.state;
        return(
            <div>

                <section className="formheader1">
                    <BackButton />
                    <h4 style={{paddingLeft:"50px"}}> Add New Lesson</h4>
                </section>

                <div className="Assessment-add">

                    <div style={{marginTop:'30px'}}>
                        <div style={{display:'inline-flex', marginLeft:'150px'}}>
                            <label style={{width:'100%', paddingTop:'15px'}}><b>Lesson Name</b></label>
                            <div style={{width:'150%', marginLeft:"46px"}}>
                                <input type="text"  name="lesson_name" onChange={this.handleChange} value={this.state.lesson_name} style={{width:'205%', marginLeft:'0px', paddingLeft:'15px'}}/>
                            </div>
                            {/* <div className="error-message">{errors.lesson_name}</div> */}
                            
                        </div>
                        <div className="error-message" style={{marginLeft:'330px'}}>{errors.lesson_name}</div>
                        
                        <div style={{display:'inline-flex', marginLeft:'150px'}}>
                            <label style={{width:'100%', paddingTop:'15px'}}><b>Subject Name</b></label>
                            <div style={{width:'150%',marginLeft:'0px'}}>
                                {/* <input type="text" name="subject-name"  style={{width:'195%', marginLeft:'0px', paddingLeft:'10px'}}/> */}
                            
                                <select name="subject_name" id="subject-name"  onChange={this.handleChange} value={this.state.subject_name} style={{width:"150%", padding: "6px 10px", paddingLeft:'50px',paddingRight: "0px", boxSizing: "border-box", height:'38px', marginTop:'8px'}}>
                                    <option value="">Select the Subject</option>
                                        {this.state.subjects.map((subject) => (
                                    <option key={subject.subjectId} value={subject.subjectId}>
                                         {subject.subjectName}
                                    </option> ))}
                                </select>                            
                            </div>
                            {/* <div className="error-message">{errors.subject_name}</div> */}
                            
                        </div>
                        <div className="error-message" style={{marginLeft:'330px'}}>{errors.subject_name}</div>
                        
                        <div style={{display:'inline-flex', marginLeft:'150px'}}>
                            <label style={{width:'100%', paddingTop:'15px'}}><b>Content Name</b></label>
                            <div style={{width:'150%', marginLeft:'45px'}}>
                                <input type="text" name="content_name" onChange={this.handleChange} value={this.state.content_name} style={{width:'203%', marginLeft:'0px', paddingLeft:'10px'}}/>
                            </div>
                            {/* <div className="error-message">{errors.content_name}</div> */}

                        </div>
                        <div className="error-message" style={{marginLeft:'330px'}}>{errors.content_name}</div>
                        
                        <div style={{display:'inline-flex', marginLeft:'150px'}}>
                            <label style={{width:'100%', paddingTop:'15px'}}><b>Content Type</b></label>
                            
                            <div style={{width:'150%', marginLeft:'15px'}}>
                                <select name="content_type"  onChange={this.handleChange} value={this.state.content_type} style={{width:"165%", padding: "6px 10px", paddingLeft:'55px',paddingRight: "50px", boxSizing: "border-box", height:'38px', marginTop:'8px'}}>
                                    <option value=""> Select the content type </option>
                                    <option value="Lecture Notes ">Lecture Notes</option>
                                    <option value="Lecture Presentation ">Lecture Presentation</option>
                                    <option value="Lecture Video ">Lecture Video</option>
                                    <option value="Assessments">Assessments</option>
                                    <option value="Quiz">Quiz</option>
                                </select>
                            </div>                                                    
                            
                        </div>
                        <div className="error-message" style={{marginLeft:'330px'}}>{errors.content_type}</div>
                                         

                    </div>

                    <div className="new-content-add" style={{display:"inline-flex"}}>
                        <label style={{paddingTop:'15px', paddingLeft:'90px'}}>
                            <b>Add Content File</b>
                        </label>
                        <div style={{paddingTop:'15px', paddingLeft:'90px', color:'blue'}}>
                            <input type="file" ref={this.fileInputRef} onChange={(e) => this.setState({ fileName: e.target.files[0] })} />
                        </div>                                                                     
                    </div>
                    <div className="error-message" style={{marginLeft:'330px'}}>{errors.fileName}</div>

                    <div style={{paddingTop:'40px', paddingLeft:'370px'}}>
                        <button className="btn btn-primary" onClick={this.submitform}>Add New Lesson</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default NewLesson;