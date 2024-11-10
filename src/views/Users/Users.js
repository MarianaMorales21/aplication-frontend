import React, { useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CNavbar,
  CForm,
  CFormInput,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CFormSelect,
} from '@coreui/react'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  return (
    <div>
      <h1>List of users</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for usernames" />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
              <CFormInput type="date" className="me-2" style={{ marginLeft: '15px' }} />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
              <CFormInput
                type="search"
                className="me-2"
                style={{ marginLeft: '15px' }}
                placeholder="Search for role"
              />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
            </CForm>
            <h6>Nro. Users: 2</h6>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Rol</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'1'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'Marianamorales2110@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'Driver'}</CTableDataCell>
            <CTableDataCell>{'Active'}</CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                onClick={() => setVisible(!visible)}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'2'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Josemorales@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'Client'}</CTableDataCell>
            <CTableDataCell>{'Inactive'}</CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                onClick={() => setVisible(!visible)}
              >
                Delete
              </CButton>
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                  <CModalTitle>Attention</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure to remove this user from the system?</CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: 'green',
                      marginRight: '10px',
                      color: 'white',
                      borderColor: 'black',
                    }}
                    onClick={() => setVisible(false)}
                  >
                    Cancel
                  </CButton>
                  <CButton
                    style={{
                      backgroundColor: 'red',
                      marginRight: '10px',
                      color: 'white',
                      borderColor: 'black',
                    }}
                    onClick={() => setVisible(false)}
                  >
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CButton
        type="submit"
        style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
        variant="outline"
        onClick={() => setVisibleLg(!visibleLg)}
      >
        New User
      </CButton>
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Nro. User: 3</h6>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                placeholder="User Name"
                id="username"
                label="User Name"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Password"
                id="Password"
                label="Password"
                type="password"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Confirm Password"
                id="CPassword"
                label="Confirm Password"
                type="password"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect id="Role" label="Role User" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Driver</option>
                <option>Client</option>
                <option>Administrator</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput placeholder="DNI" id="DNI" label="DNI" style={{ borderColor: 'black' }} />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Name"
                id="name"
                label="Name"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Last Name"
                id="name"
                label="Last Name"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Email"
                id="email"
                label="Email"
                type="email"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Phone"
                id="Phone"
                label="Phone"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Address"
                id="Address"
                label="Address"
                style={{ borderColor: 'black' }}
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
                type="submit"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                type="submit"
                onClick={() => setVisible(!visible)}
              >
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
          <h6>Nro. User: 5012</h6>
          <h6>DNI: 30781815</h6>
          <h6>Name User: Mariana Morales</h6>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                placeholder="User Name"
                id="username"
                label="User Name"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Password"
                id="Password"
                label="Password"
                type="password"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Confirm Password"
                id="CPassword"
                label="Confirm Password"
                type="password"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect id="Status" label="Current User Status" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Active</option>
                <option>Inactive</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect id="Role" label="Role" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Driver</option>
                <option>Client</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Email"
                id="email"
                label="Email"
                type="email"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Phone"
                id="Phone"
                label="Phone"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Address"
                id="Address"
                label="Address"
                style={{ borderColor: 'black' }}
              />
            </CCol>

            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  borderColor: 'black',
                  color: 'white',
                  marginBottom: '10px',
                }}
                type="submit"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                type="submit"
                onClick={() => setVisible(!visible)}
              >
                Add Changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Users
