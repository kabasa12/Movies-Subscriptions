import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import uuid from 'react-uuid';

const MovieFormComp = (props) => {
    const [state,dispatch] = useContext(Context)
    const history = useHistory();
    const [inputs, setInputs] = useState({name:"",
                                          image:"",
                                          premiered:"",
                                          genres:[],
                                          id:""
                                        });
                                
    let {movieId} = useParams(); 

    useEffect(() => {
        if(state.isEditMovie){
            
            let inp = { name:state.currentMovie.name,
                        genres:state.currentMovie.genres,
                        image:state.currentMovie.image,
                        premiered:state.currentMovie.premiered,
                        id:movieId
                        }
            
            setInputs(inp);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const returnBack = () => {
        history.push("/movies");
    }

    const handleUser = (movie) => {
        state.isEditMovie ?
        dispatch({ type: 'UPDATE_MOVIE', payload: movie }) :
        dispatch({ type: 'ADD_MOVIE', payload: movie });

        dispatch({type:"FINISH_EDIT",payload:"movie"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let NewDate = new Date().getFullYear();
        let id = state.isEditMovie ? movieId : uuid();    
        let preDate =  state.isEditMovie ? inputs.premiered :  NewDate;
       
        let newMovie = {id:id,
                        name:inputs.name,
                        genres:inputs.genres,
                        premiered: preDate,
                        image:inputs.image}

        handleUser(newMovie);
        setInputs({name:"",genres:"",
                   premiered:"",image:""});
        returnBack();           
    }

    return(
        <div className="form-container">  
                <div className="form-header">  
                    {state.isEditMovie ? 
                        <h3>Edit Movie - {state.currentMovie.name}</h3> 
                        : <h3>Add New Movie</h3>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-inputs-container">
                        <div>
                            <label>Name :</label>
                            <input type="text" value={inputs.name} 
                                    name="name" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Ganres :</label>
                            <input type="text" value={inputs.genres} 
                                    name="genres" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Image Url :</label>
                            <input type="text" value={inputs.image} 
                                    name="image" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Premiered :</label>
                            <input type="text" value={inputs.premiered} 
                                    name="premiered" onChange={handleInputChange}/>
                        </div>
                    </div>
                    <button type="submit">{state.isEditMovie ? "Update": "Save"}</button>
                    <input type="button" value="Cabcel" onClick={returnBack} />
                </form>
            </div> 
    )
}

export default MovieFormComp;