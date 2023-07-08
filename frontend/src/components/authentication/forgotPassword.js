import React, {useState} from 'react';
import { Card, CardContent, Container, Typography, Grid, Link, TextField} from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Logo from "../../assets/logo/ref.png"
import AuthFooter from '../../utils/authFooter';
import useStyles from '../../assets/styles/authentication';
import { useNavigate } from 'react-router-dom';


const ForgotCard = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const type = "Botus Fans"
  const [responseMessage, setResponseMessage] = useState("");
  const endpoint = "https://botustech.com/graphql"
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleButtonsClick = (link) => {
    // Add the logic to redirect to the TikTok page
    window.location.href = link;
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
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
        waitType: type,
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
             Forgot Password?well send you an email.
            </Typography>
        <Card className={classes.card}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Request Reset 
            </Typography>
            <form onSubmit={handleSubmitF}>
            <Typography variant="body1" className={classes.tagLine}>
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
                  <Grid container direction="column">
                    <Grid item >
                    <Typography
                    variant="body1"
                    className={classes.tagLineR}
                    style={{ background: "none" }}
                  >
                    <Link to="/login" className={classes.tagLineR} onClick={() => navigateLink("/login")}>
                     just remembered? sign In
                    </Link>
                  </Typography>
                  </Grid>
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


export default ForgotCard;
