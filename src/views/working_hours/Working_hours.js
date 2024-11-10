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

const Working_hours = () => {
  const [visibleXL, setVisibleXL] = useState(false);
  const [visibleLg, setVisibleLg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  return (
    <div>
      <h1>List of Working Hours</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px'}}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for Driver"/>
              <CButton type="submit" style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }} variant="outline">
                Search
              </CButton>
            </CForm>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>Name Driver</CTableHeaderCell>
            <CTableHeaderCell>Day of the week</CTableHeaderCell>
            <CTableHeaderCell>Day</CTableHeaderCell>
            <CTableHeaderCell>Hours</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'Tuesday'}</CTableDataCell>
            <CTableDataCell>{'12/10/2024'}</CTableDataCell>
            <CTableDataCell>{'9:30-5:30'}</CTableDataCell>
            <CTableDataCell>{'Compliment'}</CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleLg(!visibleLg)}>Edit</CButton>
              <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(true)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Monday'}</CTableDataCell>
            <CTableDataCell>{'21/10/2024'}</CTableDataCell>
            <CTableDataCell>{'2:30-8:30'}</CTableDataCell>
            <CTableDataCell>{'Unfulfilled'}</CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleLg(!visibleLg)}>Edit</CButton>
              <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(true)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
        <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} 
        variant="outline" onClick={() => setVisibleXL(!visibleXL)}>
        New working hours
        </CButton>
        <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Edit Working Hours</CModalTitle>
        </CModalHeader>
            <h6>Nro. Driver: 5012</h6>
            <h6>DNI: 30781815</h6>
            <h6>Name Driver: Mariana Morales</h6>
        <CModalBody>
        <CForm className="row g-3">
            <CCol md={6}>
                <CFormSelect id="hours" label="Hours" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>8:30-4:30</option>
                <option>2:30-8:30</option>
                <option>9:30-1:30</option>
                <option>3:30-7:30</option>
                <option>10:30-6:30</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CFormSelect id="Day of the week" label="Day of the week" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CFormInput id="date" label="Payment Date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6}>
                <CFormSelect id="Status" label="Status" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Compliment</option>
                <option>Unfulfilled</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CButton style={{backgroundColor:'red', borderColor:'black', color:'white', marginRight:'10px'}} type="submit" onClick={() => setVisibleLg(false)} >
                    Cancel
                </CButton>
                <CButton style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} type="submit" onClick={() => setVisible(!visible)}>Add Invoice</CButton>
            </CCol>
        </CForm>
        </CModalBody>
      </CModal>
      <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
            <CModalTitle>Attention</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to remove this working hours from the system?</CModalBody>
            <CModalFooter>
            <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(false)}>
                Cancel
            </CButton>
            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(false)}>
                Delete
            </CButton>
            </CModalFooter>
       </CModal>
       <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)} aria-labelledby="modalTitle">
                <CModalHeader>
                  <CModalTitle id="modalTitle">New Working Hours</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <CCol md={6}>
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
                  <CCol md={6}>
                  <CFormSelect id="Day of the week" label="Day of the week" style={{borderColor:'black'}}>
                  <option>Choose...</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                      <CFormInput id="date" label="Payment Date" type='date' style={{borderColor:'black'}}/>
                  </CCol>
                  <CCol md={6}>
                      <CFormSelect id="Status" label="Status" style={{borderColor:'black'}}>
                      <option>Choose...</option>
                      <option>Compliment</option>
                      <option>Unfulfilled</option>
                      </CFormSelect>
                  </CCol>
                </div>
                </CModalBody>
                <CModalFooter>
                  <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleXL(false)}>
                    Close
                  </CButton>
                  <CButton style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} onClick={() => setVisibleXL(false)}>Download invoice</CButton>
                </CModalFooter>
          </CModal>
    </div>
  );
};

export default Working_hours;
