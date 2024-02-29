
// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const playlistName = getQueryParam('playlistName');

    // Update the content of an HTML element with the username
    document.getElementById('playlistName').innerText = playlistName;
});

