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
    "gray whale": `The gray whale is a large marine mammal that is part of the  baleen whale suborder and belongs to the cetacean family which also includes dolphins and porpoises.

    During the whaling industry, which occurred between the 17th – 20th centuries the gray whale was hunted largely for its oil until the point of near became extinction.
    
    Fortunately with the aid of organizations and the government marine mammals such as the gray whale are now a protected species and hunting them is considered illegal.
    
    Today their numbers have grown and it is estimated that there are at least 20,000 gray whales currently in existence since the end of the commercial whaling era.`,

    "orca" : "Orcas, or killer whales, are the largest of the dolphins and one of the world's most powerful predators. They're immediately recognizable by their distinctive black-and-white coloring. Smart and social, orcas make a wide variety of communicative sounds, and each pod has distinctive noises that its members will recognize even at a distance. They use echolocation to communicate and hunt, making sounds that travel underwater until they encounter objects, then bounce back, revealing their location, size, and shape.",

    "humpback" : `Humpback whales are found in every ocean in the world. Their Latin name, Megaptera novaeangliae, means "big wing of New England." It refers to their giant pectoral fins, which can grow up to 16 feet long, and their appearance off the coast of New England, where European whalers first encountered them. They have dark backs, light bellies, pleats on their throats, and a small hump in front of their dorsal fin, leading to the common name of "humpback."`,

    "atlantic white-sided dolphin" : `The Atlantic white-sided dolphin is a mid – large-sized dolphin that can be found traveling in the North Atlantic ocean.

    Given its name because of its white belly and sides the Atlantic white-sided dolphin has a visual appeal that stands out when compared to other dolphin species.
    
    These dolphins are a playful species that enjoy traveling together in large groups that can contain several dozen or more dolphins.
    
    When compared to other dolphin species the Atlantic white-sided dolphin appears to be slightly larger in nature than average.`,

    "pacific white-sided dolphin" : `The pacific white sided dolphin is a small to medium sized dolphin that can be found living in the North Pacific Ocean.

    This dolphin gets its name from its dark gray upper body which is flanked by its white sides and underbody.
    
    The pacific white sided dolphin is considered closely related to the dusky dolphin and shares many of the same physical characteristics with them as well.`,

    "harbor porpoise": `Harbor porpoises are shy, elusive sea mammals whose numbers are declining primarily because they are frequently caught by accident in commercial fishing nets. Specific numbers are unknown, but some scientists think their enormous range may mean that despite the declines, sizable populations could remain.`,

    "minke": `The minke whale (Balaenoptera acutorostrata/bonaerensis) is part of the baleen whale suborder and belongs to the group known as Cetacea which includes whales, dolphins and porpoises.

    They are the second smallest of the baleen whales next to the pygmy right whale.
    
    There are two known species of minke whales in existence, the common or north Atlantic minke whale and the Antarctic or southern minke whale.
    
    The dwarf minke whale is considered by some to be a third species of the minke whale although it is still a debatable topic.
    
    The minke whale is the most abundant whale in the Rorqual family of whales which also includes the humpback whale, the blue whale, the sei whale, the fin whale, Bryde’s whale and Omura’s whale.`,

    "dalls porpoise" : `Dall’s porpoises are among the most distinctive in the porpoise family.

    Their bodies are muscular and stocky, and their backs are dark grey or black.
    
    One of their most unique characteristics is the white, oval-shaped paneling on their sides and underbelly.
    
    Their tails are also trimmed with white, and their dorsal fins, which are set slightly back from the center of their body, may be solid black or splashed with white.
    
    Dall’s porpoises have triangular heads, which are relatively small compared to their bodies, end in a small, but powerful beak.
    
    This beak contains up to 46 teeth in their upper jaw and up to 48 teeth in their lower jaw.`,
    "harbor porpoise": `Harbor porpoises are found throughout the temperate coastal waters of the Northern Hemisphere. As their name suggests, they prefer the shallows, less than 500 feet deep, and are commonly seen in harbors and bays. They are also known to frequent inland waters, including rivers, estuaries, and tidal channels.

    Harbor porpoises survive primarily on fish and are among the smallest of the cetaceans, reaching an average size of about 5 feet and 121 pounds. They can dive deep, more than 655 feet, but usually stay near the surface, coming up about every 25 seconds to breathe with a distinctive puffing noise that resembles a sneeze.`,

    "harbor seal" : `Pacific harbor seals are the most common marine mammal in Puget Sound, and their populations are healthy.
    Seals share a common ancestor with dogs and bears and have upper and lower arms and legs concealed within their skin. Only their hands and feet extend outside the body envelope.
    Seals have large eyes to see in dark, deep water. They have long necks, which they can shoot out quickly to catch fish while swimming.
    Seals can live in fresh or saltwater; they usually spend their entire lives in an area of about five miles.
    Baby seals are born weighing about 25 pounds. They double their weight in the first month; their mother's milk is 40 percent fat.`,

    "northern elephant seal" : `The northern elephant seal is the largest of the “true” seal in the Northern Hemisphere. Adult males use their large, inflatable noses during the winter breeding season to resonate sound when vocally threatening each other. The largest colonies of northern elephant seals are found off southern California in the Channel Islands. They have one of the longest migrations of any mammal; some have been recorded traveling over 13,000 miles roundtrip.

    Northern elephant seals were once thought to be extinct due to commercial sealing in the 1800s. Populations of northern elephant seals in the U.S. and Mexico were all originally derived from a few hundred individuals surviving in Mexico. Its population began to steadily increase in the early 1900s.
    
    Northern elephant seals, like all marine mammals, are protected by the Marine Mammal Protection Act.`,

    "southern elephant seal" : `The Southern Elephant Seal is the largest of all seals in the world. The males can weigh up to 8,500 lb and the females 2,000 lb. The males are generally twice as long as the females. The males can be up to 20 feet in length. They are a dark brown to light gray in color just like elephants.

    Their heads are much larger than any other type of seal which is a good match for their bodies. The males have what appears to be a trunk that protrudes from the front of their face, which is another reason why they have this particular name associated with them.`,

    "california seal Lion" : `Like other "eared" seals, California sea lions have prominent external ear flaps and long foreflippers covered in fur past the wrist and tiny claws. The hind flippers are shorter and also have short claws at the ends of the digits.
    Male:  Adult male California sea lions have a prominent sagittal (cranial) crest, making them easy to distinguish from females and immature males. Mature males also tend to be a much darker brown color and are substantially larger than adult females. Unlike many other species of sea lion, California sea lion males lack a well-defined mane.
    Female:  Mature females and immature males are light yellowish to tan in color and lack the prominent sagittal crest of the adult male.`,

    "steller sea lion" : `Steller sea lion, also referred to as Northern sea lion, is the only member of the Eumetopias genus. Among the Pinnipeds, this creature is smaller in size compared to the elephant seal and the walrus. Named after Georg Steller, the naturalist who described the mammal in 1741, the sea lion lives in the North Pacific Ocean. This species is classified as near threatened by the IUCN since they are considered endangered and could face extinction at any time in the future.`,

    "sea otter" : `Sea otters (Enhydra lutris) are an easily recognized and beloved marine mammal. They have furry bodies, whiskered faces, and a propensity to lay on their backs and float on the water, a behavior that humans perceive as evidence of fun-loving. They are native to the northern coastlines of the Pacific Ocean, from northern Japan to Baja, Mexico. Most critically, they are a keystone species, meaning that their continued existence is required for several other species to survive.`

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
