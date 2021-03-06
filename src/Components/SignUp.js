import React, { useCallback } from "react";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../API/Firebase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "../Styles/SignUp.css";
import loginImage from "../images/loginImage.svg";
import { useAlert } from "react-alert";
import { AuthContext } from "../Auth";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";


const useStyles = makeStyles((theme) => ({
  root: { height: "100vh", overflow: "hidden" },
  image: {
    backgroundImage: `url(${loginImage})`,
    backgroundColor: "#7AA18A",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "70%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    vericalAlign: "middle",
    alignItems: "center",
    background: "#F5F8F6",
    height: "100vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#7AA28A",
    "&:hover": {
      backgroundColor: "#7AA28A",
    },
  },
  smalllinks: {
    color: "#67776D",
  },
  input: {
    borderColor: "#828282",
    borderWidth: 1,
    "&:hover": {
      borderColor: "#828282",
      borderWidth: 2,
    },
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const alert = useAlert();

  const { signIn, signUp } = React.useContext(AuthContext);

  const history = useHistory();

  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');

  async function handleSignUp(event) {
    event.preventDefault();
    const {
      email,
      password,
      username,
      phoneNumber,
      country,
      city,
    } = event.target.elements;
    let result = await signUp({
      email: email.value,
      username: username.value,
      phoneNumber: phoneNumber.value,
      country: country.value,
      city: city.value,
      password : password.value
    });

    if(result) {
      signIn({email : email.value, password : password.value})
      history.push("/login")
    }
  }

  /*return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label>
          Username
          <input name="username" type="text" placeholder="Username" />
        </label>
        <label>
          Phone Number
          <input name="phoneNumber" type="number" placeholder="Phone Number" />
        </label>
        <label>
          Country
          <input name="country" type="text" placeholder="Country" />
        </label>
        <label>
          City
          <input name="city" type="text" placeholder="City" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">
        <button>Go Login Page</button>
      </Link>
    </div>
  );*/

  return (
    <Grid
      style={{ maxheight: "100%" }}
      container
      component="main"
      className={classes.root}
    >
      <CssBaseline />
      <Grid
        style={{
          background: "#7AA18A",
        }}
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
      />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        style={{
          background: "#F5F8F6",
          height: "100vh",
        }}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div
          style={{
            position: "relative",
            bottom: "100px",
            overflow: "hidden",
            height: "100vh",
          }}
          className={classes.paper}
        >
          <h1
            style={{
              position: "relative",
              top: "30px",
            }}
            className="login"
          >
            Register
          </h1>
          <form className={classes.form} onSubmit={handleSignUp}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoFocus
            />
            <CountryDropdown
            value={country}
            required
            fullWidth
            id="country"
            onChange={(val) => setCountry(val)}
            whitelist={["SG", "HK", "MY", "ID"]}
            style={{
              margin: "1%",
              marginBottom: "5%",
              width: "21vw",
              minHeight: "6.5vh",
              textAlign: "start",
              padding: "1%",
              backgroundColor: 'transparent',
              borderColor: '#7AA18A',
              borderRadius: '3px',
            }}
          />
          <RegionDropdown
            country={country}
            value={city}
            onChange={(val) => setCity(val)}
            id="city"
            required
            fullWidth
            style={{
              marginTop: "6%",
              marginBottom: "4%",
              marginLeft: '3%',
              width: "14vw",
              minHeight: "6.5vh",
              textAlign: "start",
              padding: "1%",
              backgroundColor: 'transparent',
              borderColor: '#7AA18A',
              borderRadius: '3px'
            }}
          />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Mobile Number"
              type="number"
              id="phoneNumber"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              REGISTER
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link className="loginLink" to="/login">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
