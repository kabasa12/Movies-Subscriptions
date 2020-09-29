import React,{useContext,useEffect,useState} from 'react';
import Context from '../../context/context';
import {Link,useParams,useHistory} from 'react-router-dom';
import SubscribeFormComp from '../Forms/SubscribeFormComp';

function MemberComp (props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();

  const [member_id,setMemberId] = useState("");
  const [memberDetails,setMemberDetails] = useState([]);
  const [newSubsc,setNewSubsc] = useState(false);

  let {memberId} = useParams();

  useEffect(()=> {
    if(memberId) {
      memberId = parseInt(memberId);
      setMemberId(memberId);
      let data = state.members.filter(m => m.id === memberId);
      data = {...data[0]}
      dispatch({type:"EDIT_MEMBER",payload:data});
    } else {
      setMemberId(props.member.id);
    }
  },[]);

  useEffect(() => {
    updateMember();
  },[member_id,state.subscriptions]);

  const updateMember = () => {
    let userMovies = state.subscriptions.filter( m => m.memberId === member_id)
    
    for(let i=0;i<userMovies.length;i++){
      for(let j=0; j<userMovies[i].movies.length; j++){
        let movieDetails = state.movies.filter(m => m.id === userMovies[i].movies[j].movieId);
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
  
  const openNewSubsc = () => {
    setNewSubsc(true);
  }

  const handleCancelSubsc = () => {
    setNewSubsc(false);
  }

  return (
    <div className="member-container">
      {memberId ? <div> 
                    <label>Back To Movies</label>
                    <input type="button" value="Go Back" onClick={goBack} />
                  </div> : <div></div>}
      <div>
        <h4>{memberId ? state.currentMember.name : props.member.name}</h4>
      </div>
      <div>
        <label>Email :</label>
        <label>{memberId ? state.currentMember.email : props.member.email}</label>
      </div>
      <div>
        <label>City :</label>
        <label>{memberId ? state.currentMember.city : props.member.city}</label>
      </div>
      <div>
         <h5>Movies Watched</h5>
         <div>
           <input type="button" value="Subscribe To New Movie" onClick={openNewSubsc}/>
         </div>
         {newSubsc ? <SubscribeFormComp userMovies={memberDetails} 
                                        handleCancel={handleCancelSubsc}
                                        memberId={member_id}
                                        updateMember={updateMember}/> : <div/>}
        <div>
          <ul>
            {
              memberDetails.map(sub => { 
                return (<div key={sub.id}>
                  {sub.movies.map((movie,index) => {
                    return (<li key={index}><Link to={`/movies/${movie.movieId}`}>{movie.name}</Link> - {movie.watchedDate}</li>)
                  })}
                </div>)
              })
            }
          </ul>
        </div>
      </div>
      {memberId ? <div></div> : <div> 
                                  <input type="button" value="Edit" onClick={showEditMemberForm}/>
                                  <input type="button" value="Delete" onClick={deleteMember} />
                              </div>}    
    </div>
  );
}

export default MemberComp;