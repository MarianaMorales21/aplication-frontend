import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
  cilContact,
  cilPeople,
  cilAsteriskCircle,
  cilTruck,
  cilTerrain,
  cilGrain,
  cilPaperPlane
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/Users',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: '/clients',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Drivers',
    to: '/drivers',
    icon: <CIcon icon={cilAsteriskCircle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Generial Information',
        to: '/Drivers',
      },
      {
        component: CNavItem,
        name: 'Working hours',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Trucks',
    to: '/buttons',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Order',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Order Details',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Invoices Control',
        to: '/forms/form-control',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Trips',
     to: '/buttons/buttons',
    icon: <CIcon icon={cilPaperPlane} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Materials',
     to: '/buttons/buttons',
    icon: <CIcon icon={cilTerrain} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Flota',
     to: '/buttons/buttons',
    icon: <CIcon icon={cilGrain} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
    ],
  },
]

export default _nav
