

function viewPlaylist(playlistID, mode) {
    const username = getQueryParam('username');
    window.location.href = `playlist-viewer.html?username=${encodeURIComponent(username)}&playlistID=${encodeURIComponent(playlistID)}&mode=${encodeURIComponent(mode)}`;
}

function viewMyPlaylists() {
    const username = getQueryParam('username');
    window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
}

function viewDiscover() {
    const username = getQueryParam('username');
    window.location.href = `discover.html?username=${encodeURIComponent(username)}`;
}

// Function to extract query parameters from the URL
function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}
