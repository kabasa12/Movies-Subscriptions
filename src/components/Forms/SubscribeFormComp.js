import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import uuid from 'react-uuid'
import { makeStyles } from '@material-ui/core/styles';
import {Container, CssBaseline,TextField,Button,Typography } from '@material-ui/core';
import {Select,MenuItem,FormHelperText} from '@material-ui/core';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button:{marginTop: theme.spacing(2)},
    header:{
      fontFamily:"Jolly Lodger",
      letterSpacing:10
    },
    btnPrimary:{ 
        marginTop: theme.spacing(2),
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.secondary.dark,
        backgroundColor:pellet.palette.primary.light,
        '&:hover' :{background:pellet.palette.primary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    },
    btnSecondary:{
        marginTop: theme.spacing(2),
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.default.main,
        backgroundColor:pellet.palette.secondary.light,
        '&:hover' :{background:pellet.palette.secondary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    }
}));

function SubscribeFormComp(props) {
  const [state,dispatch] = useContext(Context);
  const classes = useStyles();
  const [movieSelect,setMovieSelect] = useState(0);
  const [watch,setWatch] = useState("01/01/1980");
  const [memberMovies,setMemberMovies] = useState([]);

  useEffect(() => {
    
    if(props.userMovies.length > 0) {
      let watched = props.userMovies[0].movies.map(x => {return x.movieId});
      let movies = state.movies.filter(m => !watched.includes(m.id));
      setMemberMovies(movies)
    } else {
      setMemberMovies(state.movies)
    }
    
    
  },[props.memberId])

  const handleCancel = () => {
    props.handleCancel();
  }

  const handleSubsc = () => {

    let id = props?.userMovies[0]?.id;
    let data;
    let watchDate = new Date(watch).toLocaleString('en-GB',{day: 'numeric', 
                                                            month: 'numeric', 
                                                            year: 'numeric' });
    if(id) {
      
      data = {movieId:movieSelect,watchedDate:watchDate};
      dispatch({type:"UPDATE_SUBSCRIBE",payload:{data:data,id:id}});
    } else {
      data={id:uuid(),memberId:props.memberId,movies:[{movieId:movieSelect,watchedDate:watchDate}]}
      dispatch({type:"ADD_SUBSCRIBE",payload:data});
    }
    handleCancel();
  }

  return state.isLogin? (
          <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h2" variant="h5" className={classes.header}>Add New Movie</Typography>
              <Select fullWidth
                value={movieSelect}
                onChange={e => setMovieSelect(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="" disabled>
                  Choose Movie ...
                </MenuItem>
                {memberMovies.map(m => {
                  return <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                })}
              </Select>
              <FormHelperText>Choose Movie ...</FormHelperText>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="watchDate"
                name="watchDate"
                type="date"
                value={watch}
                onChange={e => setWatch(e.target.value)} />
              <Button
                  className={classes.btnPrimary}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubsc}>
                      Subscribe
              </Button>
              <Button className={classes.btnSecondary}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}>
                      Cancel
              </Button>
            </div>
          </Container>
  ) : <div></div>;
}

export default SubscribeFormComp;