import React,{useContext} from 'react';
import UserComp from './UserComp';
import { useHistory } from 'react-router-dom';
import Context from '../../context/context';
import {CssBaseline, Button, Grid, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  header:{
    fontFamily:"Jolly Lodger",
    letterSpacing:10
  },
  btns:{
    fontFamily:"Jolly Lodger",
    letterSpacing:5,
    color:pellet.palette.secondary.dark,
    border:`1px solid ${pellet.palette.default.main}`
  }
}));

function UsersComp(props) {
  const [state,dispatch] = useContext(Context)
  const history = useHistory();
  const classes = useStyles();

  const showAllUsers = () => {
    history.push("/users");
  }

  const addNewUser = () => {
    dispatch({type:"FINISH_EDIT",payload:"user"});
    history.push("/addUser")
  }


  return state.isLogin? (
    <div>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" 
                        variant="h2" 
                        align="center" 
                        color="textPrimary" 
                        gutterBottom
                        className={classes.header}>
              Users
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Button  className={classes.btns}
                    variant="outlined" 
                    color="primary"
                    onClick={showAllUsers}>All Users</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button className={classes.btns}
                    variant="outlined" 
                    color="primary"
                    onClick={addNewUser}>Add User</Button>
                </Grid>
              </Grid>  
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justify="center">
            {state.users.map(user => {
                return(
                  <UserComp key={user.id} user={user}/>
                )
              })}
          </Grid>
        </Container>
      </main>
    </div>
  ) : <div></div> ;
}

export default UsersComp;