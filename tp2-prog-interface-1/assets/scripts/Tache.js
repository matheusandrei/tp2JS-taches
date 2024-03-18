import { aTaches } from "./aTaches.js";
export default class Tache {
  constructor(el) {
    this._el = el;
    this._index = this._el.dataset.jsTache;
    this._elActions = this._el.querySelector("[data-js-actions]");

    this._elTaches = this._el.closest("[data-js-taches]");
    this._elTacheDetail = document.querySelector("[data-js-tache-detail]");

    this.init();
  }

  /**
   * Initialise les comportements
   */
  init() {
    this._elActions.addEventListener(
      "click",
      function (e) {
        if (e.target.dataset.jsAction == "afficher") this.afficheDetail();
        else if (e.target.dataset.jsAction == "supprimer") this.supprimeTache();
      }.bind(this)
    );
  }

  /**
   * Afficher les détails d'une tâche en récupérant les informations du serveur
   */
  afficheDetail() {
    let tache = {
      id: this._index,
    };
    let data = {
      tache: tache,
      action: "getTache",
    };

    let oOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("requetes/requetesAsync.php", oOptions)
      .then(
        function (response) {
          if (response.ok) return response.json();
          else throw new Error("La réponse n'est pas OK");
        }.bind(this)
      )
      .then(
        function (data) {
          if (data && data.id) {
            let elDetailDom = `<div class="detail__info">
                                <p><small>Tâche : </small>${data.id}</p>
                                <p><small>Description : </small>${
                                  data.description
                                    ? data.description
                                    : "Aucune description disponible."
                                }</p>
                                <p><small>Importance : </small>${
                                  data.importance
                                }</p>
                            </div>`;

            this._elTacheDetail.innerHTML = elDetailDom;
            
          } else {
            throw new Error("Données de tâche manquantes ou invalides");
          }
        }.bind(this)
        
      )
      .catch(
        function (error) {
          console.log(
            `Il y a eu un problème avec l'opération fetch: ${error.message}`
          );
        }.bind(this)
      );
  }

  /**
   * supprimer une tache en envoyant son identifiant au serveur
   */
  supprimeTache() {
    console.log(this._index);

    let tache = {
      idTache: this._index,
    };
    let data = {
      action: "supprimeTache",
      tache: tache,
    };
    let oOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("requetes/requetesAsync.php", oOptions)
      .then(function (reponse) {
        if (reponse.ok) return reponse.json();
        else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {
          //console.log(data);
          this._el.remove();
          this._elTacheDetail.remove()
        }.bind(this)
      )
      .catch(function (erreur) {
        console.log(
          `Il y a eu un problème avec l'opération fetch: ${erreur.message}`
        );
      });
  }
}
