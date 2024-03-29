/**
 * performs the search
 */
function search() {
  // the searched value
  const searchedSong = document.getElementById("search-bar").value.toLowerCase();

  // the searched songs
  let searchedSongs = [];

  // the searched urls
  let searchedUrls = [];

  // if there is match, runs up to fullNamesIndex
  for (let j = 0; j < data[performerIndex()].song.length; j++) {
    if (data[performerIndex()].song[j].toLowerCase().startsWith(searchedSong)) {
      searchedSongs.push(data[performerIndex()].song[j]);
      searchedUrls.push(data[performerIndex()].url[j]);
    }
  }

  displayCharacters(searchedSongs, searchedUrls);
}

let data = [];

// Fetch API  https://www.w3schools.com/jsref/api_fetch.asp
async function loadData() {
  const res = await fetch("../data.json");
  data = await res.json();
  displayCharacters(data[performerIndex()].song, data[performerIndex()].url);
  document.getElementById("myfooter").classList.add("fixed-bottom");
}

/**
 * display the songs and urls in a list
 * @param {*} songs
 * @param {*} urls
 */
function displayCharacters(songs, urls) {
  let txt = "";

  for (let i = 0; i < songs.length; i++) {
    txt +=
      `
      <li class="list-group-item songs pb-3">
      <a href="` +
      urls[i] +
      `" target="_blank">` +
      songs[i] +
      `</a>
    </li>
    `;
  }
  document.getElementById("song").innerHTML = txt;

  const songElements = document.getElementsByClassName("songs");

  for (let i = 0; i < songElements.length; i++) {
    songElements[i].addEventListener("click", () => {
      window.open(urls[i], "_blank");
    });
  }
}

loadData();

/**
 * The searched performers index
 * @returns
 */
function performerIndex() {
  // the searched performer
  const performer = document.getElementById("choosedPerformer").innerHTML;

  // collect all names to an array
  const fullNames = [];
  for (let i = 0; i < data.length; i++) {
    fullNames.push(data[i].full_name);
  }

  // get the index of actual performer
  const fullNamesIndex = fullNames.indexOf(performer);

  return fullNamesIndex;
}

/**
 * Change the theme
 */
function darkTheme() {
  let dark = document.getElementById("theme");
  let logo = document.getElementById("logo");

  const head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");

  if (dark.innerHTML === "Light theme") {
    link.rel = "stylesheet";
    link.href = "/css/light.css";
    logo.setAttribute("src", "/logos/logo_dark.ico");
    dark.innerHTML = "Dark theme";
  } else {
    link.rel = "stylesheet";
    link.href = "/css/dark.css";
    logo.setAttribute("src", "/logos/logo_light.ico");
    dark.innerHTML = "Light theme";
  }
  head.appendChild(link);
}
