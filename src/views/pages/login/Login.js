import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
const Login = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" >
      <CContainer style={{ borderColor: 'black' }}>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
              >
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <h5 className="text-body-secondary" style={{ Color: 'white' }}>
                      Sign In to your account
                    </h5>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <Link to={'/Users'}>
                          <CButton
                            style={{
                              backgroundColor: '#107acc',
                              borderColor: 'black',
                              color: 'white',
                            }}
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgotpassword">
                          <CButton color="link" style={{ color: 'white' }} className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard style={{ width: '44%', backgroundColor: '#84b6f4', borderColor: 'black' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      You are not registered?, do it now and you will have access to all our
                      services allowing you to have information instantly
                    </p>
                    <Link to="/register">
                      <CButton
                        style={{ backgroundColor: '#107acc', borderColor: 'black', color: 'white' }}
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
