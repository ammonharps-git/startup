const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const express = require('express');
const cors = require('cors');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// CORS middleware to allow requests from specific origin
app.use(cors({
  origin: ['http://localhost:3000', 'https://startup.listentotalks.click'] // Replace with your allowed origin(s)
}));

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// get users
apiRouter.get('/users', (_req, res) => {
  console.log("GET  /users");   // testing
  res.send(JSON.stringify(users));
});

// get playlists
apiRouter.get('/playlists', (_req, res) => {
  console.log("GET  /playlists");   // testing
    res.send(JSON.stringify(playlists));
  });

// get talks
apiRouter.get('/talks', (_req, res) => {
  console.log("GET  /talks");   // testing
    res.send(JSON.stringify(talks));
  });

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } 
  else {
    const user = await DB.createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Update users
apiRouter.post('/updateUsers', (req, res) => {
  console.log("POST /updateUsers");   // testing
  users = updateUsers(req.body, users);
  res.send(users);
});

// Update talks
apiRouter.post('/updateTalks', (req, res) => {
  console.log("POST /updateTalks");   // testing
  talks = updateTalks(req.body, talks);
  res.send(talks);
});

// Add new playlist
apiRouter.post('/updatePlaylists', (req, res) => {
  console.log("POST /updatePlaylists");   // testing
  playlists = updatePlaylists(req.body, playlists);
  res.send(playlists);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Users, Playlists, and talks are saved in memory and disappear whenever the service is restarted.
let users = [];
let playlists = [];
let talks = [];

function updateUsers(newUser, users) {
  users = users.filter((item) => item.username != newUser.username)
  users.push(newUser);
  return users;
}

function updatePlaylists(newPlaylist, playlists) {
  playlists = playlists.filter((item) => item.playlistID != newPlaylist.playlistID)
  playlists.push(newPlaylist);
  return playlists;
}

function updateTalks(newTalk, talks) {
  talks = talks.filter((item) => item.talkName != newTalk.talkName)
  talks.push(newTalk);
  return talks;
}
