import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./SystemManagement.css";

const SystemManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('User');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    getAdmins();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admins");
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdmin = async (id) => { 
    try {
      await axios.delete(`http://localhost:5000/admins/${id}`);
      getAdmins();
      setMessage('Account successfully deleted!');
      setMessageType('delete');
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteAdmin(id);
    }
  };

  const openModal = (admin = null) => {
    setIsEditing(Boolean(admin));
    setCurrentAdmin(admin);
    if (admin) {
      setUsername(admin.username);
      setPassword(admin.password);
      setUsertype(admin.usertype);
    } else {
      setUsername('');
      setPassword('');
      setUsertype('User');
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAdmin(null);
    setUsername('');
    setPassword('');
    setUsertype('User');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      try {
        await axios.patch(`http://localhost:5000/admins/${currentAdmin.id}`, { username, password, usertype });
        getAdmins();
        closeModal();
        setMessage('Account successfully updated!');
        setMessageType('update');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post('http://localhost:5000/admins', { username, password, usertype });
        getAdmins();
        closeModal();
        setMessage('Account successfully added!');
        setMessageType('add');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="system-management-container">
      <h1>System Management</h1>
      <button className="add-admin-btn" onClick={() => openModal()}>
        <ion-icon name="person-add-outline"></ion-icon> Add Account
      </button>
      <div className="table-container">
        <table className="admins-table">
          <thead>
            <tr>
              <th className="admins-th">Username</th>
              <th className="admins-th">Password</th>
              <th className="admins-th">Usertype</th> 
              <th className="admins-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="admins-td">{admin.username}</td>
                <td className="admins-td">{admin.password}</td>
                <td className="admins-td">{admin.usertype}</td>
                <td className="admins-td">
                  <button className="edit-button" onClick={() => openModal(admin)}>
                    <ion-icon name="create-outline" />Edit
                  </button>
                  <button className="delete-button" onClick={() => confirmDelete(admin.id)}>
                    <ion-icon name="trash-outline"></ion-icon>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="admin-modal" overlayClassName="modal-overlay">
        <h2>{isEditing ? "Edit Admin" : "Add Admin"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="usertype">Usertype:</label>
            <select id="usertype" value={usertype} onChange={(e) => setUsertype(e.target.value)} required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button">{isEditing ? "Save" : "Add"}</button>
            <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
      {message && (
        <div className={`message-container ${messageType}`}>
          {message}
          <button className="close-message-btn" onClick={() => setMessage(null)}>X</button>
        </div>
      )}
    </div>
  );
};

export default SystemManagement;