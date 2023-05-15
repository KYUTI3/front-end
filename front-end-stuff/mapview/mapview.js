function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePosition);
    }
}

function usePosition(pos) {
    var target = L.latLng(pos.coords.latitude, pos.coords.longitude);
    map.setView(target, 14);
    L.marker(target).addTo(map).bindPopup('You')
    .openPopup();;;

    let params = {
        "latitude": pos.coords.latitude,
        "longitude": pos.coords.longitude,
        "date": 15
    };
    console.log(pos.coords.latitude + " , " + pos.coords.longitude)
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let url = 'http://localhost:8080/CorpusBackend-1.0-SNAPSHOT/api/map?' + query;
    fetch(url)
        .then(data => data.json()) .then ( text =>{
            console.log(text);
            for(var i = 0; i < text.area.length; i++){
                var report = text.area[i];
                var target2 = L.latLng(report.latitude, report.longitude);
                 L.circleMarker(target2, {color : '#FF0000'}).addTo(map).bindPopup(report.name)
                 .openPopup();;;
            }

            let list = document.getElementById("list");
 
                text.relevant_results.forEach((item)=>{
                let li = document.createElement("li");
                li.innerText = item;
                list.appendChild(li);
                })
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

var element = document.getElementById('osm-map');

element.style = 'height:700px;';

var map = L.map(element);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getLocation();                                                                