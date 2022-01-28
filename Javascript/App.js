import DAO from "./DAO";
import GestionnaireRecherche from "./GestionnaireRecherche";
import GestionnaireFavoris from "./GestionnaireFavoris";

export default class App {
    static contentContainer;
    static barreRecherche;
    static boutonRecherche;
    static boutonFavoris;

    static init() {
        this.barreRecherche = document.querySelector(".barre-recherche");
        if (!this.barreRecherche) {
            throw new Error("La classe barre-recherche est introuvable");
        }

        this.boutonRecherche = document.querySelector(".bouton-recherche");
        if (!this.boutonRecherche) {
            throw new Error("La classe bouton-recherche est introuvable");
        }
        this.boutonRecherche.addEventListener("click", GestionnaireRecherche.clickBoutonRecherche.bind(GestionnaireRecherche));

        this.boutonFavoris = document.querySelector(".bouton-favoris");
        if (!this.boutonFavoris) {
            throw new Error("La classe bouton-favoris est introuvable");
        }
        this.boutonFavoris.addEventListener("click", GestionnaireFavoris.clickBoutonFavoris.bind(GestionnaireFavoris));

        this.contentContainer = document.querySelector(".content-container");
        if (!this.contentContainer) {
            throw new Error("La classe content-container est introuvable");
        }
    }

    static afficherLoaderContentContainer() {
		//Je vide le contenu de contentContainer
		this.contentContainer.innerHTML = "";

		const divChargement = document.createElement("div");    // Afficher un chargement en attendant le téléchargement des données
        divChargement.classList.add("div-chargement");
        this.contentContainer.append(divChargement);

        const logoChargement = document.createElement("div");
        logoChargement.classList.add("logo-chargement");
        divChargement.append(logoChargement);/* Dans la div bouton, j'affiche la mini */
	}
}

window.onload = App.init.bind(App); // On utilise bind pour retourner une copie de la méthode init en lui liant un contexte spécifique.