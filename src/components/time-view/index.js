import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TimePicker } from 'react-md'
import './style.scss'

export default class TimeView extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    onDiscard: PropTypes.func,
  }
  render() {
    return (
      <div>
        <TimePicker
          id="appointment-time-portrait"
          inline
          locales="en-US"
          okLabel="CONFIRM"
          cancelLabel="DISCARD"
          cancelPrimary={false}
          className="clsprefix-timeview"
          onChange={this.props.onChange}
          onVisibilityChange={this.props.onDiscard}
          visible
          animateInline={false}
          displayMode="portrait"
        />
      </div>
    )
  }
}
