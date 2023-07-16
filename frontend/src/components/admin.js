import React, { useState , Suspense } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Button, Grid, ListItemIcon, Avatar, Typography} from "@material-ui/core";
import {Divider} from "@material-ui/core";
import useStyles from "../assets/styles/home";
//import CloseIcon from '@material-ui/icons/Close';

import MenuIcon from "@material-ui/icons/Menu";
import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineManageAccounts, MdManageAccounts} from "react-icons/md";
import {FaTelegram} from "react-icons/fa"
import {FaUserFriends} from "react-icons/fa"
import { BiLogOut} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {TiUserAdd} from "react-icons/ti"

import HomeCard from "./homeContent";
import ProfileCard from "./profileContent";
import Footer from "./footer";
import UserCardHolder from "./isAdmin/users";
import AccountsCard from "./isAdmin/accounts";
import AddUser from "./isAdmin/adduser";
import AddAccount from "./isAdmin/addaccount"; 



const Admin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const username = localStorage.getItem("Name")
  const title = "Admin."

  const classes = useStyles(open1);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('Email');
    localStorage.removeItem('Name');
    localStorage.setItem('User', "False");
    localStorage.removeItem('Balance');
    navigate("/login")
    // Perform any additional logout actions here
  };
  
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  
  const handleTelegram = () => {
    window.location.href = 'https://web.telegram.org/k/#@MaxUpvoteBot';
  };

  const openContactForm = () => {
    setOpen(true)
    setOpen1(true)
  };
 
  const closeContactForm = () => {
    setOpen(false)
    setOpen1(false)
  };
  const openContactForm2= () => {
    setOpen1(true)
    setOpen2(true)
  };
 
  const closeContactForm2 = () => {
    setOpen2(false)
    setOpen1(false)
  };

  const handleButtonClick = (onClick) => {
    onClick();
  };
  

  const menuItems = [
    { isDivider: true },
    { text: "Home", path: "/", icon: <AiOutlineHome /> },
    { text: "Users", path: "/users", icon: <FaUserFriends /> },
    { text: "Accounts", path: "/accounts", icon: <MdOutlineManageAccounts /> },
    { text: "Add User", onClick: () => openContactForm(), icon: <TiUserAdd /> },
    { text: "Add Account", onClick: () => openContactForm2(), icon: <MdManageAccounts /> },
    { text: "Profile", path: "/profile", icon: <CgProfile /> },
   
  ];

  const getUsernameInitials = (username) => {
    const names = username.split(' ');
    let initials = '';
    for (let i = 0; i < names.length; i++) {
      initials += names[i][0];
    }
    return initials.toUpperCase();
  };

  const renderDrawer = (
    
    <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <AddUser onClose={closeContactForm} isOpen={open} />
      <AddAccount onClose={closeContactForm2} isOpen={open2} />
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
              {title}
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
                onClick={() => handleButtonClick(item.onClick)}
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
      <FaTelegram className={classes.iconB}/>TELEGRAM</Button>
      </List>
    </Drawer>
  );
  
  return (
    <div className={classes.root}>
     <AppBar position="static" className={classes.appBar}>
     <AddUser onClose={closeContactForm} isOpen={open} />
     <AddAccount onClose={closeContactForm2} isOpen={open2} />
     
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
              {title}
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
              onClick={() => handleButtonClick(item.onClick)}
              className={`${item.path === location.pathname ? classes.activeItem : null} ${
                item.bottom ? classes.menuItemWithMarginTop : ""}`} // Apply conditional class
              //style={{ marginTop: item.bottom }} // Apply marginBottom style
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
        <FaTelegram className={classes.iconB}/>Telegram</Button>
    </List>
  </Toolbar>
</AppBar>
    <Grid className={classes.homeData} container direction="row">
      {renderDrawer}
      <Suspense fallback={<div>Loading...</div>}>
        {location.pathname === "/" ? <HomeCard /> : null}
        {location.pathname === "/users" ? <UserCardHolder /> : null}
        {location.pathname === "/accounts" ? <AccountsCard /> : null}
        {location.pathname === "/profile" ? <ProfileCard /> : null}
      </Suspense>
    </Grid>
      <div><Footer /></div>
    </div>

  );
};

export default Admin;
