import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = () => {
  const logout = () => {
    Cookies.remove('jwt_token')
  }
  return (
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
