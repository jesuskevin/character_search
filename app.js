"use strict";

const $searchForm = document.getElementById("search-form");
const text = document.getElementById("text");
var row = document.getElementById("row");

var params = new URLSearchParams(location.search);
var character = params.get("character");

if (character) {
  $searchForm.children[0].value = character;

  fetch(`https://api.jikan.moe/v3/search/character?q=${character}`)
    .then((response) => response.json())
    .then((data) => {
      text.classList.add("d-none");
      var characterList = data.results.map(function (character) {
        return `
                    <div class="col-lg-3 col-sm-12 col-md-6">
                        <div class="card text-white bg-glass mt-3 mb-3" style="width: 18rem; height: 650px;">
                            <img src="${character.image_url}" style="width: 17.8rem; height: 450px;" class="card-img-top text-center" alt="${character.name}">
                            <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">Others names: ${character.alternative_names}</p>
                            <a href="./character.html?id=${character.mal_id}&character=${character.name}" class="btn btn-primary">More info</a>
                            </div>
                        </div>
                    </div>
                `;
      });

      row.innerHTML = characterList.join("");
    });
}

$searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if ($searchForm.children[0].value == "" || $searchForm.children[0].value.length < 3) {
      alert("Invalid data");
  }
  let character = $searchForm.children[0].value;

  fetch(`https://api.jikan.moe/v3/search/character?q=${character}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 404) {
        row.classList.add("d-none");
        text.classList.remove("d-none");
        return (text.innerText = "Not Found");
      }

      var characterList = data.results.map(function (character) {
        return `
                    <div class="col-lg-3 col-sm-12 col-md-6">
                        <div class="card text-white bg-glass mt-3 mb-3" style="width: 18rem; height: 650px;">
                            <img src="${character.image_url}" style="width: 17.8rem; height: 450px;" class="card-img-top text-center" alt="${character.name}">
                            <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">Others names: ${character.alternative_names}</p>
                            <a href="./character.html?id=${character.mal_id}&character=${character.name}" class="btn btn-primary">More info</a>
                            </div>
                        </div>
                    </div>
                `;
      });

      text.classList.add("d-none");
      row.classList.remove("d-none");
      row.innerHTML = characterList.join("");
    });
});
