import React from "react";

import "./home.css";
import AddBoxIcon from "@material-ui/icons/AddBox";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      <body>
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
      </body>
    );
  }
}

export default withStyles(styles)(Home);
