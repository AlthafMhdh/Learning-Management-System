
import { BrowserRouter as Router, Route,Routes, Switch, redirect } from 'react-router-dom';
import MainRouter from './Router/MainRouter';
import StudentRouter from './Router/StudentRouter';
import LecturerRouter from './Router/LecturerRouter';
import AdminRouter from './Router/AdminRouter';
import Footerpage from './FooterPage';
import { useAuth } from './AuthContex';



const Routings = () => {
    const { authenticated } = useAuth();

    return (
        <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<MainRouter />} />
        {
          authenticated ? <>
          {/* Routes for logged-in users based on roles */}
          <Route path="/student/*" element={<StudentRouter />} />
          <Route path="/lecturer/*" element={<LecturerRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          </> : ''
        }

          
      </Routes>
      <Footerpage />
    </Router>
    )
}

export default Routings;