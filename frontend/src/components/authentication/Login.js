import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link, TextField} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logo/ref.png"
import AuthFooter from '../../utils/authFooter';
import useStyles from '../../assets/styles/authentication';
import axios from 'axios';



const LoginPage = () => {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState("");
  const endpoint =  "http://170.64.130.58:8000/graphql/"
  const navigate = useNavigate()
 
  const navigateLink = (path) => {
    navigate(path)
  }
  

  const handleSubmit = async (e) => {

    e.preventDefault();
      // Passwords match
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              loginUser(email: "${email}", password: "${password}") {
                user {
                  name
                  isadmin
                  balance
                  email
                }
              }
            }
          `,
        });

        if(response.data && response.data.errors &&  response.data.errors[0].message === "No User" ){
          setResponseMessage("User does not exist!")
        }

        if(response.data && response.data.errors &&  response.data.errors[0].message === "Invalid credentials" ){
          setResponseMessage("Credentials do not match!")
        }

        if(response.data && response.data.data && response.data.data.loginUser && response.data.data.loginUser.user){
          localStorage.setItem("Email", email)
          localStorage.setItem("Name", response.data.data.loginUser.user.name)
          localStorage.setItem("Balance", response.data.data.loginUser.user.balance)
          localStorage.setItem("User", response.data.data.loginUser.user.isadmin)
          console.log(typeof(response.data.data.loginUser.user.isadmin))
          navigate("/")
        }

        
    } catch (error) {
        // Handle the error
        console.log(error)
        setResponseMessage("An error occured")
    }
  };

  return (
    <div className={classes.root}>
      {/* Logo */}
      <img src={Logo} alt="Logo" className={classes.logo} />

      {/* Card */}
    <Container maxWidth="sm">
    <Typography variant="body1" className={classes.title1}>
              Welcome to Max Upvote.
            </Typography>
            <Typography variant="body1" className={classes.heroTitle}>
             Get unlimited Votes and comments on reddit
            </Typography>
        <Card className={classes.card}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
            <Typography variant="body1" className={classes.response}>
              {responseMessage}
            </Typography>
                <Grid container spacing={2} direction="column" className={classes.formGrid}>
                  <Grid item>
                  <TextField
                      className={classes.formField}
                      type="email"
                      id="email"
                      required
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      className={classes.formField}
                      type="password"
                      id="password"
                      required
                      placeholder="Passowrd"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid container direction="row"  justifyContent="space-between">
                    <Grid item >
                    <Link to="/register" className={classes.tagLineR} onClick={() => navigateLink("/register")}>
                      Dont have account?
                    </Link>
                  </Grid>
                  < Grid item>
                    <Link to="/forgot-password" className={classes.tagLineR} onClick={() => navigateLink("/forgot-password")}>
                      forgot password?
                    </Link>
                  </Grid>
                  </Grid>
                  <Grid item>
                    <button
                      type="submit"
                      className={classes.buttonSubmit}
                      fullWidth
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>

      <AuthFooter />
    </div>
  );
};


export default LoginPage;
