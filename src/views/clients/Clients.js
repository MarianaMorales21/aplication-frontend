import React, { useState } from 'react';
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
  CFormSelect
} from '@coreui/react';
const Clients = () => {
  const [visible, setVisible] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  return (
    <div>
      <h1>List of Clients</h1>
      <div>
        <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer style={{display:'flex'}}>
            <CForm className="d-flex">    
                <CFormInput type="search" className="me-2" placeholder="Search for usernames" />
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
                <CFormInput type='search' className="me-2" style={{marginLeft:'15px'}} placeholder="Search for type"/>
                <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} variant="outline">
                    Search
                </CButton>
            </CForm>
            <h6>Nro. Clients: 5</h6>
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
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Pending orders</CTableHeaderCell>
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
            <CTableDataCell>{'Empresa'}</CTableDataCell>
            <CTableDataCell>{'2'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}} onClick={() => setVisibleSm(!visibleSm)}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}} onClick={() => setVisible(!visible)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Josemorales@gmail.com'}</CTableDataCell>
            <CTableDataCell>{'0412-1617297'}</CTableDataCell>
            <CTableDataCell>{'5ta Avenida de San Cristobal'}</CTableDataCell>
            <CTableDataCell>{'Persona'}</CTableDataCell>
            <CTableDataCell>{'1'}</CTableDataCell>
            <CTableDataCell>
            <CButton style={{backgroundColor:'green', marginRight:'10px', color:'white'}} onClick={() => setVisibleSm(!visibleSm)}>Edit</CButton>
            <CButton style={{backgroundColor:'red', marginRight:'10px', color:'white'}} onClick={() => setVisible(!visible)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
            <CModalTitle>Attention</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to remove this client from the system?</CModalBody>
            <CModalFooter>
            <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(false)}>
                Cancel
            </CButton>
            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(false)}>
                Delete
            </CButton>
            </CModalFooter>
            </CModal>
      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Client</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <h6>Nro. User: 5012</h6>
            <h6>DNI: 30781815</h6>
            <h6>Name Client: Mariana Morales</h6>
        <CForm className="row g-3">
            <CCol>
                <CFormSelect id="type" label="Client Type" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Enterprise</option>
                <option>Person</option>
                <option>Government</option>
                </CFormSelect>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Email" id="email" label="Email" type='email' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Phone" id="Phone" label="Phone" style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Address" id="Address" label="Address" style={{borderColor:'black'}}/>
            </CCol>

            <CCol md={6}>
                <CButton style={{backgroundColor:'red', borderColor:'black', color:'white', marginBottom:'10px'}} type="submit" onClick={() => setVisibleLg(false)} >
                    Cancel
                </CButton>
                <CButton style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} type="submit" onClick={() => setVisible(!visible)}>Add Changes</CButton>
            </CCol>
        </CForm>
        </CModalBody>
      </CModal>
      <h2>New Client</h2>
      <div>
      <CNavbar style={{border: '1px solid gray', borderRadius:'10px', marginBottom:'10px', backgroundColor:'white'}}>
        <CContainer>
            <CForm>    
            <CCol md={12}>
                <CFormInput placeholder="Name User" id="Name" label="Name User" type='search' style={{borderColor:'black'}}/>
            </CCol>
            <h6 style={{marginTop:'15px'}}>Data Found:</h6>
              <p>
                Name:<br></br>          
                DNI:<br/>
                Email: <br/>
                Phone:<br/>
                Address:<br/>
              </p>
              <div style={{borderTop: '2px solid black', width:'800px'}}>
              <CCol style={{marginTop:'15px'}}>
                <CFormSelect id="type" label="Client Type" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Enterprise</option>
                <option>Person</option>
                <option>Government</option>
                </CFormSelect>
              </CCol>
              </div>
              <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white', marginTop:'15px'}} 
              variant="outline">
              Add New Client
              </CButton>
            </CForm>
        </CContainer>
        </CNavbar>
      </div>
    </div>
 
  );
};

export default Clients;