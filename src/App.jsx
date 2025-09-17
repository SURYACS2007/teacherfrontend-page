// App.jsx or main.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import Jpstudent from "./Jpstudent";
import Createjp from "./Createjp";
import Dsstudent from "./Dsstudent";
import Createds from "./Createds";
import Vccfstudent from "./Vccfstudent";
import Createvccf from "./Createvccf";
import Daastudent from "./Daastudent";

// Optional 404 page
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <BrowserRouter> {/* No basename needed unless deployed in subfolder */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/createstudent" element={<CreateStudent />} />
        <Route path="/jpstudent" element={<Jpstudent />} />
        <Route path="/createjp" element={<Createjp />} />
        <Route path="/dsstudent" element={<Dsstudent />} />
        <Route path="/createds" element={<Createds />} />
        <Route path="/vccfstudent" element={<Vccfstudent />} />
        <Route path="/createvccf" element={<Createvccf />} />
        <Route path="/daastudent" element={<Daastudent />} />
        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
