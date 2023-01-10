$(function() {
    var map = initMap();
    // On se souscrit à l'événement keyup du champ code postal
    $('#zip').keyup(function() {
        var zip = $(this).val();
        // On vérifie que le code postal est bien composé de 4 chiffres.
        if (zip.length == 4) {
            // On appelle la fonction refreshCity pour récupérer les villes correspondantes au code postal
            refreshCity(zip);
        } else {
            // On cache le champ ville et on vide la carte
            disableCityAndMap();
        }
    });

    // On se souscrit à l'événement change du champ ville
    $('#city').change(function() {
        // On récupère les coordonnées de la ville sélectionnée
        var latitude = $(this).find(':selected').data('latitude');
        var longitude = $(this).find(':selected').data('longitude');
        // On appelle la fonction refreshMap pour afficher la carte
        refreshMap(map, latitude, longitude);
    });
});

// Fonction qui récupère les villes correspondantes au code postal et qui les affiche dans le champ ville
function refreshCity(zip) {
    $.get('http://api.zippopotam.us/be/' + zip, function(data) {
        var dropdown = $('#city');
        dropdown.empty();
        $.each(data.places, function() {
            dropdown.append($("<option />").val(this['place name']).text(this['place name']).data('latitude', this['latitude']).data('longitude', this['longitude']));
        });
        dropdown.change(); // On force l'événement change pour afficher la carte
        $('#city-group').removeClass('d-none');
        $('#zip').removeClass('is-invalid');
    }).fail(function() {
        $('#zip').addClass('is-invalid');
    });
}

// Fonction qui désactive le champ ville et qui vide la carte
function disableCityAndMap() {
    $('#city-group').addClass('d-none');
    $('#map').addClass('d-none');
}

function initMap() {
    let map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
}

// Fonction qui affiche la carte
function refreshMap(map, latitude, longitude) {
    $('#map').removeClass('d-none');
    map.setView([latitude, longitude], 12);
    $('#map').get(0).scrollIntoView();
}   
