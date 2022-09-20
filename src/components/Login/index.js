import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorOnSubmit: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorOnSubmit: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, errorOnSubmit} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="login-content">
          <img
            className="website-login-img"
            src="https://ik.imagekit.io/ajrglwgfkd/Ellipse_99_4xlzUefE0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660041649544"
            alt="website login"
          />
          <img
            className="desktop-website-img"
            src="https://ik.imagekit.io/ajrglwgfkd/Rectangle_1467_LD2P9bE5x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660056339347"
            alt="website login"
          />
          <div className="logo-form-cont">
            <img
              className="website-logo"
              src="https://ik.imagekit.io/ajrglwgfkd/Group_7732_PRHSZBiqC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660041671661"
              alt="login website logo"
            />
            <form onSubmit={this.onSubmitLoginForm} className="form-container">
              <label className="label" htmlFor="username">
                Username*
              </label>
              <input
                onChange={this.onChangeUsername}
                value={username}
                className="user-input"
                id="username"
                type="text"
              />
              <label className="label" htmlFor="password">
                Password*
              </label>
              <input
                onChange={this.onChangePassword}
                value={password}
                className="user-input"
                id="password"
                type="password"
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {errorOnSubmit && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
