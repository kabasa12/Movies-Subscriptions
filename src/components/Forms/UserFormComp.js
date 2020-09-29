import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import uuid from 'react-uuid';

const UserFormComp = (props) => {
    const [state,dispatch] = useContext(Context)
    const history = useHistory();
    const [inputs, setInputs] = useState({userName:"",
                                          password:"",
                                          firstName:"",
                                          lastName:"",
                                          id:"",
                                          isAdmin:false,
                                          createdDate:""
                                        });
                                        
    const [checks,setChecks] = useState({viewSubscriptions:false,
                                         createSubscriptions:false,
                                         deleteSubscriptions:false,
                                         viewMovies:false,
                                         createMovies:false,
                                         deleteMovies:false})
    
    
    let {userId} = useParams(); 

    useEffect(() => {
        if(state.isEditUser){

            let inp = { userName:state.editedUser.userName,
                        password:state.editedUser.password,
                        firstName:state.editedUser.firstName,
                        lastName:state.editedUser.lastName,
                        id:userId,
                        isAdmin:inputs.isAdmin,
                        createdDate:state.editedUser.createdDate,
                        }
            let chk = {...checks};
            let perm = [...state.editedUser.permissions]
            perm.map(p =>
                chk = {...chk,[p.id]:p.value})
            
            setInputs(inp);
            setChecks(chk);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleCheckChange = (event) => {
        event.persist();
        setChecks({...checks, [event.currentTarget.name]: event.currentTarget.checked});
    }

    const returnBack = () => {
        history.push("/users");
    }

    const handleUser = (user) => {
        state.isEditUser ?
        dispatch({ type: 'UPDATE_USER', payload: user }) :
        dispatch({ type: 'ADD_USER', payload: user });

        dispatch({type:"FINISH_EDIT",payload:"user"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let NewDate = new Date();
        NewDate = NewDate.toLocaleString('en-GB',{day: 'numeric', 
                                                  month: 'numeric', 
                                                  year: 'numeric' }) 
        
        let id = state.isEditUser ? userId : uuid();    
        let creDate =  state.isEditUser ? inputs.createdDate :  NewDate;
        let admin = state.isEditUser ? inputs.isAdmin : false;
        let newUser = {id:id,
                        firstName:inputs.firstName,
                        lastName:inputs.lastName,
                        createdDate: creDate,
                        userName:inputs.userName,
                        password:inputs.password,
                        isAdmin:admin,
                        permissions:[{id:"viewSubscriptions",
                                      name:"View Subscriptions",
                                      value:checks.viewSubscriptions},
                                     {id:"createSubscriptions",
                                      name:"Create Subscriptions",
                                      value:checks.createSubscriptions},
                                     {id:"deleteSubscriptions",
                                      name:"Delete Subscriptions",
                                      value:checks.deleteSubscriptions},
                                     {id:"viewMovies",
                                      name:"View Movies",
                                      value:checks.viewMovies},
                                     {id:"createMovies",
                                      name:"Create Movies",
                                      value:checks.createMovies},
                                     {id:"deleteMovies",
                                      name:"Delete Movies",
                                      value:checks.deleteMovies}]}

        handleUser(newUser);
        setInputs({userName:"",password:"",
                   firstName:"",lastName:"",
                   viewSubscriptions:"",createSubscriptions:"",
                   deleteSubscriptions:"",viewMovies:"",
                   createMovies:"",deleteMovies:""});
        returnBack();           
    }

    return(
        <div className="form-container">  
                <div className="form-header">  
                    {state.isEditUser ? 
                        <h3>Edit User - {state.editedUser.firstName + " " + state.editedUser.lastName}</h3> 
                        : <h3>Add New User</h3>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-inputs-container">
                        <div>
                            <label>First Name :</label>
                            <input type="text" value={inputs.firstName} 
                                    name="firstName" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Last Name :</label>
                            <input type="text" value={inputs.lastName} 
                                    name="lastName" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>User Name :</label>
                            <input type="text" value={inputs.userName} 
                                    name="userName" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label>Password :</label>
                            <input type="text" value={inputs.password} 
                                    name="password" onChange={handleInputChange}/>
                        </div>
                        <h5>Permissions :</h5>
                        <div>
                            <input type="checkbox" checked={checks.viewSubscriptions} 
                                    name="viewSubscriptions" 
                                    onChange={handleCheckChange}/>
                            <label> View Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checks.createSubscriptions} 
                                    name="createSubscriptions" 
                                    onChange={handleCheckChange}/>
                            <label> Create Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checks.deleteSubscriptions} 
                                    name="deleteSubscriptions" 
                                    onChange={handleCheckChange}/>
                            <label> Delete Subscriptions</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checks.viewMovies} 
                                    name="viewMovies" 
                                    onChange={handleCheckChange}/>
                            <label> View Movies</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checks.createMovies} 
                                    name="createMovies" 
                                    onChange={handleCheckChange}/>
                            <label> Create Movies</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checks.deleteMovies} 
                                    name="deleteMovies" 
                                    onChange={handleCheckChange}/>
                            <label> Delete Movies</label>
                        </div>

                    </div>
                    <button type="submit">{state.isEditUser ? "Update": "Save"}</button>
                    <input type="button" value="Cabcel" onClick={returnBack} />
                </form>
            </div> 
    )
}

export default UserFormComp;