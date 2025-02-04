import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { helpHttp } from '../../helpHttp';

const Details = () => {

  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [details, setdetails] = useState([]);
  const [material, setmaterial] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [trip, setTrip] = useState([])
  const [truck, setTruck] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [visibleMd, setVisibleMd] = useState(false);
  const [visibleMd2, setVisibleMd2] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectOrder, setSelectOrder] = useState({
    id: '',
    order_id: '',
    material_id: '',
    quantity_of_material: '',
    delivery_date: '',
  });
  const api = helpHttp();
  const urlOrders = 'http://localhost:8000/order';
  const urlClients = 'http://localhost:8000/client';
  const urlUsers = 'http://localhost:8000/users';
  const urlDriver = 'http://localhost:8000/driver';
  const urlDetails = 'http://localhost:8000/order_details';
  const urlTruck = 'http://localhost:8000/truck';
  const urlTrips = 'http://localhost:8000/trips';
  const urlMaterial = 'http://localhost:8000/material';

  useEffect(() => {
    fetchOrders();
    fetchClients();
    fetchUsers();
    fetchDriver();
    fetchDetails();
    fetchTruck();
    fetchTrips();
    fetchMaterial();
  }, [orderId]);

  const fetchOrders = async () => {
    const response = await api.get(`${urlOrders}/${orderId}`);
    if (!response.err) {
      setOrder(response);
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

  const fetchTrips = async () => {
    const response = await api.get(urlTrips);
    if (!response.err) {
      setUsers(response);
    }
  };

  const fetchDetails = async () => {
    const response = await api.get(urlDetails);
    if (!response.err) {
      setUsers(response);
    }
  };

  const fetchMaterial = async () => {
    const response = await api.get(urlMaterial);
    if (!response.err) {
      setMaterials(response);
    }
  };

  const fetchTruck = async () => {
    const response = await api.get(urlTruck);
    if (!response.err) {
      setTruck(response);
    }
  };

  const fetchDriver = async () => {
    const response = await api.get(urlDriver);
    if (!response.err) {
      setDrivers(response);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setFormData(materials[index]);
  };

  const handleSaveClick = () => {
    const updatedMaterials = [...materials];
    updatedMaterials[editIndex] = formData;
    setMaterials(updatedMaterials);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  if (!order) return <div>No encontrado</div>;
  const client = clients.find(client => client.id === order.client_id);
  const user = client ? users.find(user => user.id === client.user_id) : null;
  console.log(order.client_id)
  console.log(details.material_id)
  return (
    <CContainer>
      <div>

        <h3>Order #{order.id}</h3>
        <h6>Name: {user ? user.name : 'Desconocido'}</h6>
        <h6>Total Delivery Date: {order.total_delivery_date}</h6>
        <h6>Status: {order.status}</h6>
        <h6>Materials</h6>

        {materials.map((material, index) => (
          setSelectOrder(order),
          <CContainer key={index} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
            <h5>Material #{index + 1}</h5>
            <CRow>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Material"
                  name="material"
                  value={editIndex === index ? setSelectOrder.material_id : material.name}
                  onChange={handleChange}
                  label="Material"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Amount of material"
                  name="quantity"
                  value={editIndex === index ? setSelectOrder.quantity : material.quantity}
                  onChange={handleChange}
                  label="Amount of material"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  name="deliveryDate"
                  label="Material delivery date"
                  type="date"
                  value={editIndex === index ? setSelectOrder.deliveryDate : material.deliveryDate}
                  onChange={handleChange}
                  disabled={editIndex !== index}
                />
              </CCol>

              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Driver"
                  name="driver"
                  value={editIndex === index ? formData.driver : material.driver || ''}
                  onChange={handleChange}
                  label="Assigned driver"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Truck"
                  name="Truck"
                  value={editIndex === index ? formData.driver : material.driver || ''}
                  onChange={handleChange}
                  label="Assigned truck"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Trip Duration"
                  name="tripDuration"
                  type='time'
                  value={editIndex === index ? formData.tripDuration : material.tripDuration || ''}
                  onChange={handleChange}
                  label="Trip Duration"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Distance to travel"
                  name="distance"
                  value={editIndex === index ? formData.distance : material.distance || ''}
                  onChange={handleChange}
                  label="Distance To Travel"
                  disabled={editIndex !== index}
                />
              </CCol>
              <CCol md={4} style={{ marginBottom: '5px' }}>
                <CFormInput
                  placeholder="Destination Address"
                  name="address"
                  value={editIndex === index ? formData.address : material.address}
                  onChange={handleChange}
                  label="Destination Address"
                  disabled={editIndex !== index}
                />
              </CCol>
            </CRow>
            <div style={{ marginTop: '20px' }}>
              {editIndex === index ? (
                <CButton
                  style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
                  onClick={handleSaveClick}
                >
                  Save
                </CButton>
              ) : (
                <CButton
                  style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </CButton>
              )}
              <CButton
                style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                onClick={() => setVisibleMd(true)}>
                Delete
              </CButton>
            </div>
          </CContainer>
        ))}
      </div>
      <CButton
        style={{ backgroundColor: '#107acc', color: 'white', marginRight: '10px' }}
        onClick={() => setVisibleMd2(true)}>
        New Material
      </CButton>
      <CModal fullscreen="md" visible={visibleMd} onClose={() => setVisibleMd(false)}>
        <CModalHeader>
          <CModalTitle>Attention</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure to remove this material from your order?</CModalBody>
        <CModalFooter>
          <CButton
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',

            }}
            onClick={() => setVisibleMd(false)}
          >
            Cancel
          </CButton>
          <CButton
            style={{
              backgroundColor: 'red',
              marginRight: '10px',
              color: 'white',

            }}
            onClick={() => setVisibleMd(false)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal fullscreen="md" visible={visibleMd2} onClose={() => setVisibleMd2(false)}>
        <CModalHeader>
          <CModalTitle>New Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol md={6}>
            <CFormSelect id="Materials" label="Order Material" style={{ borderColor: 'black' }}>
              <option>Choose...</option>
              <option>Grava</option>
              <option>Arena</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormInput
              placeholder="Amount of material"
              id="Materialid"
              label="Amount of material"
              style={{ borderColor: 'black' }}
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              id="dateD"
              label="Material delivery date"
              type="date"
              style={{ borderColor: 'black' }}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              placeholder="Address"
              id="Address"
              label="Address"
              style={{ borderColor: 'black' }}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',

            }}
            onClick={() => setVisibleMd2(false)}
          >
            Cancel
          </CButton>
          <CButton
            style={{
              backgroundColor: 'red',
              marginRight: '10px',
              color: 'white',

            }}
            onClick={() => setVisibleMd2(false)}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Details;
