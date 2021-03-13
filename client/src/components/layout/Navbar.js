import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';

export const Navbar = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  const authLinks = (
      <ul>
        <li>
          <Link to='/profiles'>
            Users
          </Link>
        </li>
        <li>
          <Link to='/posts'>
            Posts
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className="fas fa-user"/>{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={() => dispatch(logout())} href='#!'>
            <i className='fas fa-sign-out-alt'/>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks = (
      <ul>
        <li>
          <Link to='/profiles'>Users</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
  );

  return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevNet
          </Link>
        </h1>
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </nav>
  );
};

export default Navbar;
