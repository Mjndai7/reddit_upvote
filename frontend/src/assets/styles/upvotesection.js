import { makeStyles } from '@material-ui/core/styles';

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
      paddingLeft: "30px",
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

    selectIcon: {
        marginRight: theme.spacing(1), // Adjust the spacing as needed
        color: 'red !important', // Set the desired color for the icon
      },

    select: {
        color: "red !important",
    },
    formControl: {
        background: "#0D1321",
        width: "100%",
        borderRadius: theme.spacing(0.5),
        color: "#7F8183 !important",
        fontFamily: "Lato",
        marginBottom: "20px",
        outline:"none",
        height: "45px",
        '& .MuiSelect-select': {
            padding: '10px',
            border: 'none',
            borderBottom: 'none',
            color: "#E34234 !important",
            borderRadius: '0',
            background: 'transparent',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            '&:focus': {
              borderBottom: "none",
              outline: "none",
            },
          },
          '& svg': {
            fill: 'red',
          },
        
          '& .MuiSelect-select option': {
            color: '#7F8183', // Change the color of the selected option here
            background: "#171E2E",
            padding: "10px",
            outline: "none",
            fontSize: ".8rem",
            border: "none",
            borderRadius: "10px",
            width: "90px",
            maxWidth: "90% !important"
          },
  
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
      fontFamily: "Lato",
  
  
      [theme.breakpoints.down("xl")]: {
        width: "98%"
      },
    },
    title: {
        width: '100%',
        background: "#0D1321",
        color: "#7F8183",
        height: "25px",
        border: "none",
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        outline: "none",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        color: "#E34234",
        fontFamily: "Lato",
  
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px"
      },  
    
        [theme.breakpoints.down("xl")]: {
          width: "auto"
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
      width: "85%",
      height: "35px",
      marginLeft : "20px",
      margin: "10px",
      background: "#E34234",
      color: "white",
      
      '@media (max-width: 600px)': {
        width: "100%",
        marginLeft: "0px"
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

export default useStyles;