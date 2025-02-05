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
  CNavbar,
  CContainer,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Flota = () => {
  const [visibleND, setVisibleND] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [truckIdToDelete, setTruckIdToDelete] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState({
    id: '',
    driver_id: '',
    operational: '',
    usage_reports: '',
    mileage: '',
    model_id: '',
  });

  const api = helpHttp();
  const urlTrucks = 'https://aplication-backend-production.up.railway.app/trucks';
  const urlUsers = 'https://aplication-backend-production.up.railway.app/ormusers';
  const urlDrivers = 'https://aplication-backend-production.up.railway.app/ormdriver';
  const urlModels = 'https://aplication-backend-production.up.railway.app/model';

  useEffect(() => {
    fetchTrucks();
    fetchUsers();
    fetchDrivers();
    fetchModels();
  }, []);

  const fetchTrucks = async () => {
    const response = await api.get(urlTrucks);
    if (!response.err) {
      setTrucks(response);
    }
  };

  const fetchUsers = async () => {
    const response = await api.get(urlUsers);
    if (!response.err) {
      setUsers(response);
    }
  };

  const fetchDrivers = async () => {
    const response = await api.get(urlDrivers);
    if (!response.err) {
      setDrivers(response);
    }
  };

  const fetchModels = async () => {
    const response = await api.get(urlModels);
    if (!response.err) {
      setModels(response);
    }
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    const response = await api.post(urlTrucks, { body: selectedTruck });
    if (!response.err) {
      setTrucks([...trucks, response]);
      setVisibleND(false);
      resetForm();
    }
  };

  const handleEditTruck = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlTrucks}/${selectedTruck.id}`, { body: selectedTruck });
    if (!response.err) {
      setTrucks(trucks.map(truck => (truck.id === selectedTruck.id ? response : truck)));
      setVisibleEdit(false);
    }
  };

  const handleDeleteTruck = (id) => {
    setTruckIdToDelete(id);
    setConfirmDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const response = await api.del(`${urlTrucks}/${truckIdToDelete}`);
    if (!response.err) {
      setTrucks(trucks.filter(truck => truck.id !== truckIdToDelete));
    }
    setConfirmDeleteModalVisible(false);
  };

  const resetForm = () => {
    setSelectedTruck({
      id: '',
      driver_id: '',
      operational: '',
      usage_reports: '',
      mileage: '',
      model_id: '',
    });
  };

  return (
    <div>
      <h1>List of Trucks</h1>

      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }}
        onClick={() => {
          setVisibleND(true);
          resetForm();
        }}
      >
        New Truck
      </CButton>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Truck License Plate</CTableHeaderCell>
            <CTableHeaderCell>Driver Name</CTableHeaderCell>
            <CTableHeaderCell>Model</CTableHeaderCell>
            <CTableHeaderCell>Operational Status</CTableHeaderCell>
            <CTableHeaderCell>Mileage</CTableHeaderCell>
            <CTableHeaderCell>Usage Reports</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {trucks.map((truck) => {
            const driver = drivers.find(driver => driver.id === truck.driver_id);
            const model = models.find(model => model.id === truck.model_id);
            return (
              <CTableRow key={truck.id}>
                <CTableDataCell>{truck.id}</CTableDataCell>
                <CTableDataCell>{driver ? users.find(user => user.id === driver.user_id)?.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{model ? model.name_brand : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{truck.operational}</CTableDataCell>
                <CTableDataCell>{truck.mileage}</CTableDataCell>
                <CTableDataCell>{truck.usage_reports}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                    onClick={() => {
                      setSelectedTruck(truck);
                      setVisibleEdit(true);
                    }}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => handleDeleteTruck(truck.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>

      <CModal visible={confirmDeleteModalVisible} onClose={() => setConfirmDeleteModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this truck?</CModalBody>
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


      <CModal size="lg" visible={visibleND} onClose={() => setVisibleND(false)}>
        <CModalHeader>
          <CModalTitle>Add New Truck</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddTruck}>
            <CCol md={12}>
              <CFormInput
                placeholder="Truck ID"
                label="Truck ID"
                value={selectedTruck.id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Driver"
                value={selectedTruck.driver_id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, driver_id: e.target.value })}
                required
              >
                <option value=""> Choose...</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {users.find(user => user.id === driver.user_id)?.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Model"
                value={selectedTruck.model_id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, model_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name_brand} - {model.year_of_creation} - {model.capacity}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Operational Status"
                value={selectedTruck.operational}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, operational: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Active</option>
                <option>Inactive</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Mileage"
                label="Mileage"
                value={selectedTruck.mileage}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, mileage: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Usage Reports"
                label="Usage Reports"
                value={selectedTruck.usage_reports}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, usage_reports: e.target.value })}
                required
              />
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
                Add Truck
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="lg" visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
        <CModalHeader>
          <CModalTitle>Edit Truck</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditTruck}>
            <CCol md={12}>
              <CFormInput
                placeholder="Truck License Plate"
                label="Truck License Plate"
                value={selectedTruck.id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Driver"
                value={selectedTruck.driver_id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, driver_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {users.find(user => user.id === driver.user_id)?.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Select Model"
                value={selectedTruck.model_id}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, model_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name_brand} - {model.year_of_creation} - {model.capacity}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Operational Status"
                value={selectedTruck.operational}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, operational: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                <option>Active</option>
                <option>Inactive</option>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Mileage"
                label="Mileage"
                value={selectedTruck.mileage}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, mileage: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                placeholder="Usage Reports"
                label="Usage Reports"
                value={selectedTruck.usage_reports}
                onChange={(e) => setSelectedTruck({ ...selectedTruck, usage_reports: e.target.value })}
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
    </div>
  );
};

export default Flota;