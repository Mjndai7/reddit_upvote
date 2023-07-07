import React, {useState}from "react";
import { Card, Typography, TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
TablePagination} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const shortenemail = (email) => {
    const maxLength = 20; // Maximum length of the shortened email
    return email.length > maxLength ? email.substring(0, maxLength) + '...' : email;
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };
  const data = [
    { id: 1, email: 'developer@maxupvoe.com', username: "Maina", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 2, email: 'developer@maxupvoe.com', username: "Minaj", voted: '45', commented: '678', status: 'LOGEDOUT', created: '2023-07-01' },
    { id: 3, email: 'developer@maxupvoe.com', username: "Raj", voted: '45', commented: '678', status: 'SUSPENDED', created: '2023-07-01' },
    { id: 4, email: 'developer@maxupvoe.com', username: "Kevin", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 5, email: 'developer@maxupvoe.com', username: "Mike", voted: '45', commented: '678', status: 'LOGEDOUT', created: '2023-07-01' },
    { id: 6, email: 'developer@maxupvoe.com', username: "Juma", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 7, email: 'developer@maxupvoe.com', username: "Hellen", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 8, email: 'developer@maxupvoe.com', username: "Voke", voted: '45', commented: '678', status: 'LOGEDOUT', created: '2023-07-01' },
    { id: 9, email: 'developer@maxupvoe.com', username: "Trevor", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 10, email: 'developer@maxupvoe.com', username: "Jemo", voted: '45', commented: '678', status: 'ACTIVE', created: '2023-07-01' },
    { id: 11, email: 'developer@maxupvoe.com', username: "Judas", voted: '45', commented: '678', status: 'SUSPENDED', created: '2023-07-01' },
    { id: 12, email: 'developer@maxupvoe.com', username: "Iscariot", voted: '45', commented: '678', status: 'LOGEDOUT', created: '2023-07-01' },
    { id: 13, email: 'developer@maxupvoe.com', username: "Java", voted: '45', commented: '678', status: 'SUSPENDED', created: '2023-07-01' },
    // Add more data here...
  ];
  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card3}>
          <div className={classes.section}>
          <TableContainer className={classes.tableContainer} >
            <Table>
              <TableHead>
              <Card className={classes.dataItemCard}>
              <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}> {data.length} Available Reddit Account</Typography>
                <TableRow style={{ width: "100%"}}>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Email</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Username</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Voted</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Commented</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Created</TableCell>
                </TableRow>
                </Card>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  
                  <Card key={item.id} className={classes.dataItemCard}>
                      <TableRow style={{ width: "100%"}}>
                        <TableCell className={classes.tableHeaderCell} >{item.id}</TableCell>
                        <TableCell 
                        className={classes.tableHeaderCell}>{shortenemail(item.email)}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.username}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.voted}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.commented}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.status}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.created}</TableCell>
                      </TableRow>
                  </Card>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Card className={classes.dataItemCard}>
            <TablePagination
              component="div"
              count={data.length}
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