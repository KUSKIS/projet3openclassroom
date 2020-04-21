class Slider {
    constructor(slider, img, forward, backward, pauseCircle) {
        this.slider = $(slider); // on cible le bloc du slider
        this.img = $(img); // on cible les images contenues dans le slider
        this.forward = $(forward);
        this.backward = $(backward);
        this.pauseCircle = $(pauseCircle);
        this.maxValueCounter = this.img.length - 1; // on définit l'index du dernier élément
        this.counter = 0; // on initialise un compteur
        this.printedImg = this.img.eq(this.counter); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
        this.img.hide(); // on cache les images
        this.printedImg.show(); // on affiche seulement l'image courante
        this.onBreak = false;
        this.eventManager();
        this.playSlide();
    }
    definedNextImg(){
        this.counter++; // on incrémente le compteur
        if(this.counter > this.maxValueCounter){
            this.counter = 0;
        }
        this.img.hide();; // on cache les images
        this.printedImg = this.img.eq(this.counter); // on définit la nouvelle image
        this.printedImg.show();// puis on l'affiche
    }
    definedPrevImg(){
        this.counter--; // on décrémente le compteur
        if(this.counter < 0){
            this.counter = this.maxValueCounter;
        }
        this.img.hide();
        this.printedImg = this.img.eq(this.counter);
        this.printedImg.show();
    }
    playSlide(){
        setInterval(()=>{
            if(this.onBreak === false){
                this.definedNextImg();
            }
        },5000); // on définit l'interval à 5000 millisecondes (5s)
    }
    eventManager(){
        this.forward.click(()=>{ // image suivante
            this.definedNextImg();
        });

        this.backward.click(()=>{ // image précédente
            this.definedPrevImg();
        });
        let objectSlider = this;
        this.pauseCircle.click(function(){
            if(objectSlider.onBreak === false){
                objectSlider.onBreak = true;
                $(this).removeClass('fa-pause-circle');
                $(this).addClass('fa-play-circle');

            }else {
                objectSlider.onBreak = false;
                $(this).removeClass('fa-play-circle');
                $(this).addClass('fa-pause-circle');
            }
        });
        $(window).keydown( (e)=>{
            if (e.keyCode === 37){
                this.definedPrevImg();

            }else if (e.keyCode === 39){
                this.definedNextImg();
            }
        });
    }
}




