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
  const endpoint = "http://172.60.0.5:8000/graphql/"
  const navigate = useNavigate()

  const navigateLink = (path) => {
    navigate(path)
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
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
        if (response.data && response.data.errors && response.data.errors[0].message === "User Exists"){
          setResponseMessage("Email already in use.")
        }
        
        if(response.data.data && response.data.data.createUsers && response.data.data.createUsers.user){
          navigate("/activate")
        }

      
    } catch (error) {
        // Handle the error
        console.log(error)
        setResponseMessage("Server Error")
      }
    }

    else{
      setResponseMessage("Passwords do not match.")
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
        <Card className={classes.card} style={{marginTop: "-2px"}}>
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
