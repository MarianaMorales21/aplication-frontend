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

const Order_details = () => {
  const [visibleXL, setVisibleXL] = useState(false);
  const [visibleLg, setVisibleLg] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  const [visibleMd, setVisibleMd] = useState(false);
  const [visibleMd2, setVisibleMd2] = useState(false);
  return (
    <div>
      <h1>List of Orders</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for client"/>
              <CButton type="submit" style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }} variant="outline">
                Search
              </CButton>
              <CFormInput type="date" className="me-2" style={{ marginLeft: '10px' }} />
              <CButton type="submit" style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }} variant="outline">
                Search
              </CButton>
            </CForm>
            <h6>Current Orders: 2</h6>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nro Order</CTableHeaderCell>
            <CTableHeaderCell>Name Client</CTableHeaderCell>
            <CTableHeaderCell>Order Date</CTableHeaderCell>
            <CTableHeaderCell>Total delivery date</CTableHeaderCell>
            <CTableHeaderCell>Order Status</CTableHeaderCell>
            <CTableHeaderCell>Order Details</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{'30781815'}</CTableDataCell>
            <CTableDataCell>{'Mariana Morales'}</CTableDataCell>
            <CTableDataCell>{'18/08/2024'}</CTableDataCell>
            <CTableDataCell>{'12/10/2024'}</CTableDataCell>
            <CTableDataCell>{'Completed'}</CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: '#fbb117', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleXL(!visibleXL)}>
                Details
              </CButton>
              <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)} aria-labelledby="modalTitle">
                <CModalHeader>
                  <CModalTitle id="modalTitle">Order Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <div>
                <h3>Order Nro.1</h3>
                <h6>DNI: 30781815</h6>
                <h6>Name Client: Mariana Morales</h6>
                <CTable style={{border: '1px solid black', borderRadius:'50px'}}>
                    <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Matrial</CTableHeaderCell>
                        <CTableHeaderCell>Quantity</CTableHeaderCell>
                        <CTableHeaderCell>Delivery Date</CTableHeaderCell>
                        <CTableHeaderCell>Total Cost</CTableHeaderCell>
                        <CTableHeaderCell>Delete Material</CTableHeaderCell>
                        
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    <CTableRow>
                        <CTableDataCell>{'Grava'}</CTableDataCell>
                        <CTableDataCell>{'5M'}</CTableDataCell>
                        <CTableDataCell>{'21/10/2024'}</CTableDataCell>
                        <CTableDataCell>{'500$'}</CTableDataCell>
                        <CTableDataCell>
                            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd(!visibleMd)}>Delete</CButton>
                        </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>{'Arena Roja'}</CTableDataCell>
                        <CTableDataCell>{'6M'}</CTableDataCell>
                        <CTableDataCell>{'18/10/2024'}</CTableDataCell>
                        <CTableDataCell>{'100$'}</CTableDataCell>
                        <CTableDataCell>
                            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd(!visibleMd)}>Delete</CButton>
                        </CTableDataCell>
                    </CTableRow>
                    </CTableBody>
                </CTable>
                </div> 
                </CModalBody>
                <CModalFooter>
                <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd2(!visibleMd2)}>
                    Add New Material
                  </CButton>
                  <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleXL(false)}>
                    Close
                  </CButton>
                  <CButton style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} onClick={() => setVisibleXL(false)}>Add changes</CButton>

                </CModalFooter>
              </CModal>
            </CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleSm(!visibleSm)}>Edit</CButton>
              <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(true)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'28/10/2024'}</CTableDataCell>
            <CTableDataCell>{'15/11/2024'}</CTableDataCell>
            <CTableDataCell>{'In process'}</CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: '#fbb117', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleXL(!visibleXL)}>Details</CButton>
            </CTableDataCell>
            <CTableDataCell>
              <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleSm(!visibleSm)}>Edit</CButton>
              <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisible(true)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
        <CButton type="submit" style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} 
        variant="outline" onClick={() => setVisibleLg(!visibleLg)}>
        New Order
        </CButton>
        <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm className="row g-3">
            <CCol md={6} >
                <CFormInput placeholder="DNI Client" id="Clientid" label="DNI Client" style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6}>
                <CFormInput id="date" label="Order Date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6}>
                <CFormInput id="dateD" label="Total Delivery Date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6}>
                <CFormSelect id="OrderStatus" label="Order Status" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CFormSelect id="Materials" label="Order Material" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Grava</option>
                <option>Arena</option>
                </CFormSelect>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Amount of material" id="Materialid" label="Amount of material" style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={12}>
                <CFormInput id="dateD" label="Material delivery date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6}>
                <CButton style={{backgroundColor:'red', borderColor:'black', color:'white', marginRight:'10px'}} type="submit" onClick={() => setVisibleLg(false)} >
                    Cancel
                </CButton>
                <CButton style={{backgroundColor:'#107acc', borderColor:'black', color:'white'}} type="submit" onClick={() => setVisible(!visible)}>Add Order</CButton>
            </CCol>
        </CForm>
        </CModalBody>
      </CModal>
      <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
            <CModalTitle>Attention</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to remove this order from the system?</CModalBody>
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
          <CModalTitle>Edit Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <h6>Nro. Order: 5012</h6>
            <h6>DNI: 30781815</h6>
            <h6>Name Client: Mariana Morales</h6>
        <CForm className="row g-3">
            <CCol md={12}>
                <CFormSelect id="OrderStatus" label="Order Status" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
                </CFormSelect>
            </CCol>
            <CCol md={12}>
                <CFormInput id="dateD" label="Total Delivery Date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={12} >
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
      <CModal fullscreen="md" visible={visibleMd} onClose={() => setVisibleMd(false)}>
      <CModalHeader>
            <CModalTitle>Attention</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure to remove this material from your order?</CModalBody>
            <CModalFooter>
            <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd(false)}>
                Cancel
            </CButton>
            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd(false)}>
                Delete
            </CButton>
            </CModalFooter>
      </CModal>



      <CModal fullscreen="md" visible={visibleMd2} onClose={() => setVisibleMd2(false)}>
      <CModalHeader >
            <CModalTitle>Attention</CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CCol md={6}>
                <CFormSelect id="Materials" label="Order Material" style={{borderColor:'black'}}>
                <option>Choose...</option>
                <option>Grava</option>
                <option>Arena</option>
                </CFormSelect>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Amount of material" id="Materialid" label="Amount of material" style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={12}>
                <CFormInput id="dateD" label="Material delivery date" type='date' style={{borderColor:'black'}}/>
            </CCol>
            <CCol md={6} >
                <CFormInput placeholder="Address" id="Address" label="Address" style={{borderColor:'black'}}/>
            </CCol>
            </CModalBody>
            <CModalFooter>
            <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd2(false)}>
                Cancel
            </CButton>
            <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white', borderColor: 'black' }} onClick={() => setVisibleMd2(false)}>
                Delete
            </CButton>
            </CModalFooter>
      </CModal>
























    </div>
  );
};

export default Order_details;