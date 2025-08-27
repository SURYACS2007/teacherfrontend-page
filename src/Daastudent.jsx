import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Student.css';

function Daastudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('https://teacherbackend-page.onrender.com/daastudent')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (roll) => {
    if (window.confirm('Are you sure you want to delete this student DAA mark?')) {
      axios
        .delete(`https://teacherbackend-page.onrender.com/deletedaa/${roll}`)
        .then(() => {
         
          setStudents(students.map(student =>
            student.ROLL === roll ? { ...student, DAA: null } : student
          ));
        })
        .catch(err => console.error(err));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL students?')) {
      axios
        .delete('https://teacherbackend-page.onrender.com/delete-alldaa')
        .then(() => setStudents([]))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className='body'>
      <header className="header">DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY</header>
      <div className="student-container">
        <div className="student-card">
          <Link to="/createdaa" className="btn-add">Add +</Link>
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLL NO</th>
                  <th>DAA</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.NAME}</td>
                    <td>{student.ROLL}</td>
                    <td>{student.DAA !== null ? student.DAA : "--"}</td>
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

export default Daastudent;
