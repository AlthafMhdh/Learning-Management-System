import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap'
import ViewStudent from './Admin/ViewStudent';
import './App.css';
import Footerpage from './FooterPage';
import AdminRouter from './Router/AdminRouter';
import StudentRouter from './Router/StudentRouter';
import Studentlogin from './Main/Studentlogin';
import AdminLogin from './Admin/AdminLogin';
import LecturerLogin from './Lecturer/LecturerLogin';
import LecturerRouter from './Router/LecturerRouter';
import MainRouter from './Router/MainRouter';
import { AuthProvider } from './AuthContex';
import Routings from './Routing';

function App() {
  return (
    
      <AuthProvider>
        <Routings/>
      </AuthProvider>
           
  );
}

export default App;
