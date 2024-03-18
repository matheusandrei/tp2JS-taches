import { erreur404 } from "./erreur404.js";
import { accueil } from "./Accueil.js";
import { App } from "./App.js";
export default class Router {
  #_el;
  #_elSelectEquipe;
  #_routes;
  #_elH1;

  constructor(el) {
    this.#_elH1 = document.querySelector("header h1");
    this.#_routes = [["/homepage", accueil]];

    this.#init();
    this.gereHashbang();
  }

  #init() {
    this.gereHashbang();
    this.#_elH1.addEventListener("click", function () {
      location = "#!";
    });
    window.addEventListener(
      "hashchange",
      function () {
        this.gereHashbang();
      }.bind(this)
    );
  }

  /**
   * Gestion du fragment d'url suite à au #! pour appeler le comportement de la route correspondante.
   */
  gereHashbang() {
    // console.log('danss gereHashbang');
    let hash = location.hash.slice(2);
    let isRoute = false;

    //location : objet du window qui permet de traiter l'url.
    // console.log(hash);
    if (hash.endsWith("/")) {
      hash = hash.slice(0, -1);
    }

    /** Pour chaque route, est-ce qu'il y a une correspondance avec le hash courant */
    for (let i = 0; i < this.#_routes.length; i++) {
      let route = this.#_routes[i][0],
        isId = false,
        hashSansId;

      //   console.log(route);
      if (route.indexOf(":") > -1) {
        route = route.slice(0, route.indexOf("/:"));
        hashSansId = hash.slice(0, hash.lastIndexOf("/"));
        isId = true;
      }

      console.log(route);
      console.log(hash);

      if (route == hash || route == hashSansId) {
        let hashInArray = hash.split(route);
        // console.log(hashInArray);
        if (hashInArray[1]) {
          if (isId) {
            //console.log("test");
            let id = hashInArray[1].slice(1); //enlever la barre /
            this.#_routes[i][1](id);
            isRoute = true;
            return id;
          }
        } else {
          if (hash == this.#_routes[i][0]) {
            console.log("pas id");
            this.#_routes[i][1]();
            isRoute = true;
          }
        }
      }
    }

    // if (!isRoute) {
    //   erreur404();
    // }
  }
}
