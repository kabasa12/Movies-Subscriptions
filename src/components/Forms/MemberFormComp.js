import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import uuid from 'react-uuid';

const MemberFormComp = (props) => {
    const [state,dispatch] = useContext(Context)
    const history = useHistory();
    const [inputs, setInputs] = useState({name:"",
                                          email:"",
                                          city:""
                                        });
                                
    let {memberId} = useParams(); 

    useEffect(() => {
        if(state.isEditMember){
            
            let inp = { name:state.currentMember.name,
                        email:state.currentMember.email,
                        city:state.currentMember.city,
                        id:memberId
                        }
            
            setInputs(inp);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const returnBack = () => {
        history.push("/members");
    }

    const handleUser = (member) => {
        state.isEditMember ?
        dispatch({ type: 'UPDATE_MEMBER', payload: member }) :
        dispatch({ type: 'ADD_MEMBER', payload: member });

        dispatch({type:"FINISH_EDIT",payload:"member"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let id = state.isEditMember ? memberId : uuid();    
       
        let newMember = {id:id,
                        name:inputs.name,
                        email:inputs.email,
                        city:inputs.city}

        handleUser(newMember);
        setInputs({name:"",email:"",city:""});
        returnBack();           
    }

    return(
        <div className="form-container">  
                <div className="form-header">  
                    {state.isEditMember ? 
                        <h3>Edit Member - {state.currentMember.name}</h3> 
                        : <h3>Add New Member</h3>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-inputs-container">
                        <div>
                            <label>Name :</label>
                            <input type="text" value={inputs.name} 
                                    name="name" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Email :</label>
                            <input type="email" value={inputs.email} 
                                    name="email" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>City :</label>
                            <input type="text" value={inputs.city} 
                                    name="city" onChange={handleInputChange}/>
                        </div>
                    </div>
                    <button type="submit">{state.isEditMember ? "Update": "Save"}</button>
                    <input type="button" value="Cabcel" onClick={returnBack} />
                </form>
            </div> 
    )
}

export default MemberFormComp;