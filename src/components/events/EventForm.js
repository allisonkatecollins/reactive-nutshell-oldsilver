import React, { Component } from "react"
import EventManager from "../../modules/EventManager"

export default class EventForm extends Component {
  state = {
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    userId: 1
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //ADD (SAVE) NEW EVENT
  saveEvent = evt => {
    evt.preventDefault()
    
    const event = {
      eventName: this.state.eventName,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventLocation: this.state.eventLocation,
      userId: this.state.userId
    }

    this.props.addEvent(event).then(() => this.props.history.push("/events"))
  }

  updateExistingEvent = evt => {
    evt.preventDefault()
  

    const existingEvent = {
      eventName: this.state.eventName,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventLocation: this.state.eventLocation,
      userId: this.state.userId
    }

    this.props.updateEvent(this.props.match.params.eventId, existingEvent)
    .then(() => this.props.history.push("/events"))
  }

  componentDidMount() {
    EventManager.get(this.props.match.params.eventId)
    .then(event => {
      this.setState({
        eventName: this.state.eventName,
        eventDate: this.state.eventDate,
        eventTime: this.state.eventTime,
        eventLocation: this.state.eventLocation,
        userId: this.state.userId
      })
    })
  }



  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="eventName">Name</label>
            <input type="text" required
                   className="form-control"
                   onChange={this.handleFieldChange}
                   id="eventName"
                   placeholder="Event Name" />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Date</label>
            <input type="date" required
                   className="form-control"
                   onChange={this.handleFieldChange}
                   id="eventDate"
                   placeholder="Event Date" />
          </div>
          <div className="form-group">
            <label htmlFor="eventTime">Time</label>
            <input type="time" required
                   className="form-control"
                   onChange={this.handleFieldChange}
                   id="eventTime"
                   placeholder="Event Time" />
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation">Location</label>
            <input type="text" required
                   className="form-control"
                   onChange={this.handleFieldChange}
                   id="eventLocation"
                   placeholder="Event Location" />
          </div>

          <button type="submit" onClick={this.saveEvent} className="btn btn-primary">Save</button>
          <button type="submit" onClick={this.updateExistingEvent} className="btn btn-primary">Update</button>
        </form>
      </React.Fragment>
    )
  }


}