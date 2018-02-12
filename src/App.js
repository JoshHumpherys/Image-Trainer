import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Image Trainer</h1>
        </header>
        <p className="intro">
          Welcome to image trainer! This site is currently undergoing rapid development.
        </p>
        Upon completion, there will be two modes: a flashcard mode to match images with pairs, and a memorization mode, where images are prompted and you need to type in the letters.
      </div>
    );
  }
}

export default App;
