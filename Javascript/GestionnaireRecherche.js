import App from "./App";
import DAO from "./DAO";
import Jeu from "./Models/Jeu"

export default class GestionnaireRecherche {

    static #apiKeyPlateformes = "?api_key=eaa76483af84e465ae49aa95536b55edf29396b4&format=json";

    static async clickBoutonRecherche() {

        // Affichage du loader
        App.afficherLoaderContentContainer();                   
         const mapJeux = await DAO.telechargerDonneesJeux(App.barreRecherche.value);
        App.contentContainer.innerHTML = "";                    
        // Fin affichage du loader

        const tableauJeux = Array.from(mapJeux.values());
        for (let i = 0; i < tableauJeux.length; i++) {

            const jeu = tableauJeux[i];
        
            const divCard = document.createElement("div");
            divCard.classList.add("card");
            divCard.style.backgroundImage = `url("${jeu.imageScreen}")`;
            divCard.innerHTML = `
                <div class="card-content">
                    <h2 class="card-title">${jeu.nom}</h2>
                    <p class="card-body">${jeu.descriptionCourte}</p>
                    <a href="#" class="button">Learn more</a>
                    <div class="platforms-container">

                    </div>
                </div>
            `;

            App.contentContainer.append(divCard);

            // Gestion du cas où les titres des jeux prennent plusieurs lignes
            const contenuDivCard = divCard.querySelector(".card-content"); //On va rechercher la hauteur des titres ainsi que leur margin pour les faire remonter de la même valeur 
            const titreDivCard = divCard.querySelector(".card-title");
            const hauteurTitreDivCard = titreDivCard.clientHeight;
            const valeur = hauteurTitreDivCard + 45;
            let stringValeur = valeur.toString();
            stringValeur += "px"
            contenuDivCard.style.setProperty("--hauteurTitre", stringValeur);
            
            // Gestion des plateformes
            const platformsContainer = divCard.querySelector(".platforms-container");
            let longueurMaxTableauPlateformes = 0;
            let divResteBoolean = false;

            if (jeu.plateformes.length < 5){
                longueurMaxTableauPlateformes = jeu.plateformes.length;
            } else {
                longueurMaxTableauPlateformes = 4;
                divResteBoolean = true;
            }
            
            for (let x = 0; x < longueurMaxTableauPlateformes; x++) {

                let url = jeu.plateformes[x].api_detail_url;
                url += this.#apiKeyPlateformes;
                const resRequetePlateforme = await fetch(url);
                const jsonResRequetePlateforme = await resRequetePlateforme.json();
                
                const iconePlateforme = document.createElement("img");
                iconePlateforme.src = jsonResRequetePlateforme.results.image.icon_url;
                iconePlateforme.alt = `"logo de la plateforme ${jsonResRequetePlateforme.results.name}"`;

                platformsContainer.append(iconePlateforme);
            }

            if (divResteBoolean) {
                const divRestePlateformes = document.createElement("div");
                divRestePlateformes.classList.add("reste-plateformes");
                divRestePlateformes.innerHTML = `
                    <div>+${jeu.plateformes.length - 4}</div>
                `;

                platformsContainer.append(divRestePlateformes);
            }

            const boutonJeu = divCard.querySelector(".button");
            boutonJeu.addEventListener("click", () => {
                this.afficherFicheJeu(jeu);
            });
        }
    }
    
    static async afficherFicheJeu(jeu) {
        
        App.contentContainer.innerHTML = "";

        // Affichage du loader
        App.afficherLoaderContentContainer();                   


        const ficheContainer = document.createElement("div");
        ficheContainer.classList.add("fiche-container");
        ficheContainer.innerHTML = `
            <div class="first-row">
                <span class="name">${jeu.nom}</span>
                <img src="${jeu.imageSmall}">
            </div>
            <div class="second-row">
                <div class="platforms-container"></div>
                <div class="date">${jeu.date}</div>
            </div>
            <div class="third-row">
                <p>${jeu.descriptionCourte}</p>
            </div>
            <div class="fourth-row">
                <p>${jeu.descriptionLongue}</p>
            </div>
        `;

        const platformsContainer = ficheContainer.querySelector(".platforms-container");
        for (let x = 0; x < jeu.plateformes.length; x++) {

            let url = jeu.plateformes[x].api_detail_url;
            url += this.#apiKeyPlateformes;
            const resRequetePlateforme = await fetch(url);
            const jsonResRequetePlateforme = await resRequetePlateforme.json();
            
            const iconePlateforme = document.createElement("img");
            iconePlateforme.src = jsonResRequetePlateforme.results.image.icon_url;
            iconePlateforme.alt = `"logo de la plateforme ${jsonResRequetePlateforme.results.name}"`;

            platformsContainer.append(iconePlateforme);
        }
        // Fin affichage du loader
        App.contentContainer.innerHTML = "";                    
        App.contentContainer.append(ficheContainer);
    }
}