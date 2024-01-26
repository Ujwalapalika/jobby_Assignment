import {Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/Not Found'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/login" Component={Login} />
    <ProtectedRoute exact path="/" Component={Home} />
    <ProtectedRoute exact path="/jobs" Component={Jobs} />
    <ProtectedRoute exact path="/not-found" Component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
