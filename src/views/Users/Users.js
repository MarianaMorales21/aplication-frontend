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

const Users = () => {
  return (
    <div>
      <h1>List of users</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for usernames" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
                <CFormInput type="date" className="me-2" style={{marginLeft:'15px'}} />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
                <CFormInput type='search' className="me-2" style={{marginLeft:'15px'}} placeholder="Search for role"/>
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
            <h6>Nro. Users: 2</h6>
        </CContainer>
        </CNavbar>
        </div>
      <CTable style={{border: '1px solid gray', borderRadius:'50px'}}>
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
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'2'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Josemorales@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'Client'}</CTableDataCell>
            <CTableDataCell>{'Inactive'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
       New User
        </CButton>
    </div>
  );
};

export default Users;
