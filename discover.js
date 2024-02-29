
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

    displayTalks();
});

// --------------PLACEHOLDER ------------
// There is no way to implement this without persistent data from the database
// TODO add the talk link (when database implemented)
function addTalk(talkName) {
    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');
    const mode = getQueryParam('mode');

    // Check if the talkName is in the talkList
    
    console.log('Attempted to add a talk to another playlist.')
    
    displayTalks();
}
// ------------END PLACEHOLDER -----------


// Function to dynamically create and display talk elements
function displayTalks() {
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

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        const addButton = createButton('Add to playlist', () => addTalk(talk.name));
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
    return button;
}