import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imageMode: true,
      index: 0,
      rightKeyDown: false,
      leftKeyDown: false,
      downKeyDown: false,
      upKeyDown: false
    };

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
      reader.onloadend = () => {
        const images = [...this.state.images];
        const image = { name: App.removeExtension(files[i].name), image: reader.result };
        images.splice(Math.floor(images.length * Math.random()), 0, image);
        this.setState({ images });
      };
      reader.readAsDataURL(files[i]);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if(e.keyCode === 37 && !this.state.leftKeyDown) {
        this.setState({ leftKeyDown: true, index: this.shiftIndex(-1) });
        e.preventDefault();
      } else if(e.keyCode === 39 && !this.state.rightKeyDown) {
        this.setState({ rightKeyDown: true, index: this.shiftIndex(1) });
        e.preventDefault();
      } else if(e.keyCode === 38 && !this.state.downKeyDown) {
        this.setState({ downKeyDown: true, imageMode: !this.state.imageMode });
        e.preventDefault();
      } else if(e.keyCode === 40 && !this.state.upKeyDown) {
        this.setState({ upKeyDown: true, imageMode: !this.state.imageMode });
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', e => {
      if(e.keyCode === 37 && this.state.leftKeyDown) {
        this.setState({ leftKeyDown: false });
        e.preventDefault();
      } else if(e.keyCode === 39 && this.state.rightKeyDown) {
        this.setState({ rightKeyDown: false });
        e.preventDefault();
      } else if(e.keyCode === 38 && this.state.downKeyDown) {
        this.setState({ downKeyDown: false });
        e.preventDefault();
      } else if(e.keyCode === 40 && this.state.upKeyDown) {
        this.setState({ upKeyDown: false });
        e.preventDefault();
      }
    });
  }

  render() {

    const backgroundImageUrl = (this.state.images.length > 0 ? this.state.images[this.state.index].image : undefined);
    return (
      <div className="app">
        {
          this.state.images.length === 0 ?
            (
              <header className="header">
                <h1 className="title">Image Trainer</h1>
                <p>
                  Welcome to image trainer! This site is currently undergoing rapid development.
                </p>
                <p>
                  Choose images from your computer and use the arrow keys to switch between images or modes.
                </p>
                <input type="file" onChange={this.imageUploaded} multiple/>
              </header>
            ) : (
              undefined
            )
        }
        {
          this.state.imageMode ?
            (
              <div
                className={'image-container' + (this.state.images.length === 0 ? ' hidden' : '')}
                style={{ backgroundImage: 'url(\'' + backgroundImageUrl + '\')' }} />
            ) : (
              <p className="pair">
                <span>
                  {this.state.images.length > 0 ? this.state.images[this.state.index].name : ''}
                </span>
              </p>
            )
        }
      </div>
    );
  }
}

export default App;
