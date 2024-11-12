import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";
import { useState } from "react";



const AdminLogin = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const id =1;

        // Simulate server-side validation
        if (username === 'admin' && password === 'admin123') {
          login('admin',id); 
                sessionStorage.setItem('isLoggedIn', '1');
                sessionStorage.setItem('id', id);
           navigate('/admin/dashboard');
        } else {
          setError('Invalid login credentials');
        }
    };

    return(
        <div>
            <div className="Admin-login-front">
                <div className="Admin-logo" style={{marginTop:"20px", marginLeft:"70px"}}>
                    
                </div>
                <div style={{paddingLeft:'100px', paddingTop:'30px'}}>
                    <h2>EduMatrix Institute LMS</h2>
                </div>
            </div>

            <div style={{marginTop:'30px', marginLeft:'650px'}}>
                    <h4>Admin Login Potral</h4>
            </div>
            <div className="Admin-login">

                <form onSubmit={handleLogin}>
                    <label style={{marginTop:'40px',marginLeft:'85px' ,width:'70%'}}><b>UserName</b></label>
                    <br/>
                    <input type="text" placeholder="Enter UserName" required style={{marginLeft:'85px' ,width:'70%'}} value={username} onChange={(e) => setUserName(e.target.value)}/>

                    <label style={{marginTop:'20px',marginLeft:'85px' ,width:'70%'}}><b>Password</b></label>
                    <br/>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{marginLeft:'85px' ,width:'70%'}} />

                    <br/>
                    <input type="button" className="btn btn-success" onClick={handleLogin} value="Login" style={{width:'40%',marginTop:'25px' ,paddingLeft:'20px', paddingRight:'20px', marginLeft:'175px'}} />
                </form>

            </div>
        </div>
    )

}
export default AdminLogin;