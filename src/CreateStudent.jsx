import React, { useState } from 'react';
import axios from 'axios';
import studentData from './data/students.json';
import './CreateStudent.css';
function CreateStudent() {
  const [rows, setRows] = useState(
    studentData.map((student) => ({
      ...student,
      jp: '',
      ds: '',
      vccf: '',
      daa: '',
      dpco: ''
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async (index) => {
    const student = rows[index];
    const { name, roll, jp, ds, vccf, daa, dpco } = student;

    // Check if at least one mark is entered
    if (!jp && !ds && !vccf && !daa && !dpco) {
      alert('Please enter at least one mark.');
      return;
    }

    try {
      const response = await axios.post('https://teacherbackend-page.onrender.com/create', {
        name,
        roll,
        jp: jp || '',
        ds: ds || '',
        vccf: vccf || '',
        daa: daa || '',
        dpco: dpco || ''
      });

      if (response.data.message === 'Success') {
        alert("Successfully submitted marks for ${name}");
        
        const updatedRows = [...rows];
        updatedRows[index] = {
          ...updatedRows[index],
          jp: '',
          ds: '',
          vccf: '',
          daa: '',
          dpco: ''
        };
        setRows(updatedRows);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Students' Marks</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>JP</th>
            <th>DS</th>
            <th>VCCF</th>
            <th>DAA</th>
            <th>DPCO</th>
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
                  value={student.jp}
                  onChange={(e) => handleChange(index, 'jp', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={student.ds}
                  onChange={(e) => handleChange(index, 'ds', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={student.vccf}
                  onChange={(e) => handleChange(index, 'vccf', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={student.daa}
                  onChange={(e) => handleChange(index, 'daa', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={student.dpco}
                  onChange={(e) => handleChange(index, 'dpco', e.target.value)}
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


export default CreateStudent; 