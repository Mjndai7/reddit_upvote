import React, {useEffect, useState}from "react";
import { Card, Typography, TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
TablePagination} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  // ...existing styles
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    
    },
  
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(0.5),
  },
  
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    color: "#FF914D",
    fontFamily: "Lato",
    },
  
  card3: {
    width: '100%',
    marginTop: "0px",
    background: "none",
    boxShadow: "none",
    paddingTop: "10px",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
    "&::-webkit-scrollbar": {
      width: "2px",
      marginLeft:"5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E34234",
      borderRadius: "3px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "98%",
      marginTop: "10px",
      height: "100%",
      paddingBottom: "70px",
    },

    [theme.breakpoints.up("md")]: {
      width: "98%",
      height: 400
    },

    [theme.breakpoints.up("lg")]: {
      height: 650,
    },

    [theme.breakpoints.up("xl")]: {
      width: "100%",
      height: 850,
      marginBottom: "70px"
    },

  },
  tableHeaderCell: { // Adjust the width according to your design requirements
    marginBottom: theme.spacing(2),
    borderBottom: "none",
    color: "#7F8183",
    background: "none",
    width: "140px",
    alignContent: "left"
  },
  tableHeaderCell1: { // Adjust the width according to your design requirements
    marginBottom: theme.spacing(2),
    color: "white",
    width: "140px"


    /*[theme.breakpoints.down("sm")]: {
      paddingRight: "89px",
    },

    [theme.breakpoints.up("md")]: {
      paddingRight: "90px",
    },
    [theme.breakpoints.up("lg")]: {
      paddingRight: "90px",
    },*/,
    [theme.breakpoints.up("xl")]: {
      width: "130px"
    },
  },
  dataItemCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: "10px",
    background: "#171E2E",
    bottom: "none"
  },
  cardTitle: {
    fontFamily: "Lato",
    color: "#E34234",
    marginLeft: "40%",
    paddingTop: "19%"
  },

  tableContainer: {
    marginTop: "-15px"
  }
}));

const UserCard = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [data, setData] = useState([])
  const email = localStorage.getItem("Email")
  const endpoint = "http://localhost:8000/graphql"

  const shortenUrl = (url) => {
    const maxLength = 20; // Maximum length of the shortened URL
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };
  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async (e) => {
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              getUsers(email: "${email}") {
                users {
                  dateCreated  
                  email
                  totalvotes
                  totalspent
                  totalcomments
                  status
                  isadmin

                }
              }
            }
          `,
        });
  
        // Handle the response data
      if(response.data.data.getUsers){
        setData(response.data.data.getUsers.users)
      }
      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card3}>
          <div className={classes.section}>
            
          <TableContainer className={classes.tableContainer} >
            <Table>
              <TableHead>
                
              <Card className={classes.dataItemCard} style={{paddingTop: "20px",}}>
                <TableRow style={{ width: "100%"}}>
                <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}> {data ? data.length : 0} Availeble Users</Typography>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Email</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Spent</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Upvotes</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Comments</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Created</TableCell>
                </TableRow>
                </Card>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  
                  <Card key={index} className={classes.dataItemCard}>
                      <TableRow style={{ width: "100%"}}>
                        <TableCell className={classes.tableHeaderCell} >{index + 1}</TableCell>
                        <TableCell 
                        className={classes.tableHeaderCell} >{item.email.split("@")[0]}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{"$" + item.totalspent}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.totalvotes}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.totalcomments}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.status}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.dateCreated.substring(0, 10)}</TableCell>
                      </TableRow>
                  </Card>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Card className={classes.dataItemCard}>
            <TablePagination
              component="div"
              className={classes.title}
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Card>
          </div>
      </Card>
    </div>
  );
};

export default UserCard;