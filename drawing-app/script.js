document.addEventListener('DOMContentLoaded', () => {
    const canvas= document.getElementById('drawingCanvas');
    const context= canvas.getContext('2d');
    let isDrawing=false;
    let isEraser=false;
    let currentColor='#000';
    let currentLineWidth=5;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    document.getElementById('changeColorBtn').addEventListener('click', changeColor);
    document.getElementById('clearCanvasBtn').addEventListener('click', clearCanvas);
    document.getElementById('toggleEraserBtn').addEventListener('click', toggleEraser);
    document.getElementById('lineWidth').addEventListener('input', changeLineWidth);


    function startDrawing(event){
        isDrawing=true;
        draw(event);
    }

    function draw(event){
        if(!isDrawing) {
            return;
        }

        context.lineWidth = isEraser ? currentLineWidth*2:currentLineWidth;
        context.lineCap='round';
        context.strokeStyle= isEraser ? '#fff' : currentColor;

        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY-canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(event.clientX-canvas.offsetLeft, event.clientY-canvas.offsetTop);
    }

    function stopDrawing(){
        isDrawing=false;
        context.beginPath();
    }

    function clearCanvas() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    function changeColor() {
        const newColor=prompt('Enter a color (e.g.: #ff0000):');
        if(newColor){
            currentColor=newColor;
        }
    }

    function changeLineWidth(){
        currentLineWidth=document.getElementById('lineWidth').value;
    }

    function toggleEraser() {
        isEraser=!isEraser;
        updateEraserButton();
    }

    function updateEraserButton(){
        const eraserButton = document.getElementById('toggleEraserBtn');
        eraserButton.textContent = isEraser ? 'Disable Eraser' : 'Enable Eraser'
    }
});