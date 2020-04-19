"use strict"
document.addEventListener("DOMContentLoaded", start);
const endpoint = "http://nicohj.dk/kea/wordpress/21-5/wp/wp-json/wp/v2/destination/316";
let billedeserie = [];
let numberOfPicsInCarousel;
let caroCurrentNum = 0;

function start() {
    loadData()
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
    numberOfPicsInCarousel = billedeserie.billeder.length;
    billedeserie.billeder.forEach((billede, index) => {
        const theClone = document.querySelector("template").cloneNode(true).content;
        const secondClone = document.querySelector("template").cloneNode(true).content;

        theClone.querySelector("img").src = billede.guid;
        secondClone.querySelector("img").src = billede.guid;
        secondClone.querySelector("section").dataset.myIndex = index;


        document.querySelector(".the-container").appendChild(theClone);
        document.querySelector(".legend-pic-container").appendChild(secondClone);
    });


    document.querySelector(".legend-pic-container section").classList.add("legend-border");
    document.querySelector(".the-container").addEventListener("scroll", scrollFunction);

    document.querySelectorAll(".legend-pic-container section").forEach(section => {
        section.addEventListener("click", legendClick);
    });
}

function scrollFunction() {
    //console.log("jeg scrollede");
    caroCurrentNum = Math.round(document.querySelector(".the-container").scrollLeft / document.querySelector(".caro-imgs").width);
    console.log(caroCurrentNum);
    document.querySelectorAll(".legend-pic-container section").forEach(section => {
        section.classList.remove("legend-border");
    });
    document.querySelector(`.legend-pic-container section:nth-child(${caroCurrentNum + 1})`).classList.add("legend-border");
    setBtns();
}

function legendClick(evt) {
    //console.log(evt.currentTarget);
    caroCurrentNum = evt.currentTarget.dataset.myIndex;
    navigate();
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
        document.querySelector(".fwd").style.cursor = "default";
    }

    if (caroCurrentNum > 0) {
        document.querySelector(".bwd").style.opacity = "1";
        document.querySelector(".bwd").style.cursor = "pointer";
    } else {
        document.querySelector(".bwd").style.opacity = ".5";
        document.querySelector(".bwd").style.cursor = "default";
    }

}
