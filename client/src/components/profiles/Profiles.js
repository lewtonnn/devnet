import React, { Fragment, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles, setProfileLoading } from '../../actions/profile';
import ProfilesItem from './ProfilesItem';

const Profiles = () => {

  const dispatch = useDispatch();

  const profiles = useSelector(state => state.profile.profiles);
  const loading = useSelector(state => state.profile.loading);

  useLayoutEffect(() => {
    dispatch(setProfileLoading());
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
      <Fragment>
        {loading
            ? <Spinner/>
            :
            <Fragment>
              <h1 className="large text-primary">Users</h1>
              <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect
                with users
              </p>
              <div className="profiles">
                {profiles.length > 0
                    ? profiles.map(profile => (
                        <ProfilesItem key={profile._id} profile={profile}/>
                    ))
                    : <h4>No profiles found...</h4>

                }
              </div>
            </Fragment>
        }
      </Fragment>
  );
};

export default Profiles;
