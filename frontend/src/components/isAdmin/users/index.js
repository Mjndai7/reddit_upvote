import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent,InputAdornment, TextField} from "@material-ui/core";
import { BsSearch } from "react-icons/bs";

import UsersCard from "./users";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "center",
    justifyContent: "center",
    overflowY: "scroll",
    height: "100vh",
    marginLeft: "300px",
    backgroundColor: "none",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },

    [theme.breakpoints.up("xl")]: {
      marginLeft: "450px",
    },
  },
  
  search: {
    color: "#E34234",
    marginLeft: "20px",
    marginRight: "20px"
  },
  input: {
    width: '50%',
    background: "#171E2E",
    color: "red",
    border: "none",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    marginLeft: "15%",
    "& .MuiInput-underline:before": {
      borderBottom: "none", // Remove the default underline
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none", // Remove the underline when focused
    },
    "& .MuiInput-underline:hover": {
      borderBottom: "none", // Remove the underline on hover
    },
    "& .MuiInputBase-input": {
      color: "#7F8183", // Change the color of the input text
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      marginLeft: "0px",
      marginTop: "20px"
    },
  },
  button: {
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    width: "10%",
    marginLeft : "20px",
    margin: "10px",
    background: "#E34234",
    color: "white",

    '@media (max-width: 600px)': {
      width: "18%",
      marginLeft: "8px",
      marginTop: "25px"
    } ,

    [theme.breakpoints.up("md")]: {
      marginLeft: "20px",
    },
    
  },
  buttonL: {
    padding: theme.spacing(1),
    border: 'none',
    borderRadius: theme.spacing(0.5),
    cursor: 'pointer',
    width: "10%",
    marginLeft : "20px",
    margin: "10px",
    background: "#E34234",
    color: "white",
    marginRight: "-150px", 
    marginLeft: "12%",

    '@media (max-width: 600px)': {
      width: "98%",
      marginLeft: "8px",
      
    } ,

    [theme.breakpoints.up("md")]: {
      marginRight: "-120px",
    },
    [theme.breakpoints.up("xl")]: {
      marginRight: "-150px",
    },
  }
}));

const UserCardHolder = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = () => {
    // Handle search logic here
    setSearchTerm(searchTerm)
  };

  
  return (  
    <div className={classes.container}>
      <CardContent>
      <TextField
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.input}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <BsSearch className={classes.search}/>
              </InputAdornment>
            ),
          }}
        />
        
          <button onClick={handleSearch} className={classes.button}>
              Search
          </button>
          
        </CardContent>
        <UsersCard />
    </div>
  );
};

export default UserCardHolder;

