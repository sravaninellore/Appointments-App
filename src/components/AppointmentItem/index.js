// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, addToStar} = props
  const {id, appointmentTitle, appointmentDate, isStarred} = appointmentDetails

  const title = appointmentTitle === '' ? 'No Title' : appointmentTitle

  const date = appointmentDate !== '' ? appointmentDate : '2022-05-22'

  const finalDate = date.split('-')

  const finalTitle = title

  const starOrStarredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  //   console.log(finalDate)

  const onClickStar = () => {
    addToStar(id)
  }

  return (
    <li className="appointment-container">
      <div>
        <p className="appointment-title">{finalTitle}</p>
        <p className="appointment-date">
          Date:
          {format(
            new Date(finalDate[0], finalDate[1] - 1, finalDate[2]),
            ' dd MMMM yyyy, EEEE',
          )}
        </p>
      </div>

      <button
        type="button"
        testid="star"
        className="button"
        onClick={onClickStar}
      >
        <img src={starOrStarredImage} alt="star" className="star-image" />
      </button>
    </li>
  )
}

export default AppointmentItem
