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
    console.log("Got here");        // testing
    const playlistName = document.getElementById('playlistName').value;
    const playlistDescription = document.getElementById('playlistDescription').value;
    const username = getQueryParam('username');
    if (playlistName.trim() !== '') {
        const randomID = "playlist-" + generateRandomString(20);
        //console.log(localStorage.getItem(username));
        //localStorage.setItem(JSON.stringify({'playlistID': randomID, 'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []}));
        
        //let profile = JSON.parse(localStorage.getItem(username));
        //localStorage.setItem(username, JSON.stringify(profile));
        try {
            const response = await fetch('/api/users', {
              method: 'GET',
              headers: {'content-type': 'application/json'},
            });
      
            let users = await response.json();
            console.log("All users:", users);     // testing
            
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
              body: JSON.stringify({'playlistID': randomID, 'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []}),
            });
      
            let playlists = await response.json();
            localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch (e) {
            console.log(e);
            console.log("Error when updating playlists (adding new) from Node.")
        }

        broadcastEvent(username, NewPlaylistEvent, playlistName);
        alert(`Playlist "${playlistName}" created!`);
    } else {
        alert('Invalid playlist name.');
    }
    hidePopup();
}

async function createAndReload() {
    console.log("Got here");        // testing
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
    //const profile = JSON.parse(localStorage.getItem(username));
    //const playlists = profile['playlists'];

    try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {'content-type': 'application/json'},
        });
        
        // Store what the service gave us as the high scores
        let users = await response.json();
        //let users = users_text.json();

        console.log("users", users);     // testing
        //users = users.json();
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
        let index = 0;
        userPlaylists.forEach(async (playlistID) => {
            console.log("Displaying playlist:", playlistID);
            const response = await fetch('/api/playlists', {
                method: 'GET',
                headers: {'content-type': 'application/json'},
            });
            const playlists = await response.json();
            localStorage.setItem('playlists', JSON.stringify(playlists));
            const playlist = playlists.filter((item) => item.playlistID === playlistID)[0]
            //const playlist = JSON.parse(localStorage.getItem(playlistID));

            const reply = await fetch("https://picsum.photos/300/200", {
                method: 'GET',
                headers: {'content-type': 'application/json'},
            });
            const imageData = reply;
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
      displayMsg('Playlist server', 'connected');
    };
    socket.onclose = (event) => {
      displayMsg(`${event.message} server`, 'disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === NewPlaylistEvent) {
        displayMsg(msg.from, `just made a new playlist called ${msg.value.playlistName}`);
      } else if (msg.type === SystemEvent) {
        displayMsg(msg.from, msg.value.playlistName);
      }
    };
  }

  function displayMsg(from, msg) {
    const chatText = document.getElementsByClassName('player-messages');
    chatText.innerHTML =
      `<div class="player-messages">${from} ${msg}</div>`;
    chatText.style.display = 'block';
    setTimeout(() => {
        errorMessageElement.style.display = 'none';
        errorMessageElement.innerText = ''; // Clear the message for the next attempt
    }, 3000); // Hide the message after 3 seconds
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }
