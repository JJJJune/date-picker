import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

export default class DateInput extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    placeholder: null,
  }
  state = {
    value: this.props.value,
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      })
    }
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      const { onChange } = this.props
      onChange && onChange(e.target.value)
    }
  }
  render() {
    const { value } = this.state
    const { placeholder } = this.props
    return (
      <div className="clsprefix-dateinput">
        <input
          className="clsprefix-dateinput-date"
          onKeyDown={this.handleKeyDown}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </div>
    )
  }
}
