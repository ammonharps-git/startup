


// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');
    const mode = getQueryParam('mode');

    // PLACEHOLDER for database values (delete)
    let talkList = [
        { name: 'His Grace is Sufficient by Brad Wilcox', listenLink: 'https://speeches.byu.edu/talks/brad-wilcox/his-grace-is-sufficient/' }, 
        { name: 'The Character of Christ by David A. Bednar', listenLink: "https://www2.byui.edu/presentations/transcripts/religionsymposium/2003_01_25_bednar.htm"},
        { name: 'Think Celesital by Russel M. Nelson', listenLink: 'https://www.churchofjesuschrist.org/study/general-conference/2023/10/51nelson?lang=eng'}
    ];
    localStorage.setItem("all-talks", JSON.stringify(talkList));
    talkList.forEach((talk) => {
        localStorage.setItem("talk-" + talk['name'], JSON.stringify(talk));
    })

    displayTalks();
});

function addTalk(talkName, selected) {
    const username = getQueryParam('username');

    selected.forEach((playlistID) => {
        const talk = JSON.parse(localStorage.getItem("talk-" + talkName));
        let playlist = JSON.parse(localStorage.getItem(playlistID));
        let playlistTalks = playlist['talks'];
        playlistTalks.push(talk);
        localStorage.setItem(playlistID, JSON.stringify(playlist));
        console.log(talkName, "added to ", playlistID.toString());
    })
    alert(`Talk added to playlist(s)!`);
    hidePopup();
}

function showPopup(talkName, selected) {
    const darkScreen = document.getElementById('dark-screen');
    darkScreen.style.display = 'block';
    const username = getQueryParam('username');

    // Make the popup
    const popup = document.getElementById('popup');

    const profile = JSON.parse(localStorage.getItem(username))
    const playlists = profile['playlists'];

    if (playlists.length === 0) {
        alert("You don't have any playlists! Please make a playlist and then try again.");
        return;
    }

    let index = 0
    let entries = [];
    playlists.forEach((playlistID) => {
        const playlist = JSON.parse(localStorage.getItem(playlistID));

        let playlistButton = document.getElementById("playlist-option-" + index.toString());
        if (!playlistButton) {
            playlistButton = document.createElement('button');
            playlistButton.id = "playlist-option-" + index.toString();
        }
        if (playlistButton.hasAttribute('active')) {
            playlistButton.className = 'btn btn-success';
        } else {
            playlistButton.className = 'btn btn-dark';
        }
        playlistButton.textContent = playlist['playlistName'];
        
        playlistButton.onclick = () => {
            playlistButton.toggleAttribute('active');
            if (playlistButton.hasAttribute('active')) {
                playlistButton.classList.add('active');
            } else {
                playlistButton.classList.remove('active');
            }
            if (selected.includes(playlistID)) {
                console.log(playlist['playlistName'], "unselected");
                selected.splice(selected.indexOf(playlistID), 1);
            }
            else {
                selected.push(playlistID);
                console.log(playlist['playlistName'], "selected");
            }
            showPopup(talkName, selected);
        };
        const lineBreak = document.createElement('br');
        entries.push(playlistButton);
        entries.push(lineBreak);
        index = index + 1;
    })

    // Create a line break
    const lineBreak = document.createElement('br');

    // Create the "Add" and "Cancel" buttons
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.className = 'btn btn-primary';
    addButton.onclick = () => addTalk(talkName, selected);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'btn';
    cancelButton.onclick = cancel;

    // Append the inputs div and buttons to the popup
    popup.innerHTML = '';
    entries.forEach((entry) => {
        popup.appendChild(entry);
    })
    popup.appendChild(lineBreak);
    popup.appendChild(addButton);
    popup.appendChild(cancelButton);

    // Display the popup
    popup.style.display = 'block';
}

function cancel() {
    hidePopup();
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    popup.innerHTML = '';
    const darkScreen = document.getElementById('dark-screen');
    darkScreen.style.display = 'none';
    displayTalks();
}

// Function to dynamically create and display talk elements
function displayTalks() {
    const talkListContainer = document.getElementById('talkListContainer');

    // Clear the existing content in the container
    talkListContainer.innerHTML = '';

    // Iterate over the talkList and create/display talk elements
    const talkList = JSON.parse(localStorage.getItem("all-talks"));
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

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        const addButton = createButton('Add to playlist', () => showPopup(talk.name, []));
        buttonsContainer.appendChild(addButton);
        talkContainer.appendChild(buttonsContainer);

        talkListContainer.appendChild(talkContainer);
    });
}

// Function to create a button
function createButton(label, onclick) {
    const button = document.createElement('a');
    button.className = 'btn btn-outline-light';
    button.onclick = onclick;
    button.textContent = label;
    button.style.cursor = 'pointer';
    return button;
}