import React, {useEffect, useState}from "react";
import { Card, Typography, TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
TablePagination} from "@material-ui/core";
import axios from "axios";

import useStyles from "../../assets/styles/reach";

const Contacts = ({urls, setUrls}) => {
  const classes = useStyles();
  const email = localStorage.getItem("Email")
  const endpoint =  "http://172.60.0.5:8000/graphql/"
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

  useEffect(() => {
    recentActivities()
  }, [])

 
  const recentActivities = async (e) => {
    //send data to the api to start voting
    //return the url as they are being processed
    //also clear the url list when data is sent to the backend
    console.log(urls)
    try {
      const response = await axios.post(endpoint, {
        query: `
          mutation {
            startOrder(email: "${email}", urls: "${urls}") {
              urls {
                dateCreated
                status
                url
                action
                speed
                cost
                number
              }
            }
          }
        `,
      });

    // Handle the response data
    console.log("response", response.data.data)
    if(response.data && response.data.data.startOrder &&response.data.data.startOrder.urls){
      setUrls(response.data.data.startOrder.urls)
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
              <Typography className={classes.cardTitle} variant="text" style={{marginTop: "20px"}}>Recent Activities</Typography>
                <TableRow style={{ width: "100%"}}>
                  <TableCell className={classes.tableHeaderCell1}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>URL</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Action</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Speed</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Cost</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Status</TableCell>
                  <TableCell className={classes.tableHeaderCell1}>Created</TableCell>
                </TableRow>
                </Card>
              </TableHead>
              <TableBody>
                {urls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  
                  <Card key={item.id} className={classes.dataItemCard}>
                      <TableRow style={{ width: "100%"}}>
                        <TableCell className={classes.tableHeaderCell} >{index + 1}</TableCell>
                        <TableCell 
                        className={classes.tableHeaderCell}>{shortenUrl(item.url)}</TableCell>
                        <TableCell className={classes.tableHeaderCell}>{item.action}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{item.speed}</TableCell>
                        <TableCell className={classes.tableHeaderCell} >{"$" + item.cost}</TableCell>
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
              className={classes.cardTitle}
              component="div"
              count={urls.length}
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