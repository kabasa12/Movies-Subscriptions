import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import Context from '../../context/context';

const NavBarComp = () => {
    const [state,dispatch] = useContext(Context)
    return(
        <nav className="nav-wrapper red daken-3">
            <div className="container">
                <p className="logo">Movies-Subscriptions</p>
                <ul className="right">
                    <li><NavLink to="/">{state.isLogin ? "LogOut" : "Login"}</NavLink></li>
                    {state.isLogin ? (<div>
                        <li><NavLink to="/movies">Movies</NavLink></li>
                        <li><NavLink to="/members">Subscriptions</NavLink></li>
                        {state.currentUser.isAdmin ? 
                          <li><NavLink to="/users">User Management</NavLink></li> : null}
                        </div>
                    ) : null}
                    
                </ul>
            </div>
        </nav>
    )
}

export default NavBarComp