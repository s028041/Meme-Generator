import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/1bgw.jpg",
      allMemeImgs: [],
      fontSize: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }
  //Choose font size
  changeSize(event) {
    this.setState({
      fontSize: event.target.value
    });
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <input
            type="number"
            max="120"
            value={this.state.fontSize}
            onChange={this.changeSize}
            placeholder="Font Size"
          ></input>

          <button>Generate</button>
          <br />
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top" style={{ fontSize: this.state.fontSize + "px" }}>
            {this.state.topText}
          </h2>
          <h2
            className="bottom"
            style={{ fontSize: this.state.fontSize + "px" }}
          >
            {this.state.bottomText}
          </h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
