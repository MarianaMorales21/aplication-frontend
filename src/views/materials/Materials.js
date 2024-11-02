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
const Materials = () => {
  return (
    <div>
      <h1>List of Materials</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for name material" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
        </CContainer>
        </CNavbar>
        </div>
      <CTable style={{border: '1px solid gray', borderRadius:'50px'}}>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'2'}</CTableDataCell>
            <CTableDataCell>{'Arena Roja'}</CTableDataCell>
            <CTableDataCell>{'20$'}</CTableDataCell>
            <CTableDataCell>{'Arena caracterizada por su color rojo'}</CTableDataCell>
            <CTableDataCell>{'Agotado'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
       New Material
        </CButton>
    </div>
  );
};

export default Materials;