class App {
    constructor(){
        this.slider = new Slider('#slider', '#slider li', '.fa-forward', '.fa-backward', '.fa-pause-circle');
        this.booking = new Booking();
    }
}
new App();
