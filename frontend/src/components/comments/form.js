import React, {useState} from "react";
import { Card, CardContent, Typography, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack cards vertically
      
    },  
  },
  
  card: {
    width: "40%",
    background: "none",
    marginTop: "6%",
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
    marginTop: "6%",
    boxShadow: "none",
    width: "650px",
    marginLeft: "-20px",
    
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "0px",
      marginBottom: "50px"
    },

   
  },
  cardContent: {
    clear: "both",
    color: "white",
    width: "90%",
    marginLeft: "20px",
    background: "#171E2E",
    borderRadius: "10px",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "0px",
    },

  },

  cardContent1: {
    justifyContent: "center",
    clear: "both",
    color: "white",
    paddingLeft: "50px",
    background: "#171E2E",
    width: "0px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
      width: "94%",
    },

    [theme.breakpoints.up("md")]: {
      width: "85%",
    },


  },
  logo: {
    height: "200px",
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
  description: {
    fontSize: "1.2rem",
    fontFamily: "Lato",

    [theme.breakpoints.down("sm")]: {
      display: "none",
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

  input: {
    width: '100%',
    background: "#0D1321",
    color: "#7F8183",
    height: "25px",
    border: "none",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    outline: "none",

    [theme.breakpoints.down("xl")]: {
      width: "98%"
    },
  },
  button: {
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    height: "35px",
    width: "100%",
    marginLeft : "1px",
    marginTop: "20px",
    margin: "10px",
    background: "#E34234",
    color: "white",
    outline: "none",

    '@media (max-width: 600px)': {
      width: "98%",
      marginLeft: "2px"
    } ,
    [theme.breakpoints.down("xl")]: {
      width: "99%"
    },
  },
  label: {
    marginBottom: theme.spacing(1),
    marginLeft: "0px",
    color: "white",
    fontFamily: "Lato",
    fontSize: "1em"
  },
  cardTitle: {
    fontFamily: "Lato",
    color: "#E34234"
  },
  listContainer: {
    height: 240,
    background: "none",
    boxShadow: "none",
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      paddingRight: '10px',
      marginLeft: '0px',
      height: 235,
    },
    '@media (max-width: 600px)': {
      width: "100%",
      height: 200
    }    
  },

  listButtons: { 
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    width: "83%",
    height: "35px",
    marginLeft : "1px",
    margin: "10px",
    background: "#E34234",
    color: "white",
    '@media (max-width: 600px)': {
      width: "100%",
    } 
  },

  gridButtons: {
    direction: "row",
    marginTop: "12px",
    
    '@media (max-width: 600px)': {
      direction: "row"
    }   
  },
  listItem: {
    marginTop: "5px",
    color:"#7F8183",
    boxShadow: "none",
  }

}));

const ContactFormCard = () => {
  const classes = useStyles();
  const [postLink, setPostLink] = useState('');
  const [upvotes, setUpvotes] = useState(0);
  const [speed, setSpeed] = useState('');

  const [urls, setUrls] = useState([
    "https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/",
    "https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/",
    "https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/",
    "https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/",
    "https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/",
  ]);

  const shortenUrl = (url, maxLength) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  const handleAddLink = () => {
    // Logic to add the link to a post
    console.log('Link added:', postLink);
    console.log('Upvotes:', upvotes);
    console.log('Speed:', speed);


    // Add the new URL to the beginning of the array
    if(postLink != ""){
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (urlRegex.test(postLink)) {
        // Create a copy of the current urls array
        const updatedUrls = [...urls];

        // Add the new URL to the beginning of the array
        updatedUrls.unshift(postLink);

        // Set the state with the updated array
        setUrls(updatedUrls);
      }
    }
      // Reset the form fields
      setPostLink('');
      setUpvotes(50);
      setSpeed('');
    };


    const startCommenting = () => {
      //send data to the api to start voting
      //return the url as they are being processed
      //also clear the url list when data is send to the backend
      setUrls([])
    }

    const clearList = () => {
      //send data to the api to start voting
      //return the url as they are being processed
      //also clear the url list when data is send to the backend
      setUrls([])
    }


  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="body1">
          Order Comments.
          </Typography>
          <Grid container direction="column" className={classes.gridContainer}>
              <Grid container direction="row" >
              <label htmlFor="postLink" className={classes.label}>
                  Post Url
              </label>
              <input
                  type="text"
                  placeholder="Post Link"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  className={classes.input}
              />
              </Grid>
              <Grid item>
                  <Grid container direction="row" >
                      <label htmlFor="postLink" className={classes.label}>
                          No Comments
                      </label>
                    <input
                      type="text"
                      placeholder="1000"
                      value={upvotes}
                      onChange={(e) => setUpvotes(e.target.value)}
                      className={classes.input}
                  />
                  </Grid >
              </Grid>
              <Grid item>
                  <Grid container direction="row" >
                      <label htmlFor="postLink" className={classes.label}>
                          Speed
                      </label>
                  <input
                      type="text"
                      placeholder="24"
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                      className={classes.input}
                  />
                  </Grid>
              </Grid>
              </Grid>
              <button onClick={handleAddLink} className={classes.button}>
              Add Link
              </button>
        </CardContent>
      </Card>
      <Card className={classes.card2}>
        <CardContent className={classes.cardContent1}>
        <Typography className={classes.title} variant="body1">
          {urls.length} Links To Comment
          </Typography>
              <Card className={classes.listContainer}>
              {urls.length > 0 ? (
                urls.map((url, index) => (
                  
                  <div key={index} className={classes.listItem}>
                  {url.substring(0, 55)}
                  </div>
                ))
              ) : (
                <Typography className={classes.title} variant="body1">
                    Add links to start Commenting
                  </Typography>
              )}
            </Card>
            <Grid container  className={classes.gridButtons}>
              <Grid style={{witdh: "100%"}} xs={12} sm={6} item>
                <button onClick={startCommenting} className={classes.listButtons} >
                    Start Commenting
                    </button>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                    <button onClick={clearList} className={classes.listButtons} >
                    clear List
                    </button>
              </Grid>
            </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormCard;