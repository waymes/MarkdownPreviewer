import React, { Component } from 'react';
import Textarea from './components/Textarea/';
import Layout from './components/Layout/';

import './style.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const initialValue = '# Header 1\n' +
      '## Header 2\n' +
      '### Header 3\n' +
      '> My favorite quote\n' +
      'Text [Link](uri) another text `some code`\n' +
      'text text text\n' +
      '`code my beautiful code`'
    this.state = {
      textarea: initialValue
    };
  }

  render() {
    const { textarea } = this.state;
    return (
      <div className='c-app'>
        <Textarea
          value={textarea}
          onChange={e => this.setState({ textarea: e.target.value })}
        />
        <Layout
          value={textarea}
        />
      </div>
    );
  }
}