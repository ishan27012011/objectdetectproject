img = "";
status = "";
objects = [];
function setup() {
    canvas = createCanvas(640, 420,);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("but").innerHTML = "Status: Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded!");
    objectDetector.detect(img, gotResults);
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    img = loadImage("tv.png");
}

function draw() {
    image(img, 0, 0, 640, 420)
    if (status != "") {
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("but").innerHTML = "Status: Objects Detected";
            fill("red")
            percent = floor(objects[i].confidence * 100);
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            strokeWeight(3);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
