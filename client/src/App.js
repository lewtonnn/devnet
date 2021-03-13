import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
import Dashboard from './components/layout/dashboard/Dashboard';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthHeader from './helpers/setAuthHeader';
import PrivateRoute from './components/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import SinglePost from './components/posts/SinglePost';

if (localStorage.token) {
  setAuthHeader(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className='container'>
            <ToastContainer/>
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/profiles' component={Profiles}/>
              <Route exact path='/profile/:id' component={Profile}/>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
              <PrivateRoute exact path='/create-profile'
                            component={CreateProfile}/>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              <PrivateRoute exact path='/add-experience'
                            component={AddExperience}/>
              <PrivateRoute exact path='/add-education'
                            component={AddEducation}/>
              <PrivateRoute exact path='/posts' component={Posts}/>
              <PrivateRoute exact path='/posts/:id' component={SinglePost}/>
            </Switch>
          </section>
        </Router>
      </Provider>
  );
};

export default App;
