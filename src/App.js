import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesUploaded: false,
      images: [],
      imageMode: true,
      history: [],
      historyIndex: -1,
      rightKeyDown: false,
      leftKeyDown: false,
      downKeyDown: false,
      upKeyDown: false
    };

    this.imageUploaded = this.imageUploaded.bind(this);
    this.getNextHistoryIndex = this.getNextHistoryIndex.bind(this);
    this.getLastHistoryIndex = this.getLastHistoryIndex.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  static removeExtension(fileName) {
    return fileName.slice(0, fileName.indexOf('.'));
  }

  getNextHistoryIndex() {
    const historyIndex = this.state.historyIndex + 1;
    const nextImageIndex = Math.floor(this.state.images.length * Math.random());
    return { historyIndex, history: [...this.state.history, nextImageIndex] };
  }

  getLastHistoryIndex() {
    if(this.state.historyIndex === 0) {
      const { history } = this.getNextHistoryIndex();
      return { historyIndex: 0, history: [history[history.length - 1], ...this.state.history] };
    } else {
      return { historyIndex: this.state.historyIndex - 1, history: this.state.history };
    }
  }

  imageUploaded(e) {
    if(this.state.imagesUploaded) {
      this.setState({ historyIndex: -1, history: [], images: [] });
    }
    this.setState({ imagesUploaded: true });
    const files = e.target.files;
    for(let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = { name: App.removeExtension(files[i].name), image: reader.result };
        const { history } = this.getNextHistoryIndex();
        this.setState({
          images: [...this.state.images, image],
          historyIndex: 0,
          history: [history[history.length - 1]]
        });
      };
      reader.readAsDataURL(files[i]);
    }
  }

  handleBackButton(e) {
    this.setState({ historyIndex: -1, history: [], images: [] });
  }

  handleShuffle(e) {
    this.setState({ historyIndex: 0, history: [Math.floor(this.state.images.length * Math.random())] });
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if(e.keyCode === 37 && !this.state.leftKeyDown) {
        const { historyIndex, history } = this.getLastHistoryIndex();
        this.setState({ leftKeyDown: true, historyIndex, history });
        e.preventDefault();
      } else if(e.keyCode === 39 && !this.state.rightKeyDown) {
        const { historyIndex, history } = this.getNextHistoryIndex();
        this.setState({ rightKeyDown: true, historyIndex, history });
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
    this.imageContainer.addEventListener('mouseup', e => {
      this.setState(this.getLastHistoryIndex());
      e.preventDefault();
    });
  }

  render() {
    const imageObj = this.state.images.length > 0 ?
      this.state.images[this.state.history[this.state.historyIndex]] : undefined;
    const imageUrl = imageObj ? imageObj.image : undefined;
    const imageName = imageObj ? imageObj.name : '';
    return (
      <div className="app">
        {
          this.state.images.length === 0 ? (
            <header className="intro-header">
              <h1 className="title">Image Trainer</h1>
              <p>
                Welcome to image trainer! This site is currently undergoing rapid development.
              </p>
              <p>
                Choose images from your computer and use the arrow keys to switch between images or modes.
              </p>
              <input type="file" onChange={this.imageUploaded} multiple className="button" />
            </header>
          ) : (
            <header className="images-header">
              <input type="button" value="Back" className="button" onClick={this.handleBackButton} />
              <input type="button" value="Shuffle" className="button" onClick={this.handleShuffle} />
            </header>
          )
        }
        {
          this.state.imageMode ?
            (
              <div
                ref={imageContainer => this.imageContainer = imageContainer }
                className={'image-container' + (this.state.images.length === 0 ? ' hidden' : '')}
                style={{ backgroundImage: 'url(\'' + imageUrl + '\')' }} />
            ) : (
              <p className="pair">
                <span>
                  {imageName}
                </span>
              </p>
            )
        }
      </div>
    );
  }
}

export default App;
