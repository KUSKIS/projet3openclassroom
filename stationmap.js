class Map {
    constructor() {
        this.map = L.map('map').setView([47.2173, -1.5534], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Vza2lzIiwiYSI6ImNrM3VkYzQ3azBiaGwzZm8zdDViYnNranMifQ.aS8_QToHWt_uEt_lkQhzAA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoia3Vza2lzIiwiYSI6ImNrM3VkYzQ3azBiaGwzZm8zdDViYnNranMifQ.aS8_QToHWt_uEt_lkQhzAA'
        }).addTo(this.map);
        this.bodyHtml = $('html,body');
        this.infoStation = $('#infostation span');
        this.nameStation = $('#namestation');
        this.adressOfStation = $('#adressofstation');
        this.statusOfStation = $('#statusofstation');
        this.numberPlace = $('#numberplace');
        this.availableBikes = $('#availablebikes');
        this.unavailableBike = $('.unavailablebike');
        this.underConstructionStation = $('.underconstructionstation');
        this.form = $('#form');
        this.lastStationClick = null;
        this.getMarkerStation();
    }
    getMarkerStation(){
        $.ajax({
            url:'https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=01c7b6b75f975a95c1a0d2411c1c3bc2dcfef4f6',
            type: 'GET',
            datatype: 'json',
            success: (stations) =>{
                stations.forEach((station) =>{
                    let marker = L.marker([station.position.latitude, station.position.longitude]).addTo(this.map);
                    this.displayStationInfos(marker,station);

                })
            }
        });
    }
    displayStationInfos (marker,stationData){
        marker.on('click', () =>{
            this.lastStationClick = stationData;
            this.bodyHtml.animate({scrollTop: $('#infostation').offset().top}, 'slow');
            this.nameStation.text(stationData.name);
            this.adressOfStation.text(stationData.address);
            this.statusOfStation.text(this.translate(stationData.status));
            this.numberPlace.text(stationData.totalStands.capacity);
            this.availableBikes.text(stationData.totalStands.availabilities.bikes);
            this.infoStation.css('color','#37474F');
        if(stationData.totalStands.availabilities.bikes === 0){
            this.form.hide();
            this.unavailableBike.show();
            return; //définit la valeur à renvoyer a la fonction appelante
        }else{
            this.unavailableBike.hide();
            this.form.show();
        }
        if(stationData.status === 'CLOSED'){
            this.underConstructionStation.show();

        }else{
            this.underConstructionStation.hide();
            this.form.show();
        }

        });
    }
    translate(word){
        if(word === 'OPEN'){
            return 'Ouvert';
        }else if(word === 'CLOSED'){
            return 'Fermé';
        }
    }

}




