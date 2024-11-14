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
const Drivers = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [visibleND, setVisibleND] = useState(false)
  return (
    <div>
      <h1>List of Drivers</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for usernames" />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
            </CForm>
            <h6>Nro. Drivers: 2</h6>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>License Expiration Date</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'30781815'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'Marianamorales2110@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'0412-1617297'}</CTableDataCell>
            <CTableDataCell>{'5ta Avenida de San Cristobal'}</CTableDataCell>
            <CTableDataCell>{'21/10/2024'}</CTableDataCell>
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
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Josemorales@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'0412-1617297'}</CTableDataCell>
            <CTableDataCell>{'5ta Avenida de San Cristobal'}</CTableDataCell>
            <CTableDataCell>{'21/10/2024'}</CTableDataCell>
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
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Attention</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to remove this driver from the system?</CModalBody>
        <CModalFooter>
          <CButton
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',
              
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
              
            }}
            onClick={() => setVisible(false)}
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
          <h6>Nro. User: 5012</h6>
          <h6>DNI: 30781815</h6>
          <h6>Name Driver: Mariana Morales</h6>
          <CForm className="row g-3">
            <CCol>
              <CFormSelect id="type" label="Limitations License" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Spectacles</option>
                <option>Cardiology</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="date"
                label="Date of Issue License"
                type="date"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="date"
                label="Expiration Date"
                type="date"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol>
              <CFormSelect id="sex" label="Sex" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Female</option>
                <option>Male</option>
              </CFormSelect>
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
                style={{ backgroundColor: '#107acc', color: 'white' }}
                type="submit"
                onClick={() => setVisible(!visible)}
              >
                Add Changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
      <CButton
        type="submit"
        style={{ backgroundColor: '#107acc', color: 'white' }}
        variant="outline"
        onClick={() => setVisibleND(!visibleND)}
      >
        New Driver
      </CButton>

      <CModal
        size="xl"
        visible={visibleND}
        onClose={() => setVisibleND(false)}
        aria-labelledby="modalTitle"
      >
        <CModalHeader>
          <CModalTitle id="modalTitle">New Client</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <CNavbar>
              <CContainer>
                <CForm>
                  <CCol md={12}>
                    <CFormInput
                      placeholder="Name User"
                      id="Name"
                      label="Name User"
                      type="search"
                      style={{ borderColor: 'black' }}
                    />
                  </CCol>
                  <h6 style={{ marginTop: '15px' }}>Data Found:</h6>
                  <p>
                    Name:<br></br>
                    DNI:
                    <br />
                    Email: <br />
                    Phone:
                    <br />
                    Address:
                    <br />
                  </p>
                  <div style={{ borderTop: '2px solid black', width: '800px' }}>
                    <CCol md={4} style={{ marginTop: '10px' }}>
                      <CFormSelect
                        id="type"
                        label="Limitations License"
                        style={{ borderColor: 'black' }}
                      >
                        <option>Choose...</option>
                        <option>Spectacles</option>
                        <option>Cardiology</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={6} style={{ marginTop: '10px' }}>
                      <CFormInput
                        id="date"
                        label="Date of Issue License"
                        type="date"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                    <CCol md={6} style={{ marginTop: '10px' }}>
                      <CFormInput
                        id="date"
                        label="Expiration Date"
                        type="date"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                    <CCol md={4} style={{ marginTop: '10px' }}>
                      <CFormSelect id="sex" label="Sex" style={{ borderColor: 'black' }}>
                        <option>Choose...</option>
                        <option>Female</option>
                        <option>Male</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                </CForm>
              </CContainer>
            </CNavbar>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            type="submit"
            style={{ backgroundColor: '#107acc', color: 'white' }}
            onClick={() => setVisibleND(false)}
            variant="outline"
          >
            Add New Driver
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Drivers
