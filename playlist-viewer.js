
// PLACEHOLDER for database values
let talkList = [
    { name: 'His Grace is Sufficient by Brad Wilcox', listenLink: 'https://speeches.byu.edu/talks/brad-wilcox/his-grace-is-sufficient/' }, 
    { name: 'The Character of Christ by David A. Bednar', listenLink: "https://www2.byui.edu/presentations/transcripts/religionsymposium/2003_01_25_bednar.htm"},
    { name: 'Think Celesital by Russel M. Nelson', listenLink: 'https://www.churchofjesuschrist.org/study/general-conference/2023/10/51nelson?lang=eng'}
];

// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');
    const mode = getQueryParam('mode');

    // Update the content of an HTML element with the username
    document.getElementById('playlistName').innerText = playlistName;
    var editIcon = document.getElementById('edit-icon');
    if (mode === 'view') {
        editIcon.src = "edit-icon.png"
        editIcon.onclick = function() {
            // Call the viewPlaylist function with the playlistName and 'edit' as parameters
            viewPlaylist(playlistName, 'edit');
        };
    }
    else {
        editIcon.src = "checkmark.png"
        editIcon.onclick = function() {
            // Call the viewPlaylist function with the playlistName and 'view' as parameters
            viewPlaylist(playlistName, 'view');
        };
    }
    displayTalks(mode);
    
    
});

function removeTalk(talkName) {
    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');
    const mode = getQueryParam('mode');

    // --------PLACEHOLDER--------- 
    // talkList = database values
    // --------END PLACEHOLDER-----

    // Check if the talkName is in the talkList
    const indexToRemove = talkList.findIndex(talk => talk.name === talkName);

    if (indexToRemove !== -1) {
        // Remove the talk if found
        talkList.splice(indexToRemove, 1);
        console.log(`${talkName} removed from ${playlistName}.`);
    } else {
        console.log(`${talkName} not found in ${playlistName}.`);
    }
    displayTalks(mode);
}

// --------------PLACEHOLDER ------------
// There is no way to implement this without persistent data from the database
// TODO add the talk link (when database implemented)
function addTalk(talkName) {
    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');
    const mode = getQueryParam('mode');

    // Check if the talkName is in the talkList
    
    console.log('Attempted to add a talk to another playlist.')
    
    displayTalks(mode);
}
// ------------END PLACEHOLDER -----------


// Function to dynamically create and display talk elements
function displayTalks(mode) {
    const talkListContainer = document.getElementById('talkListContainer');

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

// Function to create a button
function createButton(label, onclick) {
    const button = document.createElement('a');
    button.className = 'btn btn-outline-light';
    button.onclick = onclick;
    button.textContent = label;
    return button;
}