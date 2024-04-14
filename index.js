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
  res.send(users);
});

// get playlists
apiRouter.get('/playlists', (_req, res) => {
    res.send(playlists);
  });

// get talks
apiRouter.get('/talks', (_req, res) => {
    res.send(talks);
  });

// Register new user
apiRouter.post('/register', (req, res) => {
  users = updateUsers(req.body);
  res.send(users);
});

// Update talks
apiRouter.post('/updateTalks', (req, res) => {
  talks = updateTalks(req.body);
  res.send(talks);
});

// Add new playlist
apiRouter.post('/updatePlaylists', (req, res) => {
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

function updateUsers(newUser) {
  users = users.filter((item) => item.username != newUser.username)
  users.push(newUser);
  return users;
}

function updatePlaylists(newPlaylist, playlists) {
  playlists = playlists.filter((item) => item.playlistID != newPlaylist.playlistID)
  playlists.push(newPlaylist);
  return playlists;
}

function updateTalks(newTalk) {
  talks = talks.filter((item) => item.talkID != newTalk.talkID)
  talks.push(newTalk);
  return talks;
}
