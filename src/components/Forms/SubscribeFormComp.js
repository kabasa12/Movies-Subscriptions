import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import uuid from 'react-uuid'

function SubscribeFormComp(props) {
  const [state,dispatch] = useContext(Context);
  const [movieSelect,setMovieSelect] = useState(0);
  const [watch,setWatch] = useState("01/01/1980");
  const [memberMovies,setMemberMovies] = useState([]);

  useEffect(() => {
    let watched = props.userMovies[0].movies.map(x => {return x.movieId});
    let movies = state.movies.filter(m => !watched.includes(m.id));
    setMemberMovies(movies)
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
      
      data = {movieId:parseInt(movieSelect),watchedDate:watchDate};
      dispatch({type:"UPDATE_SUBSCRIBE",payload:{data:data,id:id}});
    } else {
      data={id:uuid(),memberId:props.memberId,movies:[{movieId:parseInt(movieSelect),watchedDate:watchDate}]}
      dispatch({type:"ADD_SUBSCRIBE",payload:data});
    }
    handleCancel();
  }

  return (
    <div className="member-container">
      <div>
        <h4>Add New Movie</h4>
      </div>
      <div>
        <select name="movies" 
                onChange={e => setMovieSelect(e.target.value)}
                value={movieSelect}>
          <option>Choose Movie ...</option>
          {memberMovies.map(m => {
            return <option key={m.id} value={m.id}>{m.name}</option>
          })}
        </select>
        <input type="date" value={watch} onChange={e => setWatch(e.target.value)}/>
      </div>
      <div> 
          <input type="button" value="Subscribe" onClick={handleSubsc}/>
          <input type="button" value="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
}

export default SubscribeFormComp;