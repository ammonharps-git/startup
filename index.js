
function login() {
    // ----------PLACEHOLDER-- ------- 
    // Hardcoded values in place of database
    const validCredentials = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' },
        // Add more valid credentials as needed
    ];
    // --------END PLACEHOLDER---------

    // Get the username and password that the user entered
    var username = document.getElementById("typeUsernameX").value;
    var password = document.getElementById("typePasswordX").value;

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

