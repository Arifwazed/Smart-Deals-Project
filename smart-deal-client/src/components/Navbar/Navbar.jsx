import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const {user,logOut} = use(AuthContext)
    const fallbackImg = "https://img.icons8.com/ios-filled/50/user-male-circle.png";
    const handleLogout = () => {
        logOut();
    }
    const links = <>
        <li><NavLink to="/" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>Home</NavLink></li>
        <li><NavLink to="/allProducts" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""}>All Products</NavLink></li>
        {
            user && <>
                <li><NavLink to="/myProducts" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""} >My Products</NavLink></li>
                <li><NavLink to="/myBids" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""} >My Bids</NavLink></li>
                <li><NavLink to="/createProduct" className={({isActive})=> isActive ? "text-primary-gradient font-bold" : ""} >Create Product</NavLink></li>
            </>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Smart<span className='text-primary-gradient font-bold'>Deals</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {links}
                    </ul>
                </div>
                <div className="navbar-end mr-2">
                    {
                        user ? <div className='flex items-center gap-2'>
                            <img src={user?.photoURL || fallbackImg} className='h-9 w-9 rounded-full' alt="" onError={(e)=> {e.target.style.display = 'none'}}/> <button onClick={handleLogout} className="btn btn-primary-custom">Sign Out</button>
                        </div> 
                        : 
                        <Link to="/register" className="btn">Register</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;