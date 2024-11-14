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

const Invoices = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleLg, setVisibleLg] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleSm, setVisibleSm] = useState(false)
  return (
    <div>
      <h1>List of Invoices</h1>
      <div>
        <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
          <CContainer style={{ display: 'flex' }}>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search for client" />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc',  color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
              <CFormInput type="date" className="me-2" style={{ marginLeft: '10px' }} />
              <CButton
                type="submit"
                style={{ backgroundColor: '#107acc',  color: 'white' }}
                variant="outline"
              >
                Search
              </CButton>
            </CForm>
            <h6>Current Bills: 2</h6>
          </CContainer>
        </CNavbar>
      </div>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
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
              <CButton
                style={{
                  backgroundColor: '#fbb117',
                  marginRight: '10px',
                  color: 'white',
                  
                }}
                onClick={() => setVisibleXL(!visibleXL)}
              >
                Details
              </CButton>
              <CModal
                size="xl"
                visible={visibleXL}
                onClose={() => setVisibleXL(false)}
                aria-labelledby="modalTitle"
              >
                <CModalHeader>
                  <CModalTitle id="modalTitle">Details Invoice</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div>
                    <h3>Invoice Nro.1</h3>
                    <h6>DNI: 30781815</h6>
                    <h6>Name Client: Mariana Morales</h6>
                    <h6>Payment Method: Targeta</h6>
                    <h6>Nro Order: 152</h6>
                    <CTable style={{ border: '1px solid black', borderRadius: '50px' }}>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Matrial</CTableHeaderCell>
                          <CTableHeaderCell>Quantity</CTableHeaderCell>
                          <CTableHeaderCell>Transportation Cost</CTableHeaderCell>
                          <CTableHeaderCell>Material Cost</CTableHeaderCell>
                          <CTableHeaderCell>Total Cost</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell>{'Grava'}</CTableDataCell>
                          <CTableDataCell>{'5M'}</CTableDataCell>
                          <CTableDataCell>{'200$'}</CTableDataCell>
                          <CTableDataCell>{'300$'}</CTableDataCell>
                          <CTableDataCell>{'500$'}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell>{'Arena Roja'}</CTableDataCell>
                          <CTableDataCell>{'6M'}</CTableDataCell>
                          <CTableDataCell>{'50$'}</CTableDataCell>
                          <CTableDataCell>{'50$'}</CTableDataCell>
                          <CTableDataCell>{'100$'}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    <CTable style={{ borderBottomColor: 'black' }}>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Type Material</CTableHeaderCell>
                          <CTableHeaderCell>Total Quantity Material</CTableHeaderCell>
                          <CTableHeaderCell>Total Transportation Cost</CTableHeaderCell>
                          <CTableHeaderCell>Total Material Cost</CTableHeaderCell>
                          <CTableHeaderCell>Amount to Pay </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow style={{ borderBottomColor: 'black' }}>
                          <CTableDataCell>{'Amount to pay'}</CTableDataCell>
                          <CTableDataCell>{'12M'}</CTableDataCell>
                          <CTableDataCell>{'250$'}</CTableDataCell>
                          <CTableDataCell>{'350$'}</CTableDataCell>
                          <CTableDataCell>{'600$'}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    style={{
                      backgroundColor: 'red',
                      marginRight: '10px',
                      color: 'white',
                      
                    }}
                    onClick={() => setVisibleXL(false)}
                  >
                    Close
                  </CButton>
                  <CButton
                    style={{ backgroundColor: '#107acc',  color: 'white' }}
                    onClick={() => setVisibleXL(false)}
                  >
                    Download invoice
                  </CButton>
                </CModalFooter>
              </CModal>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{
                  backgroundColor: 'green',
                  marginRight: '10px',
                  color: 'white',
                  
                }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{
                  backgroundColor: 'red',
                  marginRight: '10px',
                  color: 'white',
                  
                }}
                onClick={() => setVisible(true)}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>{'30781864'}</CTableDataCell>
            <CTableDataCell>{'Jose Morales'}</CTableDataCell>
            <CTableDataCell>{'Efectivo'}</CTableDataCell>
            <CTableDataCell>{'100$'}</CTableDataCell>
            <CTableDataCell>{'Pendiente'}</CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{
                  backgroundColor: '#fbb117',
                  marginRight: '10px',
                  color: 'white',
                  
                }}
                onClick={() => setVisibleXL(!visibleXL)}
              >
                Details
              </CButton>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                style={{
                  backgroundColor: 'green',
                  marginRight: '10px',
                  color: 'white',
                 
                }}
                onClick={() => setVisibleSm(!visibleSm)}
              >
                Edit
              </CButton>
              <CButton
                style={{
                  backgroundColor: 'red',
                  marginRight: '10px',
                  color: 'white',
                  
                }}
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
        style={{ backgroundColor: '#107acc',  color: 'white' }}
        variant="outline"
        onClick={() => setVisibleLg(!visibleLg)}
      >
        New Invoice
      </CButton>
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                placeholder="Nro Order"
                id="Orderid"
                label="Nro. Order"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Client Name"
                id="Nameid"
                label="Client Name"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Amount_to_Pay"
                label="Amount to Pay"
                placeholder="Amount to Pay"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="date"
                label="Payment Date"
                type="date"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect id="PaymentM" label="Payment Methodt" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Card</option>
                <option>Cheque</option>
                <option>Mobile Payment</option>
                <option>Effective</option>
                <option>Transfer</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormSelect id="Status" label="Status Payment" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Earring</option>
                <option>Completed</option>
                <option>In Process</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  
                  color: 'white',
                  marginRight: '10px',
                }}
                type="submit"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc',  color: 'white' }}
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
        <CModalBody>Are you sure to remove this bill from the system?</CModalBody>
        <CModalFooter>
          <CButton
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',
              
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
              
            }}
            onClick={() => setVisible(false)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Nro. Order: 5012</h6>
          <h6>DNI: 30781815</h6>
          <h6>Name Client: Mariana Morales</h6>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                id="Amount_to_Pay"
                label="Amount to Pay"
                placeholder="Amount to Pay"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="date"
                label="Payment Date"
                type="date"
                style={{ borderColor: 'black' }}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect id="PaymentM" label="Methodt" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Card</option>
                <option>Cheque</option>
                <option>Mobile Payment</option>
                <option>Effective</option>
                <option>Transfer</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect id="Status" label="Status Payment" style={{ borderColor: 'black' }}>
                <option>Choose...</option>
                <option>Earring</option>
                <option>Completed</option>
                <option>In Process</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  
                  color: 'white',
                  marginBottom: '10px',
                }}
                type="submit"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc',  color: 'white' }}
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

export default Invoices
