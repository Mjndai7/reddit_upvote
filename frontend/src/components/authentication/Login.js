import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link, TextField} from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logo/ref.png"
import AuthFooter from '../../utils/authFooter';
import useStyles from '../../assets/styles/authentication';


const LoginPage = ({setIsAdmin}) => {

  const classes = useStyles();
  const [name, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const endpoint = "https://botustech.com/graphql"
  const navigate = useNavigate()
 
  const navigateLink = (path) => {
    navigate(path)
  }
  
  const handleSubmitF = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    // You can access the values using the state variables (name, email, company, message)
    // Perform the necessary actions, such as making an API request, saving to a database, etc.
    if (name && email ) {
      // Process form submission
      localStorage.setItem("Email", email)
      localStorage.setItem("Name", name)
      localStorage.setItem("User", "User")

      if(email === " admin@maxupvote.com"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
      navigate("/");
    } else {
      // Highlight required fields
      setResponseMessage('All fields are required!');
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
            <form onSubmit={handleSubmitF}>
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
                      onClick={handleSubmitF}
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
