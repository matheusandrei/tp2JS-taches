import { App } from './App.js';
import { aTaches } from './aTaches.js';
// import { aTache } from'./aTache.js';
export  class TrierTaches extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elTaches = document.querySelector('[data-js-taches]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._el.addEventListener('click', function(e) {
            let ordre = e.target.dataset.jsTrier;
                this.trieTaches(ordre);
        }.bind(this));
    }


    /**
     * trier les taches en fonction de la propriété spécifiée
     * @param {*} propriete 
     */
    trieTaches(propriete) {

        let data;
        let tache = {
          propriete: propriete,
        };
        if (propriete == "tache") {
          data = {
            action: "trierTache",
            tache: tache,
          };
        } else if (propriete == "importance") {
          data = {
            action: "trierImportance",
            tache: tache, 
          };
        }
       
        let oOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        console.log("options solicités:", oOptions);
    
        fetch("requetes/requetesAsync.php", oOptions)
          .then(function (reponse) {
            if (reponse.ok) return reponse.json();
            else throw new Error("La réponse n'est pas OK");
          })
          .then(
            function (data) {
              //console.log(data);
              this._elTaches.innerHTML = "";
              for (let i = 0; i < data.length; i++) {
                this.injecteTache(
                data[i].id,
                data[i].tache,
                data[i].importance,
                );
              }
            }.bind(this)
          )
          .catch(function (erreur) {
            console.log(
              `Il y a eu un problème avec l'opération fetch: ${erreur.message}`
            );
          });
}
}