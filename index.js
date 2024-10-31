// Ajout d'un écouteur d'événement sur le formulaire de tâche
document.getElementById("formulaire-tache").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const nom = document.getElementById("nom-tache").value; // Récupère le nom de la tâche
    const description = document.getElementById("description-tache").value; // Récupère la description de la tâche
    const echeance = document.getElementById("echeance-tache").value; // Récupère la date d'échéance de la tâche
    const dateDeCreation = new Date().toLocaleDateString("fr-FR"); // Récupère la date de création au format français
    ajouterTache(nom, description, dateDeCreation, echeance); // Ajoute la tâche à la liste
    this.reset(); // Réinitialise le formulaire
});

// Ajouter une tâche à la liste
function ajouterTache(nom, description, dateDeCreation, echeance) {
    const listeTaches = document.getElementById("liste-taches");

// Créer l'élément de tâche
    const tacheElement = document.createElement("li");
    tacheElement.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start");

    // Créer la div contenant les informations de la tâche
    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "ms-2 me-auto");

    // Créer l'élément pour le nom de la tâche
    const nomElement = document.createElement("div");
    nomElement.setAttribute("class", "fw-bold");
    nomElement.textContent = `Nom: ${nom}`;

    // Créer l'élément pour la description de la tâche
    const descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("class", "mb-1");
    descriptionElement.textContent = `Description de la tâche : ${description}`;

    // Créer l'élément pour la date de création
    const dateCreationElement = document.createElement("small");
    dateCreationElement.textContent = `Date de création : ${dateDeCreation}`;

    // Créer l'élément pour la date d'échéance
    const dateEcheanceElement = document.createElement("small");
    dateEcheanceElement.textContent = `Date limite : ${echeance}`;

    // Créer une div contenant les boutons d'action
    const divActions = document.createElement("div");

    // Créer le bouton "Terminé"
    const boutonTermine = document.createElement("button");
    boutonTermine.setAttribute("class", "btn btn-success btn-sm me-1");
    boutonTermine.textContent = "Terminé";
    boutonTermine.onclick = function () {
        marquerTerminee(this);
    };

    // Créer le bouton modifier
    const boutonModifier = document.createElement("button");
    boutonModifier.setAttribute("class", "btn btn-warning btn-sm me-1");
    boutonModifier.textContent = "Modifier";
    boutonModifier.onclick = function () {
        modifierTache(this);
    };

    // Créer le bouton supprimer
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.setAttribute("class", "btn btn-danger btn-sm me-1");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.onclick = function () {
        supprimerTache(this);
    };

    // Ajouter les éléments à la divInfo
    divInfo.appendChild(nomElement);
    divInfo.appendChild(descriptionElement);
    divInfo.appendChild(dateCreationElement);
    divInfo.appendChild(document.createElement("br"));
    divInfo.appendChild(dateEcheanceElement);

    // Ajouter des boutons à la div actions
    divActions.appendChild(boutonTermine);
    divActions.appendChild(boutonModifier);
    divActions.appendChild(boutonSupprimer);

    // Ajouter à l'élément de tâche
    tacheElement.appendChild(divInfo);
    tacheElement.appendChild(divActions);

    // Ajouter l'élément de tâche à la liste des tâches
    listeTaches.appendChild(tacheElement);
}

// marquer une tâche comme terminée
function marquerTerminee(bouton) {
    const tacheElement = bouton.parentElement.parentElement;
    tacheElement.classList.toggle("list-group-item-success"); // Ajoute ou enlève la classe de succès
}

// modifier une tâche
function modifierTache(bouton) {
    const tacheElement = bouton.parentElement.parentElement;
    const nom = prompt("Modifier le nom de la tâche", tacheElement.querySelector(".fw-bold").textContent.replace("Nom: ", ""));
    const description = prompt("Modifier la description", tacheElement.querySelector(".mb-1").textContent.replace("Description de la tâche : ", ""));
    const echeance = prompt("Modifier l'échéance (jj-mm-aaaa)", tacheElement.querySelectorAll("small")[1].textContent.replace("Date limite : ", ""));
    if (nom && description && echeance) {
        tacheElement.querySelector(".fw-bold").textContent = `Nom: ${nom}`;
        tacheElement.querySelector(".mb-1").textContent = `Description de la tâche : ${description}`;
        tacheElement.querySelectorAll("small")[1].textContent = `Date limite : ${echeance}`;
    }
}

// supprimer une tâche
function supprimerTache(bouton) {
    const tacheElement = bouton.parentElement.parentElement;
    tacheElement.remove(); // Supprime l'élément de la tâche
}

// trier les tâches par date d'échéance
function trierTachesParDate() {
    const listeTaches = document.getElementById("liste-taches");
    const taches = Array.from(listeTaches.getElementsByTagName("li"));

    taches.sort((a, b) => {
        const dateA = new Date(a.querySelectorAll("small")[1].textContent.replace("Date limite : ", ""));
        const dateB = new Date(b.querySelectorAll("small")[1].textContent.replace("Date limite : ", ""));
        return dateA - dateB;
    });

    taches.forEach(tache => listeTaches.appendChild(tache)); // trie les tâches dans la liste la date la plus proche à la plus éloigné
}