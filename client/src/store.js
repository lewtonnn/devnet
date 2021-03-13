import { configureStore } from '@reduxjs/toolkit';

// reducers
import auth from './reducers/auth';
import profile from './reducers/profile';
import post from './reducers/post';

const store = configureStore({
  reducer: {
    auth,
    profile,
    post,
  },
});

export default store;