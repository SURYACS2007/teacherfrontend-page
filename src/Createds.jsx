import React, { useState } from 'react';
import axios from 'axios';
import studentData from './data/students.json';
import './CreateStudent.css';

function Createds() {
  const [rows, setRows] = useState(
    studentData.map((student) => ({
      ...student,
      ds: ''
    }))
  );

  const handleChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].ds= value;
    setRows(updatedRows);
  };

  const handleSubmit = async (index) => {
    const student = rows[index];
    const { roll, ds } = student;

    if (!ds) {
      alert('Please enter DS mark.');
      return;
    }

    try {
      const response = await axios.post('https://teacherbackend-page.onrender.com/createds', {
        roll,
        ds
      });

      if (response.message === 'Ds mark stored successfully') {
        alert(`✅ DS mark submitted for Roll: ${roll}`);

        const updatedRows = [...rows];
        updatedRows[index].ds = '';
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
      <h2>Enter Students&apos; DS Marks</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>DS</th>
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
                  value={student.ds}
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

export default Createds;
