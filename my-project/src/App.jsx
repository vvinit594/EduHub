import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentVerification from './pages/StudentVerification';
import CollegeGroups from './pages/CollegeGroups';
import Interaction from './pages/Interaction';
import StudyNotes from './pages/StudyNotes';
import PYQsBank from './pages/PYQsBank';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<StudentVerification />} />
        <Route path="/college-groups" element={<CollegeGroups />} />
        <Route path="/interaction/:collegeName" element={<Interaction />} />
        <Route path="/study-notes/:collegeName" element={<StudyNotes />} />
        <Route path="/pyqs-bank/:collegeName" element={<PYQsBank />} />
        <Route path="/chat/:collegeName" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;