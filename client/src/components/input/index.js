import React from "react";
import "./style.scss";

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.sendMessage({
      speech: "Little window welcome"
    });
  }

  sendMessage(data) {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (resData.retrigger) {
          console.log(resData);
          this.sendMessage({
            speech: resData.retrigger
          });
        }

        resData.isUser = false;
        resData.isWaiting = false;
        console.log(resData, "resData here");
        this.props.addMessage(resData);
      });
  }

  sendToServer(data) {
    return fetch("/usermessage", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify(data)
    });
  }

  handleSubmit(e) {
    // console.log(this.props, "handlesubmit props");
    e.preventDefault();

    const data = {
      isUser: true,
      isWaiting: true
    };

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }
    this.sendMessage(data);
    console.log(this.props);
    this.props.addMessage(data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="speech" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}