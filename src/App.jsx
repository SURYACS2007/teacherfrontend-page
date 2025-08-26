import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Student from './Student';
import CreateStudent from './CreateStudent';

// Subject teacher mark entry pages
import Jpstudent from './Jpstudent';
import Createjp from './Createjp';
import Dsstudent from './Dsstudent';
import Createds from './Createds';
import Vccfstudent from './Vccffstudent';
import Createvccf from './Createvccf';
import Daastudent from './Daastudent';
import Createdaa from './Createdaa';
import Createdpco from './Createdpco';
import Dpcostudent from './Dpcostudent';


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
        <Route path="/vccfstudent" element={<Vccfstudent/>} />
        <Route path="/createvccf" element={<Createvccf/>} />
        <Route path="/daastudent" element={<Daastudent/>} />
        <Route path="/createdaa" element={<Createdaa/>} />
        <Route path="/dpcostudent" element={<Dpcostudent/>} />
        <Route path="/createdpco" element={<Createdpco/>} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
