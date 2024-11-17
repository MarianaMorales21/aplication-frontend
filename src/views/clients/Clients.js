import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CNavbar,
  CContainer,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Clients = () => {
  const [visibleNC, setVisibleNC] = useState(false);
  const api = helpHttp();
  const urlClients = 'http://localhost:8000/client';
  const urlUsers = 'http://localhost:8000/users';
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [client, setClient] = useState({
    type: '',
    user_id: '', 
  });
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
  const [clientIdToDelete, setClientIdToDelete] = useState(null)
  const [visibleSm, setVisibleSm] = useState(false)
  useEffect(() => {
    fetchClients();
    fetchUsers();
  }, []);

  const fetchClients = async () => {
    const response = await api.get(urlClients);
    if (!response.err) {
      setClients(response);
    } else {
      showAlert('Error fetching clients. Please try again.', 'danger');
    }
  };

  const fetchUsers = async () => {
    const response = await api.get(urlUsers);
    if (!response.err) {
      setUsers(response);
    } else {
      showAlert('Error fetching users. Please try again.', 'danger');
    }
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' });
    }, 3000);
  };

  const handleAddClient = async (e) => {
    e.preventDefault(); 

    const clientResponse = await api.post(urlClients, { body: client });
    if (!clientResponse.err) {
      setClients([...clients, clientResponse]); 
      setVisibleNC(false); 
      showAlert('Client added successfully!', 'success');
      resetForms(); 
    } else {
      showAlert('Error adding client. Please try again.', 'danger'); 
    }
  };

  const resetForms = () => {
    setClient({
      type: '',
      user_id: '',
    });
  };

  const handleDeleteClient = (id) => {
    setClientIdToDelete(id)
    setConfirmDeleteModalVisible(true)
  }

  const confirmDelete = async () => {

    const clientToDelete = clients.find(client => client.id === clientIdToDelete);
    
    if (clientToDelete) {

      const responseClient = await api.del(`${urlClients}/${clientIdToDelete}`);
      if (!responseClient.err) {

        const userIdToDelete = clientToDelete.user_id;
        const responseUser  = await api.del(`${urlUsers}/${userIdToDelete}`);
        
        if (!responseUser .err) {

          setClients(clients.filter(client => client.id !== clientIdToDelete));
          setUsers(users.filter(user => user.id !== userIdToDelete)); 
          showAlert('Client and associated user deleted successfully!', 'success');
        } else {
          showAlert('Error deleting associated user. Please try again.', 'danger');
        }
      } else {
        showAlert('Error deleting client. Please try again.', 'danger');
      }
    }
    

    setConfirmDeleteModalVisible(false);
  };
  console.log(clientIdToDelete)

  const filteredUsers = users.filter(user => user.role === 'Client');

  const handleEditClient = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlClients}/${client.id}`, { body: client });
    if (!response.err) {
      setClients(clients.map((c) => (c.id === client.id ? response : c))); 
      setVisibleSm(false); 
      showAlert('Client updated successfully!', 'success');
    } else {
      showAlert('Error updating client. Please try again.', 'danger');
    }
  };


  return (
    <div>
      <h1>List of Clients</h1>
      <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
        <CContainer style={{ display: 'flex' }}>
        <h6>Current Fleet: {clients.length}</h6>
        </CContainer>
      </CNavbar>

      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID </CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {clients.map((client) => {
            const user = users.find((user) => user.id === client.user_id);
            return (
              <CTableRow key={client.id}>
                <CTableDataCell>{client.id}</CTableDataCell>
                <CTableDataCell>{user ? user.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{user ? user.email : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{user ? user.phone : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{user ? user.address : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{client.type}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                    onClick={() => {
                      setClient(client);
                      setVisibleSm(true);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>

      <CModal
        visible={confirmDeleteModalVisible}
        onClose={() => setConfirmDeleteModalVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this user?</CModalBody>
        <CModalFooter>
          <CButton
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',
            }}
            onClick={() => setConfirmDeleteModalVisible(false)}
          >
            Cancel
          </CButton>
          <CButton
            style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
            onClick={confirmDelete}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditClient}>
            <CCol md={6}>
            <CFormSelect
                id="type"
                label="Client Type"
                style={{ borderColor: 'black' }}
                value={client.type}
                onChange={(e) => setClient({ ...client, type: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Enterprise</option>
                <option>Person</option>
                <option>Government</option>
              </CFormSelect>

              <CButton
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
                type="button"
                onClick={() => setVisibleSm(false)}
              >
                Cancel
              </CButton>
              <CButton style={{ backgroundColor: '#107acc', color: 'white' }} type="submit">
                Save Changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>

      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white' }}
        variant="outline"
        onClick={() => {
          setVisibleNC(true);
          resetForms();
        }}
      >
        New Client
      </CButton>

      <CModal
        size="xl"
        visible={visibleNC}
        onClose={() => setVisibleNC(false)}
        aria-labelledby="modalTitle"
      >
        <CModalHeader>
          <CModalTitle id="modalTitle">New Client</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddClient}>
            <CCol md={12}>
              <CFormSelect
                id="user_id"
                label="Select User"
                style={{ borderColor: 'black' }}
                value={client.user_id}
                onChange={(e) => setClient({ ...client, user_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}, {user.role}
                    </option>
                  ))
                ) : (
                  <option>No se encontraron usuarios</option>
                )}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="type"
                label="Client Type"
                style={{ borderColor: 'black' }}
                value={client.type}
                onChange={(e) => setClient({ ...client, type: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Enterprise</option>
                <option>Person</option>
                <option>Government</option>
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: '#107acc', color: 'white' }}
                onClick={() => {
                  setVisibleNC(false);
                  resetForms();
                }}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Add New Client
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </ div>
  );
};

export default Clients;