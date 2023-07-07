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
  card: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "100px",
        flexDirection: "row"
    },

    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginBottom: "70px",
      marginTop: "5%",
      background:"red"
  },
},
  feedbackContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    flexGrow: 1,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflowX: "scroll",
      flexDirection: "column"
  },
  
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(0.5),
  },
  feedbackGrid: {
    display: "flex",
    marginLeft: "20px",
    textAlign: "left",
    marginRight: "50px",
    backgroundColor: "tranparent",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "100px",
      flexDirection: "row"
    },
  },  

  feedbackImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    background: "black",
    float: "left",
    marginRight: theme.spacing(2),
  },
  feedbackName: {
    marginTop: theme.spacing(1),
    fontFamily: "Lato",
    fontWeight: "bold",
  },
  feedbackTitle: {
    fontFamily: "Lato",
    color: "gray",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    color: "#FF914D",
    fontFamily: "Lato",
    },
  feedbackMessage: {
    fontFamily: "Lato",
    color: "gray",
    cursor: "pointer",
    marginTop: theme.spacing(1),
   
  },
  feedbackStars: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  feedbackRating: {
    marginRight: theme.spacing(1),
  },
  card3: {
    width: '100%',
    maxWidth: 1135,
    marginTop: "20px",
    background: "none",
    boxShadow: "none",
    marginLeft: "0px",
    paddingTop: "10px",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E34234",
      borderRadius: "3px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "98%",
      marginTop: "-25px",
      height: 250,
      paddingBottom: "70px",
    },

    [theme.breakpoints.down("md")]: {
      width: "98%",
      marginLeft: "-15px",
      height: 250
    },

    [theme.breakpoints.up("lg")]: {
      width: "98%",
      marginLeft: "-25px",
      height: 450,
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
    color: "#E34234"
  },

  tableContainer: {
    marginTop: "-10px",

  }
}));

const Contacts = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const shortenUrl = (url) => {
    const maxLength = 20; // Maximum length of the shortened URL
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  const data = [
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
    { id: 1, url: 'https://www.reddit.com/r/2000sGirls/comments/14p72uw/do_older_men_still_eat_pussy_tell_me_your_age_if/,', upvotes: 5, speed: 'Fast', status: 'Active', cost: '$10', created: '2023-07-01' },
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
              <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}>Upvotes Statistics</Typography>
                <TableRow style={{ width: "100%"}}>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>URL</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Upvotes</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Speed</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Cost</TableCell>
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

export default Contacts;