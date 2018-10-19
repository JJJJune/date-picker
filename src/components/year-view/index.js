import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'react-md'
import { cls } from 'reactutils'

import './style.scss'

export default class YearView extends PureComponent {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }
  static propTypes = {
    startDate: PropTypes.shape({}),
    endDate: PropTypes.shape({}),
    onSelectedYearChange: PropTypes.func,
  }
  handleCellClick = year => () => {
    const { onSelectedYearChange } = this.props
    onSelectedYearChange && onSelectedYearChange(year)
  }
  renderCell = (row, col, year) => {
    const { startDate, endDate } = this.props
    let isSelected = false
    if (
      year === startDate.year ||
      (year > startDate.year && year <= endDate.year)
    ) {
      isSelected = true
    }
    return (
      <div
        className={cls(
          'clsprefix-yearview-cell',
          year && isSelected && 'clsprefix-yearview-cell-selected',
        )}
        key={`cell-${row}-${col}`}
        onClick={year ? this.handleCellClick(year) : null}
      >
        {year !== 0 && year}
      </div>
    )
  }

  componentDidMount() {
    this.containerRef.current.scrollTo(0, 1680)
  }
  render() {
    let startYear = 1900
    const endYear = 2100
    let yearRows = []
    let row = []
    const cellCounts = Math.ceil((endYear - startYear + 1) / 4) * 4
    const yearCounts = endYear - startYear
    for (let i = 0; i < cellCounts; i++) {
      if (i <= yearCounts) {
        row.push(startYear++)
        if (row.length === 4) {
          yearRows.push(row)
          row = []
        }
      } else {
        row.push(0)
        if (row.length === 4) {
          yearRows.push(row)
          row = []
        }
      }
    }
    return (
      <div>
        <Divider />
        <div className="clsprefix-yearview-years" ref={this.containerRef}>
          {yearRows.map((yearRow, idx) => {
            return (
              <div className="clsprefix-yearview-row" key={`row-${idx}`}>
                {yearRow.map((year, col) => this.renderCell(idx, col, year))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
