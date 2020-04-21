class Booking {
    constructor() {
        this.map = new Map();
        this.canvas = new Canvas();
        this.timer = new Timer();
        this.form = $('#form');
        this.label =$('#identity');
        this.lastName = $('#lastname');
        this.firstName = $('#firstname');
        this.bookingButton = $("#booking");
        this.canvasContainer = $('#canvascontainer');
        this.infoCanvas = $("#infocanva");
        this.validateButton = $("#validbutton");
        this.deletedButton = $("#deletedbutton");
        this.cancelButton = $("#cancelbutton");
        this.errorCapture = $('.errorcapture');
        this.drawing = $("#drawing");
        this.infoBooking = $('#infobooking');
        this.bookingStationName = $('#bookingstationname');
        this.eventManager();
        this.keepInput();
    }
    eventManager(){
        this.bookingButton.click(() =>{
            if(this.lastName.val() != "" && this.firstName.val() != ""){
                this.memoriseInput();
                this.form.hide();
                this.canvasContainer.slideDown(1000);
                this.infoBooking = $('#infobooking');
                //on cache la partie nom et premon et on affiche le canvas et ses boutons
            }
            else if(this.lastName.val() === "" || this.firstName.val() === ""){
                this.errorCapture.show();
            }
            //else si le premon ou le nom est vide alors alerte erreur
        });
        this.validateButton.click(() =>{
            this.errorCapture.hide();
            this.canvas.ctx.clearRect(0, 0, 300, 250);
            this.bookingManager();
            //cacher le canvas et efface l'intérieur fonction clear() et on appelle bookingManager
        })
        this.deletedButton.click(() =>{
            this.canvas.ctx.clearRect(0, 0, 300, 250);
        })
        this.cancelButton.click(() =>{
            this.timer.clear();
            sessionStorage.clear();
            this.resaStationName.hide();
            this.cancelButton.hide();
            this.form.show();
            //on annule la réservation et on revient au formulaire et la map
        })
    }
    memoriseInput(){
        localStorage.setItem('lastName', this.lastName.val());
        localStorage.setItem('firstName', this.firstName.val());
    }
    keepInput(){
        this.lastName.val(localStorage.getItem('lastName'));
        this.firstName.val(localStorage.getItem('firstName'));
    }
    bookingManager(){
        sessionStorage.setItem('dateBooking', Date.now());
        sessionStorage.setItem('lastStation', this.map.lastStationClick.name);
        this.bookingStationName.html("Un vélo vous attend à la station : " + this.map.lastStationClick.name + "pour" + this.lastName.val() + this.firstName.val() + "<br>" + "Votre réservation expirera dans :");
        this.timer.show();
        this.cancelButton.show();
        this.canvasContainer.hide();
        this.form.hide();
        //affiche le bloque de réservation (date, temps) et faire un sessionstorage de la réservation
    }

}


