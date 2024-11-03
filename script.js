// Outer card setup
const outerCanvas = document.getElementById("outerCanvas");
const outerCtx = outerCanvas.getContext("2d");
const outerHiddenMessageContainer = document.querySelector(".outer-card .hidden-message-container");
const outerHiddenMessage = document.querySelector(".outer-card .hidden-message");

// Inner card 1 setup
const innerCanvas1 = document.getElementById("innerCanvas1");
const innerCtx1 = innerCanvas1.getContext("2d");
const innerHiddenMessageContainer1 = document.querySelector(".inner-card-1 .hidden-message-container");
const innerHiddenMessage1 = document.querySelector(".inner-card-1 .hidden-message");

// Inner card 2 setup
const innerCanvas2 = document.getElementById("innerCanvas2");
const innerCtx2 = innerCanvas2.getContext("2d");
const innerHiddenMessageContainer2 = document.querySelector(".inner-card-2 .hidden-message-container");
const innerHiddenMessage2 = document.querySelector(".inner-card-2 .hidden-message");

// Inner card 3 setup
const innerCanvas3 = document.getElementById("innerCanvas3");
const innerCtx3 = innerCanvas3.getContext("2d");
const innerHiddenMessageContainer3 = document.querySelector(".inner-card-3 .hidden-message-container");
const innerHiddenMessage3 = document.querySelector(".inner-card-3 .hidden-message");

// Set canvas sizes
function setCanvasSize(canvas) {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

setCanvasSize(outerCanvas);
setCanvasSize(innerCanvas1);
setCanvasSize(innerCanvas2);
setCanvasSize(innerCanvas3);

// Draw initial grey overlay for all canvases
function drawInitialOverlay(ctx) {
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

drawInitialOverlay(outerCtx);
drawInitialOverlay(innerCtx1);
drawInitialOverlay(innerCtx2);
drawInitialOverlay(innerCtx3);

// Scratch effect variables
let isScratchingOuter = false;
let isScratchingInner1 = false;
let isScratchingInner2 = false;
let isScratchingInner3 = false;

// Event listeners for outer card
outerCanvas.addEventListener("mousedown", startScratchOuter);
outerCanvas.addEventListener("mousemove", scratchOuter);
outerCanvas.addEventListener("mouseup", endScratchOuter);
outerCanvas.addEventListener("touchstart", startScratchOuter);
outerCanvas.addEventListener("touchmove", scratchOuter);
outerCanvas.addEventListener("touchend", endScratchOuter);

// Event listeners for inner card 1
innerCanvas1.addEventListener("mousedown", startScratchInner1);
innerCanvas1.addEventListener("mousemove", scratchInner1);
innerCanvas1.addEventListener("mouseup", endScratchInner1);
innerCanvas1.addEventListener("touchstart", startScratchInner1);
innerCanvas1.addEventListener("touchmove", scratchInner1);
innerCanvas1.addEventListener("touchend", endScratchInner1);

// Event listeners for inner card 2
innerCanvas2.addEventListener("mousedown", startScratchInner2);
innerCanvas2.addEventListener("mousemove", scratchInner2);
innerCanvas2.addEventListener("mouseup", endScratchInner2);
innerCanvas2.addEventListener("touchstart", startScratchInner2);
innerCanvas2.addEventListener("touchmove", scratchInner2);
innerCanvas2.addEventListener("touchend", endScratchInner2);

// Event listeners for inner card 3
innerCanvas3.addEventListener("mousedown", startScratchInner3);
innerCanvas3.addEventListener("mousemove", scratchInner3);
innerCanvas3.addEventListener("mouseup", endScratchInner3);
innerCanvas3.addEventListener("touchstart", startScratchInner3);
innerCanvas3.addEventListener("touchmove", scratchInner3);
innerCanvas3.addEventListener("touchend", endScratchInner3);

// Scratch functions for outer card
function startScratchOuter(e) {
    isScratchingOuter = true;
    scratchOuter(e);
}

function scratchOuter(e) {
    if (!isScratchingOuter) return;
    const { offsetX, offsetY } = e.touches ? e.touches[0] : e;
    outerCtx.globalCompositeOperation = "destination-out";
    outerCtx.beginPath();
    outerCtx.arc(offsetX, offsetY, 50, 0, Math.PI * 2); 
    outerCtx.fill();
}

function endScratchOuter() {
    isScratchingOuter = false;
    checkScratch(outerCtx, outerHiddenMessageContainer, outerHiddenMessage, outerCanvas);
}

// Scratch functions for inner card 1
function startScratchInner1(e) {
    isScratchingInner1 = true;
    scratchInner1(e);
}

function scratchInner1(e) {
    if (!isScratchingInner1) return;
    const { offsetX, offsetY } = e.touches ? e.touches[0] : e;
    innerCtx1.globalCompositeOperation = "destination-out";
    innerCtx1.beginPath();
    innerCtx1.arc(offsetX, offsetY, 50, 0, Math.PI * 2); 
    innerCtx1.fill();
}

function endScratchInner1() {
    isScratchingInner1 = false;
    checkScratch(innerCtx1, innerHiddenMessageContainer1, innerHiddenMessage1, innerCanvas1);
}

// Scratch functions for inner card 2
function startScratchInner2(e) {
    isScratchingInner2 = true;
    scratchInner2(e);
}

function scratchInner2(e) {
    if (!isScratchingInner2) return;
    const { offsetX, offsetY } = e.touches ? e.touches[0] : e;
    innerCtx2.globalCompositeOperation = "destination-out";
    innerCtx2.beginPath();
    innerCtx2.arc(offsetX, offsetY, 50, 0, Math.PI * 2); // Increased radius from 20 to 30
    innerCtx2.fill();
}

function endScratchInner2() {
    isScratchingInner2 = false;
    checkScratch(innerCtx2, innerHiddenMessageContainer2, innerHiddenMessage2, innerCanvas2);
}

// Scratch functions for inner card 3
function startScratchInner3(e) {
    isScratchingInner3 = true;
    scratchInner3(e);
}

function scratchInner3(e) {
    if (!isScratchingInner3) return;
    const { offsetX, offsetY } = e.touches ? e.touches[0] : e;
    innerCtx3.globalCompositeOperation = "destination-out";
    innerCtx3.beginPath();
    innerCtx3.arc(offsetX, offsetY, 50, 0, Math.PI * 2); 
    innerCtx3.fill();
}

function endScratchInner3() {
    isScratchingInner3 = false;
    checkScratch(innerCtx3, innerHiddenMessageContainer3, innerHiddenMessage3, innerCanvas3);
}


function checkScratch(ctx, messageContainer, message, canvas, isImage = false) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = imageData.length / 4;
    let scratched = 0;

    for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) scratched++;
    }

    if (scratched / total > 0.5) {
        canvas.style.display = "none";
        messageContainer.style.display = "block"; 
        if (isImage) {
            message.style.display = "block"; 
            message.style.opacity = "1"; 
        } else {
            message.style.opacity = "1"; 
        }
    }
}


function endScratchInner3() {
    isScratchingInner3 = false;
    checkScratch(innerCtx3, innerHiddenMessageContainer3, innerHiddenMessage3, innerCanvas3, true);
}

