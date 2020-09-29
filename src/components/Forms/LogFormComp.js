import React,{useState,useContext} from 'react'
import Context from '../../context/context';
import { useHistory } from 'react-router-dom';

const LogFormComp = (props) => {
    const [state] = useContext(Context)
    const history = useHistory();

    const [inputs, setInputs] = useState({userName:"",
                                          password:""
                                        });

    
    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        switch(props.type){
            case "Login":
                props.handleLogin(inputs.userName,inputs.password);
                setInputs({userName:"",password:""});
                history.push("/movies");
                break;
            case "Logout":
                props.handleLogout();
                break;
            default:
                return null;
        }
    }

    switch(props.type){
        case "Login":
          return  (
                <div className="form-container">  
                    <div className="form-header">
                        <h3>Log In</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-inputs-container">
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
                        </div>
                        <button type="submit">Log in</button> 
                    </form>
                </div>
            );

        case "Logout":
            return (
                <div className="form-container">  
                    <div className="form-header">
                        <h3>Log Out</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-inputs-container">
                        </div>
                        <button type="submit">Log Out</button>
                    </form>
                </div>
            );

        default:
            return (<div className="form-container"></div>);
    }
}

export default LogFormComp;