
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

function createPlaylist() {
    const playlistName = document.getElementById('playlistName').value;
    const playlistDescription = document.getElementById('playlistDescription').value;
    const username = getQueryParam('username');
    if (playlistName.trim() !== '') {
        const randomID = "playlist-" + generateRandomString(20);
        const username = getQueryParam('username');
        console.log(localStorage.getItem(username));
        localStorage.setItem(randomID, JSON.stringify({'playlistOwners': [username], 'playlistName': playlistName, 'playlistDescription': playlistDescription, 'talks': []}));
        let profile = JSON.parse(localStorage.getItem(username));
        profile['playlists'].push(randomID);
        localStorage.setItem(username, JSON.stringify(profile));
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

function displayPlaylists() {

    const talkListContainer = document.getElementById('listPlaylistContainer');

    // Clear the existing content in the container
    talkListContainer.innerHTML = '';

    const username = getQueryParam('username');
    const profile = JSON.parse(localStorage.getItem(username));
    const playlists = profile['playlists'];

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
    playlists.forEach((playlistID) => {
        console.log("Displaying playlist:", playlistID);
        const playlist = JSON.parse(localStorage.getItem(playlistID));
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