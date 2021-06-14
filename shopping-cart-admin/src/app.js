import React from 'react'
import AdminLayout from 'layouts/Admin.jsx'
import AuthLayout from 'layouts/Auth.jsx'
import { PrivateRoute } from './views/PrivateRoute'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/admin"
          component={props => <AdminLayout {...props} />}
        />
        <Route path="/auth" component={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  )
}
export default App
