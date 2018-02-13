import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [] };

    this.imageUploaded = this.imageUploaded.bind(this);
  }

  static removeExtension(fileName) {
    return fileName.slice(0, fileName.indexOf('.'));
  }

  imageUploaded(e) {
    const files = e.target.files;
    for(let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => this.setState({
        images: [...this.state.images, { name: App.removeExtension(files[i].name), image: reader.result }]
      });
      reader.readAsDataURL(files[i]);
    }
  }

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
        <input type="file" onChange={this.imageUploaded} multiple />
        <img src={this.state.images.length > 0 ? this.state.images[0].image : undefined} />
        <p>{this.state.images.length > 0 ? this.state.images[0].name : ''}</p>
      </div>
    );
  }
}

export default App;
