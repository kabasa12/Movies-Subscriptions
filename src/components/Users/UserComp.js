import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/context';

function UserComp(props) {
  const [state,dispatch] = useContext(Context)
  const history = useHistory();

  const showEditUserForm = () => {
    dispatch({type:"EDIT",payload:"user"});
    dispatch({type:"EDIT_USER" ,payload:props.user});
    history.push(`/updateUser/${props.user.id}`)
  }

  const deleteUser = () => {
      dispatch({type:"DELETE_USER" , payload:props.user.id})
  }

  let permissions = "";
  let keys = props.user.permissions.filter(p => p.value === true);
  keys.map((perm,index) => {
    return permissions += perm.name + (index < keys.length-1 ? ", " : "")
  })

  
  return (
    <div className="user-container">
      <div>
        <label>Name : </label>
        <label>{props.user.firstName + " " + props.user.lastName }</label>
      </div>
      <div>
        <label>User Name : </label>
        <label>{props.user.userName}</label>
      </div>
      <div>
        <label>Created Date : </label>
        <label>{props.user.createdDate}</label>
      </div>
      <div>
        <label>Permissions : </label>
        <label>{permissions}</label>
      </div>
      {props.user.isAdmin? <div><p></p></div> :
      <div> 
        <input type="button" value="Edit" onClick={showEditUserForm}/>
        <input type="button" value="Delete" onClick={deleteUser} />
      </div>}
    </div> 
  );
}

export default UserComp;