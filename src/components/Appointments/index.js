// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointments: [],
    appointmentTitle: '',
    appointmentDate: '',
    isStarActive: false,
  }

  onChangeTitle = event => this.setState({appointmentTitle: event.target.value})

  onChangeDate = event => this.setState({appointmentDate: event.target.value})

  addToStar = starId => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachAppointment => {
        if (eachAppointment.id === starId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarButton = () =>
    this.setState(prevState => ({isStarActive: !prevState.isStarActive}))

  onAddAppointment = () => {
    const {appointmentTitle, appointmentDate, appointments} = this.state

    const newAppointment = {
      id: uuidv4(),
      appointmentTitle,
      appointmentDate,
      isStarred: false,
    }

    this.setState({
      appointments: [...appointments, newAppointment],
      appointmentTitle: '',
      appointmentDate: '',
    })
  }

  render() {
    const {
      appointments,
      appointmentTitle,
      appointmentDate,
      isStarActive,
    } = this.state

    const starredAppointments = appointments.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )

    const filteredAppointments = isStarActive
      ? starredAppointments
      : appointments

    const starButtonClassName = isStarActive ? 'starred-button' : 'star-button'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-fields">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="input-label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="input"
                value={appointmentTitle}
                onChange={this.onChangeTitle}
              />
              <br />
              <label htmlFor="date" className="input-label">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="input"
                value={appointmentDate}
                onChange={this.onChangeDate}
              />
              <div>
                <button
                  type="button"
                  className="add-button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </div>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointment-heading-and-button">
            <h1 className="appointment-heading">Appointments</h1>
            <div>
              <button
                type="button"
                className={starButtonClassName}
                onClick={this.onClickStarButton}
              >
                Starred
              </button>
            </div>
          </div>

          <ul className="appointments-container">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                addToStar={this.addToStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
