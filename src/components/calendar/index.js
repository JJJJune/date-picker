import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider, Button } from 'react-md'
import leftArrow from 'const/last_arrow.svg'
import rightArrow from 'const/next_arrow.svg'
import QuarterView from '../quarter-view'
import MonthView from '../month-view'
import YearView from '../year-view'
import { getMonthLabel } from '../../libs/utils'
import './style.scss'

export default class Calendar extends PureComponent {
  static propTypes = {
    singlePick: PropTypes.bool,
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({}),
    monthView: PropTypes.bool,
    yearView: PropTypes.bool,
    quarterView: PropTypes.bool,
    currentYear: PropTypes.number,
    currentMonth: PropTypes.number,
    onYearHeaderClick: PropTypes.func,
    onMonthHeaderClick: PropTypes.func,
    onClickYearArrow: PropTypes.func,
    onClickMonthArrow: PropTypes.func,
    onSelectedDate: PropTypes.func,
    onSelectedMonth: PropTypes.func,
    onSelectedYear: PropTypes.func,
    onMonthFootClick: PropTypes.func,
    onQuarterFootClick: PropTypes.func,
    footDate: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool,
      }),
    ),
  }

  handleYearArrowClick = last => () => {
    const { onClickYearArrow } = this.props
    onClickYearArrow && onClickYearArrow(last)
  }
  handleMonthArrowClick = last => () => {
    const { onClickMonthArrow } = this.props
    onClickMonthArrow && onClickMonthArrow(last)
  }
  render() {
    const {
      startDate,
      endDate,
      footDate,
      currentYear,
      currentMonth,
      monthView,
      yearView,
      quarterView,
      singlePick,
    } = this.props
    return (
      <div>
        <div>
          <div className="clsprefix-calendar-header">
            <Button icon onClick={this.handleYearArrowClick(true)}>
              <img src={leftArrow} className="clsprefix-calendar-arrow" />
            </Button>
            <span onClick={this.props.onYearHeaderClick}>{currentYear}</span>
            <Button icon onClick={this.handleYearArrowClick(false)}>
              <img src={rightArrow} className="clsprefix-calendar-arrow" />
            </Button>
          </div>
        </div>
        <Divider />
        <div>
          <div className="clsprefix-calendar-header">
            <Button icon onClick={this.handleMonthArrowClick(true)}>
              <img src={leftArrow} className="clsprefix-calendar-arrow" />
            </Button>
            <span onClick={this.props.onMonthHeaderClick}>
              {getMonthLabel[currentMonth]}
            </span>
            <Button icon onClick={this.handleMonthArrowClick(false)}>
              <img src={rightArrow} className="clsprefix-calendar-arrow" />
            </Button>
          </div>
        </div>
        {quarterView && (
          <QuarterView
            startDate={startDate}
            endDate={endDate}
            singlePick={singlePick}
            onSelectedMonthChange={this.props.onSelectedMonth}
            onQuarterFootClick={this.props.onQuarterFootClick}
          />
        )}
        {yearView && (
          <YearView
            startDate={startDate}
            endDate={endDate}
            currentYear={currentYear}
            onSelectedYearChange={this.props.onSelectedYear}
          />
        )}
        {monthView && (
          <MonthView
            singlePick={singlePick}
            startDate={startDate}
            endDate={endDate}
            currentYear={currentYear}
            currentMonth={currentMonth}
            footDate={footDate}
            onSelectedDayChange={this.props.onSelectedDate}
            onMonthFootClick={this.props.onMonthFootClick}
          />
        )}
        <Divider />
      </div>
    )
  }
}
