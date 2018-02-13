import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [], imageMode: true, index: 0 };

    this.imageUploaded = this.imageUploaded.bind(this);
  }

  static removeExtension(fileName) {
    return fileName.slice(0, fileName.indexOf('.'));
  }

  shiftIndex(shift) {
    const { length } = this.state.images;
    return ((this.state.index + shift) % length + length) % length;
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

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if(e.keyCode === 37 && !this.state.leftDown) {
        this.setState({ leftDown: true, index: this.shiftIndex(-1) });
        e.preventDefault();
      } else if(e.keyCode === 39 && !this.state.rightDown) {
        this.setState({ rightDown: true, index: this.shiftIndex(1) });
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', e => {
      if(e.keyCode === 37 && this.state.leftDown) {
        this.setState({ leftDown: false });
        e.preventDefault();
      } else if(e.keyCode === 39 && this.state.rightDown) {
        this.setState({ rightDown: false });
        e.preventDefault();
      }
    });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Image Trainer</h1>
          <p>
            Welcome to image trainer! This site is currently undergoing rapid development.
          </p>
          <p>
            Choose images from your computer and use the arrow keys to switch between images or modes.
          </p>
          <input type="file" onChange={this.imageUploaded} multiple />
        </header>
        {
          this.state.imageMode ?
            <img src={this.state.images.length > 0 ? this.state.images[this.state.index].image : undefined} /> :
            <p>{this.state.images.length > 0 ? this.state.images[this.state.index].name : ''}</p>
        }
      </div>
    );
  }
}

export default App;
