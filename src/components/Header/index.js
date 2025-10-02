import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-links-lg">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
        <ul className="nav-links-sm">
          <li>
            <Link to="/" className="icon-button">
              <AiFillHome className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="icon-button">
              <BsBriefcaseFill className="nav-icon" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onClickLogout}
              className="icon-button"
            >
              <FiLogOut className="nav-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
