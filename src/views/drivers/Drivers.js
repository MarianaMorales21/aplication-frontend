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
const Drivers = () => {
  return (
    <div>
      <h1>List of Drivers</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for usernames" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
            <h6>Nro. Drivers: 2</h6>
        </CContainer>
        
        </CNavbar>
        </div>
      <CTable style={{border: '1px solid gray', borderRadius:'50px'}}>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  );
};

export default Drivers;