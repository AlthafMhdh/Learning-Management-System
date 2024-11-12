import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";
import { useState } from "react";
import axios from "axios";



const Studentlogin = () =>{

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() && !password.trim()) {
            setError('Username and password are required.');
            return;
        }
        else if (!username.trim()){
            setError("Please Enter your UserName.");
            return;
        }
        else if (!password.trim()){
            setError("Please Enter your Password.");
            return;
        }
        
        
        
        

        try {
            const response = await axios.post('http://localhost:8083/api/v1/student/logvalid', {
                userName: username,
                password: password,
            });
        

            if (response.data.code === 200) {

                const id = response.data.data;

                login('student',id);
                sessionStorage.setItem('isLoggedIn', '1');
                sessionStorage.setItem('id', id);

                navigate('/student/home');

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
        
            <div style={{display:"inline-flex"}} className="page">
                <div className="login-pg">     </div>
            
            <div className="login" style={{ marginLeft:"20px"}}>
                <div className="Login" style={{textAlign:"center"}}>
                        <div className="login-logo"></div>
                        <div style={{marginTop:"20px"}}>
                        <h5 style={{textAlign:"center",marginTop:"20px"}}>LOGIN TO YOUR ACCOUNT</h5>
                        </div>
                        <form>
                            <br/>
                            <br/>
                            {error && <p style={{color:"red"}}><b>{error}</b></p>}
                            <input className="login-input" type="text" name="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Your Username" required/>
                            <input className="login-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required/>
                            <input type="button" value="Login" onClick={handleLogin}/>
                        </form>
                </div>

            </div>

        </div>
           

    )
}
export default Studentlogin;