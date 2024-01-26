import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errormsg => {
    this.setState({errorMsg: errormsg, showErrorMsg: true})
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const JwtToken = Cookies.get('jwt+token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <h1>Jobby</h1>
        </div>
        <form onSubmit={this.submitForm}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            onChange={this.changeUserName}
            value={username}
          />
          <label htmlFor="password">USERNAME</label>
          <input
            id="password"
            type="password"
            onChange={this.changePassword}
            value={password}
          />
          <button type="submit">Login</button>
          {showErrorMsg && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
