import React from 'react';
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
    marginTop: "10px",
    padding: "10px",
    marginBottom: "10px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack cards vertically
      
    },  

    [theme.breakpoints.up("xl")]: {
      marginLeft: "0px",
      width: "100%",
      marginTop: "40px",
      width: "100%"
      
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


    [theme.breakpoints.up("xl")]: {
      marginLeft: "0px",
      marginLeft: "-20px",
      paddingRight: "20px",
    },  

  },
  packageName: {
    marginBottom: theme.spacing(1),
    position: "center",
    alignItems: "center",
    marginLeft: "50px",
    paddingTop: "10px",
    color: "#E34234",
    marginRight: "50px"
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
    marginRight: "90%",

    [theme.breakpoints.up("xl")]: {
      width : "50px",
      marginRight: 0,
      marginLeft: "-100px"
    },  

    
  }
}));

const Packages = ({setView}) => {
  const classes = useStyles();

  const handleChange = () => {
    setView("profile")
  }

    const createSubscription = async () => {
      try {
        const response = await fetch(`http://172.60.0.5:8000/api/crypto/coinbase/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
        console.log("response:" , data.checkout_link)
        
        if (data.checkout_link) {
          window.location.href = data.checkout_link;
        } else {
          console.log("Error creating subscription:", data.error);
        }
      } catch (error) {
        console.log("Error creating subscription:", error);
      }
    };

  return (
    <Grid container spacing={5} className={classes.cardContainer}>
      <BiArrowBack className={classes.icon} onClick={handleChange}/>
      <Grid item xs={12} sm={4} lg={3} xl={3} className={classes.gridContainer}>
        <div className={classes.packageContainer}>
          <Typography variant="h5" className={classes.packageName}>
            $10.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.15 per vote 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />10 votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />150 votes
          </Typography>
          <form action={`http://172.60.0.5:8000/api/subscriptions/create-subscription/`} method="POST">
              <input type="hidden" name="price_id" value="price_1NWCp3CHHqRTZvFEKSNOBzXs" />
              <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            type="submit"
          >
            Pay with Card
          </Button>
        </form>
          <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
            onClick={createSubscription}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3} xl={3}>
        <div className={classes.packageContainer}>
        <Typography variant="h5" className={classes.packageName}>
            $50.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.12 per votes 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />60  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />600 votes
          </Typography>
          <form action={`http://172.60.0.5:8000/api/subscriptions/create-subscription/`} method="POST">
              <input type="hidden" name="price_id" value="price_1NWCkdCHHqRTZvFE4EipnBCz" />
              <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            type="submit"
          >
            Pay with Card
          </Button>
        </form>
        <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
            onClick={createSubscription}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3} xl={3}>
        <div className={classes.packageContainer} style={{border: "2px solid #E34234"}}>
        <Typography variant="h5" className={classes.packageName}>
            $500.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.10 per votes 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />150  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />5000 votes
          </Typography>
          <form action={`http://172.60.0.5:8000/api/subscriptions/create-subscription/`} method="POST">
              <input type="hidden" name="price_id" value="price_1NWCj2CHHqRTZvFEJgFDJaCr" />
              <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            type="submit"
          >
            Pay with Card
          </Button>
        </form>
          
        <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
            onClick={createSubscription}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} lg={3} xl={3}>
        <div className={classes.packageContainer}>
        <Typography variant="h5" className={classes.packageName}>
            $2000.00
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
            <AiOutlineCheckSquare />$0.07 per vote 
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />250  votes per min
          </Typography>
          <Typography variant="body1" className={classes.packageDescription}>
          <AiOutlineCheckSquare />14000 votes
          </Typography>
          <form action={`http://172.60.0.5:8000/api/subscriptions/create-subscription/`} method="POST">
              <input type="hidden" name="price_id" value="price_1NW6PMCHHqRTZvFE7AYWPgvq" />
              <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            type="submit"
          >
            Pay with Card
          </Button>
        </form>
        <Button
            variant="contained"
            color="secondary"
            className={classes.paymentButton}
            onClick={createSubscription}
          >
            Pay with Crypto
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Packages;
