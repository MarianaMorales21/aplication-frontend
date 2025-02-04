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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CFormSelect,
  CAlert,
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Materials = () => {
  const [visible, setVisible] = useState(false);
  const [visibleSm, setVisibleSm] = useState(false);
  const [visibleLg, setVisibleLg] = useState(false);
  const api = helpHttp();
  const urlMaterial = 'http://localhost:8000/material';

  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState({
    id: '',
    name: '',
    characteristics: '',
    cost_per_unit: '',
    cost_per_kilometer: '',
    status: ''
  });

  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [materialIdToDelete, setMaterialIdToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', color: '' });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const response = await api.get(urlMaterial);
    if (!response.err) {
      setMaterials(response);
    } else {
      showAlert('Error fetching materials. Please try again.', 'danger');
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    const response = await api.post(urlMaterial, { body: material });
    if (!response.err) {
      setMaterials([...materials, response]);
      setVisibleLg(false);
      showAlert('Material added successfully!', 'success');
      resetMaterialForm();
    } else {
      showAlert('Error adding material. Please try again.', 'danger');
    }
  };

  const handleEditMaterial = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlMaterial}/${material.id}`, { body: material });
    console.log("Response from API:", response);

    if (!response.err) {
      setMaterials(materials.map((m) => (m.id === material.id ? response : m)));
      setVisibleSm(false);
      showAlert('Material updated successfully!', 'success');
    } else {
      showAlert('Error updating material. Please try again.', 'danger');
    }
  };

  const handleDeleteMaterial = (id) => {
    setMaterialIdToDelete(id);
    setConfirmDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    const response = await api.del(`${urlMaterial}/${materialIdToDelete}`);
    if (!response.err) {
      setMaterials(materials.filter((m) => m.id !== materialIdToDelete));
      showAlert('Material deleted successfully!', 'success');
    } else {
      showAlert('Error deleting material. Please try again.', 'danger');
    }
    setConfirmDeleteModalVisible(false);
  };

  const showAlert = (message, color) => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: '' });
    }, 3000);
  };

  const resetMaterialForm = () => {
    setMaterial({
      id: '',
      name: '',
      characteristics: '',
      cost_per_unit: '',
      cost_per_kilometer: '',
      status: ''
    });
  };

  return (
    <div>
      <h1>List of Materials</h1>
      {alert.show && <CAlert color={alert.color}>{alert.message}</CAlert>}
      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }}
        variant="outline"
        onClick={() => {
          setVisibleLg(true);
          resetMaterialForm();
        }}
      >
        New Material
      </CButton>
      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Cost per unit</CTableHeaderCell>
            <CTableHeaderCell>Features</CTableHeaderCell>
            <CTableHeaderCell>Availability</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {materials?.map((material) => (
            <CTableRow key={material.id}>
              <CTableDataCell>{material.id}</CTableDataCell>
              <CTableDataCell>{material.name}</CTableDataCell>
              <CTableDataCell>{material.cost_per_unit}</CTableDataCell>
              <CTableDataCell>{material.characteristics}</CTableDataCell>
              <CTableDataCell>{material.cost_per_kilometer}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                  onClick={() => {
                    setMaterial(material);
                    setVisibleSm(true);
                  }}
                >
                  Edit
                </CButton>
                <CButton
                  style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                  onClick={() => handleDeleteMaterial(material.id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>


      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>New Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddMaterial}>
            <CCol md={6}>
              <CFormInput
                placeholder="ID"
                id="ID"
                label="ID"
                style={{ borderColor: 'black' }}
                value={material.id}
                onChange={(e) => setMaterial({ ...material, id: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Name"
                id="NameId"
                label="Name Material"
                style={{ borderColor: 'black' }}
                value={material.name}
                onChange={(e) => setMaterial({ ...material, name: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Characteristics"
                id="Characteristics"
                label="Characteristics"
                style={{ borderColor: 'black' }}
                value={material.characteristics}
                onChange={(e) => setMaterial({ ...material, characteristics: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Unit"
                label="Cost per Unit"
                placeholder="Cost per Unit"
                style={{ borderColor: 'black' }}
                value={material.cost_per_unit}
                onChange={(e) => setMaterial({ ...material, cost_per_unit: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Kilometer"
                label="Cost per Kilometer"
                placeholder="Cost per Kilometer"
                style={{ borderColor: 'black' }}
                value={material.cost_per_kilometer}
                onChange={(e) => setMaterial({ ...material, cost_per_kilometer: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="status"
                label="Status"
                style={{ borderColor: 'black' }}
                value={material.status}
                onChange={(e) => setMaterial({ ...material, status: e.target.value })}
                required
              >
                <option>Choose...</option>
                <option>Available</option>
                <option>Rough</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginRight: '10px',
                }}
                type="button"
                onClick={() => setVisibleLg(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc', color: 'white' }}
                type="submit"
              >
                Add Material
              </CButton>
            </CCol>
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
            style={{
              backgroundColor: 'green',
              marginRight: '10px',
              color: 'white',
            }}
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

      <CModal size="sm" visible={visibleSm} onClose={() => setVisibleSm(false)}>
        <CModalHeader>
          <CModalTitle>Edit Material</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditMaterial}>
            <CCol md={6}>
              <CFormInput
                placeholder="Name"
                id="NameId"
                label="Name Material"
                style={{ borderColor: 'black' }}
                value={material.name}
                onChange={(e) => setMaterial({ ...material, name: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder="Characteristics"
                id="Characteristics"
                label="Characteristics"
                style={{ borderColor: 'black' }}
                value={material.characteristics}
                onChange={(e) => setMaterial({ ...material, characteristics: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Unit"
                label="Cost per Unit"
                placeholder="Cost per Unit"
                style={{ borderColor: 'black' }}
                value={material.cost_per_unit}
                onChange={(e) => setMaterial({ ...material, cost_per_unit: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="Cost per Kilometer"
                label="Cost per Kilometer"
                placeholder="Cost per Kilometer"
                style={{ borderColor: 'black' }}
                value={material.cost_per_kilometer}
                onChange={(e) => setMaterial({ ...material, cost_per_kilometer: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                id="status"
                label="Status"
                style={{ borderColor: 'black' }}
                value={material.status}
                onChange={(e) => setMaterial({ ...material, status: e.target.value })}
                required
              >
                <option>Choose...</option>
                <option>Available</option>
                <option>Rough</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CButton
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginBottom: '10px',
                }}
                type="button"
                onClick={() => setVisibleSm(false)}
              >
                Cancel
              </CButton>
              <CButton
                style={{ backgroundColor: '#107acc', color: 'white' }}
                type="submit"
              >
                Save Changes
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default Materials;

