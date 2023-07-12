import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {MdOutlineCancel} from "react-icons/md"


const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: '#171E2E',
    border: "1px solid #E34234",
    boxShadow: 'none',
    borderRadius: "5px",
    width: '500px !important' , // Set the width to be half the size
     // Position the dialog on the right side

    [theme.breakpoints.down("sm")]: {
      marginLeft: "10%",
      marginTop: "-170%"
    },

    [theme.breakpoints.up("md")]: {
      marginLeft: "70%",
      marginTop: "-50%",
    },

    [theme.breakpoints.up("lg")]: {
      marginLeft: "10%",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "10%",
      marginTop: "-45%",
    },

  },

  dialogContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },

  icon: {
    marginLeft: "35%", 
    marginBottom: "0%", 
    color: "#E34234",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "35%",
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

const AlertBarner = ({onClose, isOpen, message}) => {
    const classes = useStyles()
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        classes={{ paper: classes.dialog }}
      >
        <DialogContent className={classes.dialogContent}>
        <Typography variant="caption" className={classes.responseMessage}>
            {message}
          </Typography>
          <MdOutlineCancel className={classes.icon} onClick={onClose}/>
        </DialogContent>
      </Dialog>
    </>
  );
  
};

export default AlertBarner;