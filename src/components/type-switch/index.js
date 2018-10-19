import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { cls } from 'reactutils'

import './style.scss'

export default class TypeSwitch extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
  }
  handleTypeClick = type => () => {
    const { onChange } = this.props
    onChange && onChange(type)
  }
  render() {
    const { type } = this.props
    return (
      <div className="clsprefix-typeswitch">
        <div
          onClick={this.handleTypeClick('date')}
          className={cls(
            'clsprefix-type',
            type === 'date' && 'clsprefix-type--active',
          )}
        >
          Date
        </div>
        <div
          onClick={this.handleTypeClick('time')}
          className={cls(
            'clsprefix-type',
            type === 'time' && 'clsprefix-type--active',
          )}
        >
          Time
        </div>
      </div>
    )
  }
}
