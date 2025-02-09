import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <Link to="/">
          <img
            className="logonav"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="unordered">
          <Link className="link" to="/">
            <li className="listEl">Home</li>
          </Link>
          <Link className="link" to="/jobs">
            <li className="listEl">Jobs</li>
          </Link>
        </ul>
        <button onClick={this.onClickLogout} className="Logout" type="button">
          Logout
        </button>

        <ul className="hideCont">
          <Link className="link" to="/">
            <li>
              <AiFillHome className="miniIcons" />
            </li>
          </Link>
          <Link className="link" to="/jobs">
            <li>
              <BsBriefcaseFill className="miniIcons" />
            </li>
          </Link>
          <button
            className="minButoon"
            type="button"
            onClick={this.onClickLogout}
          >
            <FiLogOut className="miniIcons" />
          </button>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
