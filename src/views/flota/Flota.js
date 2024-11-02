import React from 'react'
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
    CContainer
 } from '@coreui/react';
const Flota = () => {
  return (
    <div>
      <h1>List of Flota</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for driver" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
                <CFormInput type="search" className="me-2" placeholder="Search for truck" style={{marginLeft:'10px'}} />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
            <h6>Current Fleet: 2</h6>
        </CContainer>
        
        </CNavbar>
        </div>
      <CTable style={{border: '1px solid gray', borderRadius:'50px'}}>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
      New Member
      </CButton>
    </div>
  );
};

export default Flota;