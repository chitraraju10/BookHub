import './index.css'

const BookshelfTab = props => {
  const {bookShelf, onChangeTab, isTabActive} = props
  const {value, label} = bookShelf

  const onClickTabItem = () => {
    onChangeTab(value, label)
  }

  const listItemBg = isTabActive ? 'active' : 'not-active'

  return (
    <li onClick={onClickTabItem} className={`list-item ${listItemBg}`}>
      <button className={`shelf-button ${listItemBg}`} type="button">
        {label}
      </button>
    </li>
  )
}

export default BookshelfTab
