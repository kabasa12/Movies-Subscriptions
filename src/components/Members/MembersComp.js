import React,{useContext} from 'react';
import Context from '../../context/context';
import { useHistory } from 'react-router-dom';
import MembComp from './MembComp';

function MembersComp (props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();

  const showAllMembers = () => {
    history.push("/members");
  }

  const addNewMember = () => {
    dispatch({type:"FINISH_EDIT",payload:"member"});
    history.push("/addMember")
  }

  return (
    <div>
        <h3>Subscriptions</h3>
        <br/>
        <div className="members-buttons">
          <input type="button" value="All Member" onClick={showAllMembers}/>
          <input type="button" value="Add Member" onClick={addNewMember}/>
        </div>
        <div>
          {
            state.members.map(member => {
              return (<MembComp key={member.id} member={member}/>)
            })
            
          }
        </div>
        
    </div>
  );
}

export default MembersComp;