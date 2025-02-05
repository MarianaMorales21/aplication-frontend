import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { helpHttp } from '../../../helpHttp'

const api = helpHttp()

const Login = () => {
  const url = 'http://localhost:8000/users'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const usersRes = await api.get(url)

      if (!usersRes.err) {

        const user = usersRes.find(
          (user) => user.username === username && user.password === password,
        )

        if (user) {
          console.log('Login successful:', user)
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/dashboard')
        } else {
          setErrorMessage('Invalid username or password')
        }
      } else {
        setErrorMessage('Error fetching user data')
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.')
    }
  }

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
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{ backgroundColor: '#107acc', color: 'white' }}
              >
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <h5 className="text-body-secondary" style={{ color: 'white' }}>
                      Sign In to your account
                    </h5>
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
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          style={{
                            backgroundColor: '#107acc',
                            borderColor: 'black',
                            color: 'white',
                          }}
                          className="px-4"
                        >
                          Login
                        </CButton>
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
              <CCard style={{ width: '44%', backgroundColor: '#84b6f4' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      You are not registered? Do it now and you will have access to all our services
                      allowing you to have information instantly.
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
