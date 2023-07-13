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
      marginLeft: "-200px",
      width: "100%",
      marginTop: "40px"
      
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
      marginLeft: "0px"
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
    marginRight: "90%",

    [theme.breakpoints.up("xl")]: {
      width : "50px",
      marginRight: 0
    },  

    
  }
}));

const Packages = ({setView}) => {
  const classes = useStyles();
  
  const handleChange = () => {
    setView("profile")
  }

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const stripe_key = "pk_test_51Lc84CDTMi1SAp13sTQneXvANuJIBXWOnOBylf40E6Divd7OAjYN8uPVf3z1aL5c2637Qb5liWacPUfKLFBLC6Qq00nGGHipZG"
  
    const stripeSubscription = async () => {
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

    const createSubscription = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/crypto/coinbase/", {
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
    <Grid container spacing={3} className={classes.cardContainer}>
      <BiArrowBack className={classes.icon} onClick={handleChange}/>
      <Grid item xs={12} sm={4} lg={3} xl={2} className={classes.gridContainer}>
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
          <input type="hidden" name="price_id" value="price_1NRvsVDTMi1SAp13ecH5WWMB" />
          <Button
            variant="contained"
            color="primary"
            className={classes.paymentButton}
            onClick={createSubscription}
          >
            Pay with Card
          </Button>
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
      <Grid item xs={12} sm={4} lg={3} xl={2}>
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
            onClick={() => handleClick("https://buy.stripe.com/test_4gweVp0N22kc3UQ5kn")}
          >
            Pay with Card
          </Button>
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
      <Grid item xs={12} sm={4} lg={3} xl={2}>
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
          <form action={`http://localhost:8000/api/subscriptions/create-subscription/`} method="POST">
                        <input type="hidden" name="price_id" value="price_1NRvsWDTMi1SAp13BkGeXjXo" />
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
      <Grid item xs={12} sm={4} lg={3} xl={2}>
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
            onClick={() => handleClick("https://buy.stripe.com/test_fZeaF9brGcYQ9fa005")}
          >
            Pay with Card
          </Button>
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
