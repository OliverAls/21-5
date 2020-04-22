const allPagesEndpoint = "http://nicohj.dk/kea/wordpress/21-5/wp/wp-json/wp/v2/pages/?per_page=100";
let allPages = [];
start();


function start() {
    loadData();
}

async function loadData() {
    const allPagesResponse = await fetch(allPagesEndpoint);
    allPages = await allPagesResponse.json();
    burgermenu();
}


function burgermenu() {
    let menuContainer = document.querySelector("#main-menu");
    let menuTemplate = document.querySelector("#menu-link");
    menuContainer.innerHTML = "";
    allPages.forEach(page => {
        if (page.parent == 0) {

            let menuKlon = menuTemplate.cloneNode(true).content;
            menuKlon.querySelector("a").href = page.slug + ".html";
            menuKlon.querySelector("a").textContent = page.title.rendered;
            menuContainer.appendChild(menuKlon);



        }
    });

    //burgermenu
    let wrapperMenu = document.querySelector('.wrapper-menu');
    wrapperMenu.addEventListener('click', function () {
        console.log("click");
        wrapperMenu.classList.toggle('open');

        document.querySelector(".burgermenu").classList.toggle("hide");
        //document.querySelector(".burgermenu").classList.toggle("vis-burgermenu");
    });
}
