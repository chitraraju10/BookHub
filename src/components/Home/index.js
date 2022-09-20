import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBookDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedProducts()
  }

  getTopRatedProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.books.map(eachData => ({
        id: eachData.id,
        authorName: eachData.author_name,
        coverPic: eachData.cover_pic,
        title: eachData.title,
      }))
      this.setState({
        topRatedBookDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {topRatedBookDetails} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {topRatedBookDetails.map(eachBookDetails => (
          <div className="slick-item" key={eachBookDetails.id}>
            <Link
              className="nav-link-top-books"
              to={`/books/${eachBookDetails.id}`}
            >
              <img
                className="top-rated-coverpic"
                src={eachBookDetails.coverPic}
                alt={eachBookDetails.title}
              />
              <h1 className="title">{eachBookDetails.title}</h1>
              <p className="author">{eachBookDetails.authorName}</p>
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  renderSuccessView = () => (
    <>
      <div className="top-rated-books-container">
        <div className="top-rated-books-cont">
          <div className="top-button-cont">
            <h1 className="h-top-rated-books">Top Rated Books</h1>
            <Link className="nav-link-find-books" to="/shelf">
              <button className="find-books-button-desk" type="button">
                Find Books
              </button>
            </Link>
          </div>
          {this.renderSlider()}
        </div>
      </div>
      <ContactUs />
    </>
  )

  onClickTryAgainButton = () => {
    this.getTopRatedProducts()
  }

  renderFailureView = () => (
    <div className="failure-bg">
      <div className="failure-content">
        <h1 className="h-top-rated-books">Top Rated Books</h1>
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
        <div className="home-bg-cont">
          <div className="home-content-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-desc">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link className="nav-link-find-books" to="/shelf">
              <button className="find-books-button-mob" type="button">
                Find Books
              </button>
            </Link>
          </div>
          {this.renderAllApiStatus()}
        </div>
      </>
    )
  }
}

export default Home
