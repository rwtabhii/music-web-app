const songs = [
  {
    id: 1,
    name: "Shape of You",
    artist: "Ed Sheeran",
    img: "image/photo1.jpg",
    source: "songs/song1.mp3",
    genre: "Pop"
  },
  {
    id: 2,
    name: "All of Me",
    artist: "John Legend",
    img: "image/photo2.jpg",
    source: "songs/song2.mp3",
    genre: "Pop"
  },
  {
    id: 3,
    name: "Someone Like You",
    artist: "Adele",
    img: "image/photo3.jpg",
    source: "songs/song3.mp3",
    genre: "Pop"
  },
  {
    id: 4,
    name: "Wonderwall",
    artist: "Oasis",
    img: "image/photo4.jpg",
    source: "songs/song4.mp3",
    genre: "Rock"
  },
  {
    id: 5,
    name: "Sugar",
    artist: "Maroon 5",
    img: "image/photo5.jpg",
    source: "songs/song5.mp3",
    genre: "Rock"
  },
  {
    id: 6,
    name: "Intentions",
    artist: "Justin Bieber",
    img: "image/photo6.jpg",
    source: "songs/song6.mp3",
    genre: "Hiphop"
  }
];

// left side funcionality  
const getShowSongs = document.querySelector(".show-songs")

function renderSongs(songs) {
  getShowSongs.innerHTML = "";

  songs.forEach((song) => {


    const songElements = document.createElement("div");
    songElements.classList = "songs";
    songElements.innerHTML = song.name;
    songElements.addEventListener("click", () => {
      playSong(song);
    });
    getShowSongs.appendChild(songElements);
  })
}
let currentSongIndex;
let filteredSongs = songs;
// addeventlistener

const getsFilterElement = document.querySelector("#selectId")
getsFilterElement.addEventListener("change", (event) => {
  const selectedGenre = event.target.value
  if (selectedGenre === "all") {
    filteredSongs = songs;
  } else {
    // Filter songs by genre
    filteredSongs = songs.filter((song) => song.genre.toLowerCase() === selectedGenre);

  }
  renderSongs(filteredSongs); //songs showing


  if (filteredSongs.length > 0) {
    currentSongIndex = 0;  // Set to the first song in the filtered list
  } else {
    currentSongIndex = -1;  // No songs available, so set index to -1
  }

  // if (currentSongIndex >= 0) {
  //   playSong(filteredSongs[currentSongIndex]);
  // }


})

// search bar
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filteredSong = songs.filter((song) => song.name.toLowerCase() === query);
  if (filteredSong.length === 0) {
    alert("No songs found with that name. Please try again.");
  } else {
    filteredSongs = filteredSong; // Update the filtered songs based on search
    renderSongs(filteredSongs);

  }
});



// middlefunctionaliy musicbox
let currentPlayingSong;
let playlist = {};
function playSong(song) {
  const songImage = document.querySelector(".song-photo");
  const songDetail = document.querySelector(".song-detail");
  const audioPlayer = document.querySelector("#audioPlayer");
  const audioSource = document.querySelector("#audioSource");
  // const playPauseBtn = document.querySelector(".playpause");
  // const seekBar = document.querySelector("#seekBar");
  // const currentTimeLabel = document.querySelector("#currentTime");
  // const durationLabel = document.querySelector("#duration");
  currentSongIndex = filteredSongs.findIndex(s => s.id === song.id);
  currentPlayingSong = song;
  // Set the source of the audio player
  audioSource.src = song.source;
  audioPlayer.load();  // Load the song
  audioPlayer.play();  // Start playing the song

  // Update the song details
  songImage.innerHTML = `<img src="${song.img}" alt="${song.name}">`;
  songDetail.innerHTML = `<h2>${song.name}</h2><h3>${song.artist}</h3>`;

  // Update the duration label when the song is loaded
  // audioPlayer.onloadedmetadata = () => {
  //   durationLabel.textContent = formatTime(audioPlayer.duration);
  // };

  // Update the current time of the song
  // audioPlayer.ontimeupdate = () => {
  //   currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
  //   seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  // };

  // Play/Pause functionality
  // playPauseBtn.addEventListener("click", () => {
  //   if (audioPlayer.paused) {
  //     audioPlayer.play();
  //     playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  //   } else {
  //     audioPlayer.pause();
  //     playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  //   }
  // });

  // Seek bar functionality
  // seekBar.addEventListener("input", () => {
  //   const seekTime = (seekBar.value / 100) * audioPlayer.duration;
  //   audioPlayer.currentTime = seekTime;
  // });
}
// function formatTime(seconds) {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;

