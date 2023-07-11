import React from "react";
import { Card, CardContent, Typography, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {MdOutlineSwapVert}  from "react-icons/md"
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
    background: "none",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack cards vertically
      
    },  
  },
  
  card: {
    width: "40%",
    background: "none",
    marginTop: "5%",
    boxShadow: "none",
    marginRight: "50px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "97%",
      marginTop: "7%",
      marginLeft: "10px",
    },

    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginLeft: "-19px",
    },

    [theme.breakpoints.up("lg")]: {
      width: "500px",
    },
  },

  card2: {
    width: "40%",
    background: "none",
    marginTop: "5%",
    boxShadow: "none",
    width: "650px",
    marginLeft: "-20px",
    
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
      marginTop: "0px",
      marginBottom: "0px"
    },

   
  },
  cardContent: {
    clear: "both",
    color: "white",
    width: "90%",
    marginLeft: "20px",
    background: "transparent",
    borderRadius: "10px",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "0px",
    },

  },

  cardContent1: {
    clear: "both",
    color: "white",
    marginLeft: "0px",
    background: "transparent",
    width: "600px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },

    [theme.breakpoints.up("md")]: {
      width: "90%",
    },


  },
 
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: "#E34234",
    fontFamily: "Lato",

    [theme.breakpoints.down("sm")]: {
      marginTop: "30px"
    },  
  },
  
  gridContainer: {
    display: 'flex',
    direction: 'row',
    gap: theme.spacing(2),
    
    '@media (max-width: 600px)': {
      direction: 'column',
    }
  },

  
  cardTitle: {
    fontFamily: "Lato",
    color: "#E34234"
  },
 
  Usercard: {
    height: "50px",
    background: "#171E2E",
  },

  userItems: {
    marginTop: 10,
    padding: "10px",
    color:"#7F8183",
  },
  button: {
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    width: "100%",
    marginLeft : "1px",
    marginTop: "20px",
    margin: "10px",
    background: "#E34234",
    color: "white",
    height: "40px",

    '@media (max-width: 600px)': {
      width: "100%",
      marginLeft: "0px"
    } 
  },
  label: {
    marginBottom: theme.spacing(1),
    marginLeft: "0px",
    color: "white",
    fontFamily: "Lato",
    fontSize: "1em"
  },

  swap: {
    background: "#292D32",
    width: "30px",
    height: "30px",
    marginLeft: "50%",
    marginTop: "-14px",
    marginBottom: "-14px",
    borderRadius: "10px",
  }
}));

const UserInfo = ({view, setView}) => {
  const classes = useStyles();
  const username = localStorage.getItem("Name")
  const email = localStorage.getItem("Email")
  const balance = localStorage.getItem("Balance")
  const handleChange = () => {
    setView("packages")
  }
  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="body1">
          User Information.
          </Typography>
          <Grid container direction="column" className={classes.gridContainer}>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>Username</Grid>
                <Grid item className={classes.userItems}>{username}</Grid>
              </Grid>
            </Card>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>Email</Grid>
                <Grid item className={classes.userItems}>{email}</Grid>
              </Grid>
            </Card>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>Total Upvotes</Grid>
                <Grid item className={classes.userItems}>14,569</Grid>
              </Grid>
            </Card>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>Balance</Grid>
                <Grid item className={classes.userItems}>{"$" + balance}</Grid>
              </Grid>
            </Card>
          </Grid>
              <button onClick={handleChange} className={classes.button}>
                Add Balance
              </button>
        </CardContent>
      
      
      </Card>
      <Card className={classes.card2}>
        <CardContent className={classes.cardContent1}>
        <Typography className={classes.title} variant="body1">
           Convert Currency.
          </Typography>
          <Grid container direction="column" className={classes.gridContainer}>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>From</Grid>
                <Grid item className={classes.userItems}>50 USD</Grid>
              </Grid>
            </Card>
            <MdOutlineSwapVert className={classes.swap}/>
            <Card className={classes.Usercard}>
              <Grid item container justifyContent="space-between" alignItems="flex-end">
                <Grid item className={classes.userItems}>To</Grid>
                <Grid item className={classes.userItems}>4,099 INDIAN RUPEES</Grid>
              </Grid>
            </Card> 
            </Grid>
            <button onClick={setView} className={classes.button}>
                Convert Currency
              </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;