import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      className="not-found-img"
      src="https://ik.imagekit.io/ajrglwgfkd/Group_7484_3igKEOeFI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660201948451"
      alt="not found"
    />
    <h1 className="h-not-found">Page Not Found</h1>
    <p className="p-not-found">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-back-button" type="button">
        Go Back To Home
      </button>
    </Link>
  </div>
)

export default NotFound
