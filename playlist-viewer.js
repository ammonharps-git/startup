
// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const playlistID = getQueryParam('playlistID');
    const mode = getQueryParam('mode');

    // Update the content of an HTML element with the username
    console.log("PlaylistID:", playlistID)
    const playlistName = JSON.parse(localStorage.getItem(playlistID))['playlistName'];
    document.getElementById('playlistName').innerText = playlistName;
    var editIcon = document.getElementById('edit-icon');
    if (mode === 'view') {
        editIcon.src = "edit-icon.png"
        editIcon.onclick = function() {
            // Call the viewPlaylist function with the playlistName and 'edit' as parameters
            viewPlaylist(playlistID, 'edit');
        };
    }
    else {
        editIcon.src = "checkmark.png"
        editIcon.onclick = function() {
            // Call the viewPlaylist function with the playlistName and 'view' as parameters
            viewPlaylist(playlistID, 'view');
        };
    }
    displayTalks(mode);
    
    
});

function removeTalk(talkName) {
    // Get info from URL and get playlist from database
    const playlistID = getQueryParam('playlistID');
    const mode = getQueryParam('mode');

    // Filter the playlist
    let playlist = JSON.parse(localStorage.getItem(playlistID))
    console.log(playlist);
    const indexToRemove = playlist['talks'].findIndex(talk => talk['talkName'] === talkName);
    if (indexToRemove !== -1) {
        playlist['talks'].splice(indexToRemove, 1);
    } else {
        console.error(`Talk with name "${talkName}" not found in the playlist.`);
    }
    console.log(playlist);
    localStorage.setItem(playlistID, JSON.stringify(playlist));
    console.log("Removed", talkName, "from", playlist['playlistName']);

    // Update screen
    displayTalks(mode);
}

// --------------PLACEHOLDER ------------
// There is no way to implement this without persistent data from the database
// TODO add the talk link (when database implemented)
function addTalk(talkName) {
    // Check if the talkName is in the talkList
    
    console.log('Attempted to add a talk to another playlist.')
    
    const playlistName = document.getElementById('playlistName').value;
    const playlistDescription = document.getElementById('playlistDescription').value;
    const username = getQueryParam('username');

    alert(`Talk added to playlist(s)!`);
    hidePopup();
}
// ------------END PLACEHOLDER -----------

// Function to dynamically create and display talk elements
function displayTalks(mode) {
    const talkListContainer = document.getElementById('talkListContainer');

    // Clear the existing content in the container
    talkListContainer.innerHTML = '';

    // Iterate over the talkList and create/display talk elements
    const playlistID = getQueryParam('playlistID');
    const playlist = JSON.parse(localStorage.getItem(playlistID))
    const talkList = playlist['talks'];
    if (talkList.length === 0) {

    }
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
        talkName.textContent = talk.talkName;

        talkTextContainer.appendChild(listenButton);
        talkTextContainer.appendChild(talkName);

        talkContainer.appendChild(talkTextContainer);

        if (mode === 'edit') {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container';
    
            //const addButton = createButton('Add to other playlist', () => addTalk(talk.name));
            const removeButton = createButton('Remove', () => removeTalk(talk.talkName));
    
            //buttonsContainer.appendChild(addButton);
            buttonsContainer.appendChild(removeButton);
    
            talkContainer.appendChild(buttonsContainer);
        }
        talkListContainer.appendChild(talkContainer);
    });
}

// Function to create a button
function createButton(label, onclick) {
    const button = document.createElement('a');
    button.className = 'btn btn-outline-light';
    button.onclick = onclick;
    button.textContent = label;
    button.style.marginLeft = '1rem';
    return button;
}