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
  CFooter,
} from '@coreui/react'
const Flota = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [visibleNM, setVisibleNM] = useState(false)
  return (
    <div>
      <h1>List of Flota</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for driver" />
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
                placeholder="Search for truck"
                style={{ marginLeft: '10px' }}
              />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
            </CForm>
            <h6>Current Fleet: 2</h6>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>Name Driver</CTableHeaderCell>
            <CTableHeaderCell>Truck License Plate</CTableHeaderCell>
            <CTableHeaderCell>Brand/Model</CTableHeaderCell>
            <CTableHeaderCell>Mileage</CTableHeaderCell>
            <CTableHeaderCell>Operational Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'30781815'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'A25B48'}</CTableDataCell>
            <CTableDataCell>{'Mercedes F420 2000'}</CTableDataCell>
            <CTableDataCell>{'250Km'}</CTableDataCell>
            <CTableDataCell>{'Activo'}</CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                onClick={() => setVisible(true)}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'BE7O11'}</CTableDataCell>
            <CTableDataCell>{'Ford F50 1998'}</CTableDataCell>
            <CTableDataCell>{'500Km'}</CTableDataCell>
            <CTableDataCell>{'Inavilitado'}</CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                onClick={() => setVisible(true)}
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
        <CModalBody>Are you sure to remove this member from the system?</CModalBody>
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
      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Member</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Nro. User: 5012</h6>
          <h6>Truck License Plate: AA58G4</h6>
          <h6>Name Driver: Mariana Morales</h6>
          <CForm className="row g-3">
            <CCol md={12}>
              <CFormSelect id="status" label="Operational Status" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Service</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Miliage"
                id="Miliage"
                label="Miliage"
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
      <CButton
        type="submit"
        style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
        variant="outline"
        onClick={() => setVisibleNM(!visibleNM)}
      >
        New Member
      </CButton>

      <CModal
        size="xl"
        visible={visibleNM}
        onClose={() => setVisibleNM(false)}
        aria-labelledby="modalTitle"
      >
        <CModalHeader>
          <CModalTitle id="modalTitle">New Member</CModalTitle>
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
                    <CCol md={6}>
                      <CFormSelect
                        id="status"
                        label="Operational Status"
                        style={{ borderColor: 'black' }}
                      >
                        <option>Choose...</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Service</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        placeholder="Miliage"
                        id="Miliage"
                        label="Miliage"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        placeholder="Usage Reports"
                        id="Usage Reports"
                        label="Usage Reports"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        placeholder="Model"
                        id="Model"
                        label="Model"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        placeholder="Brand"
                        id="Brand"
                        label="Brand"
                        style={{ borderColor: 'black' }}
                      />
                    </CCol>
                  </div>
                </CForm>
              </CContainer>
            </CNavbar>
          </div>
        </CModalBody>
        <CFooter>
          <CButton
            type="submit"
            style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
            variant="outline"
          >
            Add New Member
          </CButton>
        </CFooter>
      </CModal>
    </div>
  )
}

export default Flota
