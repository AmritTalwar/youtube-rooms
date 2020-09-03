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

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handlePlayClicked = this.handlePlayClicked.bind(this);
    this.handlePauseClicked = this.handlePauseClicked.bind(this);
  }

  handleKeydown(event) {
    const spaceBarClicked = Boolean(event.keyCode === 32);
    if (spaceBarClicked) {
      this.state.videoPlaying
        ? this.handlePauseClicked()
        : this.handlePlayClicked();
    }
  }

  handlePauseClicked() {
    this.setState({ videoPlaying: false });
    this.props.socket.emit("pause", this.state.roomId);
  }

  handlePlayClicked() {
    this.setState({ videoPlaying: true });
    this.props.socket.emit("play", this.state.roomId);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);

    this.props.socket.on("roomInfo", (room) => {
      this.setState({ roomLoaded: true, room: room });
    });

    this.props.socket.on("err", (message) => {
      this.setState({ error: { message: message } });
    });

    this.props.socket.on("play", () => {
      this.setState({ videoPlaying: true });
    });

    this.props.socket.on("pause", () => {
      this.setState({ videoPlaying: false });
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
          <Button
            className={classes.button}
            startIcon={<Pause />}
            onClick={() => {
              this.handlePauseClicked();
            }}
          >
            Pause
          </Button>
        ) : (
          <Button
            className={classes.button}
            startIcon={<PlayArrow />}
            onClick={() => {
              this.handlePlayClicked();
            }}
          >
            Play
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Room);
