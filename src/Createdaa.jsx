import React, { useState } from 'react';
import axios from 'axios';
import studentData from './data/students.json';
import './CreateStudent.css';

function Createdaa() {
  const [rows, setRows] = useState(
    studentData.map((student) => ({
      ...student,
      daa: ''
    }))
  );

  const handleChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].daa = value;
    setRows(updatedRows);
  };

  const handleSubmit = async (index) => {
    const student = rows[index];
    const { roll, daa } = student;

    if (!daa) {
      alert('Please enter DAA mark.');
      return;
    }

    try {
      const response = await axios.post(
        'https://teacherbackend-page.onrender.com/createdaa',
        { roll, daa }
      );

      // ✅ Show backend response dynamically
      if (response.data.message) {
        alert(`✅ ${response.data.message} (Roll: ${roll})`);

        const updatedRows = [...rows];
        updatedRows[index].daa = '';
        setRows(updatedRows);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);

      if (error.response?.status === 404) {
        alert(`❌ Roll number ${roll} not found in database`);
      } else {
        alert('❌ Submission failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Students&apos; DAA Marks</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>DAA</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={student.daa}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(index)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Createdaa;
