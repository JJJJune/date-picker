import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FontIcon } from 'react-md'
import { format } from 'date-fns'
import DateInput from '../date-input'
import './style.scss'

export default class Header extends PureComponent {
  static propTypes = {
    translation: PropTypes.shape({
      reset: PropTypes.string,
      date: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    singlePick: PropTypes.bool,
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({}),
    onReset: PropTypes.func,
    onInputStartDate: PropTypes.func,
    onInputEndDate: PropTypes.func,
  }
  render() {
    const { startDate, endDate, singlePick, translation } = this.props
    const getCurrentDate = date => {
      const newDate = new Date(
        date.year,
        date.month,
        date.day,
        date.hour,
        date.minute,
      )
      const isDate = Object.keys(date).length !== 0
      const timePeriod = date.hour < 12 ? 'AM' : 'PM'
      const timeLabel = date.hour
        ? format(newDate, 'hh:mm') + ' ' + timePeriod + ' '
        : ''
      const dateLabel =
        timeLabel + date.day + '/' + date.month + '/' + date.year
      return isDate ? dateLabel : ''
    }
    return (
      <div>
        <div className="clsprefix-daterange">
          <DateInput
            value={getCurrentDate(startDate)}
            onChange={this.props.onInputStartDate}
            placeholder={
              singlePick
                ? (translation && translation.date) || 'Date'
                : (translation && translation.startDate) || 'Start Date'
            }
          />
          {!singlePick && (
            <DateInput
              value={getCurrentDate(endDate)}
              onChange={this.props.onInputEndDate}
              placeholder={(translation && translation.endDate) || 'End Date'}
            />
          )}
          <div
            className="clsprefix-daterange-reset"
            onClick={this.props.onReset}
          >
            <FontIcon primary iconClassName="mdi mdi-restore-clock" />
            <span className="clsprefix-daterange-reset-label">
              {(translation && translation.endDate) || 'Reset'}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
