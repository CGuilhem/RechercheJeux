import DAO from "../DAO";

export default class Modal {

    static modalContainer  = document.querySelector(".modal-container");
    static modalParagraph = this.modalContainer.querySelector("p");
    static modalTriggers = document.querySelectorAll(".modal-trigger");
    static evenementDeclare = false;

    static afficherAjoutAuxFavoris(jeu) {
        this.modalParagraph.innerText = `${jeu.nom} a été ajouté aux favoris !`;
        const buttons = this.modalContainer.querySelectorAll(".choice");
        buttons.forEach(button => {
            button.classList.remove("active");
        });
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
        const buttons = this.modalContainer.querySelectorAll(".choice");
        buttons.forEach(button => {
            button.classList.remove("active");
        });
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

    static confirmationRetirerDesFavoris(jeu) {
        const buttons = this.modalContainer.querySelectorAll(".choice");
        buttons.forEach(button => {
            button.classList.add("active");
        });
        this.modalParagraph.innerText = `Souhaitez-vous réellement supprimer ${jeu.nom} de vos favoris ?`;
        this.modalContainer.classList.add("active");
    }

    static toggleModal() {
        this.modalContainer.classList.toggle("active");
    }
}