import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CAvatar, CButton } from '@coreui/react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CNavbar,
  CForm,
  CFormInput,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from '@coreui/react'
const UserProfile = () => {
  const [visibleSm, setVisibleSm] = useState(false)
  const userData = {
    avatarUrl: './src/assets/images/avatars/8.jpg',
    name: 'Juan Pérez',
    role: 'Driver',
    phone: '0412-1617297',
    email: 'juanperez123@gmail.com',
    address: 'San Cristobal',
    dateRegister: '2024-10-10',
    status: 'Active',
  }

  return (
    <CRow className="justify-content-center">
      <CCol md="6">
        <CCard>
          <CCardHeader>
            <h3>Profile User</h3>
          </CCardHeader>
          <CCardBody>
            <div className="text-center mb-4">
              <CAvatar src={userData.avatarUrl} size="lg" className="mb-3" />
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
                <strong>Date Register:</strong>
                <p>{new Date(userData.dateRegister).toLocaleDateString()}</p>
              </CCol>
              <CCol xs="6">
                <strong>Status:</strong>
                <p>{userData.status}</p>
              </CCol>
            </CRow>
            <CButton
              type="submit"
              style={{ backgroundColor: '#107acc', color: 'white' }}
              variant="outline"
              onClick={() => setVisibleSm(!visibleSm)}
            >
              Edit Profile
            </CButton>
            <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
              <CModalHeader>
                <CModalTitle>Edit User</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <strong>User:</strong>
                <h6>Name: {userData.name}</h6>
                <h6>Role: {userData.role}</h6>
                <h6>Phone: {userData.phone}</h6>
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
                    <CFormSelect
                      id="Status"
                      label="Current User Status"
                      style={{ borderColor: 'black' }}
                    >
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
                        color: 'white',
                        marginBottom: '10px',
                      }}
                      type="submit"
                      onClick={() => setVisibleLg(false)}
                    >
                      Cancel
                    </CButton>
                    <CButton
                      style={{ backgroundColor: '#107acc',  color: 'white' }}
                      type="submit"
                      onClick={() => setVisible(!visible)}
                    >
                      Add Changes
                    </CButton>
                  </CCol>
                </CForm>
              </CModalBody>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserProfile
