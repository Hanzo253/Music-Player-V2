const preloader = document.querySelector(".preloader");
const startButton = document.querySelector(".start-btn");
const progressBar = document.querySelector(".progress-bar");
const songTitle = document.querySelector(".song-title");
const songList = document.querySelector(".song-list");
const songDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const dragDropInput = document.querySelector("#drag-drop");
const dragDropText = document.querySelector("#drag-text");

let fileIndex = 0;

$(".music-player-container").hide();
$(".song-list").hide();
$(".song-duration").hide();
$("#song-list-heading").hide();

// loads music player with a fade effect
function fadeEffect() {
  // $("img").fadeIn();
  setInterval(() => {
    // if we don't set opacity 1 in CSS, then
    // it will be equaled to "" -- that's why
    // we check it, and if so, set opacity to 1
    if (!preloader.style.opacity) {
      preloader.style.opacity = 1;
      preloader.classList.add("loaded");
      $(".start-btn").hide();
      $(".music-player-container").fadeIn();
      $("#song-list-heading").fadeIn();
      $(".song-list").fadeIn();
    }
    if (preloader.style.opacity > 0) {
      preloader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
}

startButton.addEventListener("click", fadeEffect);

var audio = document.getElementById("music");
var input = document.getElementById("the-file");
var progress = document.querySelector(".progress");
var songs = [];
var songsInSongList = "";
var songName;
var files = "";
var clearSongListBtn = document.querySelector(".clear-song-list");

// receives the selected file and plays it
function handleFileSelect(event) {
  // console.log("event", event.target.files[0].name);
  files = event.target.files; // FileList object
  if (event.target.files[0].type.match("image/*")) {
    alert("One or more of these files are not audio. Please try again!");
  } else {
    songs.push.apply(songs, files);
    console.log(songs);
    fileIndex = songs.length - 1;
    console.log("File index is " + fileIndex);
    $("#src").attr("src", URL.createObjectURL(songs[fileIndex]));
    audio.load();
    progress.style.width = `0%`;
    songName = songs[fileIndex].name;
    songTitle.innerHTML = songName;
    // adds song to list and displays it
    for (var i = 0; i < event.target.files.length; i++) {
      songsInSongList += "<li>" + event.target.files[i].name + "</li>";
    }
    songList.innerHTML = "<ul>" + songsInSongList + "</ul>";
  }
}

// updates the progress bar with the current audio time and displays it
function updateProgressBar(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  songDuration.innerHTML = getTime(currentTime) + " / " + getTime(duration);
}

// allows the user to click on the progress bar to get to a certain part of a song
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// get the current time and duration of the song in 0:00 format
function getTime(time) {
  var minute = Math.floor(time / 60);
  var second = Math.floor(time % 60);
  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  return minute + ":" + second;
}

// random number generator with no repeated numbers
// function getRandomInt(max) {
//   var random;
//   var min = 0;
//   // return Math.floor(Math.random() * max);
//   do {
//     random = Math.floor(Math.random() * (max - min)) + min;
//   } while (random === getRandomInt.last);
//   getRandomInt.last = random;
//   return random;
// }

// button that plays the next song in the list
function nextSong() {
  if (songs.length === 0) {
    alert("No audio files have been uploaded!");
  } else {
    fileIndex++;

    if (fileIndex > songs.length - 1) {
      fileIndex = 0;
    }

    songName = songs[fileIndex].name;

    console.log("fileIndex: " + fileIndex);
    console.log("Length: " + songs.length);

    $(".song-title").html(songName);
    $(".play").hide();
    $(".pause").show();
    progress.style.width = `0%`;
    $("#src").attr("src", URL.createObjectURL(songs[fileIndex]));
    audio.load();
    audio.play();
  }
}

// button that plays the previous song in the list
function previousSong() {
  if (songs.length === 0) {
    alert("No audio files have been uploaded!");
  } else {
    fileIndex--;

    if (fileIndex < 0) {
      fileIndex = songs.length - 1;
    }

    songName = songs[fileIndex].name;

    $(".song-title").html(songName);
    $(".play").hide();
    $(".pause").show();
    progress.style.width = `0%`;
    $("#src").attr("src", URL.createObjectURL(songs[fileIndex]));
    audio.load();
    audio.play();
  }
}

// button clears all songs in the list
function clearSongList() {
  if (songs.length === 0) {
    alert("No audio files have been uploaded!");
  } else {
    songs = [];
    console.log(songs);
    songList.innerHTML = "";
    songTitle.innerHTML = "";
    songsInSongList = "";
    $(".song-duration").hide();
    audio.pause();
    $(".play").show();
    $(".pause").hide();
    $("#src").attr("src", "");
    audio.load();
    progress.style.width = `0%`;
  }
}

$(document).ready(function () {
  $(".pause").hide();
  $("#the-file").on("change", handleFileSelect);

  // play button
  $(".play").click(function () {
    if (songs.length === 0) {
      alert("No audio files have been uploaded!");
    } else {
      audio.play();
      $(".pause").show();
      $(this).hide();
      $(".song-duration").show();
    }
  });

  // pause button
  $(".pause").click(function () {
    audio.pause();
    $(".play").show();
    $(this).hide();
  });

  // pauses audio when user is trying to change songs
  $("#upload").click(function () {
    audio.pause();
    $(".play").show();
    $(".pause").hide();
  });

  audio.addEventListener("timeupdate", updateProgressBar, false);
  progressBar.addEventListener("click", setProgressBar);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", previousSong);
  audio.addEventListener("ended", nextSong);
  clearSongListBtn.addEventListener("click", clearSongList);
  // songList.addEventListener("click", (e) => {
  //   var element = e.target;
  //   var source = document.getElementById("src");
  //   source.src = element.getAttribute("data-value");
  //   audio.load();
  //   audio.play();
  // });
});

// binds the event on to the styled button to trigger the file button
document.querySelector("#upload").addEventListener("click", function () {
  var clickEvent = document.createEvent("MouseEvents");

  clickEvent.initMouseEvent(
    "click",
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  document.querySelector("#the-file").dispatchEvent(clickEvent);
});

// drop function for drag and drop feature
function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  // check if the input in the drag and drop is a file and audio
  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // if drag and drop input is file and input, it will add the input to the song list
      if (
        ev.dataTransfer.items[i].kind === "file" &&
        ev.dataTransfer.items[i].type.match("audio/*")
      ) {
        dragDropInput.files = ev.dataTransfer.files;
        console.log(dragDropInput.files);
        songs.push.apply(songs, dragDropInput.files);
        console.log(songs);
        fileIndex = songs.length - 1;
        $("#src").attr("src", URL.createObjectURL(songs[fileIndex]));
        audio.load();
        songName = songs[fileIndex].name;
        songTitle.innerHTML = songName;
        progress.style.width = `0%`;
        $(".song-duration").hide();
        $(".play").show();
        $(".pause").hide();
        nextBtn.addEventListener("click", nextSong);
        prevBtn.addEventListener("click", previousSong);
        audio.addEventListener("ended", nextSong);
        // adds song to list and displays it
        for (var i = 0; i < dragDropInput.files.length; i++) {
          songsInSongList += "<li>" + dragDropInput.files[i].name + "</li>";
        }
        songList.innerHTML = "<ul>" + songsInSongList + "</ul>";
      } else {
        alert("One or more of these files are not audio. Please try again!");
      }
    }
  }
}

function dragOverHandler(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

var counter = 0;

// when the user is dragging a file into the dropzone, this function will check if the file or files are audio format
function dragEnterHandler(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  // counter++;
  // console.log(counter);
  // dragDropInput.files = ev.dataTransfer.files;

  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    if (
      ev.dataTransfer.items[i].type.match("image/*") ||
      ev.dataTransfer.items[i].type.match("video/*") ||
      ev.dataTransfer.items[i].type.match(".pdf") ||
      ev.dataTransfer.items[i].type.match(".doc")
    ) {
      alert("One or more of these files are not audio. Please try again!");
    }
  }
}

function dragLeaveHandler(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}
