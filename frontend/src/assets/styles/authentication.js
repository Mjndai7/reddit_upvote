import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      //backgroundImage: `url(${backgroundImage})`,
      backgroundColor: "#0D1321",
      backgroundSize: "cover",
      backgroundPosition: "center", 
      background: "black",
    },
  

    logo: {
      position: 'absolute',
      //display: "none",
      background: "none",
      top: 0,
      left: 0,
      width: 80,
      height: 80,
    },
    card: {
      maxWidth: 400,
      backgroundColor: "#171E2E",
      //border: "2px solid #0CC0DF",
      borderRadius: "10px",
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Updated box shadow style
      transition: 'box-shadow 0.3s ease-in-out', // Add transition for smooth effect
      '&:hover': {
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)', // Box shadow on hover
      },   
  
      [theme.breakpoints.up("lg")]: {
        marginTop: "15%",
        marginLeft: "10%"
      },
  
      [theme.breakpoints.up("xl")]: {
        marginTop: "10%",
        marginLeft: "0%"
      },
  
      [theme.breakpoints.down("md")]: {
        marginTop: "20%",
        marginLeft: "0%"
      },
  
  
      [theme.breakpoints.down("sm")]: {
        marginTop: "15%",
        width: "100%",
        marginLeft: "0px"
      },
  
      [theme.breakpoints.down("xs")]: {
        marginBottom: "80px",
      },
    },
  
    formContainer: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: "40px",
      //backgroundColor: "black",
    },
    formField: {
      marginBottom: theme.spacing(1),
      outline: "none",
      width: "100%",
      height: "40px",
      paddingLeft: "10px",
      color: "#7F8183 !important",
      border: 0,
      borderRadius: "10px",
      marginLeft: "-10px",
      backgroundColor: "#0D1321",
      '& input::selection, & textarea::selection': {
        background: 'transparent',
        color: 'inherit',
      },
      '& .MuiInputBase-input': {
        color: '#7F8183', // Set the desired color for the input text
        fontSize: ".8rem",
        fontWeight: "bold",
        marginTop: "5px"
      },
      '& .MuiInput-underline:before': {
        borderBottom: 'none', // Remove the underline when the field is not focused
      },
      '& .MuiInput-underline:hover:before': {
        borderBottom: 'none', // Remove the underline when the field is hovered
      },
      '& .MuiInput-underline:after': {
        borderBottom: 'none', // Remove the underline when the field is focused
      },
  
      [theme.breakpoints.down("sm")]: {
        width: "92%",
        marginLeft: "7px"
      },
    },
  
  
    label: {
      color: theme.palette.text.secondary,
      fontSize: '1rem',
      marginLeft: "",
    },
  
    title1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color:  "#7F8183",
      marginTop: "20%",
      marginLeft: "20px",
      marginBottom: theme.spacing(0),


      [theme.breakpoints.down("sm")]: {
        fontSize: '1.5rem',
        marginLeft: "50px"
      },

      [theme.breakpoints.down("xs")]: {
        fontSize: '1.5rem',
        marginLeft: "30px"
      },

      [theme.breakpoints.up("md")]: {
        fontSize: '2rem',
        marginLeft: "15%  "
      },

      [theme.breakpoints.up("xl")]: {
        fontSize: '2rem',
        marginLeft: "4%  "
      },
    },
  
  
    heroTitle:{
      color: "#E34234",
      marginBottom: theme.spacing(1),
      marginLeft: "40px",



      [theme.breakpoints.down("sm")]: {
        fontSize: '.7rem',
        marginLeft: "55px"
      },

      [theme.breakpoints.down("lg")]: {
        fontSize: '1.rem',
        marginLeft: "18%  "
      },
    },
  
    response:{
      color: "#E34234",
      marginBottom: theme.spacing(1),
      alignContent: "center",
      justifyContent: "center",
      marginLeft: "8%",
      fontSize: ".8rem"
    },
  
  
    tagLine:{
      color: "#E34234",
      marginBottom: theme.spacing(1),
    },
  
    tagLineR:{
      color: "gray",
      marginBottom: theme.spacing(0),
      fontSize: ".8rem",
      marginLeft: "0px",
      marginRight: "10px",
      marginTop: "0px",
      cursor: "pointer",
      textDecoration: "none",
      background: "none",
      '&:hover': {
        color: "#E34234"
      },  
      
      [theme.breakpoints.down("sm")]: {
        marginLeft: "20px", // Stack cards vertically
        marginRight: "20px"
        
      },  
    },
  
    formGrid: {
      backgroundColor: "none",
      width: 350,
      marginLeft: "0%"
    },
  
    description: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(4),
      fontSize: '1.2rem',
    },
  
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: "20px",
      
  
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
      },
    },
  
    button: {
      color: '#0CC0DF',
      fontWeight: 'bold',
      borderRadius: 20,
      marginRight: "0px",
      marginLeft: "5px",
      border: "none",
      backgroundColor: "#black",
      padding: theme.spacing(1, 4),
      transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
      '&:hover': {
        backgroundColor: '#C9E0E4', // Background color on hover
        border: 0,
      },
  
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        marginTop: "10px"
      },
    },
  
    buttonS: {
      color: '#0CC0DF',
      fontWeight: 'bold',
      borderRadius: 20,
      marginTop: "2px",
      border: "2px solid #0CC0DF",
      backgroundColor: "#black",
      transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
      '&:hover': {
        backgroundColor: '#C9E0E4', // Background color on hover
        border: 0,
      },
    },
  
    menu: {
      background: "#F8D5D8",
      width: 150,
      padding: 5
    },
  
    buttonSubmit: {
      color: 'white',
      fontWeight: 'bold',
      borderRadius: 10,
      height: "40px",
      width: "103%",
      marginLeft: "-10px",
      border: "none",
      backgroundColor: "#E34234",
      padding: theme.spacing(1, 4),
      transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
      
      '&:hover': {
        backgroundColor: '#E34234', // Background color on hover
        cursor: "pointer",
        color: "white"
      },
  
      [theme.breakpoints.down("sm")]: {
        width: "96%",
        marginLeft: "7px"
      },
    },
    topRightButtons: {
      position: 'absolute',
      top: theme.spacing(0),
      right: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      '& > *': {
        marginTop: "-10px",
      },
    },
    closeButton: {
      top: 0,
      marginRight: "-80%",
    },
  
    icon: {
      marginTop: "0%",
      paddingRight :"10px", 
    
    }
  }));

export default useStyles;