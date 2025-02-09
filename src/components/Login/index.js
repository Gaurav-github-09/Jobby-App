import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: ''}

  usernameRegister = event => {
    this.setState({usernameInput: event.target.value})
  }

  passwordRegister = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitClicked = async event => {
    event.preventDefault()

    const {usernameInput, passwordInput} = this.state

    const userDetails = {username: usernameInput, password: passwordInput}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {usernameInput, passwordInput, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginCont">
        <div className="loginCard">
          <img
            className="logoLogin"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitClicked} className="formCont">
            <div className="inputCard">
              <label htmlFor="user">USERNAME</label>
              <br />
              <input
                value={usernameInput}
                onChange={this.usernameRegister}
                className="input"
                id="user"
                type="text"
                placeholder="rahul"
              />
            </div>
            <div className="inputCard">
              <label htmlFor="pass">PASSWORD</label>
              <br />
              <input
                className="input"
                onChange={this.passwordRegister}
                value={passwordInput}
                id="pass"
                type="password"
                placeholder="rahul@2021"
              />
            </div>
            <button className="loginBtn" type="submit">
              Login
            </button>
            {errorMsg.length > 0 && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
