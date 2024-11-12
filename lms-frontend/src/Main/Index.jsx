import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosMailOpen } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { BiLogoFacebook } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Index =() =>{

    const coursesRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    // const handleCoursesScroll = (direction) => {
    //     const scrollAmount = 330; // Adjust this value as needed for the scroll amount
    //     const container = coursesRef.current;
    //     if (direction === "left") {
    //         container.scrollLeft -= scrollAmount;
    //     } else {
    //         container.scrollLeft += scrollAmount;
    //     }
    //     setScrollPosition(container.scrollLeft);
    // };

    // const handleCoursesScroll = (direction) => {
    //     const scrollAmount = 330; // Adjust this value as needed for the scroll amount
    //     const container = coursesRef.current;
    //     if (direction === "left") {
    //         container.scrollLeft -= scrollAmount;
    //     } else {
    //         container.scrollLeft += scrollAmount;
    //     }
    //     setScrollPosition(container.scrollLeft);
    // };

    const handleCoursesScroll = (direction) => {
        const scrollAmount = 330; // Adjust this value to match the width of one course item
        const container = coursesRef.current;
        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    const handleCoursesClick = () => {
        // Get the position of the courses section
        const coursesPosition = coursesRef.current.offsetTop;

        // Scroll to the courses section
        window.scrollTo({
            top: coursesPosition,
            behavior: "smooth"
        });
    };

    const handleAboutClick = () => {
        const aboutPosition = aboutRef.current.offsetTop;

        window.scrollTo({
            top: aboutPosition,
            behavior:'smooth'
        });
    }

    const handleContactClick = () => {
        const contactPosition = contactRef.current.offsetTop;

        window.scrollTo({
            top: contactPosition,
            behavior:'smooth'
        });
    }

    return(
        <div>
            <div className="Indexfront" style={{position:'fixed'}} >
                <div className="Index-logo" style={{marginTop:"20px", marginLeft:"70px"}}>
                    
                </div>
                <div style={{paddingLeft:'150px', paddingTop:'25px'}}>
                    <Link style={{marginLeft:'50px', textDecoration: 'none'}} onClick={handleAboutClick}><b>About Us</b></Link>
                    <Link style={{marginLeft:'50px', textDecoration: 'none'}} onClick={handleCoursesClick}><b>Courses</b></Link>
                    <Link style={{marginLeft:'50px', textDecoration: 'none'}} onClick={handleContactClick}><b>Contact Us</b></Link>
                    <Link className="btn btn-success" style={{marginLeft:'430px'}}
                        to="/lecturerlogin"
                    >
                        Lecturer Login
                    </Link>
                    <Link className="btn btn-primary" style={{marginLeft:'50px'}}
                        to="/studentlogin"
                    >
                        Student Login
                    </Link>

                </div>
                
            </div>

            <div>
                <div className="Index-body">
                    
                    <div className="row">
                        <div className="Index-title">
                            <h1 style={{fontSize:'60px',marginLeft:'350px'}}>
                                <b>EduMatrix Institute </b><br/>
                                <b style={{paddingLeft:'100px'}}>Kurunegala</b>
                            </h1>
                            <h4 style={{paddingLeft:'550px'}}>
                                <b>Shaping Minds, Building Futures...</b>
                            </h4>
                            
                            <div style={{paddingTop:'50px',paddingLeft:'200px'}}>
                                <b>"Education is the most powerful weopon for the changing world." </b>
                            </div>

                            <div style={{paddingTop:'150px', paddingLeft:'260px'}}>
                                <h3>
                                    <b>Experience the best quality education with us </b>
                                    <button className="btn btn-primary">Apply Now</button>
                                </h3>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className="courses" ref={coursesRef} style={{ overflowX: 'hidden', whiteSpace:"nowrap" }}>
                <div style={{textAlign:'center', paddingTop:'30px'}}>
                    <h2>Our Courses</h2>
                    <hr style={{ borderTop: '5px solid black', width: '15%', margin: 'auto', marginTop: '10px', marginBottom: '10px' }} />
                    {/* <hr style={{ borderTop: '5px solid black', width: '15%', margin: 'auto', marginBottom: '30px' }} /> */}
                </div>
                {/* <div style={{paddingTop:'50px', display:'inline-flex'}}>
                    <div>
                        <label className="back-contex" onClick={() => handleCoursesScroll('left')}>
                            <IoChevronBack />
                        </label>
                    </div>
                    <div className="course-contex" style={{ flex: '0 0 auto' }} >
                        <div className="Hrm">
                            <div style={{paddingTop:'230px', textAlign:'center'}}>
                                <b>Diploma In Human </b>
                                <br/>
                                <b>Resource Management</b>
                                    
                            </div> 
                        </div>
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="english">
                            <div style={{paddingTop:'240px', textAlign:'center'}}>
                                <b>Diploma In English </b>
                                    
                            </div> 
                        </div>
                        
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="IT">
                            <div style={{paddingTop:'230px', textAlign:'center'}}>
                                <b>Diploma In </b>
                                <b>Information 
                                    <br/>Technology</b>
                                    
                            </div> 
                        </div>
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="HNDBM">
                            <div style={{paddingTop:'225px', textAlign:'center'}}>
                                <b>Higher National Diploma </b><br/>
                                <b>In
                                    <br/>Business Management</b>
                                    
                            </div> 
                        </div>
                    </div>
                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="GD">
                            <div style={{paddingTop:'230px', textAlign:'center'}}>
                            <b>Diploma In </b>
                                <b>Graphic 
                                    <br/>Designing</b>
                                    
                            </div> 
                        </div>
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="CHRM">
                            <div style={{paddingTop:'230px', textAlign:'center'}}>
                            <b>Certificate In Human </b>
                                <br/>
                                <b>Resource Management</b>
                                    
                            </div> 
                        </div>
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="BM">
                            <div style={{paddingTop:'230px', textAlign:'center'}}>
                            <b>Diploma In </b>
                                <b>Business 
                                    <br/>Management</b>
                                    
                            </div> 
                        </div>
                    </div>

                    <div className="course-contex" style={{ flex: '0 0 auto' }}>
                        <div className="Com">
                            <div style={{paddingTop:'225px', textAlign:'center'}}>
                            <b>Higher National Diploma </b><br/>
                                <b>In
                                    <br/>Computing</b>
                                    
                            </div> 
                        </div>
                    </div>


                    <div>
                        <label className="back-contex" onClick={() => handleCoursesScroll('right')} style={{ cursor: 'pointer' }}>
                            <IoChevronForward />
                        </label>
                    </div>
                </div> */}


                <div style={{ paddingTop: '50px', display: 'flex', alignItems: 'center' }}>
                    <div onClick={() => handleCoursesScroll('left')} style={{ cursor: 'pointer', paddingLeft:'50px' }}>
                        <FaChevronLeft size={30} />
                    </div>
                    <div style={{ display: 'flex', overflow: 'hidden', width: '1320px',scrollBehavior: 'smooth' }}>
                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="Hrm">
                                <div style={{ paddingTop: '230px', textAlign: 'center' }}>
                                    <b>Diploma In Human </b><br />
                                    <b>Resource Management</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="english">
                                <div style={{ paddingTop: '240px', textAlign: 'center' }}>
                                    <b>Diploma In English </b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="IT">
                                <div style={{ paddingTop: '230px', textAlign: 'center' }}>
                                    <b>Diploma In </b><br />
                                    <b>Information Technology</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="HNDBM">
                                <div style={{ paddingTop: '225px', textAlign: 'center' }}>
                                    <b>Higher National Diploma </b><br />
                                    <b>In<br />Business Management</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="GD">
                                <div style={{ paddingTop: '230px', textAlign: 'center' }}>
                                    <b>Diploma In </b><br />
                                    <b>Graphic Design</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="CHRM">
                                <div style={{ paddingTop: '230px', textAlign: 'center' }}>
                                    <b>Certificate In Human </b><br />
                                    <b>Resource Management</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="BM">
                                <div style={{ paddingTop: '230px', textAlign: 'center' }}>
                                    <b>Diploma In </b><br />
                                    <b>Business Management</b>
                                </div>
                            </div>
                        </div>

                        <div className="course-contex" style={{ flex: '0 0 auto', width: '330px' }}>
                            <div className="Com">
                                <div style={{ paddingTop: '225px', textAlign: 'center' }}>
                                    <b>Higher National Diploma </b><br />
                                    <b>In<br />Computing</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => handleCoursesScroll('right')} style={{ cursor: 'pointer' }}>
                        <FaChevronRight size={30} />
                    </div>
                </div>


            </div>
            <div className="about" ref={aboutRef}>
                
                <div style={{textAlign:'center', paddingTop:'30px'}}>
                    <h2>About Us</h2>
                    <hr style={{ borderTop: '5px solid black', width: '15%', margin: 'auto', marginTop: '10px', marginBottom: '10px' }} />
                </div>
                
                <div style={{paddingTop:'20px', paddingLeft:'100px', paddingRight:'70px', paddingBottom:'50px', fontSize:'22px'}}>
                    EduMatrix Institute is started in February 8th 2020 in Kurunegala. Currrently we are offering Certificate level, Diploma level and Higher National Diploma level courses. In future we introducing Top-up level and Masters level courses.
                    Currently we are Human Resource Management, Business Management, Graphic Designing, English, Information Technology and some other courses are providing here. 
                    In soon we are introducing Fashion Designing, Mobile Phone Repairing, Compturer Networking & Hardware and some other courses.
                </div>
                
            </div>
            <div className="contact" ref={contactRef}>
                <div style={{textAlign:'center', paddingTop:'30px'}}>
                    <h2>Contact Us</h2>
                    <hr style={{ borderTop: '5px solid black', width: '15%', margin: 'auto', marginTop: '10px', marginBottom: '10px' }} />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-logo" style={{marginTop:"20px", marginLeft:"70px"}}>
                        
                        </div>

                    </div>
                    <div className="col-md-5">
                        <div style={{paddingTop:'30px', paddingLeft:'100px'}}>
                            <h5>Follow Us On</h5>
                            <div style={{paddingTop:'17px', display:"inline-flex"}}>
                            <label style={{ fontSize: "25px", cursor:"pointer", paddingLeft:'15px' }} title="Instagram">
                                <LuInstagram />
                            </label>
                            <label style={{ fontSize: "25px", cursor:"pointer", paddingLeft:'15px' }} title="Facebook">
                                <BiLogoFacebook />
                            </label>
                            <label style={{ fontSize: "25px", cursor:"pointer", paddingLeft:'15px' }} title="Whatsapp">
                                <FaWhatsapp />
                            </label>
                            <label style={{ fontSize: "25px", cursor:"pointer", paddingLeft:'15px' }} title="Youtube">
                                <FiYoutube />
                            </label>
                            <label style={{ fontSize: "25px", cursor:"pointer", paddingLeft:'15px' }} title="LinkedIn">
                                <FaLinkedin />
                            </label>
                        </div>
                    </div>
                        

                    </div>

                    <div className="col-md-3" style={{paddingTop:'40px'}}>

                    <div style={{display:"inline-flex"}}>
                        <label style={{ fontSize: "25px" }}>
                            <FaPhoneVolume />
                        </label>
                        <p style={{paddingLeft:'10px', paddingTop:'10px'}}>
                            <b> +94372251413</b>
                        </p>
                    </div>
                    <br/>
                    <div style={{display:"inline-flex"}}>
                        <label style={{ fontSize: "25px" }}>
                            <IoIosMailOpen />
                        </label >
                        <p style={{paddingLeft:'10px', paddingTop:'10px'}}>
                            <b>edumatrixinstitutekur@gmail.com</b>
                        </p>
                    </div>
                    <br/>
                    <div style={{display:"inline-flex"}}>
                        <label style={{ fontSize: "25px" }}>
                            <IoLocation />
                        </label>
                        <p style={{paddingLeft:'10px', paddingTop:'10px'}}>
                            <b>
                                No 14/2, <br/>
                                Rajaphilla Rd,<br/>
                                Kurunegala.
                            </b>
                        </p>
                    </div>

                    </div>
                </div>
               

            </div>
        </div>
    )
}
export default Index;