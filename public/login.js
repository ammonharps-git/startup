
async function login() {

    // Get the username and password that the user entered
    var username = document.getElementById("typeUsernameX").value;
    var password = document.getElementById("typePasswordX").value;

    // PLACEHOLDER
    // Set the local storage initial value
    // if (!localStorage.getItem('valid-credentials')) {
    //     localStorage.setItem('valid-credentials', JSON.stringify([]));
    // }
    // Retrieve valid credentials from local storage
    // let validCredentials = [];
    try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {'content-type': 'application/json'},
          body: 'Doesnt matter',
        });
  
        // Store what the service gave us as the high scores
        let users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
    // try {
    //     const storedCredentials = localStorage.getItem('valid-credentials');
    //     if (storedCredentials) {
    //         validCredentials = JSON.parse(storedCredentials);
    //     }
    // } catch (error) {
    //     console.error('Error parsing JSON from localStorage:', error);
    // }
    // console.log(validCredentials);

    // Check if the provided username and password match any valid credentials
        const isValidUser = validCredentials.some(user => user.username === username && user.password === password);

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
    } catch {
        console.log("Error when logging in from Node.")
    }
}

async function register() {
    // Get the username and password that the user entered
    var username = document.getElementById("typeUsernameX").value;
    var password = document.getElementById("typePasswordX").value;

    // Set the local storage initial value
    // if (!localStorage.getItem('valid-credentials')) {
    //     localStorage.setItem('valid-credentials', JSON.stringify([]));
    // }
    try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {'content-type': 'application/json'},
          body: 'Doesnt matter',
        });
  
        // Store what the service gave us as the high scores
        let users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));

        // Check if the provided username and password match any valid credentials
        const sameUsername = users.some(user => user.username === username);

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
            let user = {'username': username, 'password': password, 'playlists': []}
            users.push(user);
            //localStorage.setItem('valid-credentials', JSON.stringify(validCredentials));
            //localStorage.setItem(username, JSON.stringify({'name': username, 'playlists': []}));

            const response2 = await fetch('/api/updateUsers', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(user),
              });
        
              // Store what the service gave us as the high scores
              const users2 = await response2.json();
              localStorage.setItem('users', JSON.stringify(users2));

            //console.log("profile: " + localStorage.getItem(username));
            console.log("Registered and logged in as", username);
            // Redirect to 'my-playlists.html' since login is successful
            window.location.href = `my-playlists.html?username=${encodeURIComponent(username)}`;
        }
    } catch {
        console.log("Error when registering from Node.")
    }
}