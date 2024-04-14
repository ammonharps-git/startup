
// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const username = getQueryParam('username');

    // Update the content of an HTML element with the username
    document.getElementById('bannerUsername').innerText = username;

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
        const username = getQueryParam('username');
        //console.log(localStorage.getItem(username));
        //localStorage.setItem(JSON.stringify({'playlistID': randomID, 'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []}));
        
        //let profile = JSON.parse(localStorage.getItem(username));
        //localStorage.setItem(username, JSON.stringify(profile));
        try {
            const response = await fetch('/api/users', {
              method: 'GET',
              headers: {'content-type': 'application/json'},
              body: 'Doesnt matter',
            });
      
            // Store what the service gave us as the high scores
            const users = await response.json();
            localStorage.setItem('users', JSON.stringify(users));
            let profile = users.filter((item) => item.username === username)[0];
            profile['playlists'].push(randomID);

            const response2 = await fetch('/api/updateUsers', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(profile),
              });
        
              // Store what the service gave us as the high scores
              const users2 = await response2.json();
              localStorage.setItem('users', JSON.stringify(users2));

        } catch {
            console.log("Error when getting users (while adding new playlist) from Node.")
        }

        try {
            const response = await fetch('/api/updatePlaylists', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({'playlistID': randomID, 'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []}),
            });
      
            // Store what the service gave us as the high scores
            const playlists = await response.json();
            localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch {
            console.log("Error when updating playlists (adding new) from Node.")
        }

        alert(`Playlist "${playlistName}" created!`);
    } else {
        alert('Please enter a valid playlist name.');
    }
    hidePopup();
}

function createAndReload() {
    createPlaylist();
    const username = getQueryParam('username');
    window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
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
          body: 'Doesnt matter',
        });
  
        // Store what the service gave us as the high scores
        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
        const playlists = users.filter((item) => item.username === username)[0]['playlists'];
        
        const addPlaylistCard = document.getElementById("new-playlist-card");
        if (playlists.length === 0) {
            addPlaylistCard.style.borderRadius = '5rem';
            console.log(addPlaylistCard.style.borderRadius)
        }
        else {
            addPlaylistCard.style.borderRadius = 'none';
        }

        // Iterate over the talkList and create/display talk elements
        let index = 0;
        playlists.forEach(async (playlistID) => {
            console.log("Displaying playlist:", playlistID);
            const response = await fetch('/api/playlists', {
                method: 'GET',
                headers: {'content-type': 'application/json'},
                body: 'Does this matter?',
            });
            const playlists = await response.json();
            localStorage.setItem('playlists', JSON.stringify(playlists));
            const playlist = playlists.filter((item) => item.playlistID === playlistID)[0]
            //const playlist = JSON.parse(localStorage.getItem(playlistID));
            const card = document.createElement('span');
            card.id = `card${index + 1}`;
            card.className = 'card';

            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = `https://picsum.photos/300/` + (200 + index).toString();
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
    } catch {
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