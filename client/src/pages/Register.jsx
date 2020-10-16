import React, { useEffect, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AuthService from "../services/auth-service";

import CircularProgress from "@material-ui/core/CircularProgress";

import Alert from "../components/Alert/Alert";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const [msg, setMessage] = useState({ message: "", msgError: false });
  const [loading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      setUser({ email: "", name: "", password: "" });
      if (!message.msgError) {
        timerID = setTimeout(() => {
          setIsLoading(false);
          props.history.push("/login");
        }, 2000);
      } else setIsLoading(false);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} variant="circle" sizes=""></Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Send me New Updates."
              />
            </Grid>
          </Grid>
          {loading ? (
            <Typography align="center">
              <CircularProgress color="secondary" />
            </Typography>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          )}
          <Grid container justify="center">
            <Grid item>
              <Typography justify="center">
                Already Registered?{" "}
                <Button href="/login" variant="outlined">
                  Sign in
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Alert msgError={msg.msgError} message={msg.msgBody} />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
