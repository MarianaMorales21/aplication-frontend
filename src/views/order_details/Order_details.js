import React, { useEffect, useState } from 'react';
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
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CFormSelect,
  CModal,
  CAlert,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Order_details = () => {
  const [visibleLg, setVisibleLg] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  const [visibleXL, setVisibleXL] = useState(false);
  const [visibleMd2, setVisibleMd2] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });
  const [newOrderDetail, setNewOrderDetail] = useState({
    material_id: '',
    quantity_of_material: '',
    delivery_date: '',
    status: 'Pending',
    truck_id: '',
    trip_duration: '',
    distancia_to_travel: '',
    destination_address: '',
  });

  const [visibleEditDetail, setVisibleEditDetail] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [materials, setMaterials] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTruck] = useState([]);
  const api = helpHttp();
  const urlOrders = 'http://localhost:8080/orders';
  const urlOrderDetails = 'http://localhost:8080/orders-details';
  const urlMaterials = 'http://localhost:8080/material';
  const urlClients = 'http://localhost:8080/clients';
  const urlUsers = 'http://localhost:8080/ormusers';
  const urlDrivers = 'http://localhost:8080/ormdriver';
  const urlTruck = 'http://localhost:8080/trucks';

  const fetchOrders = async () => {
    const response = await api.get(urlOrders);
    if (!response.err) {
      setOrders(response);
    }
  };

  const fetchTruck = async () => {
    const response = await api.get(urlTruck);
    if (!response.err) {
      setTruck(response);
    }
  };

  const fetchDrivers = async () => {
    const response = await api.get(urlDrivers);
    if (!response.err) {
      setDrivers(response);
    }
  };

  const fetchMaterials = async () => {
    const response = await api.get(urlMaterials);
    if (!response.err && Array.isArray(response)) {
      setMaterials(response);
    } else {
      console.error('Error fetching materials:', response);
      setMaterials([]);
    }
  };

  const fetchClients = async () => {
    const response = await api.get(urlClients);
    if (!response.err && Array.isArray(response)) {
      setClients(response);
    } else {
      console.error('Error fetching clients:', response);
      setClients([]);
    }
  };

  const fetchUsers = async () => {
    const response = await api.get(urlUsers);
    if (!response.err && Array.isArray(response)) {
      setUsers(response);
    } else {
      console.error('Error fetching users:', response);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMaterials();
    fetchClients();
    fetchUsers();
    fetchOrderDetails();
    fetchDrivers();
    fetchTruck();
  }, []);

  const fetchOrderDetails = async () => {
    const response = await api.get(urlOrderDetails);
    if (!response.err) {
      setOrderDetails(response);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const newOrder = {
      order_date: e.target.order_date.value,
      total_delivery_date: e.target.total_delivery_date.value,
      status: e.target.status.value,
      client_id: e.target.client_id.value,
    };

    const response = await api.post(urlOrders, { body: newOrder });
    if (!response.err) {
      setOrders([...orders, response]);
      setVisibleLg(false);
      showAlert('Order added successfully!', 'success');
    } else {
      showAlert('Error adding order. Please try again.', 'danger');
    }
  };

  const handleEditOrder = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...selectedOrder,
      order_date: e.target.order_date.value,
      total_delivery_date: e.target.total_delivery_date.value,
      status: e.target.status.value,
    };

    const response = await api.put(`${urlOrders}/${selectedOrder.id}`, { body: updatedOrder });
    if (!response.err) {
      setOrders(orders.map(order => (order.id === selectedOrder.id ? response : order)));
      setVisibleSm(false);
      showAlert('Order updated successfully!', 'success');
    } else {
      showAlert('Error updating order. Please try again.', 'danger');
    }
  };
  const handleDeleteOrderDetail = async (id) => {
    const response = await api.del(`${urlOrderDetails}/${id}`);
    if (!response.err) {
      setOrderDetails(orderDetails.filter(detail => detail.id !== id));
      showAlert('Order detail deleted successfully!', 'success');
    } else {
      showAlert('Error deleting order detail. Please try again.', 'danger');
    }
  };
  const handleEditOrderDetail = async (e) => {
    e.preventDefault();
    const updatedDetail = {
      ...selectedDetail,
      material_id: e.target.material_id.value,
      quantity_of_material: e.target.quantity_of_material.value,
      delivery_date: e.target.delivery_date.value,
      status: e.target.status.value,
      truck_id: e.target.truck_id.value,
      trip_duration: e.target.trip_duration.value,
      distancia_to_travel: e.target.distancia_to_travel.value,
      destination_address: e.target.destination_address.value,
    };

    const response = await api.put(`${urlOrderDetails}/${selectedDetail.id}`, { body: updatedDetail });
    if (!response.err) {
      setOrderDetails(orderDetails.map(detail => (detail.id === selectedDetail.id ? response : detail)));
      setVisibleEditDetail(false);
      showAlert('Order detail updated successfully!', 'success');
    } else {
      showAlert('Error updating order detail. Please try again.', 'danger');
    }
  };

  const handleDeleteOrder = async (id) => {
    const response = await api.del(`${urlOrders}/${id}`);
    if (!response.err) {
      setOrders(orders.filter(order => order.id !== id));
      showAlert('Order deleted successfully!', 'success');
    } else {
      showAlert('Error deleting order. Please try again.', 'danger');
    }
  };

  const handleAddOrderDetail = async (e) => {
    e.preventDefault();
    const newDetail = {
      order_id: selectedOrder.id,
      material_id: newOrderDetail.material_id,
      quantity_of_material: newOrderDetail.quantity_of_material,
      delivery_date: newOrderDetail.delivery_date,
      status: newOrderDetail.status,
      truck_id: newOrderDetail.truck_id,
      trip_duration: newOrderDetail.trip_duration,
      distancia_to_travel: newOrderDetail.distancia_to_travel,
      destination_address: newOrderDetail.destination_address,
    };

    const response = await api.post(urlOrderDetails, { body: newDetail });
    if (!response.err) {
      setOrderDetails([...orderDetails, response]);
      setVisibleMd2(false);
      showAlert('Order detail added successfully!', 'success');
      setNewOrderDetail({
        material_id: '',
        quantity_of_material: '',
        delivery_date: '',
        status: 'Pending',
        truck_id: '',
        trip_duration: '',
        distancia_to_travel: '',
        destination_address: '',
      });
    } else {
      showAlert('Error adding order detail. Please try again.', 'danger');
    }
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' });
    }, 3000);
  };

  const handleDetailsClick = (order) => {
    setSelectedOrder(order);
    const details = orderDetails.filter(detail => detail.order_id === order.id);
    console.log('Order ID:', order.id, 'Details:', details);
    if (details.length === 0) {
      setVisibleMd2(true);
    } else {
      setVisibleXL(true);
    }
  };

  const getClientInfo = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    const user = users.find(user => user.id === client?.user_id);
    return user ? { name: user.name, dni: user.dni } : { name: 'Unknown', cedula: 'Unknown' };
  };

  const getTruckAndDriverInfo = (truckId) => {
    const truck = trucks.find(truck => truck.id === truckId);
    if (!truck) return { truck: 'Unknown', driver: { name: 'Unknown', limitations: 'Unknown' } };

    const driver = drivers.find(driver => driver.id === truck.driver_id);
    const user = driver ? users.find(user => user.id === driver.user_id) : null;

    return {
      truck: truck.id,
      driver: user ? { name: user.name, limitations: driver.limitations } : { name: 'Unknown', limitations: 'Unknown' }
    };
  };

  return (
    <div>
      <h1>List of Orders</h1>
      {alert.show && <CAlert color={alert.color}>{alert.message}</CAlert>}
      <CButton type="button" style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }} onClick={() => setVisibleLg(true)}>
        New Order
      </CButton>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nro Order</CTableHeaderCell>
            <CTableHeaderCell>Client Name</CTableHeaderCell>
            <CTableHeaderCell>Order Date</CTableHeaderCell>
            <CTableHeaderCell>Total Delivery Date</CTableHeaderCell>
            <CTableHeaderCell>Order Status</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {orders.map(order => (
            <CTableRow key={order.id}>
              <CTableDataCell>{order.id}</CTableDataCell>
              <CTableDataCell>{`${getClientInfo(order.client_id).name}, ${getClientInfo(order.client_id).dni}`}</CTableDataCell>
              <CTableDataCell>{order.order_date}</CTableDataCell>
              <CTableDataCell>{order.total_delivery_date}</CTableDataCell>
              <CTableDataCell>{order.status}</CTableDataCell>
              <CTableDataCell>
                <CButton style={{ backgroundColor: '#107acc', marginRight: '10px', color: 'white' }} onClick={() => handleDetailsClick(order)}>Details</CButton>
                <CButton style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }} onClick={() => {
                  setSelectedOrder(order);
                  setVisibleSm(true);
                }}>Edit</CButton>
                <CButton style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }} onClick={() => handleDeleteOrder(order.id)}>Delete</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>


      <CModal size="xl" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddOrder}>
            <CCol md={12}>
              <CFormInput placeholder="Order Date" id="order_date" label="Order Date" type="date" required />
            </CCol>
            <CCol md={12}>
              <CFormInput placeholder="Total Delivery Date" id="total_delivery_date" label="Total Delivery Date" type="date" required />
            </CCol>
            <CCol md={12}>
              <CFormSelect id="status" label="Order Status" required>
                <option>Choose...</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CFormSelect id="client_id" label="Client" required style={{ marginBottom: '10px' }}>
              <option value="">Choose...</option>
              {clients.map(client => {
                const clientInfo = getClientInfo(client.id);
                return (
                  <option key={client.id} value={client.id}>
                    {`${clientInfo.name} (${clientInfo.dni})`}
                  </option>
                );
              })}
            </CFormSelect>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setVisibleLg(false)}>Cancel</CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>Add Order</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="lg" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditOrder}>
            <CCol md={12}>
              <CFormInput placeholder="Order Date" id="order_date" label="Order Date" type="date" defaultValue={selectedOrder?.order_date} required />
            </CCol>
            <CCol md={12}>
              <CFormInput placeholder="Total Delivery Date" id="total_delivery_date" label="Total Delivery Date" type="date" defaultValue={selectedOrder?.total_delivery_date} required />
            </CCol>
            <CCol md={12}>
              <CFormSelect id="status" label="Order Status" style={{ marginBottom: '10px' }} defaultValue={selectedOrder?.status} required>
                <option>Choose...</option>
                <option>Completed</option>
                <option>In progress</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setVisibleSm(false)}>Cancel</CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>Save Changes</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>Order Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Material Name</CTableHeaderCell>
                <CTableHeaderCell>Quantity</CTableHeaderCell>
                <CTableHeaderCell>Delivery Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Truck ID</CTableHeaderCell>
                <CTableHeaderCell>Distance to Travel</CTableHeaderCell>
                <CTableHeaderCell>Destination Address</CTableHeaderCell>
                <CTableHeaderCell>Options</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orderDetails.filter(detail => detail.order_id === selectedOrder?.id).map(detail => {
                const material = materials.find(mat => mat.id === detail.material_id);
                const materialName = material ? material.name : 'Unknown';

                return (
                  <CTableRow key={detail.id}>
                    <CTableDataCell>{materialName}</CTableDataCell>
                    <CTableDataCell>{detail.quantity_of_material}</CTableDataCell>
                    <CTableDataCell>{detail.delivery_date}</CTableDataCell>
                    <CTableDataCell>{detail.status}</CTableDataCell>
                    <CTableDataCell>{detail.truck_id}</CTableDataCell>
                    <CTableDataCell>{detail.distancia_to_travel}</CTableDataCell>
                    <CTableDataCell>{detail.destination_address}</CTableDataCell>
                    <CTableDataCell>
                      <CButton style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={() => {
                        setSelectedDetail(detail);
                        setVisibleEditDetail(true);
                      }}>Edit</CButton>
                      <CButton style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteOrderDetail(detail.id)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setVisibleXL(false)}>Close</CButton>
          <CButton style={{ backgroundColor: '#107acc', color: 'white' }} onClick={() => {
            setVisibleMd2(true);
            setVisibleXL(false);
          }}>
            Add Order Detail
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal size="sm" visible={visibleEditDetail} onClose={() => setVisibleEditDetail(false)}>
        <CModalHeader>
          <CModalTitle>Edit Order Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditOrderDetail}>
            <CCol md={12}>
              <CFormSelect
                label="Material ID"
                defaultValue={selectedDetail?.material_id}
                name="material_id"
                required
              >
                <option value="">Choose...</option>
                {materials.map(material => (
                  <option key={material.id} value={material.id}>{material.name}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Quantity of Material"
                label="Quantity of Material"
                type="number"
                name="quantity_of_material"
                defaultValue={selectedDetail?.quantity_of_material}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Delivery Date"
                label="Delivery Date"
                type="date"
                name="delivery_date"
                defaultValue={selectedDetail?.delivery_date}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Status"
                defaultValue={selectedDetail?.status}
                name="status"
                required
              >
                <option>Pending</option>
                <option>Delivered</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Truck"
                name="truck_id"
                defaultValue={selectedDetail?.truck_id}
                required
              >
                <option value="">Choose...</option>
                {trucks.map(truck => (
                  <option key={truck.id} value={truck.id}>
                    {`Truck ID: ${truck.id}`}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Trip Duration (HH:MM:SS)"
                label="Trip Duration"
                name="trip_duration"
                defaultValue={selectedDetail?.trip_duration}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Distance to Travel (in km)"
                label="Distance to Travel"
                type="number"
                name="distancia_to_travel"
                defaultValue={selectedDetail?.distancia_to_travel}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Destination Address"
                label="Destination Address"
                name="destination_address"
                style={{ marginBottom: '10px' }}
                defaultValue={selectedDetail?.destination_address}
                required
              />
            </CCol>
            <CModalFooter>
              <CButton style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setVisibleEditDetail(false)}>Cancel</CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>Save Changes</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="sm" visible={visibleMd2} onClose={() => setVisibleMd2(false)}>
        <CModalHeader>
          <CModalTitle>Add Order Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddOrderDetail}>
            <CCol md={12}>
              <CFormSelect
                label="Material ID"
                value={newOrderDetail.material_id}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, material_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {Array.isArray(materials) && materials.map(material => (
                  <option key={material.id} value={material.id}>{material.name}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Quantity of Material"
                label="Quantity of Material"
                type="number"
                value={newOrderDetail.quantity_of_material}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, quantity_of_material: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Delivery Date"
                label="Delivery Date"
                type="date"
                value={newOrderDetail.delivery_date}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, delivery_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Status"
                value={newOrderDetail.status}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, status: e.target.value })}
                required
              >
                <option>Pending</option>
                <option>Delivered</option>
                <option>Canceled</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Truck"
                required
                value={newOrderDetail.truck_id}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, truck_id: e.target.value })}
              >
                <option value="">Choose...</option>
                {trucks.map(truck => {
                  const { driver } = getTruckAndDriverInfo(truck.id);
                  return (
                    <option key={truck.id} value={truck.id}>
                      {`Truck ID: ${truck.id} - Driver: ${driver.name}`}
                    </option>
                  );
                })}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Trip Duration (HH:MM:SS)"
                label="Trip Duration"
                type="text"
                value={newOrderDetail.trip_duration}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, trip_duration: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Distance to Travel (in km)"
                label="Distance to Travel"
                type="number"
                value={newOrderDetail.distancia_to_travel}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, distancia_to_travel: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Destination Address"
                label="Destination Address"
                style={{ marginBottom: '10px' }}
                value={newOrderDetail.destination_address}
                onChange={(e) => setNewOrderDetail({ ...newOrderDetail, destination_address: e.target.value })}
                required
              />
            </CCol>
            <CModalFooter>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>Add Detail</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default Order_details;