
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
        const isValidUser = users.some(user => user.username === username && user.password === password);

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
    } catch (e) {
        console.log(e);
        console.log("Error when logging in from Node.")
    }
}

async function register() {
    // Get the username and password that the user entered
    var typed_username = document.getElementById("typeUsernameX").value;
    var typed_password = document.getElementById("typePasswordX").value;

    // Set the local storage initial value
    // if (!localStorage.getItem('valid-credentials')) {
    //     localStorage.setItem('valid-credentials', JSON.stringify([]));
    // }
    try {
        // const response = await fetch('/api/users', {
        //   method: 'GET',
        //   headers: {'content-type': 'application/json'},
        // });
  
        // // Store what the service gave us as the high scores
        // let users = await response.json();
        // localStorage.setItem('users', JSON.stringify(users));

        // // Check if the provided username and password match any valid credentials
        // console.log(users);     // testing
        // const sameUsername = users.some(user => user.username === username);

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
            // let user = {'username': username, 'password': password, 'playlists': []}
            // users.push(user);
            // //localStorage.setItem('valid-credentials', JSON.stringify(validCredentials));
            // //localStorage.setItem(username, JSON.stringify({'name': username, 'playlists': []}));
            // console.log(JSON.stringify(user));

            // const response2 = await fetch('/api/updateUsers', {
            //     method: 'POST',
            //     headers: {'content-type': 'application/json'},
            //     body: JSON.stringify(user),
            //   });
        
            //   const users2 = await response2.json();
            //   localStorage.setItem('users', JSON.stringify(users2));
            //   console.log(users2);      // testing

            //console.log("profile: " + localStorage.getItem(username));
            console.log("Registered and logged in as", typed_username);
            // Redirect to 'my-playlists.html' since login is successful
            window.location.href = `my-playlists.html?username=${encodeURIComponent(typed_username)}`;
        }
    } catch (e) {
        console.log(e);
        console.log("Error when registering from Node.")
    }
}