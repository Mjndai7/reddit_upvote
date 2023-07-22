import React, {useState, useEffect}from "react";
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
    marginLeft: "0px",
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
      height: 250,
      paddingBottom: "70px",
    },

    [theme.breakpoints.down("md")]: {
      width: "98%",
      height: "100%"
    },

    [theme.breakpoints.up("lg")]: {
      height: 650,
      width: "98%",
    },

    [theme.breakpoints.up("xl")]: {
      width: "90%",
      height: 850,
      marginBottom: "70px"
    },
  },
  tableHeaderCell: {
    marginLeft: '-20px', // Adjust the width according to your design requirements
    marginBottom: theme.spacing(2),
    borderBottom: "none",
    color: "#7F8183",
    background: "none",
    width: "130px"
  },
  tableHeaderCell1: { // Adjust the width according to your design requirements
    marginBottom: theme.spacing(2),
    color: "white",
    width: "130px"


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
      width: "135px"
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
    color: "#E34234"
  },

  tableContainer: {
    marginTop: "-10px",

  }
}));

const AccCard = () => {
  const classes = useStyles();
  const email = localStorage.getItem("Email")
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const endpoint =  "http://172.60.0.5:8000/graphql/"


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };
  
  useEffect(() => {
    getAccounts()
  })
  
  const getAccounts = async (e) => {
      try {
        const response = await axios.post(endpoint, {
          query: `
            mutation {
              getAccounts(email: "${email}", proxies: "", name : "") {
                accounts {
                  dateCreated  
                  status
                  voted
                  commented
                  status
                  name
                  proxies

                }
              }
            }
          `,
        });
  
        // Handle the response data
      if(response.data.data.getAccounts){
        setData(response.data.data.getAccounts.accounts)
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
              <Card className={classes.dataItemCard}>
              <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}> {data ? data.length : 0} Available Reddit Account</Typography>
                <TableRow style={{ width: "100%"}}>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Proxies</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Username</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Voted</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Commented</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Created</TableCell>
                </TableRow>
                </Card>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  
                  <Card key={item.id} className={classes.dataItemCard}>
                      <TableRow style={{ width: "100%"}}>
                        <TableCell className={classes.tableHeaderCell} >{index + 1}</TableCell>
                        <TableCell 
                        className={classes.tableHeaderCell}>{item.proxies.substring(0, 20)}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.name}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.voted}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.commented}</TableCell>
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

export default AccCard;