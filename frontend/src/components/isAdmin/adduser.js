import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


import AlertBarner from '../../utils/barner';

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: '#171E2E',
    boxShadow: 'none',
    borderRadius: "5px",
    width: '500px !important' , // Set the width to be half the size
     // Position the dialog on the right side

    [theme.breakpoints.down("sm")]: {
      marginLeft: "10%",
    },

    [theme.breakpoints.up("md")]: {
      marginLeft: "70%",
      marginTop: "%",
    },

    [theme.breakpoints.up("lg")]: {
      marginLeft: "10%",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "0px",
      marginTop: "-10%"
    },

  },
  dialogTitle: {
    color: '#E34234',
  },

  input: {
    width: '97%',
    background: "#0D1321",
    height: "30px",
    color: "#7F8183",
    border: "none",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    marginLeft: "0px",
    outline: "none",
  },


  button: {
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft : "0px",
    background: "#E34234",
    color: "white",

    '@media (max-width: 600px)': {
      width: "98%",
      marginLeft: "8px"
    } 
  },
  dialogContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#61B7E9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#61B7E9',
        border: '1px solid #61B7E9',
      },
      '& .MuiOutlinedInput-input': {
        color: '#61B7E9',
        borderColor: '#61B7E9', // Set the border color to your desired color
      },
    },
  },

  requiredField: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: '1px solid orange',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#61B7E9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#61B7E9',
        border: '1px solid #61B7E9',
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'orange',
        border: '1px solid orange',
      },
      '& .MuiOutlinedInput-input': {
        color: '#61B7E9',
        borderColor: '#61B7E9',
      },
    },
  },
  
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    background: '#61B7E9',
    transition: 'background 0.3s',
    '&:hover': {
      border: '1px solid #61B7E9',
      background: 'transparent',
    },
  },
  responseMessage: {
    marginLeft: "35%", 
    marginBottom: "0%", 
    color: "#E34234",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "10%",
    },
  },
}));

const AddUser = ({onClose, isOpen}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const adminEmail = localStorage.getItem("Email")
  const [responseMessage, setResponseMessage] = useState("");
  const endpoint = "http://13.42.43.249:8000/graphql/"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend
    // You can access the values using the state variables (name, email, company, message)
    // Perform the necessary actions, such as making an API request, saving to a database, etc.
    if (email ) {
      // Process form submission
      onClose()
      addUser(); // Set formSubmitted state to true after successful submission
    } else {
      // Highlight required fields
      setResponseMessage('All fields are required!');
    }
  };

  const closeAlert = () => {
    setOpen(false)
  }


  const addUser = async (e) => {
    try {
      const response = await axios.post(endpoint, {
        query: `
          mutation {
            addUser(email: "${email}", adminEmail: "${adminEmail}",) {
              success 
            }
          }
        `,
      });
      console.log(response.data.data.addUser.success)
      setMessage("User Added")
      setOpen(true)
  } catch (error) {
    setMessage("Error!")
  }
};


  return (
    <>
    <AlertBarner onClose={closeAlert} isOpen={open} message={message} />
      <Dialog
        open={isOpen}
        onClose={onClose}
        classes={{ paper: classes.dialog }}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
      >
        <DialogTitle className={classes.dialogTitle}>Free User</DialogTitle>
        <Typography variant="caption" className={classes.responseMessage}>
            {responseMessage}
          </Typography>
        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
            />
            <button onClick={handleSubmit} className={classes.button}>
              Authenticate User
          </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
  
};

export default AddUser;
