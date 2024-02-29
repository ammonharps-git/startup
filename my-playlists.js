
// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const username = getQueryParam('username');

    // Update the content of an HTML element with the username
    document.getElementById('bannerUsername').innerText = username;
});

function showPopup() {
    console.log("Showing popup...");
    const darkScreen = document.getElementById('dark-screen');
    darkScreen.style.display = 'block';
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function createPlaylist() {
    let playlistName = document.getElementById('playlistName').value;
    if (playlistName.trim() !== '') {
        const randomID = "playlist-" + generateRandomString(20);
        const username = getQueryParam('username')
        console.log(localStorage.getItem(username));
        localStorage.setItem(randomID, JSON.stringify([]))
        let profile = JSON.parse(localStorage.getItem(username))
        profile['playlists'].push(randomID);
        localStorage.setItem(username, JSON.stringify(profile));
        alert(`Playlist "${playlistName}" created!`);
    } else {
        alert('Please enter a valid playlist name.');
    }
    hidePopup();
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

    // Iterate over the talkList and create/display talk elements
    talkList.forEach(talk => {
        const talkContainer = document.createElement('div');
        talkContainer.className = 'talk-container';

        const talkTextContainer = document.createElement('div');
        talkTextContainer.className = 'talk-text-container';

        const listenButton = document.createElement('a');
        listenButton.className = 'btn btn-primary';
        listenButton.href = talk.listenLink;
        listenButton.target = '_blank';
        listenButton.textContent = 'Listen';

        const talkName = document.createElement('h5');
        talkName.className = 'talk-name';
        talkName.textContent = talk.name;

        talkTextContainer.appendChild(listenButton);
        talkTextContainer.appendChild(talkName);

        talkContainer.appendChild(talkTextContainer);

        if (mode === 'edit') {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
    
            const addButton = createButton('Add to other playlist', () => addTalk(talk.name));
            const removeButton = createButton('Remove', () => removeTalk(talk.name));
    
            buttonsContainer.appendChild(addButton);
            buttonsContainer.appendChild(removeButton);
    
            talkContainer.appendChild(buttonsContainer);
        }
        talkListContainer.appendChild(talkContainer);
    });
}