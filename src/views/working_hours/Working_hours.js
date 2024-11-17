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
  CContainer
} from '@coreui/react';
import { helpHttp } from '../../helpHttp'; 
const Working_hours = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]); 
  const [schedules, setSchedules] = useState([]); 
  const [day, setDay] = useState([]); 
  const [selectedHour, setSelectedHour] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const api = helpHttp();
  const urlWorkingHours = 'http://localhost:8000/driver_schedule'; 
  const urlDrivers = 'http://localhost:8000/driver';
  const urlUsers = 'http://localhost:8000/users'; 
  const urlSchedules = 'http://localhost:8000/schedule'; 
  const urlDay = 'http://localhost:8000/day';

  useEffect(() => {
    fetchWorkingHours();
    fetchDrivers();
    fetchUsers(); 
    fetchSchedules(); 
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

  const fetchSchedules = async () => {
    const response = await api.get(urlSchedules); 
    if (!response.err) {
      setSchedules(response);
    }
  };

  const handleEditWorkingHour = async (e) => {
    e.preventDefault();
    const response = await api.put(`${urlWorkingHours}/${selectedHour.id}`, { body: selectedHour });
    if (!response.err) {
      setWorkingHours(workingHours.map(hour => (hour.id === selectedHour.id ? response : hour)));
      setVisibleEdit(false);
    }
  };

  const handleAddWorkingHour = async (e) => {
    e.preventDefault();
    const response = await api.post(urlWorkingHours, { body: selectedHour });
    if (!response.err) {
      setWorkingHours([...workingHours, response]);
      setVisibleAdd(false);
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
    setSelectedHour({ entry_time: '', exit_time: '', day_id: '', driver_id: '', schedule_id: '' });
    setVisibleAdd(true);
  };

  const handleScheduleChange = (scheduleId) => {
    const selectedSchedule = schedules.find(schedule => schedule.id === scheduleId);
    if (selectedSchedule) {
      setSelectedHour(prev => ({
        ...prev,
        entry_time: selectedSchedule.entry_time,
        exit_time: selectedSchedule.exit_time,
        schedule_id: scheduleId,
      }));
    }
  };

  return (
    <div>
      <h1>List of Working Hours</h1>
      
      <CNavbar style={{ border: '1px solid gray', borderRadius: '10px', marginBottom: '10px' }}>
        <CContainer style={{ display: 'flex' }}>
          <h6>Current Fleet: {workingHours.length}</h6>
        </CContainer>
      </CNavbar>

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

      <CButton
        type="button"
        style={{ backgroundColor: '#107acc', color: 'white' }}
        onClick={openAddModal}
      >
        New Working Hours
      </CButton>

      <CModal size="lg" visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
        <CModalHeader>
          <CModalTitle>Add Working Hour</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddWorkingHour}>
            <CCol md={6}>
              <CFormSelect
                label="Select Driver"
                value={selectedHour?.driver_id}
                onChange={(e) => setSelectedHour({ ...selectedHour, driver_id: e.target.value })}
                required
              >
                <option value="">Choose...</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>{users.find(user => user.id === driver.user_id)?.name || 'Unknown'}</option>
                ))}
              </CFormSelect>
              <CFormSelect
                label="Select Schedule"
                onChange={(e) => handleScheduleChange(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                {schedules.map(schedule => (
                  <option key={schedule.id} value={schedule.id}>
                    {`Schedule ${schedule.id}: ${schedule.entry_time} - ${schedule.exit_time}`}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Entry Time"
                value={selectedHour?.entry_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, entry_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="Exit Time"
                value={selectedHour?.exit_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, exit_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
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
          <CModalTitle>Edit Working Hours</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditWorkingHour}>
            <CCol md={12}>
              <CFormSelect
                label="Select Schedule"
                onChange={(e) => handleScheduleChange(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                {schedules.map(schedule => (
                  <option key={schedule.id} value={schedule.id}>
                    {`Schedule ${schedule.id}: ${schedule.entry_time} - ${schedule.exit_time}`}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Entry Time"
                value={selectedHour?.entry_time}
                onChange={(e) => setSelectedHour({ ...selectedHour, entry_time: e.target.value })}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Exit Time"
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
    </div>
  );
};

export default Working_hours;