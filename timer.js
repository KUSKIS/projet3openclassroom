class Timer {
    constructor() {
        this.time = null;
        this.interval = null;
        this.timerBlock = $('#timer');
        this.min = null;
        this.sec = null;
        this.infoBooking = $('#infobooking');
        this.form = $('#form');
        this.bookingStationName = $('#bookingstationname');
        this.show();
    }
    chronometer(){
        //on initialise le temps restant
        //le temps restant = 20 min - la différence entre la date de reservation et maintenant
        //le temps est en millisecondes ex 20 min = 20 * 60 * 1000
        this.time = 20 * 60 * 1000 - (Date.now() - sessionStorage.getItem('dateBooking'));
        this.time = this.time / 1000;
        this.min = Math.floor(this.time/60);
        this.sec = Math.floor(this.time - this.min * 60);
        if(this.min < 10) {
            this.min = "0" + this.min;
        }else{
            this.min = this.min;
        }
        if(this.sec < 10) {
            this.sec = "0" + this.sec;
        }else{
            this.sec = this.sec;
        }
        this.timerBlock.text(this.min + ":" + this.sec);
        if(this.time <= 0) {
            clearInterval(this.interval);
            this.timerBlock.html("Fin de votre réservation");
        }
    }
    show(){
        if(sessionStorage.getItem('dateBooking')){
            this.infoBooking.show();
            if(sessionStorage.getItem('lastStation')){
                this.bookingStationName.html("Un vélo vous attend à la station : " + sessionStorage.getItem('lastStation') + " pour " + localStorage.getItem('lastName') + " " + localStorage.getItem('firstName') + "<br>" + "Votre réservation expirera dans :");
            }
            this.interval = setInterval((e) => {this.chronometer()}, 1000);
        }else{
            this.infoBooking.hide();
        }
    }
    clear(){
        clearInterval(this.interval);
        this.infoBooking.hide();
        this.form.show();
    }
}
