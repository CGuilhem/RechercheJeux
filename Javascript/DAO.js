import Jeu from "./Models/Jeu";
import Modal from "./Composants/Modal";
import GestionnaireFavoris from "./GestionnaireFavoris";

export default class DAO {
    static #url = "https://www.giantbomb.com/api/games/?api_key=eaa76483af84e465ae49aa95536b55edf29396b4&format=json&filter=name:";
    static #mapJeux = new Map();
    static #mesJeux = new Map();

    static async telechargerDonneesJeux(recherche) {
        this.#mapJeux.clear();
        try {
            if (recherche !== "") {

                const urlRequest = this.#url + recherche;

                const resRequeteJeux = await fetch(urlRequest);
                const jsonResRequeteJeux = await resRequeteJeux.json();
                const listeJeux = jsonResRequeteJeux.results;
                if (!listeJeux || !Array.isArray(listeJeux)) {
                    throw new Error("Les données de la réponse ne sont pas conformes");
                }

                listeJeux.forEach(jsonJeu => {
                    const jeu = new Jeu(jsonJeu);
                    this.#mapJeux.set(jeu.guid, jeu);
                });

                return this.#mapJeux;          
            } else {
                alert("La recherche est vide !");
                return new Map();
            }
        } catch(error) {
            console.error(error);
            alert("Erreur lors du téléchargement des données des jeux.");
        }
    }

    static ajouterAuxFavoris(jeu) {
        this.#mesJeux.set(jeu.guid, jeu);
        this.#sauvegarderMesFavoris();
        Modal.afficherAjoutAuxFavoris(jeu);
    }

    static retirerDesFavoris(jeu) {

        Modal.confirmationRetirerDesFavoris(jeu);

        const modalContainer = document.querySelector(".modal-container");          //Tout ça ne devrait pas être dans le DAO mais je n'ai pas réussi à trouver un traitement afin de retourner une valeur de Modal.confirmationRetirerDesFavoris
        const choices = modalContainer.querySelectorAll(".choice");

        choices[0].addEventListener("click", () => {
            this.confirmerSuppressionDesFavoris(jeu);
            choices.forEach(choice => {
                choice.classList.remove("active");
            });
            modalContainer.classList.toggle("active");
        });
        choices[1].addEventListener("click", () => {
            modalContainer.classList.remove("active");
        });  
    }

    static confirmerSuppressionDesFavoris(jeu) {
        this.#mesJeux.delete(jeu.guid);
        this.#sauvegarderMesFavoris();
        Modal.afficherRetraitDesFavoris(jeu);
        GestionnaireFavoris.clickBoutonFavoris();
    }

    static #sauvegarderMesFavoris() {
        const tableauMesFavoris = Array.from(this.#mesJeux.values());
        window.localStorage.setItem("mesJeux", JSON.stringify(tableauMesFavoris));  // à chaque fois, je repasserai ici avec la même clé donc j'écraserai le contenu de l'ancienne map
    }

    static chargerMesJeux() {
        this.#mesJeux = new Map();
        const json = window.localStorage.getItem("mesJeux");
        if (!json) {
            return this.#mesJeux;
        }

        const tableauParse = JSON.parse(json);
        tableauParse.forEach(jeuObj => {
            const favoris = new Jeu(jeuObj.jsonJeu);
            this.#mesJeux.set(favoris.guid, favoris);
        });
        return this.#mesJeux;
    }
}