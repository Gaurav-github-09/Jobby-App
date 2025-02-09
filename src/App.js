import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import Login from './components/Login'

import Jobs from './components/Jobs'

import NotFound from './components/NotFound'

import JobCard from './components/JobCard'

import './App.css'

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobCard} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
