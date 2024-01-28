import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

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
      <div className="login_container">
        <form className="form_container" onSubmit={this.submitForm}>
          <div className="logo_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label htmlFor="USERNAME" className="form_label">
            USERNAME
          </label>
          <input
            id="USERNAME"
            type="text"
            onChange={this.changeUserName}
            value={username}
            className="form_input"
          />
          <br />
          <label htmlFor="password" className="form_label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            onChange={this.changePassword}
            value={password}
            className="form_input"
          />
          <br />
          <button type="submit" className="form_submit">
            Login
          </button>
          {showErrorMsg && <p className="err">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
