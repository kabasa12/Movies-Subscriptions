import React,{useContext, useState} from 'react';
import Context from '../../context/context';
import { useHistory } from 'react-router-dom';
import MovieComp from './MovieComp';

function MoviesComp(props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();
  const [searchToggle,setSearchToggle] = useState(false);
  const [searchText,setSearchText] = useState("");
  const [searchMovies,setSearchMovies] = useState([]);

  const searchToggleHandle = () => {
    setSearchToggle(true);
    let movies = state.movies.filter(m => m.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchMovies(movies);
  }

  const searchHandle = (e) => {
    setSearchText(e.target.value);
    let len = e.target.value
    if(len.length < 4) setSearchToggle(false);
  }

  const afterDeleteHandle = () => {
    setSearchToggle(false);
    setSearchText("");
  }

  const showAllMovies = () => {
    history.push("/movies");
    setSearchToggle(false);
    setSearchText("");
  }

  const addNewMovie = () => {
    dispatch({type:"FINISH_EDIT",payload:"movie"});
    history.push("/addMovie")
  }

  return  (
    <div>
        <h3>Movies</h3>
        <br/>
        <div className="movies-buttons">
          <input type="button" value="All Movies" onClick={showAllMovies}/>
          <input type="button" value="Add Movie" onClick={addNewMovie}/>
          Find Movie : <input type="text" value={searchText} onChange={searchHandle} />
          <input type="button" value="Find" onClick={searchToggleHandle} />
        </div>
        <div>
          {
            searchToggle ? searchMovies.map(movie => {
              return (<MovieComp key={movie.id} movie={movie} deleteHandle={afterDeleteHandle}/>)
            })
            
            : state.movies.map(movie => {
              return (<MovieComp key={movie.id} movie={movie} deleteHandle={afterDeleteHandle}/>)
            })
            
          }
        </div>
        
    </div>
  );
}

export default MoviesComp;