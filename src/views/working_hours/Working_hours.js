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
} from '@coreui/react';
import { helpHttp } from '../../helpHttp';

const Working_hours = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [day, setDay] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const api = helpHttp();
  const urlWorkingHours = 'https://aplication-backend-production.up.railway.app/schedules';
  const urlDrivers = 'https://aplication-backend-production.up.railway.app/ormdriver';
  const urlUsers = 'https://aplication-backend-production.up.railway.app/ormusers';
  const urlDay = 'https://aplication-backend-production.up.railway.app/days';

  useEffect(() => {
    fetchWorkingHours();
    fetchDrivers();
    fetchUsers();
    fetchDay();
  }, []);

  const fetchWorkingHours = async () => {
    const response = await api.get(urlWorkingHours);
    if (!response.err) {
      setWorkingHours(response);
    }
  };

  const fetchDrivers = async () => {
    const response = await api.get(urlDrivers);
    if (!response.err) {
      setDrivers(response);
    }
  };

  const fetchDay = async () => {
    const response = await api.get(urlDay);
    if (!response.err) {
      setDay(response);
    }
  };

  const fetchUsers = async () => {
    const response = await api.get(urlUsers);
    if (!response.err) {
      setUsers(response);
    }
  };

  const handleAddWorkingHour = async (e) => {
    e.preventDefault();

    if (!selectedHour.driver_id || !selectedHour.day_id) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log(selectedHour);

    const response = await api.post(urlWorkingHours, { body: selectedHour });
    window.location.reload()
    if (!response.err) {
      setWorkingHours([...workingHours, response]);
      setVisibleAdd(false);
    }
  };

  const handleEditWorkingHour = async (e) => {
    e.preventDefault();

    if (!selectedHour.driver_id || !selectedHour.day_id) {
      alert('Please fill in all required fields.');
      return;
    }

    const response = await api.put(`${urlWorkingHours}/${selectedHour.id}`, { body: selectedHour });
    window.location.reload()
    if (!response.err) {
      setWorkingHours(workingHours.map(hour => (hour.id === selectedHour.id ? response : hour)));
      setVisibleEdit(false);
    }
  };

  const handleDeleteWorkingHour = async () => {
    const response = await api.del(`${urlWorkingHours}/${confirmDeleteId}`);
    if (!response.err) {
      setWorkingHours(workingHours.filter(hour => hour.id !== confirmDeleteId));
      setVisibleDelete(false);
    }
  };

  const openEditModal = (hour) => {
    setSelectedHour(hour);
    setVisibleEdit(true);
  };

  const openDeleteModal = (id) => {
    setConfirmDeleteId(id);
    setVisibleDelete(true);
  };

  const openAddModal = () => {
    setSelectedHour({ entry_time: '', exit_time: '', day_id: '', driver_id: '' });
    setVisibleAdd(true);
  };

  return (
    <div>
      <h1>List of Working Hours</h1>

      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white', marginBottom: '15px' }}
        onClick={openAddModal}
      >
        New Working Hours
      </CButton>

      <CTable style={{ border: '1px solid gray', borderRadius: '50px' }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Driver</CTableHeaderCell>
            <CTableHeaderCell>Entry Time</CTableHeaderCell>
            <CTableHeaderCell>Exit Time</CTableHeaderCell>
            <CTableHeaderCell>Day</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {workingHours.map((hour) => {
            const driver = drivers.find(driver => driver.id === hour.driver_id);
            const user = driver ? users.find(user => user.id === driver.user_id) : null;
            const dayItem = day.find(day => day.id === hour.day_id);

            return (
              <CTableRow key={hour.id}>
                <CTableDataCell>{user ? user.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>{hour.entry_time}</CTableDataCell>
                <CTableDataCell>{hour.exit_time}</CTableDataCell>
                <CTableDataCell>{dayItem ? dayItem.name : 'Unknown'}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
                    onClick={() => openEditModal(hour)}
                  >
                    Edit
                  </CButton>
                  <CButton
                    style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
                    onClick={() => openDeleteModal(hour.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>

      <CModal size="md" visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
        <CModalHeader>
          <CModalTitle>Add Working Hour</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddWorkingHour}>
            <CCol md={12}>
              <CFormSelect
                label="Select Driver"
                value={selectedHour?.driver_id}
                onChange={(e) => setSelectedHour({ ...selectedHour, driver_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {users.find(user => user.id === driver.user_id)?.name || 'Unknown'}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Entry Time"
                type="time"
                value={selectedHour?.entry_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, entry_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Exit Time"
                type="time"
                value={selectedHour?.exit_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, exit_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Day"
                value={selectedHour?.day_id}
                onChange={(e) => setSelectedHour({ ...selectedHour, day_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {day.map(dayItem => (
                  <option key={dayItem.id} value={dayItem.id}>{dayItem.name}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CModalFooter>
              <CButton
                type="button"
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => setVisibleAdd(false)}
              >
                Cancel
              </CButton>
              <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }}>
                Add Working Hour
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal size="sm" visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
        <CModalHeader>
          <CModalTitle> Edit Working Hours</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditWorkingHour}>
            <CCol md={12}>
              <CFormSelect
                label="Select Driver"
                value={selectedHour?.driver_id}
                onChange={(e) => setSelectedHour({ ...selectedHour, driver_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {users.find(user => user.id === driver.user_id)?.name || 'Unknown'}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Entry Time"
                type="time"
                value={selectedHour?.entry_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, entry_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Exit Time"
                type="time"
                value={selectedHour?.exit_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, exit_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormSelect
                label="Day"
                value={selectedHour?.day_id}
                onChange={(e) => setSelectedHour({ ...selectedHour, day_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {day.map(dayItem => (
                  <option key={dayItem.id} value={dayItem.id}>{dayItem.name}</option>
                ))}
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
                Edit Working Hour
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
        <CModalHeader>
          <CModalTitle> Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this working hour?</CModalBody>
        <CModalFooter>
          <CButton
            style={{ backgroundColor: 'green', marginRight: '10px', color: 'white' }}
            onClick={() => setVisibleDelete(false)}
          >
            Cancel
          </CButton>
          <CButton
            style={{ backgroundColor: 'red', marginRight: '10px', color: 'white' }}
            onClick={handleDeleteWorkingHour}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div >
  );
};

export default Working_hours;