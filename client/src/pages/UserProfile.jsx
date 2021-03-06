import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { usePosition } from "../hooks/useLocationHook";

import { AuthContext } from "../context/authcontext";

import Header from "../components/Header/Header";
import { Paper } from "@material-ui/core";

import ProfileCard from "../components/ProfileCard/ProfileCard";

import DustbinService from "../services/dustbinservice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function UserPage(props) {
  const classes = useStyles();
  const { latitude, longitude } = usePosition();
  const { user } = useContext(AuthContext);

  const handleNearestDustbin = (e) => {
    DustbinService.nearestDustbin({ lat: latitude, long: longitude }).then(
      (data) => {
        console.log(data);
        props.history.push("/");
      }
    );
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container component="main">
        <div className={classes.paper}>
          <Paper>
            {user ? <ProfileCard name={user.name} email={user.email} /> : null}
          </Paper>
        </div>

        <Button variant="outlined" onClick={handleNearestDustbin}>
          {" "}
          GET NEAREST DUSTBINS{" "}
        </Button>
      </Container>
    </>
  );
}
