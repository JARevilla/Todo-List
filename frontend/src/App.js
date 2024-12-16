import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Ensure this is the correct import
import RegisterPage from './pages/RegisterPage'; 
import TaskPage from './pages/TaskPage';
import CreateTask from './pages/CreateTask';
import Notifications from './pages/Notifications';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<><TaskPage /><Notifications /></>} />  {/* Display Notifications alongside TaskPage */}
        <Route path="/create" element={<CreateTask />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
