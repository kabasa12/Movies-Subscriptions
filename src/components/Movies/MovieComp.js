import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import {Link,useHistory,useParams} from 'react-router-dom';

function MovieComp(props) {

  const [state,dispatch] = useContext(Context);
  const [_genres,set_Genres] = useState("");
  const [subs,setSeubs] = useState([]);
  const [movie_id,setMovieId] = useState("");
  const history = useHistory();

  let {movieId} = useParams();

  useEffect(()=> {
    if(movieId) {
      movieId = parseInt(movieId);
      setMovieId(movieId);
      let data = state.movies.filter(m => m.id === movieId);
      data = {...data[0]}
      dispatch({type:"EDIT_MOVIE",payload:data});
    } else {
      setMovieId(props.movie.id);
    }
  },[]);


  useEffect(() => {
    let tmp="";
    if(movieId) {
      tmp = state?.currentMovie?.genres?.join();
    } else {
      tmp = props.movie.genres.join();
    }

    set_Genres(tmp);

    let userSubs = state.subscriptions.map(sub => ({...sub,
                                            movies:sub.movies.filter(s => s.movieId === movie_id)}))
                                            .filter(sub => sub.movies.length > 0)


    for(let i=0;i<userSubs.length;i++){
      let _sub = state.members.filter(m => m.id === userSubs[i].memberId);
      _sub = {..._sub[0]}
      userSubs[i].member = _sub.name;
      setSeubs(userSubs);
    }
  },[movie_id])
  

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
  return (
    <div className="movie-container">
      {movieId ? <div> 
                    <label>Back To Subscriptions</label>
                    <input type="button" value="Go Back" onClick={goBack} />
                  </div> : <div></div>}
      <div>
        <h5>{movieId ? state.currentMovie.name : props.movie.name}  {movieId ? state.currentMovie.premiered : props.movie.premiered}</h5>
      </div>
      <div>
        <label>Geners : </label>
        <label>{_genres}</label>
      </div>
      <div>
        <div style={{
                      width: '50%',
                      height: '200px',
                      backgroundImage: `url('${movieId ? state.currentMovie.image : props.movie.image}')`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      position: 'relative',
                      borderTopRightRadius: '2px',
                      borderTopLeftRadius: '2px'
                  }}>
        </div>
        {subs.length > 0 ?
        <div>
          <h5>Subscriptions Watched</h5>
          <ul>
            { 
              subs.map(sub => {
                return (<div key={sub.id}>
                  {sub.movies.map((movie,index) => {
                    return (<li key={index}><Link to={`/members/${sub.memberId}`}>{sub.member}</Link> - {movie.watchedDate}</li>)
                  })}
                </div>)
              })
            }
          </ul>
        </div> : null}
      </div>
      {movieId ? <div></div> : <div> 
                                <input type="button" value="Edit" onClick={showEditMovieForm}/>
                                <input type="button" value="Delete" onClick={deleteMovie} />
                              </div>}
    </div> 

  );
}

export default MovieComp;