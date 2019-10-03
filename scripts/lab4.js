document.addEventListener("DOMContentLoaded", () => {
  renderAllArtists();
});

add_artist = () => {
  const form_display = document.querySelector(".form").style.display;
  if (!form_display || form_display == "none") {
    document.querySelector(".form").style.display = "block";
  } else if (form_display == "block") {
    document.querySelector(".form").style.display = "none";
  }
};

add = () => {
  const name = document.querySelector(".form #name").value;
  const about = document.querySelector(".form #about").value;
  const url = document.querySelector(".form #img").value;

  const artist = {};
  artist.name = name;
  artist.about = about;
  artist.url = url;

  const artists = loadArtists();
  artists.push(artist);
  localStorage.setItem("artists", JSON.stringify(artists));
  renderAllArtists();

  document.querySelector(".form #name").value = "";
  document.querySelector(".form #about").value = "";
  document.querySelector(".form #img").value = "";
  add_artist();
};

renderArtists = artists => {
  const users = document.querySelector(".users");
  while (users.firstChild) {
    users.removeChild(users.firstChild);
  }
  let i = 0;
  for (artist of artists) {
    const user = users.appendChild(document.createElement("div"));
    user.setAttribute("class", "user");
    const table = user
      .appendChild(document.createElement("table"))
      .appendChild(document.createElement("tr"));
    let img = table.appendChild(document.createElement("td"));
    img = img.appendChild(document.createElement("div"));
    img.setAttribute("class", "img");
    img
      .appendChild(document.createElement("img"))
      .setAttribute("src", artist.url);

    let text = table.appendChild(document.createElement("td"));
    text = text.appendChild(document.createElement("div"));
    text.setAttribute("class", "text");
    let text_name = text.appendChild(document.createElement("div"));
    text_name.setAttribute("class", "name");
    text_name.innerText = artist.name;
    let title = text.appendChild(document.createElement("div"));
    title.setAttribute("class", "title");
    title.innerText = artist.about;

    const remove = table
      .appendChild(document.createElement("td"))
      .appendChild(document.createElement("button"));
    remove.innerText = "Delete";
    remove.setAttribute("class", "delete");
    remove.setAttribute("onclick", "del(" + i++ + ")");
  }
};

renderAllArtists = () => renderArtists(loadArtists());

del = i => {
  const artists = loadArtists();
  artists.splice(i, 1);
  localStorage.setItem("artists", JSON.stringify(artists));
  renderAllArtists();
};

loadArtists = () => {
  const artists = localStorage.getItem("artists");
  if (!artists) return [];
  return JSON.parse(artists);
};

search = () => {
  const search_key = document.querySelector("#search").value;
  if (search_key) {
    const results = loadArtists().filter(value => {
      if (
        value.name.search(new RegExp(search_key, "i")) >= 0 ||
        value.about.search(new RegExp(search_key, "i")) >= 0
      )
        return value;
    });
    renderArtists(results);
  } else {
    renderAllArtists();
  }
};
