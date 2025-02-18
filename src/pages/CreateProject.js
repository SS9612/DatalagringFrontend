import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";

const CreateProject = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    customerId: '',
    productId: '',
    statusId: '',
    startDate: '',
    endDate: '',
    userId: ''
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.userId) {
      alert("Please select a user.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to create project");
      navigate('/');
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Could not create project. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="customerId" placeholder="Customer ID" onChange={handleChange} required />
        <input type="number" name="productId" placeholder="Product ID" onChange={handleChange} required />
        <input type="number" name="statusId" placeholder="Status ID" onChange={handleChange} required />
        <input type="date" name="startDate" onChange={handleChange} required />
        <input type="date" name="endDate" onChange={handleChange} required />

        {}
        <select name="userId" onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProject;
