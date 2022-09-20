import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const ContactUs = () => (
  <div className="contact-us-container">
    <div className="icons-cont">
      <FaGoogle className="contact-icons" />
      <FaTwitter className="contact-icons" />
      <FaInstagram className="contact-icons" />
      <FaYoutube className="contact-icons" />
    </div>
    <p className="p-contact-us">Contact us</p>
  </div>
)

export default ContactUs
