import { Component } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";


const BackButton = () => {
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate("/student/mycourses");
    };
  
    return (
      <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
        <IoArrowBack size={27} />
      </label>
    );
  };

  
    const ForwardButton =() => {
        const navigate = useNavigate();

        const handleClickSubject = () =>{
            navigate("/student/subject");
        }

        return (
            <div style={{ cursor: 'pointer' }}  onClick={handleClickSubject}>Subject Code - Subject Name</div>  
        );
    };

class CourseView extends Component{
    

    constructor(props) {
        super(props);
        this.state = {
          
        };
      }

    componentDidMount(){
        const id = window.sessionStorage.getItem('id');
        const studentId = id;

        console.log("your id student is", studentId);
    }

    render(){


        return(

            <div>
                <section className="formheader1">
                    <BackButton />
                    <h4 style={{paddingLeft:"150px"}}>Code - Course Name</h4>
                </section>

                <div style={{paddingLeft:"50px", paddingTop:"50px"}}>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="lesson-box"  >
                                
                                <div  style={{position: 'fixed',paddingLeft:'25px', paddingTop:'5px', display:'inline-flex', color:"blue", fontWeight: 'bold'}}>
                                     <ForwardButton/>                       
                                </div>
                            </div>
                            <br/>
                            <div className="lesson-box"  >
                                
                                <div  style={{position: 'fixed',paddingLeft:'25px', paddingTop:'5px', display:'inline-flex',color:"blue", fontWeight: 'bold'}}>
                                     <ForwardButton/>                       
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}
export default CourseView;