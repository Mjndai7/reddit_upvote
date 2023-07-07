import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Contacts from "./reach";
import ContactFormCard from "./form";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "center",
    overflowY: "scroll",
    height: "100vh",
    marginLeft: "300px",
    backgroundColor: "transparent",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
    "&::-webkit-scrollbar": {
      width: "0px",
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
 
}));

const CommentCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <ContactFormCard />
        <Contacts />
    </div>
  );
};

export default CommentCard;

