import React from "react";

import AddBoxIcon from "@material-ui/icons/AddBox";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import background from "../../images/background.png";
import { buttonStyle } from "../globalStyles";

const styles = () => ({
  button: buttonStyle,
  background: {
    backgroundImage: `url(${background})`,
    position: "fixed",
    minWidth: "100%",
    minHeight: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomLoading: false,
    };

    this.onCreateRoomClick = this.onCreateRoomClick.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("roomId", (roomId) => {
      this.props.history.push(`/room/${roomId}`);
    });
  }

  onCreateRoomClick() {
    this.setState({ roomLoading: true });
    this.props.socket.emit("createRoom");
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={10}
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Button
              className={classes.button}
              startIcon={<AddBoxIcon />}
              onClick={this.onCreateRoomClick}
            >
              create room
            </Button>
          </Grid>
          {this.state.roomLoading ? (
            <CircularProgress color="secondary" />
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
