import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import header_logo from '../../assets/header_logo.svg';
import './Header.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
    const { user, dispatch } = useAuthContext()
    // const logout = () => {
    //     localStorage.removeItem('user')
    //     return dispatch({ type: 'LOGOUT' })
    // }

    return (
        <div className="header">
            <h2>Yagona Buxgalteriya</h2>
            {user ? (<>
                {/* <button className='header_logout' onClick={logout}>Log out</button> */}
                <NavLink to={"/admin/dasturlash"}>
                    <button className="order-btn">Tizimga kirish</button>
                </NavLink>
            </>
            ) : (
                <Link to="/login">
                    <button className="order-btn">Login</button>
                </Link>
            )}
        </div>

    )
}
export default Header;