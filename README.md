# startup

# Elevator Pitch

Everyone's listened to someone giving a speach. Maybe you were sitting in the far back. You could hear the crowd laugh, but you couldn't hear the joke. You turn to your neighbor: "What did they say?" Well, NO MORE! Talks (TM) is a new application designed to bring the speaker to you. With Talks (TM) you can save all of your favoirte talks by your favorite speakers. Then, you can share what you love by creating a collabrotive playlist of speaches with all your friends. Inspiration has never been easier.

# Key Features

- Search for speaches that are pulled from the internet.
- Persistently save playlists of speeches.
- Securely log in and view your saved playlists.
- Share playlists with other users and allow for real-time collaboration.

# Description of Technology

## HTML

Talks (TM) will use correct HTML structure for the application. Three HTML pages will be included: one for login, one for selecting a playlist, and and one for viewing, editing,and sharing a playlist.

## CSS

Talks (TM) will use appropriate application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

## JavaScript

Talks (TM) will use Javascript to provide login, talk/playlist displays, playlist management (editing, adding, removing, reordering), and backend endpoint calls.

## Authentication and other services

Authentication will be used to create user accounts and log users in. It will also be used when sharing playlists so that only users that have access to a playlist can view and contribute to it.

## Database data

A database will be necessary to persistently store user login information, authtokens, playlists, and other applicaiton information.

## WebSocket data

WebSockets will be used when viewing, adding to, removing from, or otherwise making changes to collaborative playlists with other users in real time. If a change is made to a collaborative playlist, that change is reflected in real time to all other users that the playlist is shared with.

# React

Talks (TM) will be ported to use the React web framework.

## CSS Deliverable 

[x] - done - Prerequisite: Simon CSS deployed to your production environment
[x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
[x] - done - Prerequisite: Notes in your startup Git repository README.md file
[x] - done - 30% Header, footer, and main content body. Used flex to layout sections.
[x] - done - 20% Navigation elements. Links highlight on hover.
[x] - done - 10% Responsive to window resizing. Looks great on iPad, desktop, and iPhone.
[x] - done - 20% Application elements. Buttons are using bootstrap
[x] - done - 10% Application text content. Text is displayed using the Merriday font
[x] - done - 10% Application images. I added curved edges around my profile photo.

## JavaScript Deliverable

[x] - done - Prerequisite: Simon JavaScript deployed to your production environment
[x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
[x] - done - Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. 
[x] - done - Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
[x] - done - Significant use of JavaScript to create a viable working application
[x] - done - 20% JavaScript support for future login.
[x] - done - 20% JavaScript support for future database data.
[x] - done - 20% JavaScript support for future WebSocket.
[x] - done - 40% JavaScript support for your application's interaction logic.

## Services Deliverable

[x] - done - Prerequisite: Simon Service deployed to your production environment
[x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
[x] - done - Prerequisite: Notes in your startup Git repository README.md file 
[x] - done - Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
[x] - done - Backend web service support and interaction
[x] - done - 40% - Create an HTTP service using Node.js and Express
[x] - done - 10% - Frontend served up using Express static middleware
[x] - done - 10% - Your frontend calls third party service endpoints    (random image generator)
[x] - done - 20% - Your backend provides service endpoints
[x] - done - 20% - Your frontend calls your service endpoints

# Login Database Deliverable

[x] - done - Prerequisite: Simon Login deployed to your production environment with your dbConfig.json credentials
[x] - done - Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
[x] - done - Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. 
[x] - done - Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
[x] - done - Application authentication and authorization
[x] - done - 20% - Supports new user registration
[x] - done - 20% - Supports existing user authentication
[x] - done - 20% - Stores application data in MongoDB
[x] - done - 20% - Stores and retrieves credentials in MongoDB
[x] - done - 20% - Restricts application functionality based upon authentication (required to update users in database)


# Application sketches

![Login page](./talks-login.png)
![Playlist screen](./talks-playlist-screen.png)
