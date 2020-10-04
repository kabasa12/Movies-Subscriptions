import React,{useContext,useEffect,useState} from 'react';
import Context from '../../context/context';
import {Link,useHistory} from 'react-router-dom';
import SubscribeFormComp from '../Forms/SubscribeFormComp';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card,CardHeader,List,CardContent,CardActions} from '@material-ui/core';
import {IconButton,Typography,Collapse,Grid,Button,Tooltip} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import pellet from '../../Utils/pellet';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardHeader:{
    backgroundColor:pellet.palette.primary.light,
    color:pellet.palette.default.main
  },
}));


function MemberComp (props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();

  const [member_id,setMemberId] = useState("");
  const [memberDetails,setMemberDetails] = useState([]);
  const [newSubsc,setNewSubsc] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  useEffect(()=> {
    setMemberId(props.member.id);
  },[]);

  useEffect(() => {
    updateMember();
  },[member_id,state.subscriptions]);

  const updateMember = () => {
    let userMovies = state.subscriptions.filter( m => m.memberId == member_id)
    
    for(let i=0;i<userMovies.length;i++){
      for(let j=0; j<userMovies[i].movies.length; j++){
        let movieDetails = state.movies.filter(m => m.id == userMovies[i].movies[j].movieId);
        movieDetails = {...movieDetails[0]}
        userMovies[i].movies[j].name = movieDetails.name;
        setMemberDetails(userMovies);    
      }  
    }
  }

  const deleteMember = () => {
    dispatch({type:"DELETE_MEMBER" , payload:member_id});
    dispatch({type:"DELETE_SUBSC_MEMBER",payload:member_id})
  }

  const showEditMemberForm = () => {
    dispatch({type:"EDIT",payload:"member"});
    dispatch({type:"EDIT_MEMBER" ,payload:props.member});
    history.push(`/updateMember/${props.member.id}`);
  }

  const goBack = () => {
    history.push("/movies");
  }

  const handleCancelSubsc = () => {
    setExpanded(!expanded);
    setNewSubsc(false);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setNewSubsc(true)
  };

  return state.userPermissions.viewSubscriptions ? (    
          <Grid item xs={12} sm={6} md={10}>
            <Card className={classes.root}>
              <CardHeader className={classes.cardHeader}
                title={props.member.name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Member Email : {props.member.email}
                </Typography>
                <Typography variant="body2" component="h2">Movies Watched</Typography>
                    <List>
                    { 
                      memberDetails.map(sub => { 
                        return (<div key={sub.id}>
                          {sub.movies.map((movie,index) => {
                            return (<li key={index}><Link to={`/movies/${movie.movieId}`}>{movie.name}</Link> - {movie.watchedDate}</li>)
                          })}
                        </div>)
                      })
                    }
                  </List>
              </CardContent>
              {props.memberId ?
                <CardActions>
                  <Button size="small" color="secondary" onClick={goBack}>
                    Back To Movies
                  </Button>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <Tooltip title="Add Subscription">
                      <VideoCallIcon style={{color:`${pellet.palette.default.main}`}}/>
                    </Tooltip>
                  </IconButton>.
                </CardActions>
                :
                <CardActions disableSpacing>
                  {state.userPermissions.updateSubscriptions ?
                  <Tooltip title="Edit Member">
                    <IconButton aria-label="Edit Member" onClick={showEditMemberForm}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip> : '' }
                  {state.userPermissions.deleteSubscriptions ?
                  <Tooltip title="Delete Member">
                    <IconButton aria-label="Delete Member" onClick={deleteMember}>
                      <DeleteIcon style={{color:`${red[600]}`}}/>
                    </IconButton>
                  </Tooltip> : '' }
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <Tooltip title="Add Subscription">  
                      <VideoCallIcon style={{color:`${pellet.palette.default.main}`}}/>
                    </Tooltip>
                  </IconButton>.
                </CardActions>
                }
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                {newSubsc ? <SubscribeFormComp userMovies={memberDetails} 
                                        handleCancel={handleCancelSubsc}
                                        memberId={member_id}
                                        updateMember={updateMember}/> : <div/>}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
  ) : <div>
        <Grid container>
          <Button size="small" color="secondary" onClick={goBack}>
                Back To Movies
          </Button>
        </Grid>
      </div>;
}

export default MemberComp;