import React, {useState} from "react";
import { FormControl,  Select, Card, CardContent, Typography, Grid} from "@material-ui/core";
import useStyles from "../../assets/styles/upvotesection";
import axios from "axios";

import AlertBarner from "../../utils/barner";

const ContactFormCard = ({setGlobalUrls}) => {
  const classes = useStyles();
  const email = localStorage.getItem("Email")
  const [action, setAction] = useState('upvotes')
  const [postLink, setPostLink] = useState('');
  const [upvotes, setUpvotes] = useState('');
  const [speed, setSpeed] = useState('');
  const [urls, setUrls] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const endpoint = "http://localhost:8000/graphql"
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState(false)

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const closeAlert = () => {
    setOpen(false)
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setAction(event.target.value)
    
    if(event.target.value === "comments"){
      setComments(true)
    }
  };
  
 

  const createOrder = async (e) => {
    e.preventDefault();
      // Passwords match
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              createOrder(email: "${email}",action: "${action}", url: "${postLink}", number: "${upvotes}", speed: "${speed}") {
                url {
                  dateCreated
                }
              }
            }
          `,
        });
  
        // Handle the response data
        console.log(response)
      if(response.data.data.createOrder.url.dateCreated){
        handleAddLink()
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleAddLink = () => {

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
      setUpvotes('');
      setSpeed('');
    };

    console.log(urls)
    const startVotes = async (e) => {
      //send data to the api to start voting
      //return the url as they are being processed
      //also clear the url list when data is sent to the backend
      try {
        console.log("urls: ", urls)
        if (urls.length > 0){ 
          const response = await axios.post(endpoint, {
            query: `
              mutation {
                startOrder(email: "${email}", urls: "${urls}") {
                  urls {
                    dateCreated
                    status
                    url
                    action
                    speed
                    cost
                    number
                  }
                  message
                }
              }
            `,
          });
    
        // Handle the response data
        console.log(response.data.data.startOrder.message)
        if(response.data.data.startOrder){
          setGlobalUrls(response.data.data.startOrder.urls)
          setUrls([])
  
        }
       
        if(response.data.data.startOrder.message === "Insuficient Balance"){
          setMessage("Insufficient Balance")
          setOpen(true)
        }
      }
      } catch (error) {
        console.log(error)
      }
    };

    const clearList = () => {
      //send data to the api to start voting
      //return the url as they are being processed
      //also clear the url list when data is send to the backend
      if(comments === true){
        setComments(false)
      }
      setUrls([])
    }

  return (
    
    <div className={classes.cardContainer}>
      <AlertBarner onClose={closeAlert} isOpen={open} message={message} />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
        <FormControl className={classes.formControl}>
          <Select
            native
            value={selectedOption}
            className={classes.select}
            onChange={handleOptionChange}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#171E2E',
                  borderRadius: '10px',
                  width: "10%",
                  marginTop: "20px"
                },
              },
            }}
          > 
            <option value="">Choose an Action</option>
            <option value="comments">Comments</option>
            <option value="upvotes">Upovtes</option>
            <option value="downvotes">Downvotes</option>
          </Select>
        </FormControl>
          <Grid container direction="column" className={classes.gridContainer}>
              <Grid container direction="row" >
              <label htmlFor="postLink" className={classes.label}>
                  Reddit post url
              </label>
              <input
                  type="text"
                  placeholder="Post Link"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  className={classes.input}
                  disabled={!selectedOption}
              />
              </Grid>
              <Grid item>
                  <Grid container direction="row" >
                      <label htmlFor="postLink" className={classes.label}>
                          Number of {action}
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
                          Number of {action} per min.
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
              <button onClick={createOrder} className={classes.button}>
                Add To List
              </button>
        </CardContent>
      </Card>
      <Card className={classes.card2}>
        <CardContent className={classes.cardContent1}>
        <Typography className={classes.title} variant="body1">
          {urls.length} Posts to send {action}
          </Typography>
          {comments ? 
              <Card className={classes.listContainer}>
                  <textarea
                    placeholder="Enter Comments Here"
                    variant="outlined"
                    className={classes.input}
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{height: "100%", marginLeft: "-10px", color: "#7F8183", paddingLeft:"20px"}}
                  />
            </Card> :
              <Card className={classes.listContainer}>
              {urls.length > 0 ? (
                urls.map((url, index) => (
                  
                  <div key={index} className={classes.listItem}>
                  {url.substring(0, 55)}
                  </div>
                ))
              ) : (
                <Typography className={classes.title} variant="body1">
                    Add links to start {action}
                  </Typography>
              )}
            </Card>
          }
              
            <Grid container  className={classes.gridButtons}>
              <Grid style={{witdh: "100%"}} xs={12} sm={6} item>
                <button onClick={startVotes} className={classes.listButtons} >
                    Start {action}
                    </button>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                    <button onClick={clearList} className={classes.listButtons} >
                    {comments ? "Add Comments" : "clear list"}
                    </button>
              </Grid>
            </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormCard;