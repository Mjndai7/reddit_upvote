import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link} from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import {RxEyeClosed} from "react-icons/rx"
import { useNavigate } from 'react-router-dom';


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


  const endpoint = "https://botustech.com/graphql"
 
  const navigate = useNavigate()
 
  const navigateLink = (path) => {
    navigate(path)
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    // You can access the values using the state variables (name, email, company, message)
    // Perform the necessary actions, such as making an API request, saving to a database, etc.
    if (name && email ) {
      // Process form submission
      sendMutate();
    } else {
      // Highlight required fields
      setResponseMessage('All fields are required!');
    }
  };

  const client = new ApolloClient({
    
    uri: endpoint,
    cache: new InMemoryCache(),
  });

  const WAIT_LIST_USER = gql`
  mutation WaitlistUsersMutaion($email: String!, $name: String!, $waitType: String!) {
    waitlistUsers(email: $email, name: $name, waitType: $waitType) {
      user {
        name
      }
    }
  }
`;
const sendMutate = () => {
  client
    .mutate({
      mutation: WAIT_LIST_USER,
      variables: {
        email: email,
        name: name,
      },
    })
    .then((result) => {
      if (result.data.name !== null) {
        setResponseMessage(`We'll notify you when our product out`);
      } 
      else {
        setResponseMessage('An error occurred.try again later');
      }
    })
    .catch((error) => {
      setResponseMessage('An error occurred.try again later');
    });
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
                      id="email"
                      required
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      className={classes.formField}
                      type={showPassword ? 'text' : 'password'}
                      id="email"
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