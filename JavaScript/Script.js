var initialMap;
var coords = [0, 0];
var totalWhales;
var infoBox = "<div>";
var imgURL = {
    "orca" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fearthjustice.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fimage_800x600%2Fpublic%2Forca_sunset_istock.jpg%3Fitok%3DiyNKlNYB&f=1&nofb=1",
    "gray whale" : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fdarwin.bio.uci.edu%2F~sustain%2Fissueguides%2FGray_whale%2Fgraysea-full.GIF&f=1&nofb=1",
    "humpback" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fichef.bbci.co.uk%2Fimages%2Fic%2F1200x675%2Fp06zlc8r.jpg&f=1&nofb=1"
}

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
                center: new google.maps.LatLng(48.5159,-123.1524),
                mapTypeId: 'terrain'
              });
              for (var i = 0; i < totalWhales.length; i++) {
                  var speciesType = totalWhales[i].species;
                  infoBox += "<img style:'max-height: 50px; max-width: 50px; overflow: hidden;' src='" + imgURL[speciesType] + "'><br>";
                  infoBox += "Species: " + totalWhales[i].species + "<br>";
                  infoBox += "Quantity: " + totalWhales[i].quantity + "<br>";
                  infoBox += "Location: " + totalWhales[i].location + "<br>";
                  infoBox += "Sigthed at: " + totalWhales[i].sighted_at + "<br></div>";
                  coords[0] = totalWhales[i].latitude;
                  coords[1] = totalWhales[i].longitude;
                  var latLng = new google.maps.LatLng(coords[0],coords[1]);
                  var marker = new google.maps.Marker({position: latLng, map: initialMap});
                  attachInfo(marker, infoBox);
              }
            });
          }

function attachInfo(marker, infoBox) {
        const infowindow = new google.maps.InfoWindow({
            content: infoBox,
        });
        marker.addListener("click", function() {
            infowindow.open(marker.get("map"), marker);
        });
}

// geocoder takes a text and returns latitude and longtitude of that location. Then we build whalesURL and pass it to initMap
function geocoder(addressTxt){
        $.ajax({
            url : "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressTxt +"&key=AIzaSyDvMk0f3LfIKcsMM-iJ_wkRL5DVjCTR-70",
            method : "GET"
        }).then(function(response){
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
$("option").on("click", function(){   
        var speciesInput = $(this).text();
        var speciesURL = "species=" + speciesInput; 
        initMap(speciesURL);
});
// event handler for the search box. It passes the user Input to geocoder, which returns lat,lng to be passed as URL for whales API
$("#submit").on("click", function(event){
        event.preventDefault();   
        var searchInput = $("#text").val().trim();
        console.log("the user searched for: " + searchInput);
        geocoder(searchInput);
});