import DAO from "./DAO";
import GestionnaireRecherche from "./GestionnaireRecherche";

export default class App {
    static contentContainer;
    static barreRecherche;
    static boutonRecherche;

    static init() {
        console.log("init");
        this.barreRecherche = document.querySelector(".barre-recherche");
        if (!this.barreRecherche) {
            throw new Error("La classe barre-recherche est introuvable");
        }

        this.boutonRecherche = document.querySelector(".bouton-recherche");
        if (!this.boutonRecherche) {
            throw new Error("La classe bouton-recherche est introuvable");
        }

        this.boutonRecherche.addEventListener("click", GestionnaireRecherche.clickBoutonRecherche.bind(GestionnaireRecherche));

        this.contentContainer = document.querySelector(".content-container");
        if (!this.contentContainer) {
            throw new Error("La classe content-container est introuvable");
        }
    }

    static afficherLoaderContentContainer() {
		//Je vide le contenu de contentContainer
		this.contentContainer.innerHTML = "";

		const divPokeball = document.createElement("div");  		
        divPokeball.classList.add("divPokeball");
        this.contentContainer.append(divPokeball);
    
        const divBoutonPokeball = document.createElement("div");
        divBoutonPokeball.classList.add("divBoutonPokeball");
        divPokeball.append(divBoutonPokeball);
    
        const divMiniBoutonPokeball = document.createElement("div");
        divMiniBoutonPokeball.classList.add("divMiniBoutonPokeball");
        divBoutonPokeball.append(divMiniBoutonPokeball); /* Dans la div bouton, j'affiche la mini */
	}
}

window.onload = App.init.bind(App); // On utilise bind pour retourner une copie de la méthode init en lui liant un contexte spécifique.