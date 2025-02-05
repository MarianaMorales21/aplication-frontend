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
  CModalFooter,
  CNavbar,
  CContainer,
} from '@coreui/react'
import { helpHttp } from '../../helpHttp'

const Drivers = () => {
  const [visibleND, setVisibleND] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
  const [driverIdToDelete, setDriverIdToDelete] = useState(null)
  const api = helpHttp()
  const urlDrivers = 'http://localhost:8000/driver'
  const urlUsers = 'http://localhost:8000/users'
  const [drivers, setDrivers] = useState([])
  const [users, setUsers] = useState([])
  const [driver, setDriver] = useState({
    id: '',
    user_id: '',
    limitations: '',
    date_of_issue: '',
    expiration_date: '',
    sex: '',
    grade_license: 'Fifth',
  })
  const [alert, setAlert] = useState({ show: false, message: '', color: '' })

  useEffect(() => {
    fetchDrivers()
    fetchUsers()
  }, [])

  const fetchDrivers = async () => {
    const response = await api.get(urlDrivers)
    if (!response.err) {
      setDrivers(response)
    } else {
      showAlert('Error fetching drivers. Please try again.', 'danger')
    }
  }

  const fetchUsers = async () => {
    const response = await api.get(urlUsers)
    if (!response.err) {
      setUsers(response)
    } else {
      showAlert('Error fetching users. Please try again.', 'danger')
    }
  }

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color })
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' })
    }, 3000)
  }

  const handleAddDriver = async (e) => {
    e.preventDefault();

    const newDriver = {
      ...driver,
      id: `${driver.user_id}D`,
    };

    const driverResponse = await api.post(urlDrivers, { body: newDriver });
    if (!driverResponse.err) {
      setDrivers([...drivers, driverResponse]);
      setVisibleND(false);
      showAlert('Driver added successfully!', 'success');
      resetForms();
    } else {
      showAlert('Error adding driver. Please try again.', 'danger');
    }
  };

  const resetForms = () => {
    setDriver({
      user_id: '',
      limitations: '',
      date_of_issue: '',
      expiration_date: '',
      sex: '',
      grade_license: 'Fifth',
      id: '',
    });
  };

  const handleDeleteDriver = (id) => {
    setDriverIdToDelete(id)
    setConfirmDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    const driverToDelete = drivers.find(driver => driver.id === driverIdToDelete);

    if (driverToDelete) {

      const responseDriver = await api.del(`${urlDrivers}/${driverIdToDelete}`);
      if (!responseDriver.err) {

        const userIdToDelete = driverToDelete.user_id;
        const responseUser = await api.del(`${urlUsers}/${userIdToDelete}`);
        if (!responseUser.err) {

          setDrivers(drivers.filter(driver => driver.id !== driverIdToDelete));
          setUsers(users.filter(user => user.id !== userIdToDelete));
          showAlert('Driver and associated user deleted successfully!', 'success');
        } else {
          showAlert('Error deleting associated user. Please try again.', 'danger');
        }
      } else {
        showAlert('Error deleting driver. Please try again.', 'danger');
      }
    }

    setConfirmDeleteModalVisible(false);
  };

  const filteredUsers = users.filter((user) => user.role === 'Driver')

  const handleEditDriver = async (e) => {
    e.preventDefault()
    const response = await api.put(`${urlDrivers}/${driver.id}`, { body: driver })
    if (!response.err) {
      setDrivers(drivers.map((d) => (d.id === driver.id ? response : d)))
      setVisibleSm(false)
      showAlert('Driver updated successfully!', 'success')
    } else {
      showAlert('Error updating driver. Please try again.', 'danger')
    }
  }

  return (
    <div>
      <h1>List of Drivers</h1>
      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }}
        variant="outline"
        onClick={() => {
          setVisibleND(true)
          resetForms()
        }}
      >
        New Driver
      </CButton>

      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Limitations</CTableHeaderCell>
            <CTableHeaderCell>Date License</CTableHeaderCell>
            <CTableHeaderCell>Expiration Date License</CTableHeaderCell>
            <CTableHeaderCell>Grade License</CTableHeaderCell>
            <CTableHeaderCell>Sex</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {drivers.map((driver) => {
            const user = users.find((user) => user.id === driver.user_id)
            return (
              <CTableRow key={driver.id}>
                <CTableDataCell>{user ? user.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{driver.limitations}</CTableDataCell>
                <CTableDataCell>{driver.date_of_issue}</CTableDataCell>
                <CTableDataCell>{driver.expiration_date}</CTableDataCell>
                <CTableDataCell>{driver.grade_license}</CTableDataCell>
                <CTableDataCell>{driver.sex}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                    onClick={() => {
                      setDriver(driver)
                      setVisibleSm(true)
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
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
        <CModalBody>Are you sure you want to delete this driver?</CModalBody>
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
          <CModalTitle>Edit Driver</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditDriver}>
            <CCol md={12}>
              <CFormSelect
                id="limitationsLicense"
                label="Limitations License"
                value={driver.limitations}
                onChange={(e) => setDriver({ ...driver, limitations: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Spectacles</option>
                <option>Cardiology</option>
              </CFormSelect>
              <CCol md={12}>
                <CFormInput
                  id="dateIssue"
                  label="Date of Issue License"
                  type="date"
                  value={driver.date_of_issue}
                  onChange={(e) => setDriver({ ...driver, date_of_issue: e.target.value })}

                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  id="dateExpiration"
                  label="Expiration Date"
                  type="date"

                  value={driver.expiration_date}
                  onChange={(e) => setDriver({ ...driver, expiration_date: e.target.value })}
                />
              </CCol>
              <CCol md={12}>
                <CFormSelect
                  id="sex"
                  label="Sex"

                  value={driver.sex}
                  onChange={(e) => setDriver({ ...driver, sex: e.target.value })}
                >
                  <option value={""}>Choose...</option>
                  <option>Female</option>
                  <option>Male</option>
                </CFormSelect>
              </CCol>
              <CButton
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginBottom: '10px',
                  marginTop: '10px',
                  marginRight: '5px',
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

      <CModal
        size="md"
        visible={visibleND}
        onClose={() => setVisibleND(false)}
        aria-labelledby="modalTitle"
      >
        <CModalHeader>
          <CModalTitle id="modalTitle">New Driver</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddDriver}>
            <CCol md={12}>
              <CFormSelect
                id="user_id"
                label="Select User"

                value={driver.user_id}
                onChange={(e) => setDriver({ ...driver, user_id: e.target.value })}
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
                label="Limitations License"

                value={driver.limitations}
                onChange={(e) => setDriver({ ...driver, limitations: e.target.value })}>
                <option value={""}>Choose...</option>
                <option>Spectacles</option>
                <option>Cardiology</option>
              </CFormSelect>
            </CCol>
            <CCol md={12} style={{ marginTop: '10px' }}>
              <CFormInput
                id="dateIssue"
                label="Date of Issue License"
                type="date"

                value={driver.date_of_issue}
                onChange={(e) => setDriver({ ...driver, date_of_issue: e.target.value })}
              />
            </CCol>
            <CCol md={12} style={{ marginTop: '10px' }}>
              <CFormInput
                id="dateExp"
                label="Expiration Date"
                type="date"

                value={driver.expiration_date}
                onChange={(e) => setDriver({ ...driver, expiration_date: e.target.value })}
              />
            </CCol>
            <CCol md={12} style={{ marginTop: '10px', marginBottom: '10px' }}>
              <CFormSelect
                id="sex"
                label="Sex"

                value={driver.sex}
                onChange={(e) => setDriver({ ...driver, sex: e.target.value })}
              >
                <option value={""}>Choose...</option>
                <option>Female</option>
                <option>Male</option>
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: '#107acc', color: 'white' }}
                onClick={() => {
                  setVisibleND(false)
                  resetForms()
                }}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Add New Driver
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Drivers 