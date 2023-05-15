console.log("work");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePosition);
    }
}

var position = null;

function usePosition(pos) {
  console.log("pos");
position = pos;
}

getLocation();
function funClick (){
    
var text = document.getElementById("name").value;
console.log(text);
let url = 'http://localhost:8080/CorpusBackend-1.0-SNAPSHOT/api/map';

fetch(url, {
  method: "POST",
  mode : "no-cors",
  body: JSON.stringify({
    date: 10,
    latitude: position.coords.latitude.toString(),
    longitude: position.coords.longitude.toString(),
    name : text
  }),
  headers: {
    'Content-Type': 'plain/text'
  }
}).then(text => text.text()).then(json =>{ console.log(json);
window.location.href="index.html";}

).catch(function (error) {
            console.log('request failed', error)

        });;;


}