import { useState,useContext,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup, Login } from './components/index.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { VisitorDashboard, AdminDashboard, SecurityDashboard, EmployeeDashboard } from './dashboards/index.js'
import { AuthContextProvider, AuthContext } from './context/authcontext';
import { RegistrationForm} from './visitorComponents/index.js'
import ApprovedRequests from './employeeComponents/ApprovedRequests'
import VisitorsInside from './securityComponents/VisitorsInside'
import {ApprovedVisitors,Employees,Security,VisitorsInsideA,AddStaff} from './adminComponents/index.js'

function App() {
  function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
  }

    useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/visitordashboard" element={
            <PrivateRoute>
              <VisitorDashboard />
            </PrivateRoute>
          } />
          <Route path="/visitordashboard/registrationForm" element={
            <PrivateRoute>
              <RegistrationForm />
            </PrivateRoute>
          } />
         
          <Route path="/admindashboard" element={<PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>} />
          <Route path="/admindashboard/addstaff" element={<PrivateRoute>
            <AddStaff />
          </PrivateRoute>} />
          <Route path="/admindashboard/employees" element={<PrivateRoute>
            <Employees />
          </PrivateRoute>} />
          <Route path="/admindashboard/security" element={<PrivateRoute>
            <Security />
          </PrivateRoute>} />
          <Route path="/admindashboard/visitorsinside" element={<PrivateRoute>
            <VisitorsInsideA />
          </PrivateRoute>} />
          <Route path="/admindashboard/approvedvisitors" element={<PrivateRoute>
            <ApprovedVisitors />
          </PrivateRoute>} />

          <Route path="/securitydashboard" element={<PrivateRoute>
            <SecurityDashboard />
          </PrivateRoute>} />
          <Route path="/securitydashboard/visitorsinside" element={<PrivateRoute>
            <VisitorsInside />
          </PrivateRoute>} />
          <Route path="/employeedashboard" element={<PrivateRoute>
            <EmployeeDashboard />
          </PrivateRoute>} />
           <Route path="/employeedashboard/approvedrequests" element={
            <PrivateRoute>
              <ApprovedRequests />
            </PrivateRoute>
          } />
           <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
