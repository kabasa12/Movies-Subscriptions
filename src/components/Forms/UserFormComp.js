import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import uuid from 'react-uuid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Container,CssBaseline,TextField,Button,Typography,Divider} from '@material-ui/core';
import {FormControlLabel,Checkbox,Grid} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header:{
        fontFamily:"Jolly Lodger",
        letterSpacing:10
      },
    headerLong:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5
      },
    btnPrimary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.secondary.dark,
        backgroundColor:pellet.palette.primary.light,
        '&:hover' :{background:pellet.palette.primary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    },
    btnSecondary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.default.main,
        backgroundColor:pellet.palette.secondary.light,
        '&:hover' :{background:pellet.palette.secondary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    }
}));

const UserFormComp = (props) => {
    const [state,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [inputs, setInputs] = useState({userName:"",
                                          password:"",
                                          firstName:"",
                                          lastName:"",
                                          id:"",
                                          isAdmin:false,
                                          createdDate:""
                                        });
                                        
    const [checks,setChecks] = useState({viewSubscriptions:false,
                                         createSubscriptions:false,
                                         deleteSubscriptions:false,
                                         updateSubscriptions:false,
                                         viewMovies:false,
                                         createMovies:false,
                                         deleteMovies:false,
                                         updateMovies:false})
    
    
    let {userId} = useParams(); 

    useEffect(() => {
        if(state.isEditUser){

            let inp = { userName:state.editedUser.userName,
                        password:state.editedUser.password,
                        firstName:state.editedUser.firstName,
                        lastName:state.editedUser.lastName,
                        id:userId,
                        isAdmin:inputs.isAdmin,
                        createdDate:state.editedUser.createdDate,
                        }
            let chk = {...checks};
            let perm = [...state.editedUser.permissions]
            perm.map(p =>
                chk = {...chk,[p.id]:p.value})
            
            setInputs(inp);
            setChecks(chk);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleCheckChange = (event) => {
        event.persist();
        setChecks({...checks, [event.currentTarget.name]: event.currentTarget.checked});
    }

    const returnBack = () => {
        history.push("/users");
    }

    const handleUser = (user) => {
        state.isEditUser ?
        dispatch({ type: 'UPDATE_USER', payload: user }) :
        dispatch({ type: 'ADD_USER', payload: user });

        dispatch({type:"FINISH_EDIT",payload:"user"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let NewDate = new Date();
        NewDate = NewDate.toLocaleString('en-GB',{day: 'numeric', 
                                                  month: 'numeric', 
                                                  year: 'numeric' }) 
        
        let id = state.isEditUser ? userId : uuid();    
        let creDate =  state.isEditUser ? inputs.createdDate :  NewDate;
        let admin = state.isEditUser ? inputs.isAdmin : false;
        let newUser = {id:id,
                        firstName:inputs.firstName,
                        lastName:inputs.lastName,
                        createdDate: creDate,
                        userName:inputs.userName,
                        password:inputs.password,
                        isAdmin:admin,
                        permissions:[{id:"viewSubscriptions",
                                      name:"View Subscriptions",
                                      value:checks.viewSubscriptions},
                                     {id:"createSubscriptions",
                                      name:"Create Subscriptions",
                                      value:checks.createSubscriptions},
                                     {id:"deleteSubscriptions",
                                      name:"Delete Subscriptions",
                                      value:checks.deleteSubscriptions},
                                     {id:"updateSubscriptions",
                                      name:"Update Subscriptions",
                                      value:checks.updateSubscriptions},
                                     {id:"viewMovies",
                                      name:"View Movies",
                                      value:checks.viewMovies},
                                     {id:"createMovies",
                                      name:"Create Movies",
                                      value:checks.createMovies},
                                     {id:"deleteMovies",
                                      name:"Delete Movies",
                                      value:checks.deleteMovies},
                                     {id:"updateMovies",
                                      name:"Update Movies",
                                      value:checks.updateMovies}]}

        handleUser(newUser);
        setInputs({userName:"",password:"",
                   firstName:"",lastName:"",
                   viewSubscriptions:"",createSubscriptions:"",
                   deleteSubscriptions:"",updateSubscriptions:"",
                   viewMovies:"", createMovies:"",deleteMovies:"",updateMovies:""});
        returnBack();           
    }

    return state.isLogin? (
            <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" 
                            className={state.isEditUser ? classes.headerLong : classes.header}>
                    {state.isEditUser ?
                        "Edit User - " + state.editedUser.firstName + " " + state.editedUser.lastName :
                        "Add New User"
                    }
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoFocus
                        value={inputs.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        id="lastName"
                        value={inputs.lastName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="userName"
                        label="User Name"
                        id="userName"
                        type="email"
                        value={inputs.userName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={inputs.password}
                        onChange={handleInputChange}
                    />
                    <Divider />
                    <Typography component="h2" variant="h5">
                        Permissions
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="viewSubscriptions" 
                                        checked={checks.viewSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="View Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="createSubscriptions" 
                                        checked={checks.createSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Create Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="deleteSubscriptions" 
                                        checked={checks.deleteSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Delete Subscriptions" 
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="updateSubscriptions" 
                                        checked={checks.updateSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Update Subscriptions" 
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="viewMovies" 
                                        checked={checks.viewMovies}
                                        onChange={handleCheckChange}/>}
                                label="View Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="createMovies" 
                                        checked={checks.createMovies}
                                        onChange={handleCheckChange}/>}
                                label="Create Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="deleteMovies"
                                        checked={checks.deleteMovies}
                                        onChange={handleCheckChange}/>}
                                label="Delete Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="updateMovies"
                                        checked={checks.updateMovies}
                                        onChange={handleCheckChange}/>}
                                label="Update Movies"
                            />
                        </Grid>
                    </Grid>
                    
                    
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={clsx(classes.submit,classes.btnPrimary)}>
                            {state.isEditUser ? "Update": "Save"}
                    </Button>
                    <Button className={classes.btnSecondary}
                        fullWidth
                        variant="contained"
                        onClick={returnBack}>
                            Cancel
                    </Button>
                </form>
            </div>
        </Container>
    ) : <div></div>;
}

export default UserFormComp;