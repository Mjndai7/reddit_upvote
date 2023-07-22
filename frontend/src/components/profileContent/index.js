import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card} from "@material-ui/core";
import axios from "axios";

import AnalyticsGraph from "./analytics";
import UserInfo from "./userInfo";
import Packages from "./packages";


const useStyles = makeStyles((theme) => ({
  container: {
    position: "center",
    //overflowY: "scroll",
    height: "100vh",
    marginLeft: "300px",
    backgroundColor: "none",
    scrollbarWidth: "thin",
    //scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "3px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      width: "100%",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "500px",
    },
  },
  
  container2: {
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
      width: "100%",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "300px",
      marginTop: "25px"
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
    marginBottom: "100px",

    [theme.breakpoints.down("lg")]: {
      height: "280px",
      with: "100%",
    },

    
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      with: "100%",
    },

  [theme.breakpoints.up("xl")]: {
    height: "490px",
    width: "100%",
  },
},

card4: {
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

[theme.breakpoints.up("xl")]: {
  height: "490px",
  width: "100%",
  marginLeft : "0px"
},

},

 
}));

const ProfileCard = () => {
  const classes = useStyles();
  const [view, setView] = useState("profile")
  const urls = []
  const email = localStorage.getItem("Email")
  const [data, setData] = useState([])
  const endpoint =  "http://170.64.130.58:8000/graphql/"
  useEffect(() => {
    recentActivities()
  }, [])

  const recentActivities = async (e) => {
    //send data to the api to start voting
    //return the url as they are being processed
    //also clear the url list when data is sent to the backend
    console.log(urls)
    try {
      const response = await axios.post(endpoint, {
        query: `
          mutation {
            startOrder(email: "${email}", urls: "${urls}") {
              urls {
                dateCreated
                cost
                number
              }
            }
          }
        `,
      });

    // Handle the response data
    
    if(response.data.data.startOrder.urls){
      const urls = response.data.data.startOrder.urls;
      const lastSevenItems = urls ? urls.slice(-7) : [];
      setData(lastSevenItems);
      console.log(data)
    }
    
  } catch (error) {
    console.log(error)
  }
};
  
  return (
    <div className={view === "profile"  ? classes.container :  classes.container2}>
        {view === "profile"  ? <UserInfo view={view} setView={setView} /> : <Packages setView={setView}/>}
        <div className={classes.cardContainer}>
        {view === "profile" ?  
        <Card className={classes.card3}>
           <AnalyticsGraph data={data} /> 
        </Card>
        :  null}
      </div>
    </div>
  );
};

export default ProfileCard;

