import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'react-md'
import { cls } from 'reactutils'
import { getMonthShortLabel } from '../../libs/utils'
import './style.scss'

export default class QuarterView extends PureComponent {
  static propTypes = {
    singlePick: PropTypes.bool,
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({}),
    onSelectedMonthChange: PropTypes.func,
    onQuarterFootClick: PropTypes.func,
  }
  state = {
    footDate: [
      { value: 'Q1', id: 0, selected: false },
      { value: 'Q2', id: 1, selected: false },
      { value: 'Q3', id: 2, selected: false },
      { value: 'Q4', id: 3, selected: false },
    ],
  }
  handleFootDateClick = id => () => {
    const { footDate } = this.state
    this.setState({
      footDate: footDate.map(f => {
        if (f.id === id) {
          f.selected = true
        } else f.selected = false
        return f
      }),
    })
    const { onQuarterFootClick } = this.props
    onQuarterFootClick && onQuarterFootClick(id)
  }
  handleCellClick = month => () => {
    const { onSelectedMonthChange } = this.props
    onSelectedMonthChange && onSelectedMonthChange(month)
  }
  renderCell = (row, col, month) => {
    const { startDate, endDate } = this.props
    let isSelected = false
    if (
      month === startDate.month ||
      (month > startDate.month && month <= endDate.month)
    ) {
      isSelected = true
    }
    return (
      <div
        className={cls(
          'clsprefix-quarterview-cell',
          isSelected && 'clsprefix-quarterview-cell-selected',
        )}
        key={`cell-${row}-${col}`}
        onClick={this.handleCellClick(month)}
      >
        {getMonthShortLabel[month]}
      </div>
    )
  }

  render() {
    const { footDate } = this.state
    const { singlePick } = this.props
    const quarterRows = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    return (
      <div>
        <Divider />
        <div className="clsprefix-quarterview">
          {quarterRows.map((quarterRow, idx) => {
            return (
              <div className="clsprefix-quarterview-row" key={`row-${idx}`}>
                {quarterRow.map((month, col) =>
                  this.renderCell(idx, col, month),
                )}
              </div>
            )
          })}
        </div>
        {!singlePick && (
          <div className="clsprefix-yearview-foot">
            {footDate.map(date => (
              <div
                className={date.selected ? 'selected' : null}
                onClick={this.handleFootDateClick(date.id)}
                key={date.id}
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
