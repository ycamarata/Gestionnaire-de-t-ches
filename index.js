let ajoutListe = document.getElementById("liste");

function ajoutez() {
    let input = document.getElementById("input");
    
    let texte = input.value;
    if (texte === "") {
        return; // rien faire si le champ est vide
    }
    let li = document.createElement("li"); //crée les li
    li.setAttribute("class","m-2 list-inline")
    li.innerHTML = texte;

    //bouton modifier
    let modifButton = document.createElement("button");
    modifButton.setAttribute("class","btn btn-primary m-3");
    modifButton.textContent = "Modifier";
    modifButton.onclick = function () {
        modifier(li);
    };

    //bouton supprimer
    let supprimeButton = document.createElement("button");
    supprimeButton.setAttribute("class","btn btn-primary m-3");
    supprimeButton.textContent = "Supprimer";
    supprimeButton.onclick = function () {
        supprimeDemande(li);
    };

    li.appendChild(modifButton);
    li.appendChild(supprimeButton);
    ajoutListe.appendChild(li);
    input.value = "";
}
//boutton modifier pour la tache
function modifier(demande) {
    let texteElement = demande.firstChild;
    let texte = texteElement.textContent;
    let newTexte = prompt("Modifier la tâche :", texte);
    if (newTexte === null || newTexte === "") {
        return; //si valeur nulle ne rien faire
    }
    texteElement.textContent = newTexte;
}
//pour supprimer une tache
function supprimeDemande(demande) {
    ajoutListe.removeChild(demande);
}