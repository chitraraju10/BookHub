import {GiHamburgerMenu} from 'react-icons/gi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Header extends Component {
  state = {isHamMenuClicked: false}

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamMenuButton = () => {
    this.setState(prevState => ({
      isHamMenuClicked: !prevState.isHamMenuClicked,
    }))
  }

  renderHamMenu = () => (
    <div className="mob-ham-menu">
      <ul className="nav-link-button-cont-mob">
        <Link to="/">
          <li>
            <button className="nav-link-buttons" type="button">
              Home
            </button>
          </li>
        </Link>
        <Link to="/shelf">
          <li>
            <button className="nav-link-buttons" type="button">
              Bookshelves
            </button>
          </li>
        </Link>
        <button
          onClick={this.onClickLogoutButton}
          className="logout-button"
          type="button"
        >
          Logout
        </button>
      </ul>
    </div>
  )

  render() {
    const {isHamMenuClicked} = this.state

    return (
      <nav className="navbar-bg">
        <div className="navbar-content">
          <Link to="/">
            <img
              className="header-logo"
              src="https://ik.imagekit.io/ajrglwgfkd/Group_7732_PRHSZBiqC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660041671661"
              alt="website logo"
            />
          </Link>
          <button
            onClick={this.onClickHamMenuButton}
            className="ham-button"
            type="button"
          >
            <GiHamburgerMenu className="ham-icons" />
          </button>
          <ul className="nav-link-button-cont">
            <Link to="/">
              <li>
                <button className="nav-link-buttons" type="button">
                  Home
                </button>
              </li>
            </Link>
            <Link to="/shelf">
              <li>
                <button className="nav-link-buttons" type="button">
                  Bookshelves
                </button>
              </li>
            </Link>
            <button
              onClick={this.onClickLogoutButton}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </ul>
        </div>
        {isHamMenuClicked && this.renderHamMenu()}
      </nav>
    )
  }
}

export default withRouter(Header)
