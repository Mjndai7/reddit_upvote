import React, { useState , Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useNavigate} from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Button, Grid, ListItemIcon, Avatar, Typography} from "@material-ui/core";
import {Divider} from "@material-ui/core";
import Avator from "../assets/images/profile.jpg"
//import CloseIcon from '@material-ui/icons/Close';

import MenuIcon from "@material-ui/icons/Menu";
import {BiUpvote} from "react-icons/bi";
import {BiLogOut} from "react-icons/bi"
import {FaTelegram} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"

import HomeCard from "./homeContent";
import ProfileCard from "./profileContent";
import Footer from "./footer";


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

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const username = localStorage.getItem("Name")
  const balance = localStorage.getItem("Balance")

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('Email');
    navigate("/login")
    // Perform any additional logout actions here
  };
  
  const handleTelegram = () => {
    window.location.href = 'https://web.telegram.org/k/#@MaxUpvoteBot';
  };

  const handleBotusTubeClick = () => {
    navigate('/botus-tube');
  };

  const menuItems = [
    { isDivider: true },
    { text: "Home", path: "/", icon: <BiUpvote /> },
    { text: "Profile", path: "/profile", icon: <CgProfile /> },
  ];
  
  const renderDrawer = (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <List className={classes.drawer}>
      <div className={classes.cardInfo}>
          <Avatar className={classes.avatar} src={Avator} alt="User Avatar" />
          <div>
              <Typography variant="subtitle1" className={classes.username}>
              {username}
              </Typography>
              <Typography variant="body2" className={classes.title}>
              {"$" + balance}
              </Typography>
          </div>
        </div>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.isDivider ? (
              <Divider style={{ backgroundColor: "#7F8183", margin: '10px 0', height: '1px' }} />
            ) : (
              <ListItem
                button
                className={`${item.path === location.pathname ? classes.activeItem : null} ${
                  item.bottom ? classes.menuItemWithMarginTop : ""
                }`} // Apply conditional class
                component="a"
                href={item.path}
                style={{ marginTop: item.bottom }} // Apply marginBottom style
              >
                <ListItemIcon style={{ color: "#7F8183" }} className={classes.icon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={classes.headerItems} primary={item.text} style={{ color: "white" }} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
        <Button  
    className={classes.Button1}
    onClick={handleLogout}><BiLogOut className={classes.iconB}/> SIGN OUT</Button>
    
    <Button
    className={classes.Button}
    onClick={handleTelegram}>
      <FaTelegram className={classes.iconB}/>TELEGRAM BOT</Button>
      </List>
    </Drawer>
  );
  
  return (
    <div className={classes.root}>
     <AppBar position="static" className={classes.appBar}>
  <div>
    <Button className={classes.Menu} onClick={toggleDrawer} startIcon={<MenuIcon />}>
      Menu
    </Button>
  </div>
  <Toolbar className={classes.toolbar}>
      <List className={classes.navList}>
      <div className={classes.cardInfo}>
          <Avatar className={classes.avatar} src={Avator} alt="User Avatar" />
          <div>
              <Typography variant="subtitle1" className={classes.username}>
              {username}
              </Typography>
              <Typography variant="body2" className={classes.title}>
              {"$" + balance}
              </Typography>
          </div>
        </div>
      {menuItems.map((item, index) => (
        <>
          {!item.isDivider && (
            <ListItem
              button
              key={item.text}
              component="a"
              href={item.path}
              onClick={() => setActivePath(item.path)}
              className={`${item.path === location.pathname ? classes.activeItem : null} ${
                item.bottom ? classes.menuItemWithMarginTop : ""
              }`} // Apply conditional class
            >
              <ListItemIcon style={{ color: "#7F8183" }} className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText className={classes.headerItems} primary={item.text} />
            </ListItem>
          )}
          {item.isDivider && (
            <div key={index}>
              <div style={{ height: 'auto', flexGrow: 1 }}></div>
              <Divider style={{ backgroundColor: "#7F8183", margin: '10px 0', height: '1px' }} />
            </div>
          )}
        </>
      ))}
      <Button 
      style={{bottom: 30,}} 
      className={classes.Button}
      onClick={handleLogout}><BiLogOut className={classes.iconB}/>SIGN OUT</Button>
      
      <Button style={{bottom: 90,}}
      className={classes.Button}
      onClick={handleTelegram}>
        <FaTelegram className={classes.iconB}/>TELEGRAM</Button>
    </List>
  </Toolbar>
</AppBar>
    <Grid className={classes.homeData} container direction="row">
      {renderDrawer}
      <Suspense fallback={<div>Loading...</div>}>
        {location.pathname === "/" ? <HomeCard /> : null}
        {location.pathname === "/profile" ? <ProfileCard /> : null}
      </Suspense>
    </Grid>
      <div><Footer /></div>
    </div>

  );
};

export default Home;
