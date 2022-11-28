var prenom = prompt('Quel est ton prénom ?');
var sexe = confirm('Etes-vous un homme ?');
// var civilite = null;
// if (sexe === true) {
//     civilite = 'Monsieur';
// } else {
//     civilite = 'Madame';
// }
// document.getElementById('welcome').innerHTML = 'Bonjour ' + civilite + ' ' + prenom;

var civilites = {true: 'Monsieur', false: 'Madame'};

if(prenom) {
    document.getElementById('welcome').innerHTML = 'Bonjour ' + civilites[sexe] + ' ' + prenom;
}
else {
    document.getElementById('welcome').classList.add('d-none');
}
