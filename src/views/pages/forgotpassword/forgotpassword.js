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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSendResetLink = (e) => {
    e.preventDefault();
    setIsResetting(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigate('/');
    }, 2000);
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
      <CContainer style={{ position: 'relative', zIndex: 2 }}>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow-lg">
              <CCardBody className="p-4">
                {isResetting ? (
                  <>
                    <h1 className="text-center" style={{ color: 'black' }}>Reset Password</h1>
                    <p className="text-center text-muted">Enter your new password.</p>
                    <CForm onSubmit={handleResetPassword}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Token"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="New Password"
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Confirm Password"
                          required
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton style={{ backgroundColor: '#107acc', color: 'white' }} type="submit">
                          Reset Password
                        </CButton>
                      </div>
                    </CForm>
                  </>
                ) : (
                  <>
                    <h1 className="text-center" style={{ color: 'black' }}>Forgot Password</h1>
                    <p className="text-center text-muted">Enter your email address.</p>
                    <CForm onSubmit={handleSendResetLink}>
                      <CInputGroup className="mb-3 ">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email Address"
                          required
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton style={{ backgroundColor: '#107acc', color: 'white' }} type="submit">
                          Send Reset Link
                        </CButton>
                      </div>
                    </CForm>
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Password Reset</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Your password has been successfully changed.
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ForgotPassword;