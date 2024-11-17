import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Forgotpassword = React.lazy(() => import('./views/pages/forgotpassword/forgotpassword'))
const Users= React.lazy(() => import('./views/Users/Users'))
const Clients= React.lazy(() => import('./views/clients/Clients'))
const Drivers= React.lazy(() => import('./views/drivers/Drivers'))
const Materials= React.lazy(()=> import('./views/materials/Materials'))
const Flota= React.lazy(()=> import('./views/flota/flota'))
const Invoices= React.lazy(()=> import('./views/invoices/Invoices'))
const Working_hours= React.lazy(()=> import('./views/working_hours/Working_hours'))
const Order_details= React.lazy(()=> import('./views/order_details/Order_details'))
const Profile= React.lazy(()=> import('./views/profile/Profile'))
const Login= React.lazy (()=> import('./views/pages/login/Login'))
const routes = [
  { path: '/', exact: true, name: 'Login', element: Login},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/forgotpassword', name: 'forgotpassword', element: Forgotpassword},
  { path: '/Users', name: 'Users', element: Users},
  { path: '/clients', name:'Clients', element: Clients},
  { path: '/drivers', name:'Drivers', element: Drivers},
  { path: '/materials', name:'Materials', element: Materials},
  { path: '/flota', name:'Flota', element: Flota},
  { path: '/invoices', name:'Invoices', element: Invoices},
  { path: '/working_hours', name:'Working Hours', element: Working_hours},
  { path: '/order_details', name:'Order Details', element: Order_details},
  { path: '/profile', name:'Profile', element: Profile},
]

export default routes
