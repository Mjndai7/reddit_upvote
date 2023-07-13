import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link} from '@material-ui/core';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import {RxEyeClosed} from "react-icons/rx"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


//local imports 
import Logo from "../../assets/logo/ref.png"
import useStyles from "../../assets/styles/authentication"
import AuthFooter from '../../utils/authFooter';



const RegisterPage = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')
  const endpoint = `${process.env.REACT_APP_GRAPHQL_ENDPOINT}`
  const navigate = useNavigate()

  const navigateLink = (path) => {
    navigate(path)
  }

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const isEmailValid = isValidEmail(email);
    setResponseMessage("Passwords do not match.")

    if (password === confirmPassword && isEmailValid) {
      // Passwords match
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              createUsers(email: "${email}", name: "${name}", password: "${password}") {
                user {
                  name
                  isadmin
                  balance
                }
              }
            }
          `,
        });
  
        // Handle the response data
        if(response.data.data.createUsers.user){
          navigate("/login")
        }
      
        if(response.data.errors){
        setResponseMessage("Email Already in use")
      }
      
    } catch (error) {
        // Handle the error
        setResponseMessage(error.message)
      }
    }

    else{
      {isValidEmail === true ?  setResponseMessage("Passwords do not match.") :  setResponseMessage("Use a valid Email")}
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
        <Card className={classes.card} style={{marginTop: "-5px"}}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
            <Typography variant="body1" className={classes.response}>
              {responseMessage}
            </Typography>
                <Grid container spacing={2} direction="column" className={classes.formGrid}>
                <Grid item>
                <TextField
                      className={classes.formField}
                      type="text"
                      id="name"
                      required
                      placeholder="Username"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
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
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      className={classes.formField}
                      type={showPassword ? 'text' : 'password'}
                      id="confirmpass"
                      required
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="start"
                              style={{color: "red"}}
                            >
                              {showPassword ? <RxEyeClosed /> : <RxEyeClosed />}
                              
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container direction="column" >
                    <Link to="/login" className={classes.tagLineR} onClick={() => navigateLink("/login")}>
                      Already registered? sign In
                    </Link>
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


export default RegisterPage;