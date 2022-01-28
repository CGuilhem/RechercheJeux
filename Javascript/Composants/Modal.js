import DAO from "../DAO";

export default class Modal {

    static modalContainer  = document.querySelector(".modal-container");
    static modalParagraph = this.modalContainer.querySelector("p");
    static modalTriggers = document.querySelectorAll(".modal-trigger");
    static evenementDeclare = false;

    static afficherAjoutAuxFavoris(jeu) {
        this.modalParagraph.innerText = `${jeu.nom} a été ajouté aux favoris !`;
        this.modalContainer.classList.toggle("active");

        if (this.evenementDeclare === false) {
            this.modalTriggers.forEach(trigger => {
                trigger.addEventListener("click", () => {
                    this.toggleModal();
                });
            });
            this.evenementDeclare = true;
        } 
    }

    // On peut totalement la fusionner à la première
    static afficherRetraitDesFavoris(jeu) {
        this.modalParagraph.innerText = `${jeu.nom} a été supprimé des favoris.`;
        this.modalContainer.classList.toggle("active");

        if (this.evenementDeclare === false) {
            this.modalTriggers.forEach(trigger => {
                trigger.addEventListener("click", () => {
                    this.toggleModal();
                });
            });
            this.evenementDeclare = true;
        } 
    }

    static confirmationRetirerDesFavoris(jeu, callback) {
        this.modalParagraph.innerText = `Souhaitez-vous réellement supprimer ${jeu.nom} de vos favoris ?`;
        const choices = this.modalContainer.querySelectorAll(".choice");

        choices.forEach(choice => {
            choice.classList.toggle("active");
        });

        choices[0].addEventListener("click", () => {
            return true;
        });
        choices[1].addEventListener("click", () => {
            return false;
        });

        this.toggleModal();
    }

    static toggleModal() {
        this.modalContainer.classList.toggle("active")
    }
}