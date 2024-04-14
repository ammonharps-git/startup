const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

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

// Register new user
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
