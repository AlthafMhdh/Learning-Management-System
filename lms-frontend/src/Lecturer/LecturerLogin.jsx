import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";
import axios from "axios";


const LecturerLogin = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8083/api/v1/lecturer/logvalid', {
                userName: username,
                password: password,
            });
        

            if (response.data.code === 200) {

                const id = response.data.data;

                login('lecturer',id);
                sessionStorage.setItem('isLoggedIn', '1');
                sessionStorage.setItem('id', id);

                navigate('/lecturer/home');

            } else {
                setError('Error during login. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid login credentials');
            } else {
                setError('Error during login. Please try again.');
            }
            console.error('Login error:', error);
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
                    <h4>Lecturer Login Potral</h4>
            </div>
            <div className="Admin-login">

                <form>
                    <div style={{color:"red",paddingTop:'25px',marginLeft:'180px'}}>
                    {error && <p><b>{error}</b></p>}
                    </div>
                
                    <label style={{marginTop:'25px',marginLeft:'85px' ,width:'70%'}}><b>UserName</b></label>
                    <br/>
                    <input type="text" placeholder="Enter UserName" value={username} required onChange={(e) => setUserName(e.target.value)} style={{marginLeft:'85px' ,width:'70%'}}/>

                    <label style={{marginTop:'20px',marginLeft:'85px' ,width:'70%'}}><b>Password</b></label>
                    <br/>
                    <input type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{marginLeft:'85px' ,width:'70%'}} />

                    <br/>
                    <input type="button" className="btn btn-success" onClick={handleLogin} value="Login" style={{width:'40%',marginTop:'25px' ,paddingLeft:'20px', paddingRight:'20px', marginLeft:'175px'}} />
                </form>

            </div>
        </div>
    )

}
export default LecturerLogin;