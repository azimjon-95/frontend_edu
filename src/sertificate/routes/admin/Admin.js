import React from 'react';
import './Admin.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Outlet, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


const Admin = () => {
    const { dispatch } = useAuthContext()

    // console.log(pathname)
    const logout = () => {
        localStorage.removeItem('user')
        return dispatch({ type: 'LOGOUT' })
    }
    return (
        <div className='admin'>
            <div className="admin_options">
                <div className="admin_det">
                    <Link style={{ marginRight: "20px" }} className="main_pageHome" to="/"> <FiArrowLeft /> Asosiy sahifa</Link>
                    <Link style={{ marginRight: "20px" }} className="main_pageHomemob" to="/"> <FiArrowLeft /> Asosiy</Link>
                    <h1 className='admin_detail'>Sertifikat yaratishingiz mumkin</h1>
                </div>
                <div className="link_wrapper">
                    <NavLink className="link" activeclassname='selected_tab' to={`/admin/dasturlash`}>Sertifikat yaratish</NavLink>

                    <NavLink className="link" activeclassname='selected_tab' to={`/admin/historyPdf`}>Sertifikatlar ro'yhati</NavLink>
                    <NavLink className="link" activeclassname='selected_tab' to={`/register`}>Adminni ro'yhatga olish</NavLink>
                    <button className="link" onDoubleClick={logout}>Log out</button>

                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Admin
