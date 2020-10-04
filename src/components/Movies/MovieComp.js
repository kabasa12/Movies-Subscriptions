import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import {Link,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Collapse} from '@material-ui/core';
import {Button,Typography,Grid,List,ListItem,IconButton,Tooltip} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarsIcon from '@material-ui/icons/Stars';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import pellet from '../../Utils/pellet';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

function  MovieComp (props) {
  const [state,dispatch] = useContext(Context);
  const [_genres,set_Genres] = useState("");
  const [subs,setSeubs] = useState([]);
  const [movie_id,setMovieId] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  
  useEffect(()=> {
    setMovieId(props.movie.id);
  },[]);


  useEffect(() => {
    let tmp="";
    tmp = props.movie.genres.join();
    set_Genres(tmp);

    let userSubs = state.subscriptions.map(sub => ({...sub,
                                            movies:sub.movies.filter(s => s.movieId == movie_id)}))
                                            .filter(sub => sub.movies.length > 0)


    for(let i=0;i<userSubs.length;i++){
      let _sub = state.members.filter(m => m.id == userSubs[i].memberId);
      _sub = {..._sub[0]}
      userSubs[i].member = _sub.name;
      setSeubs(userSubs);
    }
  },[movie_id])
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteMovie = () => {
    dispatch({type:"DELETE_MOVIE" , payload:movie_id});
    dispatch({type:"DELETE_SUBSC_MOVIE",payload:movie_id});
    props.deleteHandle();
  }

  const showEditMovieForm = () => {
    dispatch({type:"EDIT",payload:"movie"});
    dispatch({type:"EDIT_MOVIE" ,payload:props.movie});
    history.push(`/updateMovie/${movie_id}`);
  }

  const goBack = () => {
    history.push("/members");
  }
  return state.userPermissions.viewMovies? (
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image={props.movie.image}
              alt={props.movie.name}
              title={props.movie.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h5">
                {props.movie.name} - {props.movie.premiered}
              </Typography>
              <Typography variant="body2" component="h2">
                Geners
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {_genres}
              </Typography>
            </CardContent>
          </CardActionArea>
          {props.movieId ?
          <CardActions disableSpacing>
            <Button size="small" color="secondary" onClick={goBack}>
              Back To Subscriptions
            </Button>
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          :
          <CardActions disableSpacing>
            {state.userPermissions.updateMovies ?
            <Tooltip title="Edit Movie">
              <IconButton aria-label="Edit Movie" onClick={showEditMovieForm}>
                <EditIcon />
              </IconButton>
            </Tooltip> : '' }
            {state.userPermissions.deleteMovies ?
            <Tooltip title="Delete Movie">
              <IconButton aria-label="Delete Movie" onClick={deleteMovie}>
                <DeleteIcon style={{color:`${red[600]}`}}/>
              </IconButton>
            </Tooltip> : '' }
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          }
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContent}>
              <Typography variant="body2" component="h2">Subscriptions Watched</Typography>
              <List>
                { 
                  subs.map(sub => {
                    return (<div key={sub.id}>
                      {sub.movies.map((movie,index) => {
                        return (<ListItem key={index}><StarsIcon />
                          <Link to={`/members/${sub.memberId}`}>{sub.member}</Link> - {movie.watchedDate}</ListItem>)
                      })}
                    </div>)
                  })
                }
              </List>
            </CardContent>
          </Collapse>
      </Card> 
    </Grid>  
  ) : <div>
        <Grid container>
            <Button size="small" color="secondary" onClick={goBack}>
                    Back To Subscriptions
            </Button>
        </Grid>
      </div>;
}

export default MovieComp;
