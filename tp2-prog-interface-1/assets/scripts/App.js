import { aTaches } from "./aTaches.js";
import Tache from "./Tache.js";

export class App {
/**
 * Construit, injecte et lance les comportements de chaque nouvelle tâche
 * @param {*} id 
 * @param {*} tache 
 * @param {*} importance 
 */
  injecteTache(id, tache, importance) {
    let dom = `<div data-js-tache=${id}>
                        <p>
                            <span>
                                <small>Tâche :</small>${tache}
                            </span>
                            <span>
                            <small>Importance : </small>${importance}
                        </span>
                            <span data-js-actions>
                                <button data-js-action="afficher">Afficher le détail</button>
                                <button data-js-action="supprimer">Supprimer</button>
                            </span>
                        </p>
                    </div>`;

  
    this._elTaches.insertAdjacentHTML("beforeend", dom);

    
    new Tache(this._elTaches.lastElementChild);
  }
}
