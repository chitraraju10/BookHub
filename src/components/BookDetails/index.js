import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import ContactUs from '../ContactUs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookItemDetail: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        bookDetails: {
          id: data.book_details.id,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          aboutBook: data.book_details.about_book,
          rating: data.book_details.rating,
          readStatus: data.book_details.read_status,
          title: data.book_details.title,
          aboutAuthor: data.book_details.about_author,
        },
      }
      this.setState({
        bookItemDetail: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {bookItemDetail} = this.state
    const {bookDetails} = bookItemDetail

    return (
      <>
        <div className="successBg">
          <div className="img-details-container">
            <img
              className="bookdetails-coverpic"
              src={bookDetails.coverPic}
              alt={bookDetails.title}
            />
            <div className="rating-details-cont">
              <h1 className="bookDetails-title">{bookDetails.title}</h1>
              <p className="bookDetails-authorName">{bookDetails.authorName}</p>
              <div className="rating-cont">
                <p className="bookDetails-rating">Avg Rating</p>
                <BsFillStarFill className="bookdetails-star" />
                <p className="span-rating">{bookDetails.rating}</p>
              </div>
              <p className="bookDetails-Status">
                Status:
                <span className="currently-reading">
                  {bookDetails.readStatus}
                </span>
              </p>
            </div>
          </div>
          <div className="about-container">
            <h1 className="about-author">About Author</h1>
            <p className="about-author-desc">{bookDetails.aboutAuthor}</p>
            <h1 className="about-book">About Book</h1>
            <p className="about-book-desc">{bookDetails.aboutBook}</p>
          </div>
        </div>
        <ContactUs />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getBookItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-bg-book-item-details">
      <div className="failure-content">
        <img
          className="failure-img"
          src="https://ik.imagekit.io/ajrglwgfkd/Group_7522_IhpVI7K0L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660101230600"
          alt="failure view"
        />
        <p className="p-something-wrong">
          Something went wrong. Please try again
        </p>
        <button
          onClick={this.onClickTryAgainButton}
          className="try-button"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderAllApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-item-details-bg">
          <div className="book-item-details-content">
            {this.renderAllApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default BookDetails
