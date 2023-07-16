import React, { useState , Suspense } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Button, Grid, ListItemIcon, Avatar, Typography} from "@material-ui/core";
import {Divider} from "@material-ui/core";
//import CloseIcon from '@material-ui/icons/Close';

import MenuIcon from "@material-ui/icons/Menu";
import {BiUpvote} from "react-icons/bi";
import {BiLogOut} from "react-icons/bi"
import {FaTelegram} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"

import HomeCard from "./homeContent";
import ProfileCard from "./profileContent";
import Footer from "./footer";
import useStyles from "../assets/styles/home";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const username = localStorage.getItem("Name")
  const balance = localStorage.getItem("Balance")

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const getUsernameInitials = (username) => {
    const names = username.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
      initials += names[i][0];
    }
    return initials.toUpperCase();
  };

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

  const menuItems = [
    { isDivider: true },
    { text: "Home", path: "/", icon: <BiUpvote /> },
    { text: "Profile", path: "/profile", icon: <CgProfile /> },
  ];
  
  const renderDrawer = (
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <List className={classes.drawer}>
      <div className={classes.cardInfo}>
      <Avatar className={classes.avatar}>
        {getUsernameInitials(username)}
      </Avatar>
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
      <Avatar className={classes.avatar}>
        {getUsernameInitials(username)}
      </Avatar>
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
