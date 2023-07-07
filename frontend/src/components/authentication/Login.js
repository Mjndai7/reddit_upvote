import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Container, Typography, Grid, Link} from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logo/logo1.png"
import AuthFooter from '../../utils/authFooter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    //backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#0D1321",
    backgroundSize: "cover",
    backgroundPosition: "center", 
    background: "black",
  },

  logo: {
    position: 'absolute',
    display: "none",
    background: "none",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  },
  card: {
    maxWidth: 400,
    backgroundColor: "#171E2E",
    //border: "2px solid #0CC0DF",
    borderRadius: "20px",
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Updated box shadow style
    transition: 'box-shadow 0.3s ease-in-out', // Add transition for smooth effect
    '&:hover': {
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)', // Box shadow on hover
    },   

    [theme.breakpoints.up("lg")]: {
      marginTop: "30%",
      marginLeft: "10%"
    },

    [theme.breakpoints.up("xl")]: {
      marginTop: "40%",
      marginLeft: "0%"
    },

    [theme.breakpoints.down("md")]: {
      marginTop: "30%",
      marginLeft: "-40%"
    },


    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
      width: "100%",
      marginLeft: "0px"
    },

    [theme.breakpoints.down("xs")]: {
      marginBottom: "80px",
    },
  },

  formContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: "40px",
    //backgroundColor: "black",
  },
  formField: {
    marginBottom: theme.spacing(1),
    outline: "none",
    width: "100%",
    height: "40px",
    paddingLeft: "10px",
    color: "#7F8183",
    border: 0,
    borderRadius: "10px",
    marginLeft: "-10px",
    border: "none",
    backgroundColor: "#0D1321",

    [theme.breakpoints.down("sm")]: {
      width: "92%",
      marginLeft: "7px"
    },
  },


  label: {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    marginLeft: "",
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color:  "#0CC0DF",
    marginTop: "2%",
    marginBottom: theme.spacing(0),
  },

  title1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color:  "#0CC0DF",
    marginTop: "-5%",
    marginBottom: theme.spacing(0),
  },
  
  tagLine:{
    color: "#E34234",
    marginBottom: theme.spacing(1),
  },

  tagLineR:{
    color: "gray",
    marginBottom: theme.spacing(0),
    fontSize: ".8rem",
    marginRight: "20px",
    cursor: "pointer",
    textDecoration: "none",
    background: "none",
    '&:hover': {
      color: "#E34234"
    },  
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15px" // Stack cards vertically
      
    },  
    
  },

  formGrid: {
    backgroundColor: "none",
    width: 350,
    marginLeft: "0%"
  },

  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    fontSize: '1.2rem',
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: "20px",
    

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
  },

  button: {
    color: '#0CC0DF',
    fontWeight: 'bold',
    borderRadius: 20,
    marginRight: "0px",
    marginLeft: "5px",
    border: "none",
    backgroundColor: "#black",
    padding: theme.spacing(1, 4),
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
    '&:hover': {
      backgroundColor: '#C9E0E4', // Background color on hover
      border: 0,
    },

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginTop: "10px"
    },
  },

  buttonS: {
    color: '#0CC0DF',
    fontWeight: 'bold',
    borderRadius: 20,
    marginTop: "2px",
    border: "2px solid #0CC0DF",
    backgroundColor: "#black",
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
    '&:hover': {
      backgroundColor: '#C9E0E4', // Background color on hover
      border: 0,
    },
  },

  menu: {
    background: "#F8D5D8",
    width: 150,
    padding: 5
  },

  buttonSubmit: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
    height: "40px",
    width: "103%",
    marginLeft: "-10px",
    border: "none",
    backgroundColor: "#E34234",
    padding: theme.spacing(1, 4),
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
    
    '&:hover': {
      backgroundColor: '#E34234', // Background color on hover
      cursor: "pointer",
      color: "white"
    },

    [theme.breakpoints.down("sm")]: {
      width: "96%",
      marginLeft: "7px"
    },
  },
  topRightButtons: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > *': {
      marginTop: "-10px",
    },
  },
  closeButton: {
    top: 0,
    marginRight: "-80%",
  },

  icon: {
    marginTop: "0%",
    paddingRight :"10px", 
  
  }
}));


const LoginPage = ({setIsAdmin}) => {

  const classes = useStyles();
  const [name, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const type = "Botus Fans"
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
        <Card className={classes.card}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Sign In
            </Typography>
            <form onSubmit={handleSubmitF}>
            <Typography variant="body1" className={classes.tagLine}>
              {responseMessage}
            </Typography>
                <Grid container spacing={2} direction="column" className={classes.formGrid}>
                  <Grid item>
                  <input
                      className={classes.formField}
                      type="email"
                      id="email"
                      required
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <input
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
