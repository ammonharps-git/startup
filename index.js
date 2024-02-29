
function login() {

    // Get the username and password that the user entered
    var username = document.getElementById("typeUsernameX").value;
    var password = document.getElementById("typePasswordX").value;

    // PLACEHOLDER
    // Set the local storage initial value
    if (!localStorage.getItem('valid-credentials')) {
        localStorage.setItem('valid-credentials', JSON.stringify([]));
    }
    // Retrieve valid credentials from local storage
    let validCredentials = [];
    try {
        const storedCredentials = localStorage.getItem('valid-credentials');
        if (storedCredentials) {
            validCredentials = JSON.parse(storedCredentials);
        }
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }
    console.log(validCredentials);

    // Check if the provided username and password match any valid credentials
    const isValidUser = validCredentials.some(cred => cred.username === username && cred.password === password);

    if (isValidUser) {
        // Redirect to 'my-playlists.html' since login is successful
        window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
    } else {
        // Clear username and password
        document.getElementById("typeUsernameX").value = '';
        document.getElementById("typePasswordX").value = '';

        // Display error message and hide it after 3 seconds
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.innerText = 'Invalid username or password. Please try again.';
        errorMessageElement.style.display = 'block';

        setTimeout(() => {
            errorMessageElement.style.display = 'none';
            errorMessageElement.innerText = ''; // Clear the message for the next attempt
        }, 3000); // Hide the message after 3 seconds
    }
}

function register() {
    // Get the username and password that the user entered
    var username = document.getElementById("typeUsernameX").value;
    var password = document.getElementById("typePasswordX").value;

    // PLACEHOLDER
    // Set the local storage initial value
    if (!localStorage.getItem('valid-credentials')) {
        localStorage.setItem('valid-credentials', JSON.stringify([]));
    }
    // Retrieve valid credentials from local storage
    let validCredentials = [];
    try {
        const storedCredentials = localStorage.getItem('valid-credentials');
        if (storedCredentials) {
            validCredentials = JSON.parse(storedCredentials);
        }
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
    }
    console.log(validCredentials);

    // Check if the provided username and password match any valid credentials
    const sameUsername = validCredentials.some(cred => cred.username === username);

    if (sameUsername) {
        // Clear username and password
        document.getElementById("typeUsernameX").value = '';
        document.getElementById("typePasswordX").value = '';

        // Display error message and hide it after 3 seconds
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.innerText = 'Sorry, that username is already taken. Please try again.';
        errorMessageElement.style.display = 'block';

        setTimeout(() => {
            errorMessageElement.style.display = 'none';
            errorMessageElement.innerText = ''; // Clear the message for the next attempt
        }, 3000); // Hide the message after 3 secondsc
    } else {
        validCredentials.push({'username': username, 'password': password});
        localStorage.setItem('valid-credentials', JSON.stringify(validCredentials));
        localStorage.setItem(username, JSON.stringify({'name': username, 'playlists': []}));
        console.log("Registered and logged in as", username);
        // Redirect to 'my-playlists.html' since login is successful
        window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
    }
}