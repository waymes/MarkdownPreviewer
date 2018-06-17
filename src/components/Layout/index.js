import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderParagraph, renderElement } from '../../libs/renderMethods';
import './style.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regexps: {
        h1: /^[#]\s/ig,
        h2: /^[#]{2}\s/ig,
        h3: /^[#]{3}\s/ig,
        h4: /^[#]{4}\s/ig,
        h5: /^[#]{5}\s/ig,
        h6: /^[#]{6}\s/ig,
        blockquote: /^[>]\s/ig
      }
    }
  }

  renderMarkdown() {
    const { regexps } = this.state;
    const lines = [...this.props.value.split('\n')];
    const renderHTML = lines.map((line, key) => {
      const existingElement = Object.keys(regexps).find(el => !line.search(regexps[el]));
      if (existingElement) {
        return renderElement(existingElement, line, regexps[existingElement], key);
      } else {
        return renderParagraph(line, key);
      }
    });
    return renderHTML;
  }

  render() {
    return (
      <div className='c-layout'>
        <header>Preview</header>
        <figure>
          <div className='markdown'>
            {this.renderMarkdown()}
          </div>
        </figure>
      </div>
    );
  }
}

Layout.propTypes = {
  value: PropTypes.string
};

Layout.defaultProps = {
  value: ''
};