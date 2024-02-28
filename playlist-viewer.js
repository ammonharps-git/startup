
// Display the username at the top of welcome banner
document.addEventListener('DOMContentLoaded', function () {

    // Retrieve the username from the URL
    const username = getQueryParam('username');

    // Update the content of an HTML element with the username
    document.getElementById('bannerUsername').innerText = username;
});

// Function to extract query parameters from the URL
function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}