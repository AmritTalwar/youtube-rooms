import React from "react";
import Youtube from "react-youtube";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";

const styles = () => ({
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.match.params.roomId,
      room: {},
      roomLoaded: false,
      error: null,
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
        <Button className={classes.button} startIcon={<PlayArrow />}>
          Play
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Room);
