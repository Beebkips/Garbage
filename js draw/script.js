// Set up!
var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");
var HEIGHT = 125;
var WIDTH = 125;
var fH = 500;
var fW = 500;
var cH = fH/HEIGHT;
var cW = fW/WIDTH;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

var drawCells = function (cells) {
    for (i = 0; i < HEIGHT; i++) {
        for (j = 0; j < WIDTH; j++) {
            if (cells[i][j] === 1) {
                context.fillStyle = "black";
            } else {
                context.fillStyle = "white";
            }
            context.fillRect(i*cW, j*cH, cW, cH);
        }
    }    
};

var updateCells = function (cells) {
    var newCells = new Array(HEIGHT);
    for (i = 0; i < HEIGHT; i++) {
        newCells[i] = new Array(WIDTH);
    }
    for (i = 0; i < HEIGHT; i++) {
        for (j = 0; j < WIDTH; j++) {
            var count;
            count = cells[i][j] * -1;
            for (k = -1; k < 2; k++) {
                for (l = -1; l < 2; l++) {
                    // console.log((i + k) % 10, (j + l) % 10, i, k, j, l)
                    count = count + cells[mod((i + k),HEIGHT)][mod((j + l),WIDTH)];
                }
            }
            if (cells[i][j] === 1 && (count === 3 || count === 2)) {
                newCells[i][j] = 1;
            } else if (count === 3) {
                newCells[i][j] = 1;
            } else {
                newCells[i][j] = 0;
            }
        }
    }

    return newCells;
};

var thecells = new Array(HEIGHT);
for (i = 0; i < HEIGHT; i++) {
    thecells[i] = new Array(WIDTH);
}

for (i = 0; i < HEIGHT; i++) {
    for (j = 0; j < WIDTH; j++) {
        thecells[i][j] = Math.floor(Math.random() * 2)
    }
}

var id = setInterval(frame, 10);

function frame() {
    drawCells(thecells);

    // for (i = 0; i < 10; i++) {
    //     for (j = 0; j < 10; j++) {
    //         thecells[i][j] = Math.floor(Math.random() * 2)
    //     }
    // }

    var temp = updateCells(thecells);
    thecells = temp;
}

// for (i = 0; i < 20; i++) {
//     for (j = 0; j < 20; j++) {
//         if (i % 2 === 0) {
//             context.fillStyle = "red";
//         } else {
//             context.fillStyle = "black";
//         }
//         context.fillRect(i*20,j*20,20,20);
//     }
// }

// // Draw the face
// context.fillStyle = "yellow";
// context.beginPath();
// context.arc(95, 85, 40, 0, 2*Math.PI);
// context.closePath();
// context.fill();
// context.lineWidth = 2;
// context.stroke();
// context.fillStyle = "black";

// // Draw the left eye
// context.beginPath();
// context.arc(75, 75, 5, 0, 2*Math.PI);
// context.closePath();
// context.fill();

// // Draw the right eye
// context.beginPath();
// context.arc(114, 75, 5, 0, 2*Math.PI);
// context.closePath();
// context.fill();

// // Draw the mouth
// context.beginPath();
// context.arc(95, 90, 26, Math.PI, 2*Math.PI, true);
// context.closePath();
// context.fill();

// // Write "Hello, World!"
// context.font = "30px Garamond";
// context.fillText("Hello, World!",15,175);