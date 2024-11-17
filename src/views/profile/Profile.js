import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CAvatar, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CAlert } from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const UserProfile = () => {
  const api = helpHttp();
  const url = 'http://localhost:8000/users'; 
  const [visibleSm, setVisibleSm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });

  const loggedInUser  = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (loggedInUser ) {
      fetchUserData(loggedInUser.id);
    }
  }, [loggedInUser ]);

  const fetchUserData = async (id) => {
    const response = await api.get(`${url}/${id}`); 
    if (!response.err) {
      setUserData(response); 
    } else {
      showAlert('Error fetching user data. Please try again.', 'danger');
    }
  };

  const handleEditUser  = async (e) => {
    e.preventDefault();
    const response = await api.put(`${url}/${userData.id}`, userData);
    if (!response.err) {
      setUserData((userData.map((u) => (u.id === userData.id ? response : u))));
      setVisibleSm(false);
      showAlert('User  updated successfully!', 'success');
    } else {
      showAlert('Error updating user. Please try again.', 'danger');
    }
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' });
    }, 3000);
  };

  if (!userData) return <div>Loading...</div>; 

  return (
    <CRow className="justify-content-center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <h3>User Profile</h3>
          </CCardHeader>
          <CCardBody>
            <div className="text-center mb-4">
              <CAvatar src={userData.avatarUrl || './src/assets/images/avatars/8.jpg'} size="lg" className="mb-3" />
              <h4>{userData.name}</h4>
              <p>{userData.role}</p>
            </div>
            <CRow>
              <CCol xs="6">
                <strong>Name:</strong>
                <p>{userData.name}</p>
              </CCol>
              <CCol xs="6">
                <strong>Phone:</strong>
                <p>{userData.phone}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <strong>Email:</strong>
                <p>{userData.email}</p>
              </CCol>
              <CCol xs="6">
                <strong>Address:</strong>
                <p>{userData.address}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <strong>Status:</strong>
                <p>{userData.status}</p>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserProfile;