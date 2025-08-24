import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Student.css';

function Jpstudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('https://teachers-page.onrender.com/jpstudent')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (roll) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`https://teachers-page.onrender.com/deletejp/${roll}`)
        .then(() => {
          setStudents(students.filter(student => student.ROLL !== roll));
        })
        .catch(err => console.error(err));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL students?')) {
      axios
        .delete('https://teachers-page.onrender.com/delete-alljp')
        .then(() => setStudents([]))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className='body'>
      <header className="header">DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY</header>
      <div className="student-container">
        <div className="student-card">
          <Link to="/createjp" className="btn-add">Add +</Link>
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLL NO</th>
                  <th>JP</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.NAME}</td>
                    <td>{student.ROLL}</td>
                    <td>{student.JP}</td>
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

export default Jpstudent;
