import Router from "./Router.js";
import { classesMapping } from "./classMapping.js";
import { Formulaire } from "./Formulaire.js";
import { TrierTaches } from "./TrierTaches.js";
import { Detail } from "./Detail.js";

document.addEventListener("DOMContentLoaded", function () {
  const elsFormulaire = document.querySelectorAll("[data-js-formulaire]");
  const elsTrierTaches = document.querySelectorAll("[data-js-trier-taches]");
  const elsDetail = document.querySelectorAll("[data-js-detail]");

  for (let i = 0, l = elsFormulaire.length; i < l; i++) {
    let datasetComponent = elsFormulaire[i].dataset.jsFormulaire;
    let elComponent = elsFormulaire[i];
    new Formulaire(elsFormulaire[i]);
    for (let key in classesMapping) {
      if (datasetComponent == key)
        new classesMapping[datasetComponent](elComponent);
    }
  }

  for (let i = 0, l = elsTrierTaches.length; i < l; i++) {
    let datasetComponent = elsTrierTaches[i].dataset.jsTrierTaches;
    let elComponent = elsTrierTaches[i];
    new TrierTaches(elsTrierTaches[i]);
    for (let key in classesMapping) {
      if (datasetComponent == key)
        new classesMapping[datasetComponent](elComponent);
    }
  }

  for (let i = 0, l = elsDetail.length; i < l; i++) {
    let datasetComponent = elsDetail[i].dataset.jsDetail;
    let elComponent = elsDetail[i];
    new Detail(elsDetail[i]);
    for (let key in classesMapping) {
      if (datasetComponent == key)
        new classesMapping[datasetComponent](elComponent);
    }
  }
});
