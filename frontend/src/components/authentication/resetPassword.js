import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link, TextField} from '@material-ui/core';
import { IconButton, InputAdornment } from '@material-ui/core';
import {RxEyeClosed} from "react-icons/rx"
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Logo from "../../assets/logo/ref.png"
import AuthFooter from '../../utils/authFooter';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../assets/styles/authentication';


const ResetCard = () => {
  const classes = useStyles();
  const [password, setPasword] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const endpoint = `${process.env.REACT_APP_GRAPHQL_ENDPOINT}`
  const { token } = useParams();

  const navigate = useNavigate()

  const navigateLink = (link) => {
    navigate(link)
  }

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')
 

  const handleSubmitF = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    // You can access the values using the state variables (name, email, company, message)
    // Perform the necessary actions, such as making an API request, saving to a database, etc.
    if (password === confirmPassword ) {
      // Process form submission
      sendMutate();
    } else {
      // Highlight required fields
      setResponseMessage('Password Do not match');
    }
  };

const sendMutate = async (e) => {
  try {
    const response = await axios.post(endpoint, {
      query: `
        mutation {
          updatePassword(newPassword: "${confirmPassword}", token: "${token}") {
            success
          }
        }
      `,
    });

    // Handle the response data
    console.log(response.data.data.updatePassword.success)
    if(response.data.errors && response.data.errors[0].message === "Token mismatch"){
      setResponseMessage("Tokens Expired")
    }


    if(response.data.data.updatePassword.success  ===  true){
     navigate("/login")
    }
  
} catch (error) {
    // Handle the error
    console.log(error)
    setResponseMessage("Email not registered")

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
            
        <Card className={classes.card}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Change your Password
            </Typography>
            <form onSubmit={handleSubmitF}>
            <Typography variant="body1" className={classes.tagLine}>
              {responseMessage}
            </Typography>
                <Grid container spacing={2} direction="column" className={classes.formGrid}>
                  <Grid item>
                    <TextField
                      className={classes.formField}
                      type="password"
                      id="password"
                      required
                      placeholder="Password"
                      onChange={(e) => setPasword(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      className={classes.formField}
                      type={showPassword ? 'text' : 'password'}
                      id="conform_password"
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
                  <Grid item >
                    <Typography
                    variant="body1"
                    className={classes.tagLineR}
                    style={{ background: "none" }}
                  >
                    <Link to="/register" className={classes.tagLineR} onClick={() => navigateLink("/login")}>
                      Back to login?
                    </Link>
                  </Typography>
                  </Grid>
                  <Grid item>
                    <button
                      type="submit"
                      className={classes.buttonSubmit}
                      fullWidth
                      onClick={handleSubmitF}
                    >
                      REQUEST
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


export default ResetCard;
