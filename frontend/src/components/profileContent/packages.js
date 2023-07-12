import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {AiOutlineCheckSquare} from "react-icons/ai"
import {BiArrowBack} from "react-icons/bi"

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
    background: "none",
    marginTop: "50px",
    padding: "10px",
    marginBottom: "10px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack cards vertically
      
    },  
  },

  packageContainer: {
    marginBottom: theme.spacing(3),
    paddingLeft: "20px",
    paddingRight: "20px",
    alignItems: 'center',
    justifyContent: 'center',
    background: "#171E2E",
    borderRadius: "5px",
    height: "100%",
    "&:hover": {
      border: "2px solid #E34234"
    },

  },
  packageName: {
    marginBottom: theme.spacing(1),
    position: "center",
    alignItems: "center",
    marginLeft: "50px",
    paddingTop: "10px",
    color: "#E34234",
  },
  packageDescription: {
    marginBottom: theme.spacing(2),
    color: "#7F8183"
  },
  paymentButton: {
    marginRight: theme.spacing(2),
    width: "100%",
    marginBottom: "20px",
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    background: "#0D1321",
    color: "white",
    "&:hover": {
      background: "#E34234",
    },

    '@media (max-width: 600px)': {
      width: "100%",
      marginLeft: "0px"
    } 
  },

  icon: {
    right: 0,
    color: "#E34234",
    width: "100%",
    marginBottom: "20px",
    padding: theme.spacing(1),
    cursor: 'pointer',
    justifyContent: "left",
    marginRight: "90%"
    
  }
}));

const Packages = ({setView}) => {
  const classes = useStyles();
  
  const handleChange = () => {
    setView("profile")
  }

  const handleClick = () => {
    window.open("https://buy.stripe.com/test_6oE28DfHW0c4772aEG", '_blank');
  };

  const stripe_key = "pk_test_51Lc84CDTMi1SAp13sTQneXvANuJIBXWOnOBylf40E6Divd7OAjYN8uPVf3z1aL5c2637Qb5liWacPUfKLFBLC6Qq00nGGHipZG"
  
    const createSubscription = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/subscriptions/create-subscription/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lookup_key: stripe_key, // Replace with the actual lookup key
          }),
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = data.checkout_url;
        } else {
          console.log("Error creating subscription:", data.error);
        }
      } catch (error) {
        console.log("Error creating subscription:", error);
      }
    };

  return (
    <Grid container spacing={3} className={classes.cardContainer}>
      <BiArrowBack className={classes.icon} onClick={handleChange}/>
      <Grid item xs={12} sm={4} lg={3} className={classes.gridContainer}>
        <div className={classes.packageContainer}>
          <Typography variant="h5" className={classes.packageName}>
            $20.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.05 per vote 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />10 votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />100 votes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            onClick={handleClick}
          >
            Pay with Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <div className={classes.packageContainer}>
        <Typography variant="h5" className={classes.packageName}>
            $50.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.1 per votes 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />60  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />500 votes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
          >
            Pay with Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <div className={classes.packageContainer} style={{border: "2px solid #E34234"}}>
        <Typography variant="h5" className={classes.packageName}>
            $100.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.125 per votes 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />150  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />1000 votes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
          >
            Pay with Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <div className={classes.packageContainer}>
        <Typography variant="h5" className={classes.packageName}>
            $250.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.15 per vote 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />250  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />2500 votes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
          >
            Pay with Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Packages;
