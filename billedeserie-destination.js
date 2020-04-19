"use strict"
//document.addEventListener("DOMContentLoaded", start);
const endpoint = "http://nicohj.dk/kea/wordpress/21-5/wp/wp-json/wp/v2/destination";
const urlParamsSted = new URLSearchParams(window.location.search);
const slug = urlParamsSted.get("sted");

let billedeserie = [];
let numberOfPicsInCarousel;
let caroCurrentNum = 0;
start();

function start() {
    loadData();
    document.querySelector(".fwd").addEventListener("click", fwd);
    document.querySelector(".bwd").addEventListener("click", bwd);

}

async function loadData() {
    const response = await fetch(endpoint);
    billedeserie = await response.json();
    console.log(billedeserie);
    buildCarousel();
}

function buildCarousel() {
    billedeserie.forEach(place => {
        if (place.slug == slug) {
            console.log(slug);

            console.log(place.billeder);

            numberOfPicsInCarousel = place.billeder.length;
            place.billeder.forEach((billede, index) => {
                const theClone = document.querySelector("#caro-template").cloneNode(true).content;
                const secondClone = document.querySelector("#caro-template").cloneNode(true).content;

                theClone.querySelector("img").src = billede.guid;
                secondClone.querySelector("img").src = billede.guid;
                secondClone.querySelector("section").dataset.myIndex = index;
                document.querySelector(".the-container").appendChild(theClone);
            });
        }
    });

    document.querySelector(".the-container").addEventListener("scroll", scrollFunction);
}

function scrollFunction() {
    //console.log("jeg scrollede");
    caroCurrentNum = Math.round(document.querySelector(".the-container").scrollLeft / document.querySelector(".caro-imgs").width);
    console.log(caroCurrentNum);
    document.querySelectorAll(".legend-pic-container section").forEach(section => {
        section.classList.remove("legend-border");
    });
    setBtns();
}


function fwd() {
    if (caroCurrentNum < numberOfPicsInCarousel - 1) {
        caroCurrentNum++;
        navigate();
    }

}

function bwd() {
    if (caroCurrentNum > 0) {
        caroCurrentNum--;
        navigate();
    }

}

function navigate() {
    document.querySelector(".the-container").scrollTo({
        left: caroCurrentNum * document.querySelector(".caro-imgs").width,
        behavior: "smooth"
    });

    setBtns();
}


function setBtns() {
    if (caroCurrentNum < numberOfPicsInCarousel - 1) {
        document.querySelector(".fwd").style.opacity = "1";
        document.querySelector(".fwd").style.cursor = "pointer";
    } else {
        document.querySelector(".fwd").style.opacity = ".5";
        document.querySelector(".fwd").style.color = "#333";
        document.querySelector(".fwd").style.cursor = "default";

        //document.querySelector(".fwd:hover").style.fontFamily = "gingerpro";
        //document.querySelector(".fwd:hover").style.transform = "scale(1)";
    }

    if (caroCurrentNum > 0) {
        document.querySelector(".bwd").style.opacity = "1";
        document.querySelector(".bwd").style.cursor = "pointer";
    } else {
        document.querySelector(".bwd").style.opacity = ".5";
        document.querySelector(".bwd").style.color = "#333";
        document.querySelector(".bwd").style.cursor = "default";

        //document.querySelector(".bwd:hover").style.fontFamily = "gingerpro";
        //document.querySelector(".bwd:hover").style.transform = "scale(1)";

    }

}
