import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'react-md'
import {
  isWithinRange,
  subDays,
  subMonths,
  subYears,
  isSameDay,
  format,
} from 'date-fns'
import { cls } from 'reactutils'
import './style.scss'

export default class MonthView extends PureComponent {
  static propTypes = {
    singlePick: PropTypes.bool,
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({}),
    currentYear: PropTypes.number,
    currentMonth: PropTypes.number,
    footDate: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool,
      }),
    ),
    onSelectedDayChange: PropTypes.func,
    onMonthFootClick: PropTypes.func,
  }
  state = {
    footDate: this.props.footDate,
  }
  handleCellClick = (data, isStartDate, isEndDate) => () => {
    const { onSelectedDayChange, singlePick } = this.props
    onSelectedDayChange && singlePick
      ? onSelectedDayChange(data, true)
      : onSelectedDayChange(data, isStartDate, isEndDate)
  }
  renderCell = (row, col, d) => {
    const { year, month, day } = d
    const { startDate, endDate, singlePick } = this.props
    const start = new Date(startDate.year, startDate.month, startDate.day)
    const end = new Date(endDate.year, endDate.month, endDate.day)
    const date = new Date(year, month, day)
    const isStartDate = isSameDay(date, start)
    const isEndDate = isSameDay(date, end)
    let isSelectedStartEnd = false
    let isSelected = false
    if (isStartDate || isEndDate) {
      isSelectedStartEnd = true
    } else if (isWithinRange(date, start, end)) {
      isSelected = true
    }
    return (
      <div
        className={cls(
          'clsprefix-monthview-cell',
          !singlePick &&
            day !== 0 &&
            isSelected &&
            'clsprefix-monthview-cell-selected',
          singlePick
            ? isStartDate && 'clsprefix-monthview-cell-selectedstart'
            : day !== 0 &&
              isSelectedStartEnd &&
              'clsprefix-monthview-cell-selectedstart',
        )}
        key={`cell-${row}-${col}`}
        onClick={this.handleCellClick(d, isStartDate, isEndDate)}
      >
        {day !== 0 && day}
      </div>
    )
  }
  handleFootDateClick = data => () => {
    let { startDate, endDate } = this.props
    let { footDate } = this.state
    const pinDate = endDate && endDate.year ? endDate : startDate

    const end = new Date(
      pinDate.year,
      (pinDate.month || 1) - 1,
      pinDate.day || 1,
    )
    const getNewStartDateByDay = days => {
      let a = format(subDays(end, days), 'D/M/YYYY').split('/')
      return { year: a[2], month: a[1], day: a[0] }
    }
    const getNewStartDateByMonth = months => {
      let a = format(subMonths(end, months), 'D/M/YYYY').split('/')
      return { year: a[2], month: a[1], day: a[0] }
    }
    const getNewStartDateByYear = years => {
      let a = format(subYears(end, years), 'D/M/YYYY').split('/')
      return { year: a[2], month: a[1], day: a[0] }
    }

    this.setState({
      footDate: footDate.map(f => {
        if (f.id === data.id) {
          f.selected = true
        } else f.selected = false
        return f
      }),
    })

    let start = {}
    switch (data.value) {
      case '1D':
        start = pinDate
        break
      case '7D':
        start = getNewStartDateByDay(6)
        break
      case '1M':
        start = getNewStartDateByMonth(1)
        break
      case '3M':
        start = getNewStartDateByMonth(3)
        break
      case '6M':
        start = getNewStartDateByMonth(6)
        break
      case '9M':
        start = getNewStartDateByMonth(9)
        break
      case '1Y':
        start = getNewStartDateByYear(1)
        break
      default:
        break
    }
    const { onMonthFootClick } = this.props
    onMonthFootClick && onMonthFootClick(start, pinDate)
  }

  render() {
    const { footDate } = this.state
    const weekDayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const { currentMonth, currentYear, singlePick } = this.props
    let day = 1
    const rows = []
    let row = []
    const dayCounts = new Date(currentYear, currentMonth, 0).getDate()
    const firstDayInWeek = new Date(currentYear, currentMonth - 1).getDay()
    for (let i = 0; i < 42; i++) {
      if (i >= firstDayInWeek && i < dayCounts + firstDayInWeek) {
        row.push({ year: currentYear, month: currentMonth, day: day++ })
        if (row.length === 7) {
          rows.push(row)
          row = []
        }
      } else {
        row.push({ year: currentYear, month: currentMonth, day: 0 })
        if (row.length === 7) {
          rows.push(row)
          row = []
        }
      }
    }
    return (
      <div>
        <Divider />
        <div className="clsprefix-monthview-header">
          {weekDayLabels.map((label, index) => (
            <div key={index} className="clsprefix-monthview-header-label">
              {label}
            </div>
          ))}
        </div>
        <Divider />
        {rows.map((row, idx) => {
          return (
            <div className="clsprefix-monthview-row" key={`row-${idx}`}>
              {row.map((day, col) => this.renderCell(idx, col, day))}
            </div>
          )
        })}
        <Divider />
        {!singlePick && (
          <div className="clsprefix-monthview-foot">
            {footDate.map(date => (
              <div
                key={date.id}
                className={date.selected ? 'selected' : null}
                onClick={this.handleFootDateClick(date)}
              >
                {date.value}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
