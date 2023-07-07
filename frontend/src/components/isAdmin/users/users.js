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
    width: "130px",
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
  const data = [
    { id: 1, url: 'developer@maxupvoe.com', upvotes: 5, speed: '45', status: 'Active', cost: '$170', created: '2023-07-01' },
    { id: 2, url: 'developer@maxupvoe.com', upvotes: 10, speed: '45', status: 'Active', cost: '$150', created: '2023-07-01' },
    { id: 3, url: 'developer@maxupvoe.com', upvotes: 23, speed: '45', status: 'Active', cost: '$140', created: '2023-07-01' },
    { id: 4, url: 'developer@maxupvoe.com', upvotes: 54, speed: '45', status: 'Active', cost: '$130', created: '2023-07-01' },
    { id: 5, url: 'developer@maxupvoe.com', upvotes: 533, speed: '45', status: 'Active', cost: '$210', created: '2023-07-01' },
    { id: 6, url: 'developer@maxupvoe.com', upvotes: 35, speed: '45', status: 'Active', cost: '$210', created: '2023-07-01' },
    { id: 7, url: 'developer@maxupvoe.com', upvotes: 55, speed: '45', status: 'Active', cost: '$12', created: '2023-07-01' },
    { id: 8, url: 'developer@maxupvoe.com', upvotes: 65, speed: '45', status: 'Active', cost: '$120', created: '2023-07-01' },
    { id: 9, url: 'developer@maxupvoe.com', upvotes: 57, speed: '45', status: 'Active', cost: '$120', created: '2023-07-01' },
    { id: 10, url: 'developer@maxupvoe.com', upvotes: 85, speed: '45', status: 'Active', cost: '$10', created: '2023-07-01' },
    // Add more data here...
  ];
  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card3}>
          <div className={classes.section}>
            
          <TableContainer className={classes.tableContainer} >
            <Table>
              <TableHead>
                
              <Card className={classes.dataItemCard} style={{paddingTop: "20px",}}>
                <TableRow style={{ width: "100%"}}>
                <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}> {data.length} Availeble Users</Typography>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Email</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Upvotes</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Comments</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Spent</TableCell>
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
                        className={classes.tableHeaderCell}>{shortenUrl(item.url)}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.upvotes}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.speed}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.status}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.cost}</TableCell>
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

export default UserCard;