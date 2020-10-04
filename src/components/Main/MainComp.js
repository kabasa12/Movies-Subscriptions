import React,{useEffect,useContext,useState} from 'react';
import {Route,Switch} from 'react-router-dom';
import Context from '../../context/context';
import utils from '../../Utils/utils'

import NavBarComp from '../NavBar/NavDrawer';
import MoviesComp from '../Movies/MoviesComp';
import MovieComp from '../Movies/MovieComp';
import MembersComp from '../Members/MembersComp';
import MembComp from '../Members/MembComp';
import UsersComp from '../Users/UsersComp';
import LoginComp from '../Log/LoginComp';
import UserFormComp from '../Forms/UserFormComp';
import MovieFormComp from '../Forms/MovieFormComp';
import MemberFormComp from '../Forms/MemberFormComp';

function MainComp() {
  const [state,dispatch] = useContext(Context)
  const [_users] =  useState([{ id:1,
                                firstName:"Yaniv",
                                lastName:"Kabesa",
                                createdDate:"18/09/2020",
                                userName:"yanivkab@gmail.com",
                                password:"Q1234q",
                                isAdmin:true,
                                permissions:[{id:"viewSubscriptions",
                                              name:"View Subscriptions",value:true},
                                             {id:"createSubscriptions",
                                              name:"Create Subscriptions",value:true},
                                             {id:"deleteSubscriptions",
                                              name:"Delete Subscriptions",value:true},
                                             {id:"updateSubscriptions",
                                              name:"Update Subscriptions",value:true},
                                             {id:"viewMovies",
                                              name:"View Movies",value:true},
                                             {id:"createMovies",
                                              name:"Create Movies",value:true},
                                             {id:"deleteMovies",
                                              name:"Delete Movies",value:true},
                                             {id:"updateMovies",
                                              name:"Update Movies",value:true}]},
                              { id:2,
                                firstName:"Avi",
                                lastName:"Chohen",
                                createdDate:"20/09/2020",
                                userName:"avicho@gmail.com",
                                password:"W1234w",
                                isAdmin:false,
                                permissions:[{id:"viewSubscriptions",
                                              name:"View Subscriptions",value:false},
                                             {id:"createSubscriptions",
                                              name:"Create Subscriptions",value:false},
                                             {id:"deleteSubscriptions",
                                              name:"Delete Subscriptions",value:false},
                                             {id:"updateSubscriptions",
                                              name:"Update Subscriptions",value:false},
                                             {id:"viewMovies",
                                              name:"View Movies",value:true},
                                             {id:"createMovies",
                                              name:"Create Movies",value:false},
                                             {id:"deleteMovies",
                                              name:"Delete Movies",value:false},
                                             {id:"updateMovies",
                                              name:"Update Movies",value:false}]}]);


  const [subsc] = useState([{ id:1,
                              memberId:1,
                              movies:[{movieId:1,watchedDate:"02/05/2019"},
                                      {movieId:2,watchedDate:"30/08/2019"},
                                      {movieId:3,watchedDate:"03/03/2020"}]
                            },
                            { id:2,
                              memberId:5,
                              movies:[{movieId:1,watchedDate:"17/02/2018"},
                                      {movieId:3,watchedDate:"23/06/2020"}]
                            }]);                                        
  
  useEffect(() => {
    dispatch({ type: 'SET_USERS', payload: _users });
    dispatch({type:"SET_SUBSCRIPTIONS" , payload:subsc})

    let resp;
      const getAllMembers = async() => {
        resp = await utils.getAll('https://jsonplaceholder.typicode.com/users',"members");
        dispatch({type:"SET_MEMBERS", payload:resp});
      }
      getAllMembers();
      
      const getAllMovies = async() => {
        resp = await utils.getAll('https://api.tvmaze.com/shows',"movies");
        dispatch({type:"SET_MOVIES", payload:resp});
      }
      getAllMovies();  
  },[])

  return (
      <div>
        <NavBarComp />
          <Switch>
            <Route exact path="/" component={LoginComp} />
            <Route path="/updateUser/:userId" component={UserFormComp} />
            <Route path="/updateMovie/:movieId" component={MovieFormComp} />
            <Route path="/updateMember/:memberId" component={MemberFormComp} />
            <Route path="/members/:memberId" component={MembersComp} />
            <Route path="/movies/:movieId" component={MoviesComp} />
            <Route path="/movies" component={MoviesComp} />
            <Route path="/members" component={MembersComp} />
            <Route path="/addUser" component={UserFormComp} />
            <Route path="/addMovie" component={MovieFormComp} />
            <Route path="/addMember" component={MemberFormComp} />
            <Route path="/users" component={UsersComp} />  
          </Switch>
      </div>
  );
}

export default MainComp;