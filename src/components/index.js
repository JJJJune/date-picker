import React, { PureComponent } from 'react'
import DatePicker from '../components/date-picker'
import { FontIcon } from 'react-md'
import PropTypes from 'prop-types'
import './style.scss'

export default class DatePickerInput extends PureComponent {
  static propTypes = {
    startDate: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      day: PropTypes.number,
    }),
    endDate: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      day: PropTypes.number,
    }),
    onChange: PropTypes.func,
  }
  state = {
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    visible: false,
  }
  handleUpdate = (start, end) => {
    const { onChange } = this.props
    onChange && onChange(start, end)
    this.setState({
      startDate: start,
      endDate: end,
      visible: false,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  handleClick = () => {
    const oldVisible = this.state.visible
    this.setState({
      visible: !oldVisible,
    })
  }
  render() {
    const { startDate, endDate, visible } = this.state
    const startDateLabel = startDate.year
      ? startDate.day + '/' + startDate.month + '/' + startDate.year + ' - '
      : ''
    const endDateLabel = startDate.year
      ? endDate.day + '/' + endDate.month + '/' + endDate.year
      : ''
    return (
      <div className="clsprefix">
        <span>Date Range:</span>
        <span className="clsprefix-datepickerinput-label">
          {startDateLabel}
          {endDateLabel}
        </span>
        <div className="clsprefix-datepickerinput">
          <FontIcon
            iconClassName="mdi mdi-calendar-range"
            onClick={this.handleClick}
          />
          <DatePicker
            className="clsprefix-datepickerinput-calendar"
            startDate={startDate}
            endDate={endDate}
            visible={visible}
            onUpdate={this.handleUpdate}
            onCancel={this.handleCancel}
          />
        </div>
      </div>
    )
  }
}
