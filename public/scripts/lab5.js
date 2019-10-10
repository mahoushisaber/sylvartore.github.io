document.addEventListener("DOMContentLoaded", () => {
  search();
});

toggle_add_artist = () => {
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

  fetch("/artists/add?name=" + name + "&about=" + about + "&url=" + url).then(() => {
    search();
    document.querySelector(".form #name").value = "";
    document.querySelector(".form #about").value = "";
    document.querySelector(".form #img").value = "";
    toggle_add_artist();
  });
};

renderArtists = (artists, hidden = []) => {
  const users = document.querySelector(".users");
  while (users.firstChild) {
    users.removeChild(users.firstChild);
  }
  let i = 0;
  for (artist of artists) {
    const user = users.appendChild(document.createElement("div"));
    user.setAttribute("class", "user");
    if (hidden.includes(i)) user.style.display = "none";
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


del = i => {
  fetch("/artists/delete?id=" + i).then(() => search());
};


search = () => {
  const search_key = document.querySelector("#search").value;
  fetch("/artists/all").then(data => {
    data.json().then(artists => {
      if (search_key) {
        const hidden = artists.map((value, index) => {
          if (
            value.name.search(new RegExp(search_key, "i")) < 0 &&
            value.about.search(new RegExp(search_key, "i")) < 0
          )
            return index;
        });
        renderArtists(artists, hidden);
      } else {
        renderArtists(artists);
      }
    });
  });
};
