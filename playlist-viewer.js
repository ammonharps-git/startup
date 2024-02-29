
// PLACEHOLDER for database values
let talkList = ['His Grace is Sufficient by Brad Wilcox', 'The Character of Christ by David A. Bednar', 'Think Celesital by Russel M. Nelson']

// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');

    // Update the content of an HTML element with the username
    document.getElementById('playlistName').innerText = playlistName;
});

function removeTalk(talkName) {
    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');

    // --------PLACEHOLDER--------- 
    // talkList = database values
    // --------END PLACEHOLDER-----

    // Check if the talkName is in the talkList
    const indexToRemove = talkList.indexOf(talkName);

    if (indexToRemove !== -1) {
        // Remove the talk if found
        talkList.splice(indexToRemove, 1);
        console.log(`${talkName} removed from ${playlistName}.`);
    } else {
        console.log(`${talkName} not found in ${playlistName}.`);
    }
}