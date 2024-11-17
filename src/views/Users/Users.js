import React, { useEffect, useState } from 'react'
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
  CAlert,
  CModalFooter,
  CNavbar,
  CContainer
} from '@coreui/react'
import { helpHttp } from '../../helpHttp'

const Users = () => {
  const api = helpHttp()
  const url = 'http://localhost:8000/users'

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
    password: '',
    address: '',
    phone: '',
  })
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: '', color: '' })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await api.get(url)
    if (!response.err) {
      setUsers(response)
    } else {
      showAlert('Error fetching users. Please try again.', 'danger')
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    const response = await api.post(url, { body: user })
    if (!response.err) {
      setUsers([...users, response])
      setVisibleLg(false)
      showAlert('User added successfully!', 'success')
      resetUserForm()
    } else {
      showAlert('Error adding user. Please try again.', 'danger')
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    const response = await api.put(`${url}/${user.id}`, { body: user })
    if (!response.err) {
      setUsers(users.map((u) => (u.id === user.id ? response : u)))
      setVisibleSm(false)
      showAlert('User updated successfully!', 'success')
    } else {
      showAlert('Error updating user. Please try again.', 'danger')
    }
  }

  const handleDeleteUser = (id) => {
    setUserIdToDelete(id)
    setConfirmDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    const response = await api.del(`${url}/${userIdToDelete}`)
    if (!response.err) {
      setUsers(users.filter((u) => u.id !== userIdToDelete))
      showAlert('User  deleted successfully!', 'success')
    } else {
      showAlert('Error deleting user. Please try again.', 'danger')
    }
    setConfirmDeleteModalVisible(false)
  }

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color })
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' })
    }, 3000)
  }

  const resetUserForm = () => {
    setUser({
      name: '',
      email: '',
      role: '',
      status: 'Active',
      password: '',
      address: '',
      phone: '',
    })
  }

  return (
    <div>
      <h1>List of users</h1>
      <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
        <CContainer style={{ display: 'flex' }}>
        <h6>Current Fleet: {users.length}</h6>
        </CContainer>
      </CNavbar>
      {alert.show && <CAlert color={alert.color}>{alert.message}</CAlert>}
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users?.map((user) => (
            <CTableRow key={user.id}>
              <CTableDataCell>{user.id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.role}</CTableDataCell>
              <CTableDataCell>{user.status}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                  onClick={() => {
                    setUser(user)
                    setVisibleSm(true)
                  }}
                >
                  Edit
                </CButton>
                <CButton
                  style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white' }}
        variant="outline"
        onClick={() => {
          setVisibleLg(true)
          resetUserForm()
        }}
      >
        New User
      </CButton>

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

      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddUser}>
            <CCol md={6}>
              <CFormInput
                placeholder="User Name"
                id="username"
                label="User Name"
                style={{ borderColor: 'black' }}
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Password"
                id="Password"
                label="Password"
                type="password"
                style={{ borderColor: 'black' }}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Confirm Password"
                id="CPassword"
                label="Confirm Password"
                type="password"
                style={{ borderColor: 'black' }}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect
                id="Role"
                label="Role User"
                style={{ borderColor: 'black' }}
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Driver</option>
                <option>Client</option>
                <option>Administrator</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="DNI"
                id="DNI"
                label="DNI"
                style={{ borderColor: 'black' }}
                value={user.dni}
                onChange={(e) => setUser({ ...user, dni: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Email"
                id="email"
                label="Email"
                type="email"
                style={{ borderColor: 'black' }}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Phone"
                id="Phone"
                label="Phone"
                style={{ borderColor: 'black' }}
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Address"
                id="Address"
                label="Address"
                style={{ borderColor: 'black' }}
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  borderColor: 'black',
                  color: 'white',
                  marginRight: '10px',
                }}
                type="button"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton style={{ backgroundColor: '#107acc', color: 'white' }} type="submit">
                Add User
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditUser}>
            <CCol md={6}>
              <CFormInput
                placeholder="User Name"
                id="username"
                label="User Name"
                style={{ borderColor: 'black' }}
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Email"
                id="email"
                label="Email"
                type="email"
                style={{ borderColor: 'black' }}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Phone"
                id="Phone"
                label="Phone"
                style={{ borderColor: 'black' }}
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Address"
                id="Address"
                label="Address"
                style={{ borderColor: 'black' }}
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CCol md={12}>
                <CFormSelect
                  id="Status"
                  label="Status User"
                  style={{ borderColor: 'black' }}
                  value={user.status}
                  onChange={(e) => setUser({ ...user, status: e.target.value })}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </CFormSelect>
              </CCol>

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
    </div>
  )
}

export default Users