import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { helpHttp } from '../../../helpHttp';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Administrator');
  const [address, setAddress] = useState('');
  const [dni, setDni] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const api = helpHttp();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await api.post('https://aplication-backend-production.up.railway.app/register', {
        body: {
          username,
          name,
          email,
          password,
          phone,
          role,
          address,
          dni,
        },
        credentials: 'include',
      });

      if (!response.err) {
        console.log('Registration successful:', response);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: `url(https://hdp-au-prod-app-iecon-sunburyeco-files.s3.ap-southeast-2.amazonaws.com/7515/8812/6161/Komatsu-Hi-Quality-040.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}>
      </div>
      <CContainer style={{ zIndex: 2 }}>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat Password"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>📞</CInputGroupText>
                    <CFormInput
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>👤</CInputGroupText>
                    <CFormSelect
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="Driver">Driver</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Client">Client</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>🏠</CInputGroupText>
                    <CFormInput
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>🆔</CInputGroupText>
                    <CFormInput
                      placeholder="DNI"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CButton type="submit" style={{ backgroundColor: '#107acc', color: 'white' }} className="px-4">Register</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;