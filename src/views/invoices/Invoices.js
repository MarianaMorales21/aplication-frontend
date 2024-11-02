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
const Invoices = () => {
  return (
    <div>
      <h1>List of Flota</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for client" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
                <CFormInput type="date" className="me-2" style={{marginLeft:'10px'}} />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
            <h6>Current Bills: 2</h6>
        </CContainer>
        
        </CNavbar>
        </div>
      <CTable style={{border: '1px solid gray', borderRadius:'50px'}}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>Name Client</CTableHeaderCell>
            <CTableHeaderCell>Payment Method</CTableHeaderCell>
            <CTableHeaderCell>Amount to Pay</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Invoice</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'30781815'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'Targeta'}</CTableDataCell>
            <CTableDataCell>{'500$'}</CTableDataCell>
            <CTableDataCell>{'Cancelado'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'#fbb117', marginRight:'10px', color:'white', borderColor:'black'}}>Details</CButton>
            </CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white',borderColor:'black'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white',borderColor:'black'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Efectivo'}</CTableDataCell>
            <CTableDataCell>{'100$'}</CTableDataCell>
            <CTableDataCell>{'Pendiente'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'#fbb117', marginRight:'10px', color:'white', borderColor:'black'}}>Details</CButton>
            </CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white', borderColor:'black'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white', borderColor:'black'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
      New Invoice
      </CButton>
    </div>
  );
};

export default Invoices;