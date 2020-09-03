import React from "react";
import Youtube from "react-youtube";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import { buttonStyle } from "../globalStyles";

const styles = () => ({
  button: buttonStyle,
});

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.match.params.roomId,
      room: {},
      roomLoaded: false,
      error: null,
      videoPlaying: false,
    };
  }
  componentDidMount() {
    this.props.socket.on("roomInfo", (room) => {
      this.setState({ roomLoaded: true, room: room });
    });

    this.props.socket.on("err", (message) => {
      this.setState({ error: { message: message } });
    });

    this.props.socket.emit("joinRoom", this.state.roomId);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Room ID: {this.state.roomId}</h1>
        <Youtube videoId="dQw4w9WgXcQ"></Youtube>

        {this.state.videoPlaying ? (
          <Button className={classes.button} startIcon={<Pause />}>
            Pause
          </Button>
        ) : (
          <Button className={classes.button} startIcon={<PlayArrow />}>
            Play
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Room);
