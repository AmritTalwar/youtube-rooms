import React from "react";
import Youtube from "react-youtube";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.match.params.roomId,
    };
  }
  render() {
    return (
      <div>
        <h1>Room ID: {this.state.roomId}</h1>
        <Youtube videoId="dQw4w9WgXcQ"></Youtube>
      </div>
    );
  }
}

export default Room;
