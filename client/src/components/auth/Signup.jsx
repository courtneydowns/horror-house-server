import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FaGhost } from "react-icons/fa";
// import useWindowDimensions from "../customHooks/useWindowDimension";

export default function Signup({ updateToken }) {
  // const { width } = useWindowDimensions();

  let history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword1 = (e) => setPassword1(e.target.value);
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsernameAvailable = () => {
    const userAvailFetch = async () => {
      try {
        if (validateUsername(username)) {
          const usernameResults = await fetch(
            `http://localhost:3001/user/checkAvail/${username}`
          );
          const usernameJson = await usernameResults.json();
          setUsernameAvailable(usernameJson);
        } else if (username.length < 6) {
          setUsernameAvailable(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    userAvailFetch();
  };

  const validateName = (fullName) => fullName.split(" ").length >= 2;
  const validateUsername = (username) => username.length >= 6;
  const validateEmail = (emailAddress) =>
    emailAddress.split("").includes("@") && emailAddress.length >= 6;
  const validatePasswordsMatch = (p1, p2) => p1 === p2;
  const validatePasswordLength = (p1) => p1.length >= 8;

  useEffect(() => {
    setPasswordsMatch(validatePasswordsMatch(password1, password2));
  }, [password1, password2]);

  useEffect(handleUsernameAvailable, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      alert("Please fill out your full name.");
      return;
    }
    if (!validateUsername(username)) {
      alert("Username must be at least 6 characters long.");
      return;
    }
    if (!usernameAvailable) {
      alert("That username is already taken.");
    }
    if (!validateEmail(email)) {
      alert("Please use a valid email address.");
      return;
    }
    if (!passwordsMatch) {
      alert("Passwords must match.");
      return;
    }
    if (!validatePasswordLength(password1)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const fetchResults = await fetch(`http://localhost:3001/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          username,
          name: name
            .split(" ")
            .map((name) => name[0].toUpperCase() + name.slice(1))
            .join(" "),
          password: password1,
          email,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const json = await fetchResults.json();
      // console.log("json response", json);
      updateToken(json.sessionToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {/* <Typography
          component="h1"
          variant={width>=960 ? "h2" : "h4"}
          style={{ marginBottom: 30, fontStyle: "italic" }}
        >
          Welcome to Pet Tinder
        </Typography> */}
      <Avatar sx={{ m: 1, bgcolor: "#cc0000" }}>
        <FaGhost style={{ fontSize: "3rem" }} />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign Up
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='full-name'
          label='Full Name'
          name='full-name'
          autoFocus
          value={name}
          onChange={handleName}
        />
        <TextField
          title='Username must be at least 6 characters!'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          value={username}
          onChange={handleUsername}
          autoComplete='false'
        />
        <Typography
          variant='caption'
          style={{
            color: usernameAvailable ? "green" : "red",
          }}
        >
          {usernameAvailable === true
            ? "Username available!"
            : usernameAvailable === false
            ? "That username is already taken"
            : null}
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          type='email'
          fullWidth
          id='email'
          label='Email'
          name='email'
          value={email}
          onChange={handleEmail}
        />
        <TextField
          title='Please choose a password'
          variant='outlined'
          margin='normal'
          required
          // style={width > 550 ? { width: "48%", marginRight: "2%" } : null}
          // fullWidth={width <= 550 ? true : false}
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password1}
          onChange={handlePassword1}
        />
        <TextField
          title='Passwords must match!'
          variant='outlined'
          color={!passwordsMatch ? "secondary" : null}
          margin='normal'
          required
          // style={width > 550 ? { width: "48%", marginLeft: "2%" } : null}
          // fullWidth={width <= 550 ? true : false}
          name='password'
          label={
            password2
              ? passwordsMatch
                ? "Passwords match ✔"
                : "Passwords must match"
              : "Re-enter password"
          }
          type='password'
          id='password'
          autoComplete='current-password'
          value={password2}
          onChange={handlePassword2}
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Sign up
        </Button>
        <Grid container>
          <p
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            className='signup__toggle'
            onClick={() => history.push("./")}
          >
            Already have an account? Sign up here.{" "}
          </p>
        </Grid>
      </form>
    </Grid>
  );
}
