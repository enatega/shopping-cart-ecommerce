import Login from 'views/Login.jsx'
import Category from 'views/Category.jsx'
import Product from './views/Product'
import Orders from './views/Orders'
import Configuration from './views/Configuration'
import Users from './views/Users'
import Ratings from './views/Ratings'
import ResetPassword from './views/ForgotPassword'
import Coupons from './views/Coupons'
import Dashboard from './views/Dashboard'
import SubCategory from './views/SubCategory'
import Atttribute from './views/Atttribute'

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-tv-2',
    component: Dashboard,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/category',
    name: 'Category',
    icon: 'ni ni-chart-pie-35',
    component: Category,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/sub-category',
    name: 'Sub Category',
    icon: 'ni ni-chart-bar-32',
    component: SubCategory,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/attribute',
    name: 'Attribute',
    icon: 'ni ni-vector',
    component: Atttribute,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/product',
    name: 'Product',
    icon: 'ni ni-shop',
    component: Product,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/orders',
    name: 'Orders',
    icon: 'ni ni-delivery-fast',
    component: Orders,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-single-02',
    component: Users,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/ratings',
    name: 'Ratings',
    icon: 'fas fa-star',
    component: Ratings,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/configuration',
    name: 'Configuration',
    icon: 'ni ni-settings',
    component: Configuration,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/coupons',
    name: 'Coupons',
    icon: 'ni ni-single-copy-04',
    component: Coupons,
    layout: '/admin',
    appearInSidebar: true
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    appearInSidebar: false
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    icon: 'ni ni-key-25 text-info',
    component: ResetPassword,
    layout: '/auth',
    appearInSidebar: false
  }
]
export default routes
