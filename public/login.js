
async function login() {
    // Get the username and password that the user entered
    var typed_username = document.getElementById("typeUsernameX").value;
    var typed_password = document.getElementById("typePasswordX").value;

    try {
        const response = await fetch('api/auth/login', {
            method: 'post',
            body: JSON.stringify({ username: typed_username, password: typed_password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        
        if (!response.ok) {
            // Clear username and password
            document.getElementById("typeUsernameX").value = '';
            document.getElementById("typePasswordX").value = '';

            // Display error message and hide it after 3 seconds
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.innerText = 'Incorrect username and/or password Please try again.';
            errorMessageElement.style.display = 'block';

            setTimeout(() => {
                errorMessageElement.style.display = 'none';
                errorMessageElement.innerText = ''; // Clear the message for the next attempt
            }, 3000); // Hide the message after 3 seconds
        } else {
            console.log("Logged in as", typed_username);
            window.location.href = `my-playlists.html?username=${encodeURIComponent(typed_username)}`;
        }
    } catch (e) {
        console.log(e);
        console.log("Error when loggin in from Node.")
    }
}

async function register() {
    // Get the username and password that the user entered
    var typed_username = document.getElementById("typeUsernameX").value;
    var typed_password = document.getElementById("typePasswordX").value;

    try {
        const response = await fetch('api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: typed_username, password: typed_password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        
        if (!response.ok) {
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
            }, 3000); // Hide the message after 3 seconds
        } else {
            console.log("Registered and logged in as", typed_username);
            window.location.href = `my-playlists.html?username=${encodeURIComponent(typed_username)}`;
        }
    } catch (e) {
        console.log(e);
        console.log("Error when registering from Node.")
    }
}