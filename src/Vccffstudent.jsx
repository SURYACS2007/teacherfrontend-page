import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Student.css';

function Vccfstudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('https://teacherbackend-page.onrender.com/vccfstudent')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (roll) => {
    if (window.confirm('Are you sure you want to delete this student VCCF mark?')) {
      axios
        .delete(`https://teacherbackend-page.onrender.com/deletevccf/${roll}`)
        .then(() => {
         
          setStudents(students.map(student =>
            student.ROLL === roll ? { ...student, VCCF: null } : student
          ));
        })
        .catch(err => console.error(err));
    }
  };

 
  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL vccf marks?')) {
      axios
        .delete('https://teacherbackend-page.onrender.com/delete-allvccf')
        .then(() => {
      
          setStudents(students.map(student => ({ ...student, VCCF: null })));
        })
        .catch(err => console.error(err));
    }
  };



  

  return (
    <div className='body'>
      <header className="header">DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY</header>
      <div className="student-container">
        <div className="student-card">
          <Link to="/createvccf" className="btn-add">Add +</Link>
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLL NO</th>
                  <th>VCCF</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.NAME}</td>
                    <td>{student.ROLL}</td>
                    <td>{student.VCCF !== null ? student.VCCF : "--"}</td>
                    <td className="actions-cell">
                      <button className="btn-delete" onClick={() => handleDelete(student.ROLL)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-delete-all" onClick={handleDeleteAll}>Delete all</button>
        </div>
      </div>
    </div>
  );
}

export default Vccfstudent;
