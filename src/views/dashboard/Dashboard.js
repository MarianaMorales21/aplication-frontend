import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CProgress,
  CTableDataCell
} from '@coreui/react';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';
import { helpHttp } from '../../helpHttp';

const Dashboard = () => {
  const [progressExample, setProgressExample] = useState([]);
  const [usersWithDrivers, setUsersWithDrivers] = useState([]);
  const [driversWithUsers, setDriversWithUsers] = useState([]);
  const api = helpHttp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlMaterial = await api.get('https://aplication-backend-production.up.railway.app/material');
        const urlUsers = await api.get('https://aplication-backend-production.up.railway.app/ormusers');
        const urlDriver = await api.get('https://aplication-backend-production.up.railway.app/ormdriver');
        const urlOrder = await api.get('https://aplication-backend-production.up.railway.app/orders');
        const urlTruck = await api.get('https://aplication-backend-production.up.railway.app/trucks');
        const urlUsersWithDrivers = await api.get('https://aplication-backend-production.up.railway.app/users-with-drivers');
        const urlDriversWithUsers = await api.get('https://aplication-backend-production.up.railway.app/drivers-with-users');

        const processedData = [
          { title: 'Materials', value: `${urlMaterial.length} Materials`, percent: 100, color: 'success' },
          { title: 'Users', value: `${urlUsers.length} Users`, percent: 100, color: 'info' },
          { title: 'Drivers', value: `${urlDriver.length} Drivers`, percent: 60, color: 'warning' },
          { title: 'Orders', value: `${urlOrder.length} Orders`, percent: 80, color: 'danger' },
          { title: 'Truck', value: `${urlTruck.length} Truck`, percent: 40, color: 'primary' },
        ];

        setProgressExample(processedData);
        setUsersWithDrivers(urlUsersWithDrivers);
        setDriversWithUsers(urlDriversWithUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const usersWithDriverDetails = usersWithDrivers.map(user => {
    return {
      ...user,
      limitations: user.driver ? user.driver.limitations : 'N/A'
    };
  });

  const driversWithUserDetails = driversWithUsers.map(driver => {
    const user = usersWithDrivers.find(user => user.id === driver.user_id);
    return {
      ...driver,
      userName: user ? user.name : 'Unknown',
      userDni: user ? user.dni : 'N/A'
    };
  });

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
            </CCol>
          </CRow>
          <MainChart />

          <CRow className="mt-4">
            <CCol sm={6}>
              <h5>Users with Drivers</h5>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>User ID</CTableHeaderCell>
                    <CTableHeaderCell>User Name</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>DNI</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {usersWithDriverDetails.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableDataCell>{user.id}</CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.status}</CTableDataCell>
                      <CTableDataCell>{user.dni}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>

            <CCol sm={6}>
              <h5>Drivers with Users</h5>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Driver ID</CTableHeaderCell>
                    <CTableHeaderCell>Driver Name</CTableHeaderCell>
                    <CTableHeaderCell>Limitations</CTableHeaderCell>
                    <CTableHeaderCell>User DNI</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {driversWithUserDetails.map((driver) => (
                    <CTableRow key={driver.id}>
                      <CTableDataCell>{driver.id}</CTableDataCell>
                      <CTableDataCell>{driver.userName}</CTableDataCell>
                      <CTableDataCell>{driver.limitations}</CTableDataCell>
                      <CTableDataCell>{driver.userDni}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default Dashboard;