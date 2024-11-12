import React, { useEffect, useState } from "react";
import '../App.css';
import { BiLogOut } from "react-icons/bi";
import {} from 'react-icons';
import { IoMdSettings } from "react-icons/io";
import { FaUser,FaBars,FaTh } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { GiBookPile } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaSquareCheck } from "react-icons/fa6";
import { useAuth } from "../AuthContex";


const SideBar =({children}) =>{

    const [isOpen, setIsOpen] =useState(true);
    const toggle =()=>setIsOpen(!isOpen);

    const [activeLink, setActiveLink] = useState("/"); // Default active link

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isAuthenticated } = useAuth();

    const handleLinkClick = (path, action) => {
        setActiveLink(path);
        if (action) {
          action();
        }
      };

      const handleLogout = () => {
        logout();
        navigate('/studentlogin', { replace: true });
      };

      useEffect(() => {
        const handleBeforeUnload = (event) => {
          // Check if the user is authenticated or perform any other condition
          if (!isAuthenticated) {
            // Block navigation and show a confirmation dialog
            const message = "You are leaving the page. Your changes may not be saved.";
            event.returnValue = message; // Standard for most browsers
            return message; // For some older browsers
          }
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          // Cleanup the event listener when the component unmounts
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, [isAuthenticated]);

    const menuBar=[
        
        {
            path:"/student/home",
            name:"Home",
            icon:<IoMdHome />
        },
        {
            path:"/student/pending-assessments",
            name:"To Do",
            icon:<FaSquareCheck/>
        },
        {
            path:"/student/mycourses",
            name:"MyCourses",
            icon:<GiBookPile/>
        }, 
        {
            path:"/student/profile",
            name:"Profile",
            icon:<FaUser />
        },
        {
            path:"/student/settings",
            name:"Settings",
            icon:<IoMdSettings />
        },
        {
            // path:"/courseview",
            path:"/studentlogin",
            name:"Logout",
            icon:<BiLogOut />,
            action: handleLogout,
        },


    ]


    return(
        <div>
            
            <div>

                <div className="navbar navbar-expand-sm ">

                    <div style={{marginLeft:isOpen? "00px" : "0px"}} className="bars">
                            <FaBars onClick={toggle} />
                    </div>
                    <div className="head">
                        <h3>Learning Managment System</h3>
                                
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

export default SideBar;