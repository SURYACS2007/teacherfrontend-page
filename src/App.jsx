import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Student from './Student';
import CreateStudent from './CreateStudent';

// Subject teacher mark entry pages
import Jpstudent from './Jpstudent';
import Createjp from './Createjp';
import Dsstudent from './Dsstudent';
import Createds from './Createds';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Class adviser routes */}
        <Route path="/students" element={<Student />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/jpstudent" element={<Jpstudent/>} />
        <Route path="/createjp" element={<Createjp/>} />
        <Route path="/dsstudent" element={<Dsstudent/>} />
        <Route path="/createds" element={<Createds/>} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
