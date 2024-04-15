const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const playlistCollection = db.collection('playlist');
const talkCollection = db.collection('talk');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

function getUsers() {
  return userCollection.find({}).toArray();
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    playlists: [],
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addPlaylist(playlist) {
  playlistCollection.insertOne(playlist);
}

function getPlaylists() {
  return playlistCollection.find({}).toArray();
}

function addTalk(talk) {
  talkCollection.insertOne(talk);
}

function getTalks() {
  return talkCollection.find({}).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  getUsers,
  createUser,
  addPlaylist,
  getPlaylists,
  addTalk,
  getTalks
};
