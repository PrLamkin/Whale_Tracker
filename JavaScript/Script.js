var initialMap;
var coords = [0, 0];
var totalWhales;

function initMap(species) {
        $.ajax({
          url: "http://hotline.whalemuseum.org/api.json?species=" + species + "&limit=1000",
          method: "GET",
        }).then(function(response) {
            totalWhales = response;
            
        }).then(function() {
            initialMap = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8,-187.3),
                mapTypeId: 'terrain'
              });
              for (var i = 0; i < totalWhales.length; i++) {
                  coords[0] = totalWhales[i].latitude;
                  coords[1] = totalWhales[i].longitude;
                  var latLng = new google.maps.LatLng(coords[0],coords[1]);
                  console.log(coords)
                  var marker = new google.maps.Marker({position: latLng, map: initialMap});
              }
            });
          }
          
        var locationLong;
        var locationLat;
        function spot(z){
        $.ajax({
          url : "https://maps.googleapis.com/maps/api/geocode/json?address=" + z +"&key=AIzaSyDvMk0f3LfIKcsMM-iJ_wkRL5DVjCTR-70",
          method : "GET"
        }).then(function(response){
          locationLat = response.results[0].geometry.location.lat
          console.log(locationLat)
          locationLong = response.results[0].geometry.location.lng
          console.log(locationLong)
        })
      }
      spot()


      $("option").on("click", function(){   
        var x = $(this).text();
        initMap(x);
      });

      $("#submit").on("click", function(event){
        event.preventDefault();   
        var z = $("#text").val().trim();
        spot(z)
      });



