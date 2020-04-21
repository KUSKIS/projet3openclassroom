class Canvas {
    constructor() {
        const canvas = document.getElementById('drawing');
        this.canvas = document.getElementById('drawing');
        const ctx = canvas.getContext('2d');
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = 'black';
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function move (e){

            if (!isDrawing) return;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);

            let {
                x,
                y
            } = getTouchPos(canvas, e);
            if (x == false || y == false) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            } else {
                ctx.lineTo(x, y);
                ctx.stroke();
                [lastX, lastY] = [x, y];
            }

        };
        $(canvas).mousemove((e) => {
            move (e)})
        $(canvas).mousedown((e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        $(canvas).mouseup( () => isDrawing = false);
        $(canvas).mouseout( () => isDrawing = false);
        $(canvas).on('touchmove', (e) => move(e));
        $(canvas).on ('touchstart', (e) => {
            isDrawing = true;
            [lastX, lastY] = [getTouchPos(canvas, e)];
        });
        $(canvas).on('touchend', (e) => move(e));
        $(canvas).on('touchcancel', (e) => move(e));

        function getTouchPos(canvasDom, touchEvent) {
            let rect = canvasDom.getBoundingClientRect();
            if (touchEvent.type == 'mousemove' || touchEvent.type == 'mousedown') {
                return {
                    x: false,
                    y: false
                };
            } else {
                return {
                    x: touchEvent.touches[0].clientX - rect.left,
                    y: touchEvent.touches[0].clientY - rect.top
                };

            }
        }

    }
}
