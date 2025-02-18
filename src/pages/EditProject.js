import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from "../config";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    statusId: '',
    startDate: '',
    endDate: '',
    userId: ''
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/${id}`)
      .then(response => response.json())
      .then(data => {
        const formattedStartDate = data.startDate ? data.startDate.split('T')[0] : '';
        const formattedEndDate = data.endDate ? data.endDate.split('T')[0] : '';
        setForm({ ...data, startDate: formattedStartDate, endDate: formattedEndDate });
      })
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

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
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to update project");
      navigate('/');
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Could not update project. Check the console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <input type="number" name="statusId" value={form.statusId} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">User</label>
          <select name="userId" value={form.userId} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/')} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
