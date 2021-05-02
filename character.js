"use strict";

const profile = document.getElementById("profile-card");
const header = document.getElementById("header");
const animes = document.getElementById("animes");

var params = new URLSearchParams(location.search);
var id = params.get("id");
var character = params.get("character");

fetch(`https://api.jikan.moe/v3/search/character?q=${character}`)
  .then((response) => response.json())
  .then((data) => {
    const found = data.results.find((element) => element.mal_id == id);
    profile.innerHTML = `

        <div class="topnav">
            <!-- <input type="text" id="search" placeholder="Search.."> -->
            <a href="./index.html?character=${found.name}">Go back</a>
        </div>

        <img src="${found.image_url}" class="profile" alt="">
        <h2>${found.name}</h2>
        <ul>
            <li><a href="${found.url}" target="_blank">MyAnimeList</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
        </ul>
      `;

    header.innerHTML = `
        <h2>ANIMES</h2>
        <span>Total: ${found.anime.length}</span>
    `;

    var animeList = found.anime.map(function (anime) {
      return `
            <div class="card">
                <div class="content">
                    <div class="left">
                        <i class="fas fa-play"></i>
                    </div>
                                
                    <div class="right">
                        <div class="task">${anime.name}</div>
                        <div class="progress">
                            <div class="fill fill-100"></div>
                        </div>
                        <div class="status">My Anime List Id: ${anime.mal_id}</div>
                        
                    </div>

                </div>

                <div class="buttons">
                    <a href="${anime.url}" class="btn" target="_blank">Link to page</a>
                </div>
                    
            </div> 
        `;
    });

    animes.innerHTML = animeList.join("\n");
  });
