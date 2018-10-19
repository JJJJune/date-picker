import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Paper, Divider, Button } from 'react-md'
import { isAfter, endOfMonth, format } from 'date-fns'
import Header from '../header'
import TypeSwitch from '../type-switch'
import Calendar from '../calendar'
import TimeView from '../time-view'
import { cls } from 'reactutils'
import './style.scss'
export default class DatePicker extends PureComponent {
  static propTypes = {
    translation: PropTypes.shape({
      cancel: PropTypes.string,
      update: PropTypes.string,
      reset: PropTypes.string,
      date: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    visible: PropTypes.bool,
    singlePick: PropTypes.bool,
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
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
    className: PropTypes.string,
  }
  static defaultProps = {
    visible: true,
    startDate: {},
    endDate: {},
  }
  state = {
    monthView: true,
    yearView: false,
    quarterView: false,
    type: 'date',
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    currentYear: parseInt(format(new Date(), 'YYYY')),
    currentMonth: parseInt(format(new Date(), 'M')),
    footDate: [
      { value: '1D', id: 0, selected: false },
      { value: '7D', id: 1, selected: false },
      { value: '1M', id: 2, selected: false },
      { value: '3M', id: 3, selected: false },
      { value: '6M', id: 4, selected: false },
      { value: '9M', id: 5, selected: false },
      { value: '1Y', id: 6, selected: false },
    ],
  }
  jumpToView(name) {
    if (name === 'year') {
      this.setState({
        yearView: true,
        quarterView: false,
        monthView: false,
      })
    } else if (name === 'quarter') {
      this.setState({
        yearView: false,
        quarterView: true,
        monthView: false,
      })
    } else {
      this.setState({
        yearView: false,
        quarterView: false,
        monthView: true,
      })
    }
  }
  handleReset = () => {
    const { footDate } = this.state
    this.setState({
      monthView: true,
      yearView: false,
      quarterView: false,
      startDate: {},
      endDate: {},
      currentYear: parseInt(format(new Date(), 'YYYY')),
      currentMonth: parseInt(format(new Date(), 'M')),
      footDate: footDate.map(f => {
        if (f.selected) {
          f.selected = false
        }
        return f
      }),
    })
  }
  handleYearHeaderClick = () => {
    this.jumpToView('year')
  }
  handleMonthHeaderClick = () => {
    this.jumpToView('quarter')
  }
  handleClickYearArrow = last => {
    const { currentYear } = this.state
    this.setState({
      currentYear: last ? currentYear - 1 : currentYear + 1,
    })
  }
  handleClickMonthArrow = last => {
    const { currentMonth } = this.state
    const newMonth = () => {
      if (last) {
        return currentMonth > 1 ? currentMonth - 1 : 12
      } else return currentMonth < 12 ? currentMonth + 1 : 1
    }

    this.setState({
      currentMonth: newMonth(),
    })
  }
  handleSelectedDate = (date, isStartDate, isEndDate) => {
    const { startDate, endDate } = this.state
    const { singlePick } = this.props
    if (singlePick) {
      this.setState({
        startDate: date,
      })
    } else {
      const newClickedDate = new Date(date.year, date.month, date.day)
      const currentStartDate = new Date(
        startDate.year,
        startDate.month,
        startDate.day,
      )
      if (Object.keys(startDate).length === 0) {
        this.setState({
          startDate: date,
        })
      } else if (Object.keys(endDate).length === 0) {
        if (isStartDate) {
          this.setState({
            endDate: date,
          })
        } else if (isAfter(currentStartDate, newClickedDate)) {
          this.setState({
            startDate: date,
            endDate: startDate,
          })
        } else {
          this.setState({
            endDate: date,
          })
        }
      } else {
        this.setState({
          startDate: date,
          endDate: {},
        })
      }
    }
  }
  handleSelectedMonth = date => {
    this.jumpToView('month')

    this.setState({ currentMonth: date })

    // we don't need this design for now but we might need it in later version
    // hence keep this chunk of code for the future
    /*
    const { startDate, endDate, currentYear } = this.state
    const dayEndOfMonth = format(
      endOfMonth(new Date(currentYear, date - 1)),
      'D',
    )
    const endDay = format(
      endOfMonth(new Date(currentYear, startDate.month - 1)),
      'D',
    )

    if (Object.keys(startDate).length === 0) {
      this.setState({
        startDate: { year: currentYear, month: date, day: 1 },
      })
    } else if (Object.keys(endDate).length === 0) {
      if (date < startDate.month) {
        this.setState({
          startDate: { year: currentYear, month: date, day: 1 },
          endDate: {
            year: startDate.year,
            month: startDate.month,
            day: endDay,
          },
        })
      } else {
        this.setState({
          endDate: { year: currentYear, month: date, day: dayEndOfMonth },
        })
      }
    } else {
      this.setState({
        startDate: { year: currentYear, month: date, day: 1 },
        endDate: {},
      })
    }
    */
  }
  handleSelectedYear = date => {
    this.jumpToView('quarter')

    this.setState({ currentYear: date })

    // we don't need this design for now but we might need it in later version
    // hence keep this chunk of code for the future
    /*
    const { startDate, endDate } = this.state
    if (Object.keys(startDate).length === 0) {
      this.setState({
        startDate: { year: date, month: 1, day: 1 },
      })
    } else if (Object.keys(endDate).length === 0) {
      if (date < startDate.year) {
        this.setState({
          startDate: { year: date, month: 1, day: 1 },
          endDate: { year: startDate.year, month: 12, day: 31 },
        })
      } else {
        this.setState({
          endDate: { year: date, month: 12, day: 31 },
        })
      }
    } else {
      this.setState({
        startDate: { year: date, month: 1, day: 1 },
        endDate: {},
      })
    }
    */
  }
  handleTimeChange = (time, date) => {
    const { startDate, endDate } = this.state
    const h = parseInt(format(date, 'h'))
    const m = parseInt(format(date, 'm'))
    const timePeriod = time.split(' ')[1]
    const newHour = timePeriod === 'PM' ? h + 12 : h
    if (!startDate.hour || Object.keys(endDate).length === 0) {
      this.setState({
        startDate: { ...startDate, hour: newHour, minute: m },
      })
    } else if (!endDate.hour) {
      this.setState({
        endDate: { ...endDate, hour: newHour, minute: m },
      })
    }
  }
  handleMonthFootClick = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
  }
  handleQuarterFootClick = quarter => {
    const { currentYear } = this.state
    const dayEndOfMonth = month =>
      parseInt(format(endOfMonth(new Date(currentYear, month - 1)), 'D'))
    switch (quarter) {
      case 0:
        this.setState({
          startDate: { year: currentYear, month: 1, day: 1 },
          endDate: { year: currentYear, month: 3, day: dayEndOfMonth(3) },
        })
        break
      case 1:
        this.setState({
          startDate: { year: currentYear, month: 4, day: 1 },
          endDate: { year: currentYear, month: 6, day: dayEndOfMonth(6) },
        })
        break
      case 2:
        this.setState({
          startDate: { year: currentYear, month: 7, day: 1 },
          endDate: { year: currentYear, month: 9, day: dayEndOfMonth(9) },
        })
        break
      case 3:
        this.setState({
          startDate: { year: currentYear, month: 10, day: 1 },
          endDate: { year: currentYear, month: 12, day: dayEndOfMonth(12) },
        })
        break
    }
  }
  handleInputStartDate = value => {
    const date = value.split('/')
    this.setState({
      startDate: { year: date[2], month: date[1], day: date[0] },
      currentYear: parseInt(date[2]),
      currentMonth: parseInt(date[1]),
    })
  }
  handleInputEndDate = value => {
    const date = value.split('/')
    this.setState({
      endDate: { year: date[2], month: date[1], day: date[0] },
    })
  }
  handleTypeChange = type => {
    this.setState({
      type: type,
    })
  }
  handleTimeDiscard = () => {
    this.setState({
      type: 'date',
    })
  }
  handleUpdateDate = () => {
    const { startDate, endDate } = this.state
    const { onUpdate } = this.props
    onUpdate &&
      onUpdate(
        {
          ...startDate,
          timestamp: new Date(
            startDate.year,
            startDate.month - 1,
            startDate.day,
            startDate.hour,
            startDate.minute,
          ).getTime(),
        },
        {
          ...endDate,
          timestamp: new Date(
            endDate.year,
            endDate.month - 1,
            endDate.day,
            startDate.hour,
            startDate.minute,
          ).getTime(),
        },
      )
  }
  render() {
    const {
      type,
      startDate,
      endDate,
      monthView,
      yearView,
      quarterView,
      currentYear,
      currentMonth,
      footDate,
    } = this.state
    const { visible, className, singlePick, translation } = this.props
    return (
      <Paper
        zDepth={2}
        className={cls(
          visible ? 'clsprefix-datepicker' : 'clsprefix-datepicker-disVisible',
          className,
        )}
      >
        <Header
          translation={translation}
          singlePick={singlePick}
          startDate={startDate}
          endDate={endDate}
          onInputStartDate={this.handleInputStartDate}
          onInputEndDate={this.handleInputEndDate}
          onReset={this.handleReset}
        />
        <TypeSwitch type={type} onChange={this.handleTypeChange} />
        <Divider />
        {type === 'date' ? (
          <div>
            <Calendar
              singlePick={singlePick}
              startDate={startDate}
              endDate={endDate}
              monthView={monthView}
              yearView={yearView}
              quarterView={quarterView}
              footDate={footDate}
              currentYear={currentYear}
              currentMonth={currentMonth}
              onYearHeaderClick={this.handleYearHeaderClick}
              onMonthHeaderClick={this.handleMonthHeaderClick}
              onClickMonthArrow={this.handleClickMonthArrow}
              onClickYearArrow={this.handleClickYearArrow}
              onSelectedDate={this.handleSelectedDate}
              onSelectedMonth={this.handleSelectedMonth}
              onSelectedYear={this.handleSelectedYear}
              onMonthFootClick={this.handleMonthFootClick}
              onQuarterFootClick={this.handleQuarterFootClick}
            />
            <div className="clsprefix-datepicker-foot">
              <Button
                flat
                className="clsprefix-datepicker-foot-btn"
                onClick={this.props.onCancel}
              >
                {(translation && translation.cancel) || 'cancel'}
              </Button>
              <Button flat primary onClick={this.handleUpdateDate}>
                {(translation && translation.update) || 'update'}
              </Button>
            </div>
          </div>
        ) : (
          <TimeView
            onChange={this.handleTimeChange}
            onDiscard={this.handleTimeDiscard}
          />
        )}
      </Paper>
    )
  }
}
