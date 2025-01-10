/*import React, { useState } from 'react'
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

export default Invoices*/
import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CAlert,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Invoices = () => {
  const [visibleLg, setVisibleLg] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [invoiceIdToDelete, setInvoiceIdToDelete] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });
  const [selectedInvoice, setSelectedInvoice] = useState({
    id: '',
    order_id: '',
    payment_method_id: '',
    amount_to_pay: '',
    status: '',
    payment_date: '',
  });

  const api = helpHttp();
  const urlInvoices = 'http://localhost:8000/bill';
  const urlClients = 'http://localhost:8000/client';
  const urlPaymentMethods = 'http://localhost:8000/payment_method';
  const urlUsers = 'http://localhost:8000/users';
  const urlOrder = 'http://localhost:8000/order';

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchPaymentMethods();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchInvoices = async () => {
    const response = await api.get(urlInvoices);
    if (!response.err) {
      setInvoices(response);
    }
  };

  const fetchOrders = async () => {
    const response = await api.get(urlOrder);
    if (!response.err) {
      setOrders(response);
    }
  };

  const fetchClients = async () => {
    const response = await api.get(urlClients);
    if (!response.err) {
      setClients(response);
    }
  };

  const fetchUsers = async () => {
    const response = await api.get(urlUsers);
    if (!response.err) {
      setUsers(response);
    }
  };

  const fetchPaymentMethods = async () => {
    const response = await api.get(urlPaymentMethods);
    if (!response.err) {
      setPaymentMethods(response);
    }
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    const response = await api.post(urlInvoices, { body: selectedInvoice });
    if (!response.err) {
      setInvoices([...invoices, response]);
      setVisibleLg(false);
      resetForm();
      showAlert('Bill added successfully!', 'success');
    } else {
      showAlert('Error adding bill. Please try again.', 'danger');
    }
  };

  const handleEditInvoice = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlInvoices}/${selectedInvoice.id}`, { body: selectedInvoice });
    if (!response.err) {
      setInvoices(invoices.map(invoice => (invoice.id === selectedInvoice.id ? response : invoice)));
      setVisibleSm(false);
      showAlert('Bill updated successfully!', 'success');
    } else {
      showAlert('Error updating bill. Please try again.', 'danger');
    }
  };

  const handleDeleteInvoice = (id) => {
    setInvoiceIdToDelete(id);
    setConfirmDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const response = await api.del(`${urlInvoices}/${invoiceIdToDelete}`);
    if (!response.err) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceIdToDelete));
      showAlert('Bill deleted successfully!', 'success');
    } else {
      showAlert('Error deleting bill. Please try again.', 'danger');
    }
    setConfirmDeleteModalVisible(false);
  };

  const resetForm = () => {
    setSelectedInvoice({
      id: '',
      order_id: '',
      payment_method_id: '',
      amount_to_pay: '',
      status: '',
      payment_date: '',
    });
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' });
    }, 3000);
 };


  return (
    <div>
      <h1>List of Invoices</h1>
      {alert.show && <CAlert color={alert.color}>{alert.message}</CAlert>}
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>DNI</CTableHeaderCell>
            <CTableHeaderCell>Name Client</CTableHeaderCell>
            <CTableHeaderCell>Payment Method</CTableHeaderCell>
            <CTableHeaderCell>Amount to Pay</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {invoices.map((invoice) => {
            const order = orders.find(order => order.id === invoice.order_id);
            const client = order ? clients.find(client => client.id === order.client_id) : null;
            const user = client ? users.find(user => user.id === client.user_id) : null;
            const method = paymentMethods.find(method => method.id === invoice.payment_method_id);
            return (
              <CTableRow key={invoice.id}>
                <CTableDataCell>{invoice.id}</CTableDataCell>
                <CTableDataCell>{user ? user.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{method ? method.type : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{invoice.amount_to_pay}</CTableDataCell>
                <CTableDataCell>{invoice.status}</CTableDataCell>
                <CTableDataCell>
                    <CButton
                      style={{
                      backgroundColor: 'blue',
                      marginRight: '10px',
                      color: 'white',
                      }}
                      onClick={() => navigate(`/details/${order.id}`)}
                      >
                      Details
                   </CButton>
                  <CButton
                    style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setVisibleSm(true);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleDeleteInvoice(invoice.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>

      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginLeft: '10px' }}
        onClick={() => {
          setVisibleLg(true);
          resetForm();
        }}
      >
        New Invoice
      </CButton>

      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Add New Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddInvoice}>
          <CCol md={6}>
              <CFormInput
                placeholder="Nro Invoice"
                label="Nro. Invoice"
                value={selectedInvoice.id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Nro Order"
                label="Nro. Order"
                value={selectedInvoice.order_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, order_id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Amount to Pay"
                label="Amount to Pay"
                value={selectedInvoice.amount_to_pay}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, amount_to_pay: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Payment Method"
                value={selectedInvoice.payment_method_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, payment_method_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.type}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Status"
                value={selectedInvoice.status}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, status: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Payment Date"
                type="date"
                value={selectedInvoice.payment_date}
                onChange={(e) => setSelectedInvoice({ ... selectedInvoice, payment_date: e.target.value })}
                required
              />
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Add Invoice
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="lg" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditInvoice}>
            <CCol md={6}>
              <CFormInput
                placeholder="Nro Order"
                label="Nro. Order"
                value={selectedInvoice.order_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, order_id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Amount to Pay"
                label="Amount to Pay"
                value={selectedInvoice.amount_to_pay}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, amount_to_pay: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Payment Method"
                value={selectedInvoice.payment_method_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, payment_method_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.type}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Status"
                value={selectedInvoice.status}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, status: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Payment Date"
                type="date"
                value={selectedInvoice.payment_date}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, payment_date: e.target.value })}
                required
              />
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => setVisibleSm(false)}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Save Changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={confirmDeleteModalVisible} onClose={() => setConfirmDeleteModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this invoice?</CModalBody>
        <CModalFooter>
          <CButton
            style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
            onClick={() => setConfirmDeleteModalVisible(false)}
          >
            Cancel
          </CButton>
          <CButton
            style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
            onClick={confirmDelete}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
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
    </div>
  );
};

export default Invoices;