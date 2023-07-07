import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import Logo from "../assets/logo/ref.png"

const useStyles = makeStyles((theme) => ({
  footer: {
    backdropFilter: 'blur(10px)',
    backgroundColor: '#171E2E',
    color: 'blue',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },

  },

  logo: {
    left: 0,
    width: 30,
    height: 30,

    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  },

  footerContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "none",
    marginLeft: "30%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "4%",
      width: "100%",
      marginTop: "0%"
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "0%"
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "34%"
    },
  },
  from:{
    color: "#E34234",
    marginBottom: theme.spacing(0),
    marginRight: "10px",
    marginLeft: "10px",
    
    [theme.breakpoints.down("sm")]: {
      marginRight: "2px",
      marginLeft: "2px",
    },
    
  },

  companyName: {
    color: "#FF914D",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  },
  link: {
    color: '#7F8183',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    marginRight: '3px',
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
    '&:hover': {
      color: '#61B7E9', // Background color on hover
    },
  },
  socialIcon: {
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
    color: '#0CC0DF',
    cursor: 'pointer',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  socialIconSi: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontSize: '1.2rem',
    color: '#0CC0DF',
    cursor: 'pointer',
  },
}));

const AuthFooter = () => {
  const classes = useStyles();

  {/*const handleLinkedInClick = () => {
    // Add the logic to redirect to the LinkedIn page
    window.location.href = 'https://www.linkedin.com/company/botus-tech/';
  };*/}

 

  return (
    <footer className={classes.footer}>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <img src={Logo} className={classes.logo} alt="Botus Tech" />
        </a>
      <div className={classes.footerContent}>
        <Grid container direction="row" alignItems="center">
          <div className={classes.from}>Max UPvote</div>
          <div className={classes.footerLinks}>

            <Grid container direction="row">
            <a className={classes.link} href="https://botustech.com/terms">
            <Typography>Terms of Use</Typography>
          </a>
          <Typography className={classes.from}>
            and
          </Typography>
          <a className={classes.link} href="https://botustech.com/privacy">
            <Typography>Privacy Policy</Typography>
          </a>
            </Grid>
          
        </div>
        </Grid>
      </div>
    </footer>
  );
};

export default AuthFooter;
