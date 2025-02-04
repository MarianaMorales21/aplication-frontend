/*import React, { useEffect, useState } from 'react';
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
    CModalTitle,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [clients, setClients] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [users, setUsers] = useState([]);
    const [visibleNew, setVisibleNew] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState({
        id: '',
        order_id: orderId,
        material_id: '',
        quantity_of_material: '',
        delivery_date: '',
        destination_address: '',
        status: 'En Proceso',
        truck_id: '',
        trip_duration: '',
        distancia_to_travel: 150,
    });
    const [deleteIndex, setDeleteIndex] = useState(null);
    const api = helpHttp();
    const urlOrders = 'http://localhost:8000/order';
    const urlOrderDetails = 'http://localhost:8000/order_details';
    const urlClients = 'http://localhost:8000/client';
    const urlUsers = 'http://localhost:8000/users';
    const urlMaterials = 'http://localhost:8000/material';
    const urlDriver = 'http://localhost:8000/driver';
    const urlTruck = 'http://localhost:8000/truck';

    useEffect(() => {
        fetchOrder();
        fetchOrderDetails();
        fetchMaterials();
        fetchClients();
        fetchUsers();
        fetchDriver();
    }, [orderId]);

    const fetchOrder = async () => {
        const response = await api.get(`${urlOrders}/${orderId}`);
        if (!response.err) {
            setOrder(response);
        }
    };

    const fetchOrderDetails = async () => {
        const response = await api.get(`${urlOrderDetails}?order_id=${orderId}`);
        if (!response.err) {
            setOrderDetails(response);
        }
    };

    const fetchMaterials = async () => {
        const response = await api.get(urlMaterials);
        if (!response.err) {
            setMaterials(response);
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

    const fetchDriver = async () => {
        const response = await api.get(urlDriver);
        if (!response.err) {
            setDrivers(response);
        }
    };

    const handleAddMaterial = async (e) => {
        e.preventDefault();
        const newMaterial = {
            ...selectedDetail,
            order_id: orderId,
            status: "En Proceso",
        };

        const response = await api.post(urlOrderDetails, newMaterial);
        if (!response.err) {
            setOrderDetails([...orderDetails, response]);
            setVisibleNew(false);
            resetForm();
        };

        const handleEditMaterial = async (e) => {
            e.preventDefault();
            const response = await api.put(`${urlOrderDetails}/${selectedDetail.id}`, selectedDetail);
            if (!response.err) {
                setOrderDetails(orderDetails.map(detail => (detail.id === selectedDetail.id ? response : detail)));
                setVisibleEdit(false);
            }
        };

        const handleDeleteMaterial = (index) => {
            setDeleteIndex(index);
            setConfirmDeleteModalVisible(true);
        };

        const confirmDelete = async () => {
            const response = await api.delete(`${urlOrderDetails}/${orderDetails[deleteIndex].id}`);
            if (!response.err) {
                setOrderDetails(orderDetails.filter((_, index) => index !== deleteIndex));
            }
            setConfirmDeleteModalVisible(false);
        };

        const resetForm = () => {
            setSelectedDetail({
                id: '',
                order_id: orderId,
                material_id: '',
                quantity_of_material: '',
                delivery_date: '',
                destination_address: '',
                status: 'En Proceso',
                truck_id: '',
                trip_duration: '',
                distancia_to_travel: 150,
            });
        };

        const handleEditClick = (detail) => {
            setSelectedDetail(detail);
            setVisibleEdit(true);
        };

        const handleNewClick = () => {
            resetForm();
            setVisibleNew(true);
        };

        if (!order) return <div>No encontrado</div>;
        const client = clients.find(client => client.id === order.client_id);
        const user = users.find(user => user.id === client.user_id);

        return (
            <CContainer>
                <h3>Order #{order.id}</h3>
                <h6>Name: {user ? user.name : 'Desconocido'}</h6>
                <h6>Total Delivery Date: {order.total_delivery_date}</h6>
                <h6>Status: {order.status}</h6>
                <h6>Materials</h6>

                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Material</CTableHeaderCell>
                            <CTableHeaderCell>Cantidad</CTableHeaderCell>
                            <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
                            <CTableHeaderCell>Dirección de Destino</CTableHeaderCell>
                            <CTableHeaderCell>Opciones</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {orderDetails.map((detail, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{materials.find(mat => mat.id === detail.material_id)?.name || 'Desconocido'}</CTableDataCell>
                                <CTableDataCell>{detail.quantity_of_material}</CTableDataCell>
                                <CTableDataCell>{detail.delivery_date}</CTableDataCell>
                                <CTableDataCell>{detail.destination_address}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton
                                        style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                                        onClick={() => handleEditClick(detail)}
                                    >
                                        Edit
                                    </CButton>
                                    <CButton
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        onClick={() => handleDeleteMaterial(index)}
                                    >
                                        Delete
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>

                <CButton
                    style={{ backgroundColor: '#107acc', color: 'white', marginTop: '10px' }}
                    onClick={handleNewClick}
                >
                    New Material
                </CButton>

                <CModal size="lg" visible={visibleNew} onClose={() => setVisibleNew(false)}>
                    <CModalHeader>
                        <CModalTitle>Add New Material</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={handleAddMaterial}>
                            <CCol md={12}>
                                <CFormSelect
                                    label="Select Material"
                                    value={selectedDetail.material_id}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, material_id: e.target.value })}
                                    required
                                >
                                    <option value="">Choose...</option>
                                    {materials.map(material => (
                                        <option key={material.id} value={material.id}>
                                            {material.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    placeholder="Cantidad"
                                    label="Cantidad"
                                    value={selectedDetail.quantity_of_material}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, quantity_of_material: e.target.value })}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    type="date"
                                    label="Fecha de Entrega"
                                    value={selectedDetail.delivery_date}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, delivery_date: e.target.value })}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    placeholder="Dirección de Destino"
                                    label="Dirección de Destino"
                                    value={selectedDetail.destination_address}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, destination_address: e.target.value })}
                                    required
                                />
                            </CCol>
                            <CModalFooter>
                                <CButton
                                    type="button"
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                    onClick={() => setVisibleNew(false)}
                                >
                                    Cancel
                                </CButton>
                                <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                                    Add Material
                                </CButton>
                            </CModalFooter>
                        </CForm>
                    </CModalBody>
                </CModal>

                <CModal size="lg" visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                    <CModalHeader>
                        <CModalTitle>Edit Material</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={handleEditMaterial}>
                            <CCol md={12}>
                                <CFormSelect
                                    label="Select Material"
                                    value={selectedDetail.material_id}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, material_id: e.target.value })}
                                    required
                                >
                                    <option value="">Choose...</option>
                                    {materials.map(material => (
                                        <option key={material.id} value={material.id}>
                                            {material.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    placeholder="Cantidad"
                                    label="Cantidad"
                                    value={selectedDetail.quantity_of_material}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, quantity_of_material: e.target.value })}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    type="date"
                                    label="Fecha de Entrega"
                                    value={selectedDetail.delivery_date}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, delivery_date: e.target.value })}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    placeholder="Dirección de Destino"
                                    label="Dirección de Destino"
                                    value={selectedDetail.destination_address}
                                    onChange={(e) => setSelectedDetail({ ...selectedDetail, destination_address: e.target.value })}
                                    required
                                />
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
                    <CModalBody>Are you sure you want to delete this material?</CModalBody>
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
            </CContainer>
        );
    };

    export default Details;*/