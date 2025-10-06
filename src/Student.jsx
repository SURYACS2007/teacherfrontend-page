import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'; // ✅ NEW
import { saveAs } from 'file-saver'; // ✅ NEW
import './Student.css';

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('https://teacherbackend-page.onrender.com/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (roll) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`https://teacherbackend-page.onrender.com/delete/${roll}`)
        .then(() => {
          setStudents(students.filter(student => student.ROLL !== roll));
        })
        .catch(err => console.error(err));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL students?')) {
      axios
        .delete('https://teacherbackend-page.onrender.com/delete-all')
        .then(() => {
          setStudents([]);
        })
        .catch(err => console.error(err));
    }
  };

  // ✅ Export to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'studentsmark.xlsx');
  };

  return (
    <div className='body'>
      <header className="header">
        DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY
      </header>

      <div className="student-container">
        <div className="student-card">
          <Link to="/create" className="btn-add">
            Add +
          </Link>

          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLL NO</th>
                  <th>JP</th>
                  <th>DS</th>
                  <th>VCCF</th>
                  <th>DAA</th>
                  <th>DPCO</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.NAME}</td>
                    <td>{student.ROLL}</td>
                    <td>{student.JP}</td>
                    <td>{student.DS}</td>
                    <td>{student.VCCF}</td>
                    <td>{student.DAA}</td>
                    <td>{student.DPCO}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(student.ROLL)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Export Button */}
          <button className="btn-export" onClick={handleExportToExcel}>
            Export to Excel
          </button>

          <button className="btn-delete-all" onClick={handleDeleteAll}>
            Delete all
          </button>
        </div>
      </div>
    </div>
  );
}

export default Student;
