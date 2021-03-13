const express = require('express');
const connectDB = require('./config/db');

const authRoute = require('./routes/API/v1/auth');
const postsRoute = require('./routes/API/v1/posts');
const profilesRoute = require('./routes/API/v1/profiles');
const usersRoute = require('./routes/API/v1/users');
const path = require('path');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/API/v1/auth', authRoute);
app.use('/API/v1/posts', postsRoute);
app.use('/API/v1/profiles', profilesRoute);
app.use('/API/v1/users', usersRoute);

// Serve static in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));