import React, { useState } from "react";
import '../App.css';
import { BiLogOut } from "react-icons/bi";
import {} from 'react-icons';
import { IoMdSettings } from "react-icons/io";
import { FaUser,FaBars,FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { GiBookPile } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { useAuth } from "../AuthContex";


const SideView =({children}) =>{

    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] =useState(true);
    const toggle =()=>setIsOpen(!isOpen);

    const [activeLink, setActiveLink] = useState("/"); 

    const handleLinkClick = (path, action) => {
        setActiveLink(path);
        if (action) {
          action();
        }
      };

      const handleLogout = () => {
        logout();
        navigate('/adminlogin', { replace: true });
      };

    const menuBar=[
        
        {
           path:"/admin/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/admin/students",
            name:"Students",
            icon:<PiStudentFill />
        },
        {
            path:"/admin/lecturers",
            name:"Lecturers",
            icon:<FaUser/>
        },               
        {
            path:"/admin/courses",
            name:"Courses",
            icon:<FaBook />

        },
        {
            path:"/admin/batches",
            name:"Batches",
            icon:<HiUserGroup />
        },
        {
            path: "/admin/all-assessment",
            name:"Assessments",
            icon:<GiBookPile />
        },
        {
            path: "/admin/assessment",
            name:"New Assessment",
            icon:<GiBookPile />
        },
        {
            path: "/admin/assign-assessment",
            name: "Assign Assessment",
            icon:<GiBookPile />
        },            
        {
             path:"/admin/profile",
            // path:"/admin/viewlessons",
            name:"Profile",
            icon:<FaUser />
        },
        {
            // path:"/admin/assign-to-batch",
            path:'/admin/settings',
            name:"Settings",
            icon:<IoMdSettings />
        },
        {
            path:"/adminlogin",
            name:"Logout",
            icon:<BiLogOut />,
            action: handleLogout
        },


    ]

    // const handleLinkClick = (path) => {
    //     setActiveLink(path);
    // };

    return(
        <div>
            
            <div>

                <div className="navbar navbar-expand-sm ">

                    <div style={{marginLeft:isOpen? "00px" : "0px"}} className="bars">
                            <FaBars onClick={toggle} />
                    </div>
                    <div className="head">
                        <h3>Learning Managment System - EduMatrix</h3>
                                
                    </div>

                </div>
                <div className="main">

                    <div style={{width:isOpen? "230px" : "50px"}} className="sidebar">
                        <div className="top_section">
                            
                        </div>
                        {
                            menuBar.map((item,index)=>(
                                <NavLink to={item.path} key={index} className="link" activeclassName="active" onClick={() => handleLinkClick(item.path, item.action)}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen? "block":"none"}} className="linktext">{item.name}</div>

                                    


                                </NavLink>
                                
                            ))
                                            
                        }
                                               
                        
                    </div>

                    <div className="content" style={{width:isOpen? "100%" : "-180px", isOpen:false}}>
                        {children}
                       
                    </div>

                </div>
                
                
            </div>

        </div>    
    )
}

export default SideView;