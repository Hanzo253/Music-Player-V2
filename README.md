# Music-Player-V2

Another version of my music player web application with a drag and drop feature and a song list feature. I have developed this app with HTML, CSS/SCSS, JavaScript, and jQuery.

Project Specifications:

- Created progress bar that can be clicked on to go to a specific time of the song.
- Audio files can be uploaded and are added to a song list to help the user keep track of what songs are uploaded in the music player
- User can switch songs with next and previous button
- Play and Pause Button
- File upload with button and drag and drop feature
- Name, duration, and current time of the song being played are displayed
- Multiple songs can now be uploaded instead of just one song

Link to check it out: https://hanzo253.github.io/Music-Player-V2/

## How I worked on this project

- I worked with tasks on a ClickUp board: [Screenshot of tasks](https://lensdump.com/a/giJmk)
- I use Visual Studio Code as the IDE.

## How to navigate this project

- Music Player V2 logic: [JavaScript Code](https://github.com/Hanzo253/Music-Player-V2/blob/main/main.js)
- Music Player V2 Styles and Design: [CSS/SCSS](https://github.com/Hanzo253/Music-Player-V2/blob/main/styles.scss)
- Music Player V2 HTML Markup: [HTML Markup](https://github.com/Hanzo253/Music-Player-V2/blob/main/index.html)

## Why I built the project this way

- I decided to use some jQuery because there was some syntax that made it easier to implement the logic. For example, $("#src").attr("src", URL.createObjectURL(songs[fileIndex])); allowed me to change the src of the audio easily with less syntax.
- I used SCSS since it allows me to use CSS in functions or variables which helps in having to typing the same CSS syntax again. It also allows some styles to be implmented easier.
- I am focused on improving my HTML, CSS, and vanilla JavaScript, so I did not want to use bootstrap or too much jQuery this time.
- I wanted to make a music player that gives the user a choice to upload an audio file with a button or simply drag that audio file to drag and drop area.
- This music player was meant to let the user make his own playlist of songs since each person has their own taste of music, so it helps them enjoy using this app because they can play their own songs.

## Recent Changes

- Music Player V2 is now responsive with mobile and tablet devices.
