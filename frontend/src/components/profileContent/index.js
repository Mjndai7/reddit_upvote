import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card} from "@material-ui/core";

import AnalyticsGraph from "./analytics";
import UserInfo from "./userInfo";
import Packages from "./packages";


const useStyles = makeStyles((theme) => ({
  container: {
    position: "center",
    overflowY: "scroll",
    height: "100vh",
    marginLeft: "300px",
    backgroundColor: "none",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "3px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "500px",
    },
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    color: "#E34234",
    fontFamily: "Lato",
   
  },
  card3: {
    // ...existing styles
    // Adjust the card width and height as needed
    width: "95%",
    height: "500px",
    background: "#171E2E",
    paddingRight: "100px",
    paddingLeft: "100px",

    [theme.breakpoints.down("lg")]: {
      height: "280px",
      with: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      height: "200px",
      with: "100%",
    },
  },
 
}));

const ProfileCard = () => {
  const classes = useStyles();
  const [view, setView] = useState("profile")

  const data = [
    { date: "2023-01-01", cost: 100, upvotes: 103 },
    { date: "2023-02-01", cost: 240, upvotes: 203 },
    { date: "2023-03-01", cost: 330, upvotes: 230 },
    { date: "2023-04-01", cost: 430, upvotes: 40 },
    { date: "2023-05-01", cost: 120, upvotes: 50 },
    { date: "2023-06-01", cost: 540, upvotes: 30 },
    { date: "2023-07-01", cost: 520, upvotes: 20 },
  ];
  
  return (
    <div className={classes.container}>
        {view === "profile"  ? <UserInfo view={view} setView={setView} /> : <Packages setView={setView}/>}
        <div className={classes.cardContainer}>
        <Card className={classes.card3}>
            <AnalyticsGraph data={data} />
        </Card>
      </div>
    </div>
  );
};

export default ProfileCard;

