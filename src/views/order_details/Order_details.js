import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change here
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
  CNavbar,
  CContainer,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const OrderDetails = () => {
  const navigate = useNavigate(); 
  const [visibleND, setVisibleND] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({
    id: '',
    order_date: '',
    total_delivery_date: '',
    status: '',
    client_id: '',
  });

  const api = helpHttp();
  const urlOrders = 'http://localhost:8000/order';
  const urlClients = 'http://localhost:8000/client';
  const urlUsers = 'http://localhost:8000/users';

  useEffect(() => {
    fetchOrders();
    fetchClients();
    fetchUsers();
  }, []);

  const fetchOrders = async () => {
    const response = await api.get(urlOrders);
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

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const response = await api.post(urlOrders, { body: selectedOrder });
    if (!response.err) {
      setOrders([...orders, response]);
      setVisibleND(false);
      resetForm();
    }
  };

  const handleEditOrder = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlOrders}/${selectedOrder.id}`, { body: selectedOrder });
    if (!response.err) {
      setOrders(orders.map(order => (order.id === selectedOrder.id ? response : order)));
      setVisibleEdit(false);
    }
  };

  const handleDeleteOrder = (id) => {
    setOrderIdToDelete(id);
    setConfirmDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const response = await api.del(`${urlOrders}/${orderIdToDelete}`);
    if (!response.err) {
      setOrders(orders.filter(order => order.id !== orderIdToDelete));
    }
    setConfirmDeleteModalVisible(false);
  };

  const resetForm = () => {
    setSelectedOrder({
      id: '',
      order_date: '',
      total_delivery_date: '',
      status: '',
      client_id: '',
    });
  };

  return (
    <div>
      <h1>List of Orders</h1>
      <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
        <CContainer style={{ display: 'flex' }}>
          <h6>Current Orders: {orders.length}</h6>
        </CContainer>
      </CNavbar>

      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nro Order</CTableHeaderCell>
            <CTableHeaderCell>Name Client</CTableHeaderCell>
            <CTableHeaderCell>Order Date</CTableHeaderCell>
            <CTableHeaderCell>Total Delivery Date</CTableHeaderCell>
            <CTableHeaderCell>Order Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {orders.map((order) => {
            const client = clients.find(client => client.id === order.client_id);
            return (
              <CTableRow key={order.id}>
                <CTableDataCell>{order.id}</CTableDataCell>
                <CTableDataCell>{client ? users.find(user => user.id === client.user_id)?.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{order.order_date}</CTableDataCell>
                <CTableDataCell>{order.total_delivery_date}</CTableDataCell>
                <CTableDataCell>{order.status}</CTableDataCell>
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
                      setSelectedOrder(order);
                      setVisibleEdit(true);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleDeleteOrder(order.id)}
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
          setVisibleND(true);
          resetForm();
        }}
      >
        New Order
      </CButton>

      <CModal size="lg" visible={visibleND} onClose={() => setVisibleND(false)}>
        <CModalHeader>
          <CModalTitle>Add New Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddOrder}>
            <CCol md={12}>
              <CFormInput
                placeholder="Order ID"
                label="Order ID"
                value={selectedOrder.id}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Client"
                value={selectedOrder.client_id}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, client_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {users.find(user => user.id === client.user_id)?.name}, 
                    {users.find(user => user.id === client.user_id)?.id}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                label="Order Date"
                value={selectedOrder.order_date}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, order_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                label="Total Delivery Date"
                value={selectedOrder.total_delivery_date}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, total_delivery_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Order Status"
                value={selectedOrder.status}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option > Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => setVisibleND(false)}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Add Order
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="lg" visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
        <CModalHeader>
          <CModalTitle>Edit Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditOrder}>
            <CCol md={12}>
              <CFormInput
                placeholder="Order ID"
                label="Order ID"
                value={selectedOrder.id}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Client"
                value={selectedOrder.client_id}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, client_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {users.find(user => user.id === client.user_id)?.name}, 
                    {users.find(user => user.id === client.user_id)?.id}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                label="Order Date"
                value={selectedOrder.order_date}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, order_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="date"
                label="Total Delivery Date"
                value={selectedOrder.total_delivery_date}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, total_delivery_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Order Status"
                value={selectedOrder.status}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => setVisibleEdit(false)}
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
        <CModalBody>Are you sure you want to delete this order?</CModalBody>
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
    </div>
  );
};

export default OrderDetails;