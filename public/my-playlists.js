// Event messages
const NewPlaylistEvent = 'NewPlaylist';
const SystemEvent = 'System'

// Token
let token = '';

// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const username = getQueryParam('username');

    // Update the content of an HTML element with the username
    document.getElementById('bannerUsername').innerText = username;

    configureWebSocket()

    displayPlaylists();
});

function showPopup() {
    console.log("Showing popup...");
    const darkScreen = document.getElementById('dark-screen');
    darkScreen.style.display = 'block';
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

async function createPlaylist() {
    const playlistName = document.getElementById('playlistName').value;
    const playlistDescription = document.getElementById('playlistDescription').value;
    const username = getQueryParam('username');
    if (playlistName.trim() !== '') {
        const randomID = "playlist-" + generateRandomString(20);
        const playlist = {'playlistID': randomID, 'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []};
        try {
            const response = await fetch('/api/users', {
              method: 'GET',
              headers: {'content-type': 'application/json'},
            });
      
            let users = await response.json();
            console.log("All users:", users);     // testing

            // TODO the issue seems to be with timing, since when I step through the process, it adds the playlists just fine. Try huntinf for an async or await that needs to be added somewhere up the chain before this function.
            
            localStorage.setItem('users', JSON.stringify(users));
            let profile = users.filter((item) => item.username === username)[0];
            profile['playlists'].push(randomID);
            console.log("updated user profile:", profile);       // testing

            const response2 = await fetch('/api/updateUsers', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(profile),
              });
        
              const users2 = await response2.json();
              localStorage.setItem('users', JSON.stringify(users2));

        } catch (e) {
          console.log(e);
          console.log("Error when getting users (while adding new playlist) from Node.")
        }
        try {
          
          const response = await fetch('/api/updatePlaylists', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(playlist),
          });
    
          let playlists = await response.json();
          localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch (e) {
          console.log(e);
          console.log("Error when updating playlists (adding new) from Node.")
        }

        await broadcastEvent(username, NewPlaylistEvent, playlistName);
        alert(`Playlist "${playlistName}" created!`);
    } else {
        alert('Invalid playlist name.');
    }
    hidePopup();
}

async function createAndReload() {
    await createPlaylist();
    const username = getQueryParam('username');
    window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
    // await displayPlaylists();
}

function cancel() {
    hidePopup();
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    const darkScreen = document.getElementById('dark-screen');
    darkScreen.style.display = 'none';
    document.getElementById('playlistName').value = ''
    displayPlaylists();
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

async function displayPlaylists() {

    const talkListContainer = document.getElementById('listPlaylistContainer');

    // Clear the existing content in the container
    talkListContainer.innerHTML = '';
    const username = getQueryParam('username');

    try {
        let response = await fetch('/api/users', {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        });
        
        let users = await response.json();
        console.log("users", users);     // testing
        localStorage.setItem('users', JSON.stringify(users));
        const userList = users.filter((item) => item.username === username);
        console.log("userList", userList);     // testing
        const user = userList[0];
        console.log("user", user);     // testing
        const userPlaylists = user['playlists'];
        console.log("userplaylists:", userPlaylists);     // testing
        
        const addPlaylistCard = document.getElementById("new-playlist-card");
        if (userPlaylists.length === 0) {
            addPlaylistCard.style.borderRadius = '5rem';
        }
        else {
            addPlaylistCard.style.borderRadius = 'none';
        }

        // Iterate over the talkList and create/display talk elements
        response = await fetch('/api/playlists', {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        });
        const playlists = await response.json();
        localStorage.setItem('playlists', JSON.stringify(playlists));
        let index = 0;
        await userPlaylists.forEach(async (playlistID) => {
            console.log("Displaying playlist:", playlistID);
            
            const playlist = playlists.filter((item) => item.playlistID === playlistID)[0]
            //const playlist = JSON.parse(localStorage.getItem(playlistID));

            const reply = await fetch("https://picsum.photos/300/200", {
                method: 'GET',
                headers: {'content-type': 'application/json'},
            });
            const imageData = await reply;
            const imageUrl = imageData.download_url || imageData.url; 


            const card = document.createElement('span');
            card.id = `card${index + 1}`;
            card.className = 'card';

            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = imageUrl;
            img.alt = `Playlist Image ${index + 1}`;
            img.onclick = () => viewPlaylist(playlistID, 'view');

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = playlist['playlistName'];

            const description = document.createElement('p');
            description.className = 'card-text';
            description.textContent = playlist['playlistDescription'];

            const listenButton = createButton('Listen', () => viewPlaylist(playlistID, 'view'), "btn btn-primary", 'white');
            const editButton = createButton('Edit', () => viewPlaylist(playlistID, 'edit'), "btn", 'black');

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(listenButton);
            cardBody.appendChild(editButton);

            card.appendChild(img);
            card.appendChild(cardBody);

            talkListContainer.appendChild(card);
            index = index + 1;
        });
    } catch (e) {
        console.log(e);
        console.log("Error when displaying playlists from Node.")
    }
}


// Function to create a button
function createButton(label, onclick, className, textColor) {
    const button = document.createElement('a');
    button.className = className
    button.onclick = onclick;
    button.textContent = label;
    button.style.color = textColor;
    button.style.cursor = 'pointer';
    return button;
    }


// Functionality for peer communication using WebSocket
function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      displayMsg('Connected to', 'playlist server');
    };
    socket.onclose = (event) => {
      displayMsg(`Server`, 'disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === NewPlaylistEvent) {
        displayMsg(msg.from, `just made a new playlist called \'${msg.value}\'!`);
      } else if (msg.type === SystemEvent) {
        displayMsg(msg.from, msg.value);
      }
    };
  }

  async function displayMsg(from, msg) {
    const chatText = document.getElementById('player-messages');
    chatText.innerHTML =
      `<div class="player-messages">${from} ${msg}</div>`;
    chatText.style.display = 'block';
    setTimeout(() => {
      chatText.style.display = 'none';
      chatText.innerText = ''; // Clear the message for the next attempt
    }, 5000); // Hide the message after 3 seconds
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }
