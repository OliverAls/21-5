const allPagesEndpoint = "http://nicohj.dk/kea/wordpress/21-5/wp/wp-json/wp/v2/pages/?per_page=100";
let allPages = [];
start();


function start() {
    loadData();
}

//Alle siderne hentes i JSON og indsættes i variablen "allPages"
async function loadData() {
    const allPagesResponse = await fetch(allPagesEndpoint);
    allPages = await allPagesResponse.json();
    burgermenu();
}


function burgermenu() {
    let menuContainer = document.querySelector("#main-menu");
    let menuTemplate = document.querySelector("#menu-link");
    menuContainer.innerHTML = "";
    allPages.forEach(page => { //For hver side gøres følgende:
        if (page.parent == 0) { //Hvis siderne ikke har nogle parent-sider skal der ske følgende:

            let menuKlon = menuTemplate.cloneNode(true).content; //Hvert objekt tildeles en skabelon
            menuKlon.querySelector("a").href = page.slug + ".html"; //Hvert link får tildelt deres link
            menuKlon.querySelector("a").textContent = page.title.rendered; //Linkets tekst indsættes
            menuContainer.appendChild(menuKlon); //Alle menupunkterne indsættes i menu-containeren
        }
    });

    //burgermenu
    let wrapperMenu = document.querySelector('.wrapper-menu');
    wrapperMenu.addEventListener('click', function () { //klikker man på burgermenuen sker følgende:
        console.log("click");
        wrapperMenu.classList.toggle('open'); //Klassen "open" toggles
        document.querySelector(".burgermenu").classList.toggle("hide"); //klassen hide toggles for at vise menu-indhold
    });
}
