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
  const [visibleXL, setVisibleXL] = useState(false);
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
  const urlOrders = 'http://localhost:8000/order';

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

  const fetchOrders = async () => {
    const response = await api.get(urlOrders);
    if (!response.err) {
      setOrders(response);
    }
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    const maxId = invoices.length > 0 ? Math.max(...invoices.map(invoice => parseInt(invoice.id))) : 0;
    const newId = maxId + 1;
    const newInvoice = { ...selectedInvoice, id: newId.toString() };

    const response = await api.post(urlInvoices, { body: newInvoice });
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

  const handleDetailsClick = (invoice) => {
    setSelectedInvoice(invoice);
    setVisibleXL(true);
  };

  return (
    <div>
      <h1>List of Invoices</h1>
      {alert.show && <CAlert color={alert.color}>{alert.message}</CAlert>}
      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }}
        onClick={() => {
          setVisibleLg(true);
          resetForm();
        }}
      >
        New Invoice
      </CButton>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Factura</CTableHeaderCell>
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
            const client = clients.find(client => client.id === order?.client_id);
            const user = users.find(user => user.id === client?.user_id);
            const method = paymentMethods.find(method => method.id === invoice.payment_method_id);
            return (
              <CTableRow key={invoice.id}>
                <CTableDataCell>{invoice.id}</CTableDataCell>
                <CTableDataCell>{user ? user.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{method ? method.type : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{invoice.total_cost_of_the_trip}</CTableDataCell>
                <CTableDataCell>{invoice.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{
                      backgroundColor: '#107acc',
                      marginRight: '10px',
                      color: 'white',
                    }}
                    onClick={() => handleDetailsClick(invoice)}
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

      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditInvoice}>
            <CCol md={12}>
              <CFormInput
                placeholder="Nro Order"
                label="Nro. Order"
                value={selectedInvoice.order_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, order_id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
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
            <CCol md={12}>
              <CFormInput
                label="Payment Date"
                type="date"
                value={selectedInvoice.payment_date}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, payment_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Transportation Cost"
                type="number"
                value={selectedInvoice.transportation_cost}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, transportation_cost: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Material Cost"
                type="number"
                value={selectedInvoice.material_cost}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, material_cost: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Total Cost of the Trip"
                type="number"
                value={selectedInvoice.total_cost_of_the_trip}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, total_cost_of_the_trip: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
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

      <CModal size="md" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Add New Invoice</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddInvoice}>
            <CCol md={12}>
              <CFormInput
                placeholder="Nro Order"
                label="Nro. Order"
                value={selectedInvoice.order_id}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, order_id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
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
            <CCol md={12}>
              <CFormInput
                label="Payment Date"
                type="date"
                value={selectedInvoice.payment_date}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, payment_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Transportation Cost"
                type="number"
                value={selectedInvoice.transportation_cost}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, transportation_cost: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Material Cost"
                type="number"
                value={selectedInvoice.material_cost}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, material_cost: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Total Cost of the Trip"
                type="number"
                value={selectedInvoice.total_cost_of_the_trip}
                onChange={(e) => setSelectedInvoice({ ...selectedInvoice, total_cost_of_the_trip: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
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
          <CModalTitle id="modalTitle">Detalles de la Factura</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Campo</CTableHeaderCell>
                <CTableHeaderCell>Valor</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Nro. Factura</CTableDataCell>
                <CTableDataCell>{selectedInvoice.id}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Cliente</CTableDataCell>
                <CTableDataCell>
                  {users.find(user => user.id === clients.find(client => client.id === orders.find(order => order.id === selectedInvoice.order_id)?.client_id)?.user_id)?.name || 'Unknown'}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Método de Pago</CTableDataCell>
                <CTableDataCell>{paymentMethods.find(method => method.id === selectedInvoice.payment_method_id)?.type || 'Unknown'}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Estado</CTableDataCell>
                <CTableDataCell>{selectedInvoice.status}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Fecha de Pago</CTableDataCell>
                <CTableDataCell>{selectedInvoice.payment_date}</CTableDataCell>
              </CTableRow>
              {selectedInvoice.transportation_cost && (
                <CTableRow>
                  <CTableDataCell>Costo de Transporte</CTableDataCell>
                  <CTableDataCell>{selectedInvoice.transportation_cost}</CTableDataCell>
                </CTableRow>
              )}
              {selectedInvoice.material_cost && (
                <CTableRow>
                  <CTableDataCell>Costo de Material</CTableDataCell>
                  <CTableDataCell>{selectedInvoice.material_cost}</CTableDataCell>
                </CTableRow>
              )}
              {selectedInvoice.total_cost_of_the_trip && (
                <CTableRow>
                  <CTableDataCell>Costo Total</CTableDataCell>
                  <CTableDataCell>{selectedInvoice.total_cost_of_the_trip}</CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
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
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Invoices;