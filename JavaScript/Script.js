var initialMap;
var coords = [0, 0];
var totalWhales;
var infoBox = "Hellooo whales!";

// parameters will be either "species=userSelection" or "near=123,123&radius=25" to build the whaleAPI URL based on user selection
function initMap(parameters) {
    $.ajax({
        url: "https://hotline.whalemuseum.org/api.json?" + parameters + "&limit=1000",
        method: "GET",
    }).then(function(response) {
        totalWhales = response;

    }).then(function() {
        console.log("initMap is running! and parameters var is: " + parameters);
        initialMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: new google.maps.LatLng(48.5159, -123.1524),
            mapTypeId: 'terrain'
        });
        for (var i = 0; i < totalWhales.length; i++) {
            infoBox = "Species: " + totalWhales[i].species + "++";
            infoBox += "Quantity: " + totalWhales[i].quantity + "++";
            infoBox += "Location: " + totalWhales[i].location + "++";
            infoBox += "Sigthed at: " + totalWhales[i].sighted_at;
            coords[0] = totalWhales[i].latitude;
            coords[1] = totalWhales[i].longitude;
            var latLng = new google.maps.LatLng(coords[0], coords[1]);
            var marker = new google.maps.Marker({ position: latLng, map: initialMap });
            console.log(marker);
            attachInfo(marker, infoBox);
        }
    });
}

function attachInfo(marker, infoBox) {
    const infowindow = new google.maps.InfoWindow({
        content: infoBox
    });
    marker.addListener("click", function() {
        infowindow.open(marker.get("map"), marker);
    });
}

// geocoder takes a text and returns latitude and longtitude of that location. Then we build whalesURL and pass it to initMap
function geocoder(addressTxt) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressTxt + "&key=AIzaSyDvMk0f3LfIKcsMM-iJ_wkRL5DVjCTR-70",
        method: "GET"
    }).then(function(response) {
        var latLongURL;
        var locationLat = response.results[0].geometry.location.lat;
        latLongURL = "near=" + locationLat + ",";
        var locationLong = response.results[0].geometry.location.lng;
        console.log("the geocoder returned: " + locationLat + "," + locationLong);
        latLongURL = latLongURL + locationLong + "&radius=25";
        initMap(latLongURL);
    })
}


// event handler for the species dropdown menu. calls the initMap by passing 
$("option").on("click", function() {
    var speciesInput = $(this).text();
    var speciesURL = "species=" + speciesInput;
    initMap(speciesURL);
});
// event handler for the search box. It passes the user Input to geocoder, which returns lat,lng to be passed as URL for whales API
$("#submit").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#text").val().trim();
    console.log("the user searched for: " + searchInput);
    geocoder(searchInput);
});