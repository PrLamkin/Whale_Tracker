var initialMap;
var coords = [0, 0];
var totalWhales;

function initMap(species) {
    $.ajax({
        url: "https://hotline.whalemuseum.org/api.json?species=" + species + "&limit=1000",
        method: "GET",
    }).then(function(response) {
        totalWhales = response;

    }).then(function() {
        initialMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: new google.maps.LatLng(2.8, -187.3),
            mapTypeId: 'terrain'
        });
        for (var i = 0; i < totalWhales.length; i++) {
            coords[0] = totalWhales[i].latitude;
            coords[1] = totalWhales[i].longitude;
            var latLng = new google.maps.LatLng(coords[0], coords[1]);
            console.log(coords)
            var marker = new google.maps.Marker({ position: latLng, map: initialMap });
        }
    });
}

$("option").on("click", function() {
    var x = $(this).text();
    initMap(x);
});
