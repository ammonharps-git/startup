

function viewPlaylist(mode) {
    const username = getQueryParam('username');
    window.location.href = `playlist-viewer.html?username=${encodeURIComponent(username)}&mode=${encodeURIComponent(mode)}`;
}

// Function to extract query parameters from the URL
function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function viewPlaylist(mode) {
    const username = getQueryParam('username');
    window.location.href = `playlist-viewer.html?username=${encodeURIComponent(username)}&mode=${encodeURIComponent(mode)}`;
}