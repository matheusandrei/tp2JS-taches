class Erreur404 {
    #_elMain;

    constructor() {
        this.#_elMain = document.querySelector('main');
        this.erreur404 = this.erreur404.bind(this);
    }


    /**
     * Contenu de la page du cas erreur 404
     */
    erreur404() {
        this.#_elMain.innerHTML =  `<div>
                                        <h3>La ressource demandée n'existe pas.</h3>
                                        <p><a href="#!/homepage">Retour à l'accueil</a></p>
                                    </div>`;
    }
} 

export const { erreur404 } = new Erreur404();