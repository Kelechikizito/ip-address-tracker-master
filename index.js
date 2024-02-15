let ipAddress = $('.ip-address h2');
let userLocation = $('.location h2');
let userTimezone = $('.timezone h2');
let userISP = $('.isp h2');

let form = $('form');
let inputField = $('input');
let button = $('button');

let map;

function mapper(lat, long) {
    if (!map) {
        map = L.map('map').setView([lat, long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.setView([lat, long], 13);
    }

    const locationIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [35, 45],
        iconAnchor: [15, 15]
    });  

    L.marker([lat, long], {icon: locationIcon}).addTo(map);
}

function getUserIP(api) {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mapper(data.latitude, data.longitude);
        ipAddress.text(data.ip);
        userLocation.text(`${data.city}, ${data.country_name}`);
        userTimezone.text(`UTC ${data.utc_offset.slice(0,3)}:00`);
        userISP.text(data.org);
    })
    .catch(err => {
        alert(err);
        console.error(err);
    });
}

getUserIP(`https://ipapi.co/json`);

button.click(function (e) { 
    getUserIP(`https://ipapi.co/${inputField.val()}/json`);
    e.preventDefault();
});
