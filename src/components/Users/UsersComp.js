import React,{useContext} from 'react';
import UserComp from './UserComp';
import { useHistory } from 'react-router-dom';
import Context from '../../context/context';

function UsersComp(props) {
  const [state,dispatch] = useContext(Context)
  const history = useHistory();

  const showAllUsers = () => {
    history.push("/users");
  }

  const addNewUser = () => {
    dispatch({type:"FINISH_EDIT",payload:"user"});
    history.push("/addUser")
  }


  return (
    <div>
      <h3>Users</h3>
      <br/>
      <div className="users-buttons">
        <input type="button" value="All Users" onClick={showAllUsers}/>
        <input type="button" value="Add User" onClick={addNewUser}/>
      </div>
      <div>
        {state.users.map(user => {
            return(
              <UserComp key={user.id} user={user}/>
            )
          })}
      </div>
    </div>
  );
  
  

}

export default UsersComp;