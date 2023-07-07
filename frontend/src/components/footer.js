import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import { SiTiktok } from 'react-icons/si';

const useStyles = makeStyles((theme) => ({
  footer: {
    backdropFilter: 'blur(10px)',
    backgroundColor: '#0D1321',
    color: 'blue',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    
  },
  footerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  companyName: {
    color: "#E34234",
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
  },
  socialIcon: {
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
    color: '#61B7E9',
    cursor: 'pointer',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  socialIconSi: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-20px",
    },
    fontSize: '1.2rem',
    color: '#61B7E9',
    cursor: 'pointer',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <Grid container direction="row" alignItems="center">
          <div className={classes.companyName}>max upvote Inc &copy; {new Date().getFullYear()}</div>
          <div className={classes.footerLinks}>

            <Grid container direction="row">
            <a className={classes.link} href="/">
            <Typography>Terms of Use</Typography>
          </a>
          <Typography variant="body2" style={{color: "#E34234", marginLeft: "5px", marginRight: "5px", fontSize: "1rem"}}>
            and
          </Typography>
          <a className={classes.link} href="/">
            <Typography>Privacy Policy</Typography>
          </a>
            </Grid>
          
        </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
