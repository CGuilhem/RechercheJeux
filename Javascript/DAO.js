import Jeu from "./Models/Jeu";

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