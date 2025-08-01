import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';

import { SignupPage } from './Pages/Signup';

import { Signin } from './Pages/Signin';

import SharedContent from './pages/SharedContent';

// import SharedBrain from './Pages/SharedBrain';





function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Navigate to="/dashboard"  />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/signin" element={<Signin />} />

         <Route path="/share/:hash" element={<SharedContent />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </Router>

  );

}



export default App;