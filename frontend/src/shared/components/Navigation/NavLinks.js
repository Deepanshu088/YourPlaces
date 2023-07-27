import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import './NavLinks.css'

const NavLinks = props =>{
    const context = useContext(AuthContext);
    return(
        <ul className='nav-links'>
            <li>
                <NavLink to='/' >All Users</NavLink>
            </li>
            {   context.isLoggedIn && 
                <li>
                    <NavLink to={`/${context.userId}/places`} >My Places </NavLink>
                </li>
            }
            {   context.isLoggedIn && 
                <li>
                    <NavLink to='/places/new'>Add Place</NavLink>
                </li>
            }
            {   !context.isLoggedIn &&
                <li>
                    <NavLink to='/auth'>Authenticate</NavLink>
                </li>
            }
            {   context.isLoggedIn &&
                <li>
                    <button onClick={context.logout}>Logout</button>
                </li>
            }
        </ul>
    )
}

export default NavLinks;