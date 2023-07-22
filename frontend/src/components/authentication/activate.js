import { Card, CardContent, Container, Typography} from '@material-ui/core';


import Logo from "../../assets/logo/ref.png"
import AuthFooter from '../../utils/authFooter';
import useStyles from '../../assets/styles/authentication';


const ActivationCard = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      {/* Logo */}
      <img src={Logo} alt="Logo" className={classes.logo} />

      {/* Card */}
    <Container maxWidth="sm">
    <Typography variant="body1" className={classes.title1}>
              Welcome to Max Upvote.
            </Typography>
            <Typography variant="body1" className={classes.heroTitle}>
             Activate your account to use our services..
            </Typography>
        <Card className={classes.card}>
          <CardContent>
            {/* Existing code */}
            <div className={classes.formContainer}>
            <Typography variant="body1" className={classes.tagLine}>
              Activation Request.
            </Typography>
            <Typography variant="body1" className={classes.heroTitle1}>
             We have sent you an email with Activation Link .
            </Typography>
            
            </div>
          </CardContent>
        </Card>
      </Container>
      <AuthFooter />
    </div>
  );
};


export default ActivationCard;
