import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';
import { helpHttp } from '../../helpHttp';

const Dashboard = () => {
  const [progressExample, setProgressExample] = useState([]);
  const api = helpHttp();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlMaterial = await api.get('http://localhost:8080/material');
        const urlUsers = await api.get('http://localhost:8080/ormusers');
        const urlDriver = await api.get('http://localhost:8080/ormdriver');
        const urlOrder = await api.get('http://localhost:8080/orders');
        const urlTruck = await api.get('http://localhost:8080/trucks');

        const processedData = [
          { title: 'Materials', value: `${urlMaterial.length} Materials`, percent: 100, color: 'success' },
          { title: 'Users', value: `${urlUsers.length} Users`, percent: 100, color: 'info' },
          { title: 'Drivers', value: `${urlDriver.length} Drivers`, percent: 60, color: 'warning' },
          { title: 'Orders', value: `${urlOrder.length} Orders`, percent: 80, color: 'danger' },
          { title: 'Truck', value: `${urlTruck.length} Truck`, percent: 40, color: 'primary' },
        ];

        setProgressExample(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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