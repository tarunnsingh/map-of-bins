import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import AuthService from "../../services/auth-service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (!data.isAuthenticated) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Clean-City
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          {isAuthenticated ? (
            <div>
              <Button color="inherit" href="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={onClickLogoutHandler}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/register">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
