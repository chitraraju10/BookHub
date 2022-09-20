import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ContactUs from '../ContactUs'
import BookshelfTab from '../BookshelfTab'
import BookItems from '../BookItems'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    booksDetails: [],
    searchText: '',
    apiStatus: apiStatusConstants.initial,
    activeTabValue: bookshelvesList[0].value,
    activeBookLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBooksDetails()
  }

  getBooksDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeTabValue, searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeTabValue}&search=${searchText}`
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
      const formattedData = data.books.map(eachBooks => ({
        id: eachBooks.id,
        title: eachBooks.title,
        readStatus: eachBooks.read_status,
        rating: eachBooks.rating,
        authorName: eachBooks.author_name,
        coverPic: eachBooks.cover_pic,
      }))
      this.setState({
        booksDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeTab = (value, label) => {
    this.setState(
      {activeTabValue: value, activeBookLabel: label},
      this.getBooksDetails,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearchButton = () => {
    this.getBooksDetails()
  }

  renderNoProductview = () => {
    const {searchText} = this.state
    return (
      <div className="no-prod-bg">
        <img
          className="no-product-img"
          src="https://ik.imagekit.io/ajrglwgfkd/Asset_1_1_sKJN5PgPN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660145641514"
          alt="no books"
        />
        <p className="no-prod-desc">
          Your search for {`${searchText}`} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksDetails} = this.state

    if (booksDetails.length === 0) {
      return this.renderNoProductview()
    }
    return (
      <>
        <ul className="bookItemDetailCont">
          {booksDetails.map(eachItem => (
            <BookItems booksItemDetail={eachItem} key={eachItem.id} />
          ))}
        </ul>
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
    this.getBooksDetails()
  }

  renderFailureView = () => (
    <div className="failure-bg">
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
    const {searchText, activeTabValue, activeBookLabel} = this.state

    return (
      <>
        <Header />
        <div className="bookshelf-bg">
          <div className="bookshelf-content">
            <div className="search-container">
              <input
                value={searchText}
                placeholder="Search"
                className="search-bar"
                type="search"
                onChange={this.onChangeSearchInput}
              />
              <button
                onClick={this.onClickSearchButton}
                testid="searchButton"
                className="search-button"
                type="button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="bookshelf">
              <h1 className="h-bookshelves">Bookshelves</h1>
              <ul className="list-item-cont">
                {bookshelvesList.map(eachList => (
                  <BookshelfTab
                    bookShelf={eachList}
                    key={eachList.id}
                    onChangeTab={this.onChangeTab}
                    isTabActive={activeTabValue === eachList.value}
                  />
                ))}
              </ul>
            </div>
            <div className="api-bg">
              <div className="desktop-search-cont">
                <h1 className="current-shelf-name">{activeBookLabel} Books</h1>
                <div className="search-container-desk">
                  <input
                    value={searchText}
                    placeholder="Search"
                    className="search-bar"
                    type="search"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    testid="searchButton"
                    className="search-button"
                    type="button"
                    onClick={this.onClickSearchButton}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              {this.renderAllApiStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