// }



function playNextSong() {
  // Check if currentSongIndex is valid
  if (currentSongIndex >= 0) {
    currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;  // Move to the next song, loop to the first if at the end
    playSong(filteredSongs[currentSongIndex]);
  }
}

// Function to play the previous song
function playPreviousSong() {
  // Check if currentSongIndex is valid
  if (currentSongIndex >= 0) {
    currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;  // Move to the previous song, loop to the last if at the start
    playSong(filteredSongs[currentSongIndex]);
  }
}

// Event listeners for next and previous buttons
document.querySelector(".next-song").addEventListener("click", playNextSong);
document.querySelector(".previous-song").addEventListener("click", playPreviousSong);
renderSongs(filteredSongs);



// right side functionality 
const getSearchName = document.querySelector("#searchplaylist");
const getCreateButton = document.querySelector("#create-button")
const getAllPlaylist = document.querySelector(".allplaylist")

getCreateButton.addEventListener("click", () => {

  const newPlaylist = document.createElement("div");
  const PlaylistName = getSearchName.value;
  if (PlaylistName.length > 0) {
    newPlaylist.classList.add("playlist-item");
    newPlaylist.innerHTML = `<h4 id = "${PlaylistName}" class ="playlists">${PlaylistName} <i class="fa-solid fa-trash"></i></h4>`;
    getAllPlaylist.appendChild(newPlaylist);

    // Add a new playlist to the playlists object
    playlist[PlaylistName] = [];



    newPlaylist.querySelector("h4").addEventListener("click", () => {
      loadPlaylist(PlaylistName);
    })
    newPlaylist.querySelector(".fa-trash").addEventListener("click", () => {
      newPlaylist.remove(); // Remove the playlist from the DOM
      delete playlist[PlaylistName];
    });
    getSearchName.value = "";
  }
  else {
    alert("enter the paylist name to create the playlist")
  }
  //playlist onclick
  document.querySelectorAll(".playlists").forEach((playlist) => {
    playlist.addEventListener("click", () => {
      document.querySelectorAll(".playlists").forEach((p) => p.classList.remove("selected"));

      // Add 'selected' class to the clicked playlist
      playlist.classList.add("selected");


    })
  });

})


// Load playlist songs
function loadPlaylist(PlaylistName) {
  const soloPlayistSongs = document.querySelector(".soloplaylist-songs")
  soloPlayistSongs.innerHTML = "";
  playlist[PlaylistName].forEach((song,index) => {
    const songElement = document.createElement("div");
    songElement.classList.add("playlist-song", "playlists");
    songElement.innerHTML = `${song.name} - ${song.artist} <i class="fa-solid fa-trash remove-song" aria-hidden="true"></i>`;
    songElement.addEventListener("click", () => playSong(song));  // Add click to play song
    songElement.querySelector(".remove-song").addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the song from being played when the trash icon is clicked
      removeSongFromPlaylist(PlaylistName, index); // Call the remove function
    });

    soloPlayistSongs.appendChild(songElement);
    

  });

}
// add playlist button  to add the songs 
document.querySelector(".playlist-button").addEventListener("click", () => {
  if (currentPlayingSong) {
    const selectedPlaylist = document.querySelector(".playlists.selected"); // Get the selected playlist element
    if (selectedPlaylist) {
      const playlistName = selectedPlaylist.id; // Get the playlist name
      if (!playlist[playlistName].some(song => song.id === currentPlayingSong.id)) {
        playlist[playlistName].push(currentPlayingSong); // Add the current song to the playlist
        loadPlaylist(playlistName);
      }
    } else {
      alert("Please select a playlist to add the song.");
    }
  } else {
    alert("No song is currently playing!");
  }
});
function removeSongFromPlaylist(PlaylistName, songIndex) {
  // Remove the song from the playlist array using the provided index
  playlist[PlaylistName].splice(songIndex, 1);

  // Reload the playlist to show the updated list of songs
  loadPlaylist(PlaylistName);
}

const toggleCheckbox = document.getElementById('toggle'); // The checkbox toggle for dark mode
const body = document.body;

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  toggleCheckbox.checked = true; // Set the toggle switch to "on"
}

// Toggle the dark mode class when the checkbox is clicked
toggleCheckbox.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled'); // Save the state
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled'); // Save the state
  }
});



