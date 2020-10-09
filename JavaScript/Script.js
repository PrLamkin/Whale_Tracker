var initialMap;
var coords = [0, 0];
var totalWhales;
var infoBox = "Hellooo whales!";
var imgURL = {
    "orca" : "https://bit.ly/36PhpWm",
    "gray whale" :"https://bit.ly/33Jri5Z",
    "humpback" : "https://bit.ly/3iGDtVr",
    "minke" : "https://bit.ly/34E6bkF",
    "atlantic white-side dolphin" : "https://bit.ly/33KxVou",
    "pacific white-sided dolphin" : "https://bit.ly/2SFr21n",
    "dalls porpoise" : "https://bit.ly/34G9JTn",
    "harbor porpoise" : "https://bit.ly/3dcMkgd",
    "harbor seal" : "https://bit.ly/34JcWBG" ,
    "northern elephant seal" : "https://bit.ly/3ltNG9w",
    "southern elephant seal" : "https://bit.ly/33H2nje",
    "california sea Lion" : "https://bit.ly/34JqYmO",
    "steller sea lion" : "https://bit.ly/3lwFkh4",
    "sea otter" : "https://bit.ly/3iJrvu9"
}

var whalesFacts = {
    "gray whale": "gray whale facts go here",

    "orca" : "orca facts go here",

    "humpback" : "humpback facts go here",

    "atlantic white-sided dolphin" : "facts part goes here",

    "pacific white-sided dolphin" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "harbor porpoise": `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "minke": `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "dalls porpoise" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,
    "harbor porpoise": `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "harbor seal" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "northern elephant seal" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "southern elephant seal" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "california seal Lion" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "steller sea lion" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`,

    "sea otter" : `Like other large whales, the humpback was a target for the whaling industry. The species was once hunted to the brink of extinction; its population fell by an estimated 90% before a 1966 moratorium. While stocks have partially recovered to some 80,000 animals worldwide, entanglement in fishing gear, collisions with ships and noise pollution continue to affect the species.`

}
// parameters will be either "species=userSelection" or "near=123,123&radius=25" to build the whaleAPI URL based on user selection
function initMap(parameters) {
        $.ajax({
          url: "https://hotline.whalemuseum.org/api.json?" + parameters + "&limit=1000",
          method: "GET",
        }).then(function(response) {
            totalWhales = response;
            
        }).then(function() {
            initialMap = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: new google.maps.LatLng(48.5159,-123.1524),
                mapTypeId: 'terrain'
              });
              for (var i = 0; i < totalWhales.length; i++) {
                var speciesType = totalWhales[i].species;
                  infoBox = "<img class=pictureSize src='" + imgURL[speciesType] + "'><br>";
                  infoBox += "Species: " + totalWhales[i].species + "<br>";
                  infoBox += "Quantity: " + totalWhales[i].quantity + "<br>";
                  infoBox += "Location: " + totalWhales[i].location + "<br>";
                  infoBox += "Sigthed at: " + totalWhales[i].sighted_at;
                  coords[0] = totalWhales[i].latitude;
                  coords[1] = totalWhales[i].longitude;
                  var latLng = new google.maps.LatLng(coords[0],coords[1]);
                  var marker = new google.maps.Marker({position: latLng, map: initialMap});
                  attachInfo(marker, infoBox);
              }
            });
          }
function displayFacts(selectedSpecies) {
    $("#facts").empty();
    $("#facts").text(whalesFacts[selectedSpecies]);
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
            latLongURL = latLongURL + locationLong + "&radius=0.5";
            initMap(latLongURL);
        })
}


// event handler for the species dropdown menu. calls the initMap by passing 
$("option").on("click", function(){   
        var speciesInput = $(this).text();
        var speciesURL = "species=" + speciesInput; 
        initMap(speciesURL);
        displayFacts(speciesInput);
});
// event handler for the search box. It passes the user Input to geocoder, which returns lat,lng to be passed as URL for whales API
$("#submit").on("click", function(event){
        event.preventDefault();   
        var searchInput = $("#text").val().trim();
        console.log("the user searched for: " + searchInput);
        geocoder(searchInput);
});