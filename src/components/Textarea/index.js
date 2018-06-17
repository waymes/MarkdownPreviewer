import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Textarea extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div className='c-textarea'>
        <header>Markdown</header>
        <figure>
          <textarea
            value={value}
            onChange={onChange}
          />
        </figure>
      </div>
    );
  }
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Textarea.defaultProps = {
  value: ''
};