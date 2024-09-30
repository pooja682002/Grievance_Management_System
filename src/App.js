import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import GrievanceForm from './components/GrievanceForm';
import GrievanceList from './components/GrievanceList';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
        <Route path="/grievance-form" element={<GrievanceForm loggedInUser={loggedInUser} />} />
        <Route path="/grievances" element={<GrievanceList loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
};

export default App;






