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
const Materials = () => {
  const [visible, setVisible] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  const [visibleLg, setVisibleLg] = useState(false)
  return (
    <div>
      <h1>List of Materials</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for name material" />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
            </CForm>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Cost per unit</CTableHeaderCell>
            <CTableHeaderCell>Features</CTableHeaderCell>
            <CTableHeaderCell>Availability</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'1'}</CTableDataCell>
            <CTableDataCell>{'Grava'}</CTableDataCell>
            <CTableDataCell>{'50$'}</CTableDataCell>
            <CTableDataCell>{'Rocas arenozas'}</CTableDataCell>
            <CTableDataCell>{'Disponible'}</CTableDataCell>
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
            <CTableDataCell>{'2'}</CTableDataCell>
            <CTableDataCell>{'Arena Roja'}</CTableDataCell>
            <CTableDataCell>{'20$'}</CTableDataCell>
            <CTableDataCell>{'Arena caracterizada por su color rojo'}</CTableDataCell>
            <CTableDataCell>{'Agotado'}</CTableDataCell>
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
      <CButton
        type="submit"
        style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
        variant="outline"
        onClick={() => setVisibleLg(!visibleLg)}
      >
        New Material
      </CButton>
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Name"
                id="NameId"
                label="Name Material"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Characteristics"
                id="Characteristics"
                label="Characteristics"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Unit"
                label="Cost per Unit"
                placeholder="Cost per Unit"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Kilometer"
                label="Cost per Kilometer"
                placeholder="Cost per Kilometert"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="status"
                label="Status"
                placeholder="Status"
                style={{ borderColor: 'black' }}
              >
                <option>Choose...</option>
                <option>Available </option>
                <option>Rough</option>
              </CFormSelect>
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
                Add Invoice
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Attention</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to remove this material from the system?</CModalBody>
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
          <CModalTitle>Edit Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Nro. Material: 5012</h6>
          <h6>Name Material: Arena Roja</h6>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                id="Cost per Unit the Material"
                label="Cost per Unit (kilograms)"
                placeholder="Cost per Unit"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Kilometer"
                label="Cost per Kilometer"
                placeholder="Cost per Kilometert"
                style={{ borderColor: 'black' }}
              />
            </CCol>

            <CCol md={12}>
              <CFormSelect
                id="status"
                label="Status"
                placeholder="Status"
                style={{ borderColor: 'black' }}
              >
                <option>Choose...</option>
                <option>Available </option>
                <option>Rough</option>
              </CFormSelect>
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

export default Materials
