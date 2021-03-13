import React, { Fragment, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
  setProfileLoading,
} from '../../../actions/profile';
import Spinner from '../Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile.profile);
  const loading = useSelector(state => state.profile.loading);

  useLayoutEffect(() => {
    dispatch(setProfileLoading());
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null
      ? <Spinner/>
      : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"/> Welcome {user && user.name}
        </p>
        {profile !== null
            ? <Fragment>
              <DashboardActions/>
              <Experience experience={profile.experience}/>
              <Education education={profile.education}/>

              <div className="my-2">
                <button className="btn btn-danger"
                        onClick={() => dispatch(deleteAccount())}
                >
                  <i className="fas fa-user-minus"/> Delete My Account
                </button>
              </div>
            </Fragment>
            : <Fragment>
              <p>You do not have a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>}
      </Fragment>;
};

export default Dashboard;
