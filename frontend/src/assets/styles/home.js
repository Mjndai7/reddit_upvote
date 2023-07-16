import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      //backgroundImage: `url(${backgroundImage})`,
      background: "#0D1321",
      backgroundSize: "cover",
      backgroundPosition: "center", 
    },
    closeButton: {
      top: "-10px",
      right: "-135px",
      marginBottom: "-20px",
      color: "#61B7E9"
    },
    homeData: {
      overflowY: "auto",
    },
    menuItemWithMarginTop: {
      [theme.breakpoints.down("sm")]: {
        marginTop: "100%",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "260%",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "220%"
      },
      [theme.breakpoints.up("xl")]: {
        marginTop: "320%"
      },
    },
    appBar: {
      position: "fixed",
      backgroundColor: "transparent",
      zIndex: 100,
      width: "200px",
      height: "100vh",
      boxShadow: "none",
      top: 0,
  
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
        height: "50px",
        width: "100%"
      },
    },
    toolbar: {
      //display: "flex",
      //justifyContent: "left",
      backgroundColor: "transparent ",
      //border: "2px solid #61B7E9",
      height: "100%",
      width: 200,
      bottom: 0,
      marginTop: "2%",
      marginLeft: "10%",
      marginBottom: "2%",
      borderRadius: "10px",
  
      [theme.breakpoints.down("sm")]: {
       display: "none"
      },
      
    },
    Menu: {
      marginLeft: "10px",
      color: "#E34234",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    menuButton: {
      color: "#171E2E",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    headerItems: {
      marginLeft: "-20px",
      width: "100px",
      color: "white"
    },
    drawer: {
      width: "200px",
      backgroundColor: "#171E2E",
      height: "100%"
    },
  
    activeItem:{
      background : "#E34234 !important", 
      color: "white",
      borderRadius: "5px",
      marginTop: "5px",
      marginBottom: "5px"
    },
  
    navList: {
      fontFamily: "Lato",
      flexGrow: 1,
      backgroundColor: "#171E2E",
      width: "auto",
      borderRadius: "10px",
      marginLeft: "0px",
      padding:"10px",
      height: "90%",
      color: "white",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      "& .MuiListItem-button" : {
        backgroundColor : "#0D1321", 
        borderRadius: "5px",
        marginBottom: "10px"
      },
      "& .MuiListItem-button:hover " : {
        backgroundColor : "#E34234", 
        color: "#61B7E9",
        borderRadius: "5px",
      },
      "& .MuiListItem-button:selected " : {
        backgroundColor : "#E34234", 
        color: "#61B7E9",
        borderRadius: "5px",
        marginTop: "5px",
        marginBottom: "5px"
      },
      "& .MuiListItemIcon-root:hover": {
        color: "orange",
      },
      "& .MuiListItem-button.Mui-selected .MuiListItemIcon-root": {
        color: "orange",
      },
      "& .MuiListItem-button.Mui-selected": {
        backgroundColor: "#E34234 !important",
        borderRadius: "5px",
      },
    },
    
    Button: {
      color: "white", 
      position: "absolute",
      backgroundColor : "#0D1321",
      borderRadius: "5px", 
      width: "90%",
      height: "45px",
      marginLeft: "0px",
      bottom: -100,
      "&:hover": {
        background: "#E34234",
        },
        [theme.breakpoints.down("sm")]: {
          bottom: 50,
          width: "94%",
          marginLeft: "5px",
        },
      },
    
      iconB: {
      marginRight: "20px",
      color: "#7F8183"
    },
    cardInfo: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      backgroundColor: "#0D1321",
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: "170px"
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(2),
      background: "#171E2E"
    },
    username: {
      fontWeight: 'bold',
      marginRight: theme.spacing(1),
      color: "white",
      fontFamily: "Lato"
    },
    title: {
      color:"#7F8183",
      fontFamily: "Lato",
      marginLeft: "0px"
    },
    Button1: {
      color: "white", 
      position: "absolute",
      backgroundColor : "#0D1321", 
      width: "100%",
      marginLeft: "5px",
      bottom: 60,
      "&:hover": {
        border: "1px solid #61B7E9",
        },
        [theme.breakpoints.down("sm")]: {
          bottom: 10,
          width: "94%",
          marginLeft: "5px",
        },
      },
  
  }));

export default useStyles;