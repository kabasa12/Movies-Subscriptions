import React,{useContext, useState} from 'react';
import Context from '../../context/context';
import LogFormComp from '../Forms/LogFormComp';

function LoginComp() {
  const [state,dispatch] = useContext(Context)
  const handleLogin = (userName,password) => {
    let index = state.users.findIndex(x => (x.userName === userName && x.password === password))
    if(index > -1){
      dispatch({type:"LOGIN"});
      dispatch({type:"SET_USER",payload:state.users[index]})
    } 
  }

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }

  return !state.isLogin ? (
    <div>
        <LogFormComp type="Login" handleLogin={handleLogin}/>
    </div>
  ) : (
    <div>
        <LogFormComp type="Logout" handleLogout={handleLogout}/>
    </div>
  );
}

export default LoginComp;