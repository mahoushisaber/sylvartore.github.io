document.addEventListener("DOMContentLoaded", () => {});

add_artist = () => {
  let form_display = document.querySelector(".form").style.display;
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
  let user = document
    .querySelector(".users")
    .appendChild(document.createElement("div"));
  user.setAttribute("class", "user");
  let table = user
    .appendChild(document.createElement("table"))
    .appendChild(document.createElement("tr"));
  let img = table.appendChild(document.createElement("td"));
  img = img.appendChild(document.createElement("div"));
  img.setAttribute("class", "img");
  img.appendChild(document.createElement("img")).setAttribute("src", url);

  let text = table.appendChild(document.createElement("td"));
  text = text.appendChild(document.createElement("div"));
  text.setAttribute("class", "text");
  let text_name = text.appendChild(document.createElement("div"));
  text_name.setAttribute("class", "name");
  text_name.innerText = name;
  let title = text.appendChild(document.createElement("div"));
  title.setAttribute("class", "title");
  title.innerText = about;

  let remove = table
    .appendChild(document.createElement("td"))
    .appendChild(document.createElement("button"));
  remove.innerText = "Delete";
  remove.setAttribute("class", "delete");
  remove.addEventListener("click", del, false);

  document.querySelector(".form #name").value = "";
  document.querySelector(".form #about").value = "";
  document.querySelector(".form #img").value = "";
  add_artist();
};

del = event => {
  event.target.parentElement.parentElement.parentElement.parentElement.remove();
};
